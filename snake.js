import { getInputDirection } from "./input.js";

export let snake_speed = 5;
const snakeBody = [{x: 11, y: 11}];
let newSegments = 0;
let score = 0;
const scoreEl = document.querySelector('#scoreEl');

//An attempt to adjust the speend of the program was made... I got stuck while adjusting the code and could not figure it out without erroring out
//const spd = document.getElementById('spdBtn');
// spd.addEventListener('click', () => {
//     console.log("Gotta Go FAST!")
    
//     });

// function spdUp() {
//     let snake_speed = 1++
// }

export function update () {
    addSegments()

    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
};

export function draw(gameBoard) {
    snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div')
      snakeElement.style.gridRowStart = segment.y
      snakeElement.style.gridColumnStart = segment.x
      snakeElement.classList.add('snake')
      gameBoard.appendChild(snakeElement)
    })
  };

export function expandSnake() {
    newSegments += 1
    score += 1
    scoreEl.innerHTML = score
    console.log(score)
    
};

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false
      return equalPositions(segment, position)
    })
};

export function getSnakeHead () {
    return snakeBody[0]
};

export function snakeIntersection () {
    return onSnake(snakeBody[0], { ignoreHead: true})
};

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
};

function addSegments () {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0
};