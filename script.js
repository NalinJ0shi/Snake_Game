//board variables
var blocksize = 25;
var rows= 20;
var cols = 20;
var board;
var context;
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');

/* apple and snake variables*/ 

//snake head
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;
//snake body
var snakebody = []
//apple
var applex;
var appley;
//speed
var speedx= 0;
var speedy= 0;
//game over
var gameover = false;
//score
let score = 0;
//when the page loads
window.onload = function(){
  board = document.getElementById('board');
  board.height = rows* blocksize;
  board.width = cols * blocksize;
  context = board.getContext("2d")//used for drawing on the board

  placeapple();
  document.addEventListener('keydown',changedirection);
  document.addEventListener('up',changedirection);
  setInterval(update, 1000/10);
}

function update(){
  if (gameover){
    return;
  }

  context.fillStyle='#333';
  context.fillRect(0,0,board.width,board.height);

  //apple
  context.fillStyle = '#d33131';
  context.fillRect(applex,appley, blocksize, blocksize);


  //snake
  context.fillStyle = '#31d341';
  snakeX +=speedx * blocksize;
  snakeY +=speedy * blocksize;
  context.fillRect(snakeX,snakeY, blocksize, blocksize);
  for (let i =0 ; i<snakebody.length;i++){
    context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
  }

  //snake consumes the apple
  if (snakeX ==applex && snakeY ==appley){
    foodsound.play();
    score+=10;
    scoretox.innerHTML ="score: " + score;
    snakebody.push([applex,appley])
    placeapple();
  }
  
  //snake grows
  for (let i = snakebody.length-1; i > 0;--i){
    snakebody[i]=snakebody[i-1];
  }
  if(snakebody.length){
    snakebody[0]=[snakeX,snakeY];
  }
  //game over conditions
  /*condition 1*/if (snakeX < 0|| snakeX> cols*blocksize||snakeY<0||snakeY >rows*blocksize){
    gameover=true;
    gameoversound.play();
    alert("Game over");
  }
  /*condition 2*/for(let i =0; i< snakebody.length;i++){
    if(snakeX == snakebody*[i][x] &&snakeY ==snakebody*[i][1]){
      gameover=true;
      gameoversound.play();
      alert("Game over");
    }
  }
  
}

function changedirection(event){
  movesound.play();
  if(event.code  == 'ArrowUp'/*snake will not eats its body*/ && speedy != 1){
    speedx=0;
    speedy=-1;
  }
  else if(event.code  == 'ArrowDown' && speedy!= -1){
    speedx=0;
    speedy=1;
  }
  else if(event.code  == 'ArrowRight' && speedx!= -1){
    speedx=1;
    speedy=0;
  }
  else if(event.code  == 'ArrowLeft' && speedx!= 1){
    speedx=-1;
    speedy=0;
  }
}
function up(){
  movesound.play();
  if(speedy!=1){
    speedx=0;
    speedy=-1;
  }
}
function down(){
  movesound.play();
  if(speedy!=-1){
    speedx=0;
    speedy=1;
  }
}
function right(event){
  movesound.play();
  if(speedx!=-1){
    speedx=1;
    speedy=0;
  }
}
function left(event){
  if(speedx!=1){
    speedx=-1;
    speedy=0;
  }
  movesound.play();
}

//random apple generator
function placeapple(){
  applex =Math.floor(Math.random()* cols) * blocksize;
  appley =Math.floor(Math.random()* rows) * blocksize;

}


  
