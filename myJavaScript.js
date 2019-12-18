
"use strict"; //kör strikt kod = tydligare kod med mer felhantering

document.getElementById("welcomeH1").innerHTML = "Play SOKOBAN!";//skriv i objektet "welcomeH1" (rubriken)

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

console.log(myDiv);

for (let y = 0; y < 16; y++) { //gå igenom griden, denna kod KÖRS EN GÅNG!!
  for (let x = 0; x < 19; x++) {
    const element = document.createElement("div");//skapa en ny instans av classen "de små rutorna"
    element.className = "divBox";

    //lägg på en färg från html=W och CSS=.wall(class)
    if (tileMap01.mapGrid[y] [x] == "W") { element.classList.add("wall"); }//element.classList.add(Tiles.Wall); uffes variabel
    else if (tileMap01.mapGrid[y] [x] == "B") { element.classList.add("block"); }
    else if (tileMap01.mapGrid[y] [x] == "P") {
      element.classList.add("player");
      player_Y=y; //initiera med startvärden
      player_X=x;
    }
    else if (tileMap01.mapGrid[y] [x] == "G") { element.classList.add("goalArea"); }
    else { element.classList.add("space"); }

    element.id = "y"+ y + "x" + x; //inner loop - ge VARJE div-element ett eget id - första "y0x0" andra "y0x1"

    myDiv.appendChild(element); //appenda nya elementet
  }
  //logic if needed between rows
}


//här har vi spelaren - använder variavler som INITERAS i: else if "P"
var elementPlayerIsNowOn = document.getElementById("y" + player_Y + "x" + player_X);

console.log(elementPlayerIsNowOn);
console.log(player_X, player_Y);



function move (newY, newX) {

  var oldClassList = elementPlayerIsNowOn.classList;
  console.log(oldClassList);
  console.log(elementPlayerIsNowOn);
  console.log(newY,newX);

  if (document.getElementById("y" + (player_Y+newY) + "x" + (player_X+newX)).classList.contains("wall")) {
    return;
  }
  else {

    console.log(player_X+newX, player_X+newX);

    //flytta block om sådant finns, ett snäpp till i samma riktning
    if (document.getElementById("y" + (player_Y+newY) + "x" + (player_X+newX)).classList.contains("block")) {   
      let blockY=newY*2;
      let blockX=newX*2;
      console.log("PlayerPos", player_Y, player_X);
      console.log("block", blockY, blockX);
      console.log("blockMål",  (player_Y+blockY), (player_X+blockX));

     //något fel här
      var test = document.getElementById("y" + (player_Y+blockY) + "x" + (player_X+blockX));
      console.log(test);
      test.classList.add("player");
      console.log(test);
      console.log(player_X+newX++, player_X+newX++);
    }

    //måla om platsen du står på (skall alltiv vara space när du lämnar)
    elementPlayerIsNowOn.classList.remove("player");
    elementPlayerIsNowOn.classList.add("space");

    //gå till ny plats    
    player_Y=player_Y+newY;
    player_X=player_X+newX;
    elementPlayerIsNowOn = document.getElementById("y" + (player_Y) + "x" + (player_X));
    elementPlayerIsNowOn.classList.remove("space");
    elementPlayerIsNowOn.classList.add("player");
  }

}
