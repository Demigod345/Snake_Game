var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");
var gameEnded = false;
var snakeSegments = [];
var snakeLength = 1;
var snakeX = 0;
var snakeY = 0;
var directionX = 10;
var directionY = 0;
var dots = [];
var highScore = localStorage.getItem("highScore") || 0;
const WIDTH = 400;
const HEIGHT = 400;

class snake{
  constructor(x,y, dirx, diry, len, arr){
    this.snakeSegments= arr|| [];
    this.snakeX= x;
    this.snakeY= y;
    this.directionX= dirx;
    this.directionY= diry;
    this.snakeLength= len;
  }
}

const s= new snake( 0,0,10,0,1,[])
console.log(s.snakeLength);

document.addEventListener("keydown", changeDirection);

function moveSnake() {
  s.snakeSegments.unshift({ x: s.snakeX, y: s.snakeY });
  s.snakeX += s.directionX;
  s.snakeY += s.directionY;
  while (s.snakeSegments.length > s.snakeLength) {
    s.snakeSegments.pop();
  }
}

function drawSnake() {
  canvas2d.clearRect(0, 0, WIDTH, HEIGHT);
  canvas2d.fillStyle = "black";
  for (let i = 0; i < s.snakeSegments.length; i++) {
    canvas2d.fillRect(s.snakeSegments[i].x, s.snakeSegments[i].y, 10, 10);
  }
}

function changeDirection(event) {
  var key = event.key;
  if (key === "ArrowLeft" && s.directionX != 10) {
    s.directionX = -10;
    s.directionY = 0;
  }
  if (key === "ArrowUp" && s.directionY != 10) {
    s.directionX = 0;
    s.directionY = -10;
  }
  if (key === "ArrowRight" && s.directionX != -10) {
    s.directionX = 10;
    s.directionY = 0;
  }
  if (key === "ArrowDown" && s.directionY != -10) {
    s.directionX = 0;
    s.directionY = 10;
  }
}

function spawnDots() {
  if (dots.length < 1) {
    var dotX = Math.floor((Math.random() * WIDTH) / 10) * 10;
    var dotY = Math.floor((Math.random() * HEIGHT) / 10) * 10;
    dots.push({ x: dotX, y: dotY });
  }
  for (var i = 0; i < dots.length; i++) {
    canvas2d.fillStyle = "red";
    canvas2d.fillRect(dots[i].x, dots[i].y, 10, 10);
  }
}
for (var i = 0; i < dots.length; i++) {
  canvas2d.fillStyle = "red";
  canvas2d.fillRect(dots[i].x, dots[i].y, 10, 10);
}

function checkCollision() {
  for (var i = 0; i < dots.length; i++) {
    if (s.snakeX == dots[i].x && s.snakeY == dots[i].y) {
      s.snakeLength++;
      dots.splice(i, 1);
    }
  }
  let score = s.snakeLength - 1;
  document.getElementById("score").innerHTML = "Score: " + score;
  for (var i = 0; i < s.snakeSegments.length; i++) {
    if (
      s.snakeSegments[i].x < -10 ||
      s.snakeSegments[i].y < -10 ||
      s.snakeSegments[i].x > WIDTH  ||
      s.snakeSegments[i].y > HEIGHT 
    ) {
      gameOver();
    }
  }
  for (var i = 1; i < s.snakeSegments.length; i++) {
    if (s.snakeX === s.snakeSegments[i].x && s.snakeY === s.snakeSegments[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  alert("Game Over!");
  gameEnded = true;
  s.snakeSegments = [];
  s.snakeX = 0;
  s.snakeY = 0;
  s.directionX = 0;
  s.directionY = 0;
  location.reload();
}

function checkHighScore() {
  if (s.snakeLength - 1 > highScore) {
    highScore = s.snakeLength - 1;
    localStorage.setItem("highScore", highScore);
  }
  document.getElementById("highScore").innerHTML = "Highscore: " + highScore;
}

setInterval(() => {
  drawSnake();
  spawnDots();
  moveSnake();
  checkCollision();
  checkHighScore();
}, 100);