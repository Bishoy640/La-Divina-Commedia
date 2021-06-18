function readURLL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".image-upload-wrap").hide();

      $(".file-upload-image").attr("src", e.target.result);
      result = e.target.result;
      $(".file-upload-content").show();

      $(".image-title").html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
  if (reader.readyState == 2) {
    alert("a");
  }
}

let MyArray = [];
var answer = "";
var found = false;
let end = "l'amor che move il sole e l'altre stelle.";
var terzinaRes = "";

function tess() {
  Tesseract.recognize(result, "ita", { logger: (m) => console.log("m") })
    .then(({ data: { text } }) => {
      MyArray = text.split("\n");
      MyArray[0] = MyArray[0]
        .replace("’", "'")
        .replace("‘", "'")
        .replace("”", '"');

      $.getJSON("divina_commedia.json", function (data) {
        
        for (let cantica of data["children"]) {
          for (let canto of cantica["children"]) {
            for (let terzine of canto["children"]) {
              for (let riga of terzine["children"]) {
                
                riga["text"] = riga["text"]
                  .replace("’", "'")
                  .replace("‘", "'")
                  .replace("”", '"')
                  .replace("\u2019", "'")
                  .replace("\u00ec", "i");

                if (riga["text"].toUpperCase() == MyArray[0].toUpperCase()) {
                  getTerzina(cantica["name"], canto["name"], terzine["number"]);
                  answer = "    "
                  
               

                  // console.log("aas")
                  // document.getElementById("result").innerHTML="Errore Successo";
                  // $(document).ready(function(){
                  //   $("#modalresult").modal();
                  // });
                } else if (answer.length == 0) {
                  document.getElementById("result").innerHTML = "Non Trovato";
                  document.getElementById("result").style.color = "red";
                  document.getElementById("exampleModalLongTitle").innerHTML = "Il Risultato ";
                  document.getElementById("result2").style.display = "none";
                  document.getElementById("getMarkBtn").style.display = "none";
                  

                  // document.getElementById('resultMark').style.display="none";

                } else {
                  document.getElementById("result").style.color = "black";
                  document.getElementById("result2").style.display = "block";
                  document.getElementById("getMarkBtn").style.display = "block";

                }
              
            }
            }
          }
        }
        $("#modalresult").modal('show');
        console.log(MyArray[0]);
        console.log("finished");
       
      });
    })
    .then(function hide_loader() {
      $(".loader1").addClass("hide-loader");
      $(".hide-loader").removeClass("loader1");
    });
    answer = ""
  
}

function submit() {
  
  $(".hide-loader").addClass("loader1");
  $(".loader1").removeClass("hide-loader");
  tess();
  
  
}

function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $(".file-upload-content").hide();
  $(".image-upload-wrap").show();
}
$(".image-upload-wrap").bind("dragover", function () {
  $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
  $(".image-upload-wrap").removeClass("image-dropping");
});

function getTerzina(cantoName, cantoNum, TrezinaNum) {
  answer = "";
  var markResult = "";
  $.getJSON("divina_commedia.json", function (data) {
    for (let cantica of data["children"]) {
      if (cantica["name"] == cantoName) {
        document.getElementById("exampleModalLongTitle").innerHTML = cantoName;
        for (let canto of cantica["children"]) {
          if (canto["name"] == cantoNum) {
            document.getElementById("result2").innerHTML = cantoNum + "<br>";
            for (let terzine of canto["children"]) {
              if (terzine["number"] == TrezinaNum) {
                markResult += terzine["number"] + "<br>";
                answer +=
                  "<br>" +
                  "<mark id='resultMark' style='background-color:rgba(183, 134, 11,0.6);'>";

                for (let riga of terzine["children"]) {
                  riga["text"] = riga["text"]
                    .replace("’", "'")
                    .replace("‘", "'")
                    .replace("”", '"')
                    .replace("\u2019", "'")
                    .replace("\u00ec", "i");
                  markResult +=
                    riga["text"] +
                    "&nbsp;" +
                    "<span style='color:grey;'>" +
                    riga["number"] +
                    "</span>" +
                    "<br>";
                }
                answer += markResult + " </mark>";
              } else {
                answer += "<br>" + terzine["number"];
                answer += "<br>";
                for (let riga of terzine["children"]) {
                  riga["text"] = riga["text"]
                    .replace("’", "'")
                    .replace("‘", "'")
                    .replace("”", '"')
                    .replace("\u2019", "'")
                    .replace("\u00ec", "i");
                  answer +=
                    riga["text"] +
                    "&nbsp;" +
                    "<span style='color:grey;'>" +
                    riga["number"] +
                    "</span>" +
                    "<br>";
                }
              }
            }
          }
        }
      }
    }
    document.getElementById("result").innerHTML = answer;
    document.getElementById("resultMark").scrollIntoView({ behavior: "smooth", block: "center" });
    
  });
}


function getMarkToView() {
  document.getElementById("resultMark").scrollIntoView({ behavior: "smooth", block: "center" });
}