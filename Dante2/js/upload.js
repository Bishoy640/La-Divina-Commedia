



function readURLL(input) {
  if (input.files && input.files[0]) {

    var reader = new FileReader();

    reader.onload = function (e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      result = e.target.result
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
  if (reader.readyState == 2) {
    alert("a")
  }

}

let MyArray = []
var answer = ""
var found = false
let end = "l'amor che move il sole e l'altre stelle."

function tess() {
  Tesseract.recognize(
    result,
    'ita',
    { logger: m => console.log("m") }
  ).then(({ data: { text } }) => {

    MyArray = text.split('\n');
    MyArray[0] = MyArray[0].replace("’", "'").replace("‘", "'").replace("”", "\"")

    $.getJSON('divina_commedia.json', function (data) {

      for (let cantica of data['children']) {
        for (let canto of cantica['children']) {
          for (let terzine of canto['children']) {
            for (let riga of terzine['children']) {
              riga['text'] = riga['text'].replace("’", "'").replace("‘", "'").replace("”", "\"").replace("\u2019", "'").replace("\u00ec", "i")

              if (riga['text'] == MyArray[0]) {
                answer = "Cantica: " + cantica['name'] + "<br>" + "Canto: " + canto['name'] + "<br>" + "Terzina: " + terzine['number'] + "<br>" + "Riga: " + riga['number']
                document.getElementById("result").innerHTML = answer
                $(document).ready(function () {
                  $("#modalresult").modal();
                  found = true
                });
                // console.log("aas")
                // document.getElementById("result").innerHTML="Errore Successo";
                // $(document).ready(function(){
                //   $("#modalresult").modal();
                // });

              }


              else if (!found && riga['text'] == end) {

                document.getElementById("result").innerHTML = "Non Trovato";
                $(document).ready(function () {
                  $("#modalresult").modal();
                });
              }

            }
          }
        }
      }
      console.log(MyArray[0])
      console.log("finished")
    });

  }).then(function hide_loader() {
    $('.loader1').addClass("hide-loader");
    $('.hide-loader').removeClass("loader1");
  }
  )

}



function submit() {

  $('.hide-loader').addClass("loader1");
  $('.loader1').removeClass("hide-loader");

  tess()
}


function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
  $('.image-upload-wrap').removeClass('image-dropping');



});




