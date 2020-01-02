"use strict"; //kör strikt kod = tydligare kod med mer felhantering 
document.getElementById("welcomeH1").innerHTML = "Play SOKOBAN!"; //skriv RUBRIK i objektet "welcomeH1" (rubriken)

//ge bodyn en bakgrundsfärg = hämta element "body" och associera det till variabeln "myBody" - retur Ett objekt
var myBody = document.getElementsByTagName("body")[0]; //tagname = returnerar lista
myBody.style.backgroundColor = "yellow"; //sätt bodyn gul

//skapa spelplan av alla diverse div = hämta element "myDiv" och associera det till variabeln "myDiv"
var myDiv = document.getElementById("myDiv"); //ny var som kopplas till containern "myDiv" (div-sektionen)
myDiv.innerHTML = "";
myDiv.style.width = "760px";
myDiv.style.height = "640px";
myDiv.style.backgroundColor = "blue"; //Denna syns inte, ersätts av rutor (ändra någon ovan till 305 för att se den)

var player_Y = -1;
var player_X = -1;

for (let y = 0; y < 16; y++) { //gå igenom griden, denna kod KÖRS EN GÅNG!!
  for (let x = 0; x < 19; x++) {
    const element = document.createElement("div"); //skapa en ny instans av classen "de små rutorna"
    element.className = "divBox";

    //lägg på en färg från html=W och CSS=.wall(class)
    if (tileMap01.mapGrid[y][x] == "W") { element.classList.add("wall"); } //element.classList.add(Tiles.Wall); uffes variabel
    else if (tileMap01.mapGrid[y][x] == "B") { element.classList.add("block"); }
    else if (tileMap01.mapGrid[y][x] == "P") {
      element.classList.add("player");
      player_Y = y; //initiera med startvärden
      player_X = x;
    }
    else if (tileMap01.mapGrid[y][x] == "G") { element.classList.add("goalArea"); }
    else { element.classList.add("space"); }
    element.id = "y" + y + "x" + x; //innre loop - ge VARJE div-element ett eget id - första "y0x0" andra "y0x1"
    myDiv.appendChild(element); //appenda nya elementet
  }
}

var elementPlayerIsNowOn = document.getElementById("y" + player_Y + "x" + player_X);

function checkIfArrow_IfSoMove(event) {
  switch (event.keyCode) {
    case 38: move(-1, 0); break;
    case 40: move(+1, 0); break;
    case 37: move(0, -1); break;
    case 39: move(0, +1); break;
  }
}

function move(newY, newX) { //indata från styrpanel
  if (document.getElementById("y" + (player_Y + newY) + "x" + (player_X + newX)).classList.contains("wall")) {
    return;
  }
  else {
    //flytta block om sådant finns, ett snäpp till i samma riktning (om där är ledig plats)
    if (document.getElementById("y" + (player_Y + newY) + "x" + (player_X + newX)).classList.contains("block")) {
      if ((document.getElementById("y" + (player_Y + newY * 2) + "x" + (player_X + newX * 2)).classList.contains("space")) ||
        (document.getElementById("y" + (player_Y + newY * 2) + "x" + (player_X + newX * 2)).classList.contains("goalArea"))) {

        //hantera rutan blocket skall till
        var dummy = document.getElementById("y" + (player_Y + (newY * 2)) + "x" + (player_X + (newX * 2)));
        dummy.classList.remove("space");
        dummy.classList.remove("goalArea");
        dummy.classList.add("block");

        //hantera rutan blocket stod på och spelaren skall till
        var dummy = document.getElementById("y" + (player_Y + newY) + "x" + (player_X + newX));
        dummy.classList.remove("goalArea");
        dummy.classList.remove("block");
      }
      else { return; } //platsen bakom blocket var ej ledig
    }

    //måla om platsen spelaren kom ifrån på (skall alltiv vara space eller goalArea när vi lämnar)
    elementPlayerIsNowOn.classList.remove("player");
    if (tileMap01.mapGrid[player_Y][player_X] == "G") { elementPlayerIsNowOn.classList.add("goalArea"); }
    else { elementPlayerIsNowOn.classList.add("space"); }

    //flytta spelaren till nya platsen    
    player_Y = player_Y + newY;
    player_X = player_X + newX;
    elementPlayerIsNowOn = document.getElementById("y" + (player_Y) + "x" + (player_X));
    elementPlayerIsNowOn.classList.remove("space");
    elementPlayerIsNowOn.classList.remove("goalArea");
    elementPlayerIsNowOn.classList.add("player");
  }
}