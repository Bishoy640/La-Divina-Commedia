var input = document.getElementById("myInput");
var value1 = document.getElementById("myInput").value;
var answer = "";
var answerlen = 0;
let end = "l'amor che move il sole e l'altre stelle.";


var arrayLoop;

$("#myInput").keyup(function (event) {
  if (event.keyCode === 13) {
    $(".btn-search").click();
  }
});

function search() {
  arrayLoop = 0;
  canticaName = [];
  cantoName = [];
  terzinaNum = [];
  console.log(document.getElementById("myInput").value);

  if (document.getElementById("myInput").validity.valid) {
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
                riga["text"]
                  .toUpperCase()
                  .includes(
                    document.getElementById("myInput").value.toUpperCase()
                  )
              ) {
                canticaName.push(cantica["name"]);
                cantoName.push(canto["name"]);
                terzinaNum.push(terzine["number"]);

                answer +=
                  "Cantica: " +
                  canticaName[arrayLoop] +
                  "<br>" +
                  "Canto: " +
                  cantoName[arrayLoop] +
                  "<br>" +
                  "Strofa: " +
                  terzinaNum[arrayLoop] +
                  "<br>" +
                  "Verso: " +
                  riga["number"];
                // console.log("Cantica: " + canticaName[arrayLoop])
                // console.log("Canto: " + cantoName[arrayLoop])
                // console.log("ArrayLoop: " + arrayLoop)
                //Working!!

                answer +=
                  '<br><button onclick="getTerzina(canticaName[' +
                  arrayLoop +
                  "], cantoName[" +
                  arrayLoop +
                  "], terzinaNum[" +
                  arrayLoop +
                  "],document.getElementById('myInput').value);\">Visualizza</button>";
                answer += "<br><br><hr><br><br>";
                arrayLoop++;
              }
            }
          }
        }
      }
      answerlen = answer.length;
      if (answer.endsWith("<br><br><hr><br><br>")) {
        answer = answer.substring(0, answerlen - 21);
      }
      if (answerlen == 0) {
        answer = "Non trovato";
        document.getElementById("result").style.color = "red";
        document.getElementById("exampleModalLongTitle").innerHTML = "Il Risultato"
        document.getElementById("resultS2").style.display = "none";
      } else {
        document.getElementById("result").style.color = "black";
        document.getElementById("resultS2").style.display = "block";
      }
      document.getElementById("result").innerHTML = answer;

      $(document).ready(function () {
        $("#modalSearch").modal();
      });
    });
  }
}

function getSelectValue(list) {
  if (list == "list1") {
    let selectElement1 = document.getElementById("list1");
    let valueSelected1 =
      selectElement1.options[selectElement1.selectedIndex].value; // get selected option value
    var text1 = selectElement1.options[selectElement1.selectedIndex].text; //get the selected option text

    if (valueSelected1.length != 0 && valueSelected1.length != 16) {
      resultFin("Inferno", text1);
      document.getElementById("Presult2").innerHTML = answer;
      $(document).ready(function () {
        $("#modalCanto").modal();
      });
    }
  }

  if (list == "list2") {
    let selectElement2 = document.getElementById("list2");
    let valueSelected2 =
      selectElement2.options[selectElement2.selectedIndex].value; // get selected option value
    var text2 = selectElement2.options[selectElement2.selectedIndex].text; //get the selected option text
    if (text2.length != 0 && valueSelected2.length != 16) {
      resultFin("Purgatorio", text2);
      document.getElementById("Presult2").innerHTML = answer;
      $(document).ready(function () {
        $("#modalCanto").modal();
      });
    }
  }

  if ((list = "list3")) {
    let selectElement3 = document.getElementById("list3");
    let valueSelected3 =
      selectElement3.options[selectElement3.selectedIndex].value; // get selected option value
    var text3 = selectElement3.options[selectElement3.selectedIndex].text; //get the selected option text

    if (valueSelected3.length != 0 && valueSelected3.length != 16) {
      resultFin("Paradiso", text3);
      document.getElementById("Presult2").innerHTML = answer;
      $(document).ready(function () {
        $("#modalCanto").modal();
      });
    }
  }
}

function resultFin(CantoName, CantoNum) {
  answer = ""
  $.getJSON("divina_commedia.json", function (data) {
    for (let cantica of data["children"]) {
      if (cantica["name"] == CantoName) {
        document.getElementById("CantoName").innerHTML = CantoName;
        for (let canto of cantica["children"]) {
          if (canto["name"] == CantoNum) {
            document.getElementById("result2").innerHTML = CantoNum;
            for (let terzine of canto["children"]) {
              answer += "<br>" + terzine["number"];
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

                answer +=
                  riga["text"] +
                  "<p style='color: grey; display:inline; margin-left: .5em'>" +
                  riga["number"] +
                  "</p>";
                answer += "<br>";

                document.getElementById("Presult2").innerHTML = answer;
                $(document).ready(function () {
                  $("#modalCanto").modal();
                });
              }
            }
          }
        }
      }
    }
  });
}

function getTerzina(canticaName, cantoName, TrezinaNum, searchWord) {
  // console.log(cantoName)
  answer = "";
  console.log("Cantica: " + canticaName);
  console.log("Canto: " + cantoName);
  var markResult = "";
  $.getJSON("divina_commedia.json", function (data) {
    for (let cantica of data["children"]) {
      if (cantica["name"] == canticaName) {
        document.getElementById("exampleModalLongTitle").innerHTML =
          canticaName;
        for (let canto of cantica["children"]) {
          if (canto["name"] == cantoName) {
            document.getElementById("resultS2").innerHTML = cantoName;
            for (let terzine of canto["children"]) {
              if (terzine["number"] == TrezinaNum) {
                answer += "<br>" + terzine["number"] + "<br>";

                for (let riga of terzine["children"]) {
                  riga["text"] = riga["text"]
                    .replace("’", "'")
                    .replace("‘", "'")
                    .replace("”", '"')
                    .replace("\u2019", "'")
                    .replace("\u00ec", "i");
                  
                  if (
                    riga["text"]
                      .toUpperCase()
                      .includes(searchWord.toUpperCase())
                  ) {
                    
                    answer +=
                      "<mark id='resultMark' style='background-color:rgba(183, 134, 11,0.6);'>";
                      markResult +=
                    riga["text"] + "&nbsp;" + "<span style='color:grey;'>" + riga["number"] + "</span>";
                    answer += markResult + " </mark>"  + "<br>";
                  }
                  else{
                    answer +=
                    riga["text"] + "&nbsp;" + "<span style='color:grey;'>" + riga["number"] + "</span>" + "<br>";
                  }
                }
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
                  answer += riga["text"] + "&nbsp;" + "<span style='color:grey;'>" + riga["number"] + "</span>" + "<br>";
                }
              }
            }
          }
        }
      }
    }
    document.getElementById("result").innerHTML = answer;
    document
      .getElementById("resultMark")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
