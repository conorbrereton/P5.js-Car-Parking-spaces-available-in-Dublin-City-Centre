//Conor Brereton
// Dublin City Car Parking
var xCoord1 = 0;
var yCoord1 = 0;
var xCoord2 = 0;
var yCoord2 = 0;

var xml; // xml function
var lastTime; // variable used for millis in audio

let counter = 0; // counter used for circle moving
let angle = 0;

let xPosition = 100; //x position for cloud
let yPosition = 200; // y position for cloud

let cloudx = 100; //x position for cloud 2
let cloudy = 100; //y position for cloud 2

var myCar; // my car variable
let song = []; // song array with all songs

var x = 0; // x position for car
var y = 600; // y position 600 position of

var speed = 3; // speed of car
var lastTime; // used to delay  audio

var index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // index of all car parks

var xmlRefresh; // refreashes

var totalTime;
var totalSec;
var timeReset = 30;

var child; // car park for xml
var childNum; //
var carparkName;
var carparkSpaces;

var carSelect; // for dropdown menu

var sel;
var carpark = "what";

var url = "https://opendata.dublincity.ie/TrafficOpenData/CP_TR/CPDATA.xml";

function xmlRefreash() {
  xml = loadXML(url);
  print("XML updated");
  //print(xml);
}
function preload() {
  song[0] = loadSound("almost.mp3"); // almost full
  song[1] = loadSound("carFull.mp3"); // car park full

  xmlRefreash();
}

function setup() {
  lastTime = 0;
   xCoord2 = 0;
  yCoord2 = height / 2;

  createCanvas(800, 800);

  CarSelect = createSelect(); // dropdown menu options
  CarSelect.position(150, 250); // dropdown menu location
  CarSelect.option("Parnell", 0); // paranell
  CarSelect.option("Jervis", 2); // jervis
  CarSelect.option("Malbro", 4); // malbro
  CarSelect.option("abbey", 5); // abbey
  CarSelect.option("thomas street", 6); // thomas strt
  CarSelect.option("church street", 7); //church
  CarSelect.option("trinity", 10); //trinity
  CarSelect.option("dury", 12); //dury
  CarSelect.selected("Parnell", 0); // default selection
  
  // car parks open
  child = xml.getChildren("carpark");
  carparkName1 = child[0].getString("name"); //paranel
  carparkSpaces1 = child[0].getNum("spaces");
  carparkName2 = child[2].getString("name"); //jervis
  carparkSpaces2 = child[2].getNum("spaces");
  carparkName3 = child[4].getString("name"); //malbro
  carparkSpaces3 = child[4].getNum("spaces");
  carparkName4 = child[5].getString("name"); //abbey
  carparkSpaces4 = child[5].getNum("spaces");
  carparkName5 = child[6].getString("name"); //thomas street
  carparkSpaces5 = child[6].getNum("spaces");
  carparkName6 = child[7].getString("name"); //church street
  carparkSpaces6 = child[7].getNum("spaces");
  carparkName7 = child[10].getString("name"); //trinity
  carparkSpaces7 = child[10].getNum("spaces");
  carparkName8 = child[12].getString("name"); //dury
  carparkSpaces8 = child[12].getNum("spaces");
}

function draw() {
  background(155, 186, 189); 

  sel = CarSelect.value(); // select carpark
  


  print(child[sel].getNum("spaces")); // print car park and amount of spaces

  totalSec = int(millis() / 1000); //time reset for audio
  totalTime = totalSec % timeReset;

  textSize(25); 
  textStyle(BOLD);
  fill(235, 52, 52); 
  text("spaces available in Dublin City", width / 3, height / 4.5);

  textSize(18);
  textStyle(BOLD);
  fill(0, 0, 0); // black
  text("Pick a car park from the Dropdown Menu", width / 3, height / 3.6);

  move(); // for moving car
  display();
  fill(0, 0, 0); // black

  text("spaces available   " + child[sel].getNum("spaces"), 350, 260); // there are _ spaces available depending on option picked.

  //Clouds
  makeCloud(cloudx, cloudy); 
  makeCloud(cloudx + 200, cloudy);
  fill(220);
  noStroke();
  cloudx += 0.3; //speed of cloud

  //Road
  fill(50); // black
  rect(0, 660, 800, 150); // road for car
  
  //Sun
  fill(255, 255, 0); // yellow
  ellipse(50, 50, 60, 60); // top left hand
  
  
  // Spaces almost full
  if (child[sel].getNum("spaces") < 300 && child[sel].getNum("spaces") > 1) {
    // if theres less than 200 spaces in the selected car park

    fill(252, 169, 3);
    textSize(24);
    text("almost full", 305, 410);

    fill(252, 169, 3);
    let y = sin(counter) * 100 + height / 2;
    let x = cos(counter) * 100 + width / 2;

    ellipse(y,x, 20);
    ellipse(x,y,40)
  
    counter += 0.05;

    //song played when carpark almost full
    if (millis() - lastTime > 10000) {
      song[0].play(); // play song
      lastTime = millis();
    }
  } else if (child[sel].getNum("spaces") < 1) {
    // if there is less than 1 spaces in the selected car park
    
    // circle animation for when carpark full
    fill(252, 169, 3);
    let y = sin(counter) * 50 + height / 2;
    let x = cos(counter) * 50 + width / 2;

    ellipse(x, y, 20, 20);
    counter += 0.05;

    // car park full text
    fill(255, 20, 147); //pink
    textSize(24); 
    text("carpark full", 295, 310); // car park full
    //https://www.youtube.com/watch?v=jPsZwrV9ld0
    
    // car park full audio
    if (millis() - lastTime > 10000) {
      song[1].play(); // plays carpark full
      lastTime = millis();
    }
  }
  //moving car speed
  function move() {
    //speed of moving car
    x = x + speed;
    if (x > width) {
      x = 0;
    }
  }

  function display() {
    // car element

    fill(0, 0, 0); // black
    ellipse(x, y + 45, 40, 40); // wheel
    ellipse(x + 80, y + 46, 40, 40); // second wheel

    fill(255, 0, 0); 
    rect(x, y, 90, 40); 
  }

  function makeCloud(cloudx, cloudy) {
    fill(250);
    noStroke();
    ellipse(cloudx + 10, cloudy + 10, 70, 50);
    ellipse(cloudx - 20, cloudy + 10, 70, 50);
  }
}
