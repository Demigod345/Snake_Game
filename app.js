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
canvas.width = 400;
canvas.height = 400;

document.addEventListener("keydown", changeDirection);

function moveSnake() {
  snakeSegments.unshift({ x: snakeX, y: snakeY });
  snakeX += directionX;
  snakeY += directionY;
  while (snakeSegments.length > snakeLength) {
    snakeSegments.pop();
  }
}

function drawSnake() {
  canvas2d.clearRect(0, 0, canvas.width, canvas.height);
  canvas2d.fillStyle = "black";
  for (let i = 0; i < snakeSegments.length; i++) {
    canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
  }
}

function changeDirection(event) {
  var key = event.key;
  if (key === "ArrowLeft" && directionX != 10) {
    directionX = -10;
    directionY = 0;
  }
  if (key === "ArrowUp" && directionY != 10) {
    directionX = 0;
    directionY = -10;
  }
  if (key === "ArrowRight" && directionX != -10) {
    directionX = 10;
    directionY = 0;
  }
  if (key === "ArrowDown" && directionY != -10) {
    directionX = 0;
    directionY = 10;
  }
}

function spawnDots() {
  if (dots.length < 1) {   
    var dotX = Math.floor((Math.random() * canvas.width) / 10) * 10;
    var dotY = Math.floor((Math.random() * canvas.height) / 10) * 10;
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
    if (snakeX == dots[i].x && snakeY == dots[i].y) {
      snakeLength++;
      dots.splice(i, 1);
    }
  }
  let score = snakeLength - 1;
  document.getElementById("score").innerHTML = "Score: " + score;
  for (var i = 0; i < snakeSegments.length; i++) {
    if (
      snakeSegments[i].x < -10 ||
      snakeSegments[i].y < -10 ||
      snakeSegments[i].x > canvas.width + 10 ||
      snakeSegments[i].y > canvas.height + 10
    ) {
      gameOver();
    }
  }
  for (var i = 1; i < snakeSegments.length; i++) {
    if (snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  alert("Game Over!");
  gameEnded = true;
  snakeSegments=[];
  snakeX = 0;
  snakeY = 0;
  directionX = 0;
  directionY = 0;
  location.reload();
}

function checkHighScore() {
  // Update high score if necessary
  if (snakeLength - 1 > highScore) {
    highScore = snakeLength - 1;
    localStorage.setItem("highScore", highScore);
  }
  // // Display high score in the game
  document.getElementById("highScore").innerHTML = "Highscore: " + highScore;
  // console.log(Math.max(highScore, snakeLength-1));
  console.log(localStorage.getItem("highScore"));
}

setInterval(() => {
  drawSnake();
  spawnDots();
  moveSnake();
  checkCollision();
  checkHighScore();
}, 100);
