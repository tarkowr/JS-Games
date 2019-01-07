//
// Declare game variables
//
let increment = 10;
let posX=0, posY=0, score=0;

const keys = Object.freeze({"LEFT":37, "UP":38, "RIGHT":39, "DOWN":40});
const upperBound = 500, lowerBound = 0, leftBound = 75, rightBound = 900;

//
// Setup game
//
let elem = document.getElementById("lebron"); //Lebron picture

SetElementPos(elem, leftBound, lowerBound); //Starting position

posX = elem.x;
posY = elem.y;

let champ = document.getElementById("championship"); //Championship picture

SetElementPos(champ, GetRandomXCoordinate(champ), GetRandomYCoordinate(champ)); //Starting position

let count = document.getElementById("count"); //Player score

count.innerHTML = score;

//
// Listen for keypress
//
document.addEventListener("keydown", KeyHandler, false);

//
// Handle key pressed
//
function KeyHandler(e){
  let keyCode = e.keyCode;

  switch(keyCode){
    case keys.LEFT:
      if (GetElLeftPos(elem) > leftBound) {
        SetElementPos(elem, posX-=increment, posY);
      } 
      break;
    case keys.UP: 
      if(GetElTopPos(elem) > lowerBound) {
        SetElementPos(elem, posX, posY-=increment);
      }
      break;
    case keys.RIGHT:
      if (GetElRightPos(elem) < rightBound) {
        SetElementPos(elem, posX+=increment, posY);
      }
      break;
    case keys.DOWN:
      if (GetElBottomPos(elem) < upperBound) {
        SetElementPos(elem, posX, posY+=increment);
      }
      break;
    default:
      break;
  }

  CheckForCollision();
}

//
// Set the position of an element
//
function SetElementPos(el, x, y){
  el.style.top = y + 'px';
  el.style.left = x + 'px';
}

//
// Generate random X coordinate
//
function GetRandomXCoordinate(el){
  return Math.floor(Math.random() * (rightBound - leftBound - el.width) + leftBound);
}

//
// Generate random y coordinate
//
function GetRandomYCoordinate(el){
  return Math.floor(Math.random() * (upperBound - lowerBound - el.height) + lowerBound);
}

//
// Check if two elements collide
//
function isCollide(a, b) {
  return !(
      ((a.y + a.height) < (b.y)) ||
      (a.y > (b.y + b.height)) ||
      ((a.x + a.width) < b.x) ||
      (a.x > (b.x + b.width))
  );
}

//
// Check for collision and handle a collision
//
function CheckForCollision(){
  if(isCollide(elem, champ)){
    score++;
    count.innerHTML = score;
    CheckForNewHighScore(Scores.Nba, score);
    
    while(isCollide(elem, champ)){
      SetElementPos(champ, GetRandomXCoordinate(champ), GetRandomYCoordinate(champ));
    }
  }
}

function GetElLeftPos(el){
  return el.x;
}

function GetElRightPos(el){
  return el.x;
}

function GetElTopPos(el){
  return el.y;
}

function GetElBottomPos(el){
  return el.y + el.height;
}