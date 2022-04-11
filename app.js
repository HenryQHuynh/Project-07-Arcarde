import { update as updateSnake, draw as drawSnake, snake_speed, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');


const modul = document.querySelector('#modul');
const myBtn = document.getElementById('myBtn');
const scoreEl = document.querySelector('#scoreEl');
// const spd = document.getElementById('spdBtn');
// const slw = document.getElementById('slwBtn');
const modulR = document.querySelector('#modulR');
const rst = document.getElementById('rstBtn');

modulR.style.display = 'none'
console.log(scoreEl)

//Button to Start the game! Not super comfortable with "=>" functions yet,
//but an example was laid out similar and my lines of code work! Pretty exciting.
myBtn.addEventListener('click', () => {
  console.log("click!")
  main()
  window.requestAnimationFrame(main)
  modul.style.display = 'none'
});




//Starts the Game and gives it 'refresh' rate, Basic framework code. Game over check is also included!
function main(currentTime) {
    if (gameOver) {
      modulR.style.display = ''
      if (confirm('Darkness consumes your light! Press ok to rez.')) {
        window.location = '/'
      }
      return
    }


    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / snake_speed) return


    console.log('Render Time')
    lastRenderTime = currentTime

    update()
    draw()
};

//This was an attempt to create an internal reset function, but I had difficulty making it work with the rest of the code.
//Some suggestions on where to start or how to do so would be greatly appreciated

// rst.addEventListener('click', () => {
//   console.log("click reset!")
//   restartGame()
//   window.requestAnimationFrame(restartGame)
//   modulR.style.display = 'none'
//   });

// function restartGame(currentTime) {

//     if (gameOver) {
//       main()
//       modulR.style.display = 'none'
//     } else {
//       modulR.style.display = 'none'
//     }
//     window.requestAnimationFrame(restartGame)
//     const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
//     if (secondsSinceLastRender < 1 / snake_speed) return


//     console.log('Render Reset Time')
//     lastRenderTime = currentTime
    
//     update()
//     draw()
// };


// Holds all necessary update functions for the game, i.e. 'snake', 'food', and 'death'
function update() {
    updateSnake()
    updateFood()
    checkDeath()
};

// Holds all necessary draw functions for the game, i.e. 'snake' and 'food'
function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
};

// Ends game upon meeting the 'death' or failure critreria
function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
};