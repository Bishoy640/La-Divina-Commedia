var input = document.getElementById("myInput");
var value1 = document.getElementById("myInput").value;
var answer = "";
var answerlen = 0;
var found = false;
let end = "l'amor che move il sole e l'altre stelle.";
var answercanto = "";

$("#myInput").keyup(function (event) {
  if (event.keyCode === 13) {
    $(".btn-search").click();
  }
});

function search() {
  console.log("worked");
  console.log(document.getElementById("myInput").value);

  $.getJSON("divina_commedia.json", function (data) {
    answer = "";
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
            if (
              riga["text"].includes(document.getElementById("myInput").value)
            ) {
              answer +=
                "Cantica: " +
                cantica["name"] +
                "<br>" +
                "Canto: " +
                canto["name"] +
                "<br>" +
                "Terzina: " +
                terzine["number"] +
                "<br>" +
                "Riga: " +
                riga["number"];

              answer += "<br><br><hr><br><br>";
            }

            // console.log(riga['text'])
            // if (MyArray[0] == "che 'l tradimento insieme con lui fece."){ s7
            //   console.log("ez")
            // }
            // if (riga['text'] == MyArray[0]) {
            //     alert("Cantica: " + cantica['name'] + "\n" + "Canto: " + canto['name'] + "\n" + "Riga: " + riga['number'])
            //     console.log("Cantica:", cantica['name'])
            //     console.log("Canto:", canto['name'])
            //     console.log("Riga:", riga['number'])
            // }
          }
        }
        console.log(canto["name"]);
      }
    }
    answerlen = answer.length;
    if (answer.endsWith("<br><br><hr><br><br>")) {
      answer = answer.substring(0, answerlen - 21);
      console.log("iam here");
    }
    if (answerlen == 0) {
      answer = "Non rovato";
    }
    document.getElementById("result").innerHTML = answer;
    $(document).ready(function () {
      $("#modalSearch").modal();
    });

    console.log("finished");
  });
}

function getSelectValue(list) {
  if (list == "list1") {
    let selectElement1 = document.getElementById("list1");
    let valueSelected1 =
      selectElement1.options[selectElement1.selectedIndex].value; // get selected option value
    var text1 = selectElement1.options[selectElement1.selectedIndex].text; //get the selected option text

    if (valueSelected1.length != 0 && valueSelected1.length != 16) {
      $.getJSON("divina_commedia.json", function (data) {
        for (let cantica of data["children"]) {
          if (cantica["name"] == "Inferno") {
            document.getElementById("CantoName").innerHTML = "Inferno";
            for (let canto of cantica["children"]) {
              if (canto["name"] == text1) {
                document.getElementById("result2").innerHTML = text1;
                for (let terzine of canto["children"]) {
                  if (answer.length != 0) {
                    answer += "<br>";
                  }
                  for (let riga of terzine["children"]) {
                    riga["text"] = riga["text"]
                      .replace("’", "'")
                      .replace("‘", "'")
                      .replace("”", '"')
                      .replace("\u2019", "'")
                      .replace("\u00ec", "i");

                    answer += riga["text"];
                    answer += "<br>";
                    document.getElementById("Presult2").innerHTML = answer;
                    $(document).ready(function () {
                      $("#modalCanto").modal();
                    });
                  }
                }
                console.log(canto["name"]);
              }
            }
          }
        }
      });
    }
  }

  if (list == "list2") {
    let selectElement2 = document.getElementById("list2");
    let valueSelected2 =
      selectElement2.options[selectElement2.selectedIndex].value; // get selected option value
    var text2 = selectElement2.options[selectElement2.selectedIndex].text; //get the selected option text
    if (text2.length != 0 && valueSelected2.length != 16) {
      $.getJSON("divina_commedia.json", function (data) {
        for (let cantica of data["children"]) {
          if (cantica["name"] == "Inferno") {
            document.getElementById("CantoName").innerHTML = "Purgatorio";
            for (let canto of cantica["children"]) {
              if (canto["name"] == text1) {
                document.getElementById("result2").innerHTML = text1;
                for (let terzine of canto["children"]) {
                  if (answer.length != 0) {
                    answer += "<br>";
                  }
                  for (let riga of terzine["children"]) {
                    riga["text"] = riga["text"]
                      .replace("’", "'")
                      .replace("‘", "'")
                      .replace("”", '"')
                      .replace("\u2019", "'")
                      .replace("\u00ec", "i");

                    answer += riga["text"];
                    answer += "<br>";
                    document.getElementById("Presult2").innerHTML = answer;
                    $(document).ready(function () {
                      $("#modalCanto").modal();
                    });
                  }
                }
                console.log(canto["name"]);
              }
            }
          }
        }
      });
    }
  }

  if ((list = "list3")) {
    let selectElement3 = document.getElementById("list3");
    let valueSelected3 =
      selectElement3.options[selectElement3.selectedIndex].value; // get selected option value
    var text3 = selectElement3.options[selectElement3.selectedIndex].text; //get the selected option text

    if (valueSelected3.length != 0 && valueSelected3.length != 16) {
      $.getJSON("divina_commedia.json", function (data) {
        for (let cantica of data["children"]) {
          if (cantica["name"] == "Inferno") {
            document.getElementById("CantoName").innerHTML = "Paradiso";
            for (let canto of cantica["children"]) {
              if (canto["name"] == text1) {
                document.getElementById("result2").innerHTML = text1;
                for (let terzine of canto["children"]) {
                  if (answer.length != 0) {
                    answer += "<br>";
                  }
                  for (let riga of terzine["children"]) {
                    riga["text"] = riga["text"]
                      .replace("’", "'")
                      .replace("‘", "'")
                      .replace("”", '"')
                      .replace("\u2019", "'")
                      .replace("\u00ec", "i");

                    answer += riga["text"];
                    answer += "<br>";
                    document.getElementById("Presult2").innerHTML = answer;
                    $(document).ready(function () {
                      $("#modalCanto").modal();
                    });
                  }
                }
                console.log(canto["name"]);
              }
            }
          }
        }
      });
    }
  }

  list = "";
}
