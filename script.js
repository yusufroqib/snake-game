const gameContainer = document.getElementById('gameContainer')
const gameBoard = document.getElementById('gameBoard')
const ctx = gameBoard.getContext('2d')
const scoreText = document.getElementById('scoreText')
const resetBtn = document.getElementById('resetBtn')
const arrowButtonUp = document.querySelector('.arrowButtonUp')
const arrowButtonLeft = document.querySelector('.arrowButtonLeft')
const arrowButtonRight = document.querySelector('.arrowButtonRight')
const arrowButtonDown = document.querySelector('.arrowButtonDown')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBackground = 'white';
const snakeColor = 'lightgreen';
const snakeBorder = 'black'
const foodColor = 'red'
const unitSize = 20;


arrowButtonUp.addEventListener('click', () => {
    const goingDown = (yVelocity == unitSize)
    if (!goingDown) {
        yVelocity = -unitSize
        xVelocity = 0
    }
})

arrowButtonLeft.addEventListener('click', () => {
    const goingRight = (xVelocity == unitSize);
    if (!goingRight) {
        xVelocity = -unitSize
        yVelocity = 0
    }
})

arrowButtonRight.addEventListener('click', () => {
    const goingLeft = (xVelocity == -unitSize)
    if (!goingLeft) {
        xVelocity = unitSize
        yVelocity = 0
    }
})

arrowButtonDown.addEventListener('click', () => {
    const goingUp = (yVelocity == -unitSize)
    if (!goingUp) {
        yVelocity = unitSize
        xVelocity = 0;
    }
})



let score = 0;
let running = false;
let xVelocity = unitSize
let yVelocity = 0
let foodX;
let foodY;
let difLevel;

let snake = [
    {x: unitSize*4, y: 0},
    {x: unitSize*3, y: 0},
    {x: unitSize*2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
]

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

gameStart()



function nextTick() {

    if (running) {
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, difLevel)
    } else{
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
    function randomFood(min, max){
        const randNumb = Math.round((Math.random() * (max-min) + min ) / unitSize) * unitSize
        return randNumb
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}



function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
}

function gameStart() {
    const selectElement = document.getElementById("mySelect");
    const selectedOptionValue = selectElement.value;
    
    switch (selectedOptionValue) {
        case "option1":
          // Code to perform when Option 1 is selected
          difLevel = 500
                break;
        case "option2":
          // Code to perform when Option 2 is selected
          difLevel = 400
          break;
        case "option3":
          // Code to perform when Option 3 is selected
          difLevel = 350
          break;
        case "option4":
          // Code to perform when Option 3 is selected
          difLevel = 200
          break;
        case "option5":
          // Code to perform when Option 3 is selected
          difLevel = 100
          break;
      }
    
    running = true  
    scoreText.textContent = score
    window.scrollTo(0, 0);
    createFood()
    drawFood()
    nextTick()
}



function moveSnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity}
    snake.unshift(head)

    //If food is eaten
    if (snake[0].x == foodX && snake[0].y  == foodY) {
        score += 1
        scoreText.textContent = score //Changes the content of the scoretext of our html (Just like innerHTML)
        createFood()
    }else{
        snake.pop()
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor
    ctx.strokeStyle = snakeBorder
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
}

function changeDirection(event) {
    
    const keyPressed = event.keyCode;
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
   

    const goingUp = (yVelocity == -unitSize)
    const goingDown = (yVelocity == unitSize)
    const goingLeft = (xVelocity == -unitSize)
    const goingRight = (xVelocity == unitSize)

    switch(true){
        case (keyPressed == LEFT && !goingRight): 
        xVelocity = -unitSize
        yVelocity = 0
        break;
        case (keyPressed == UP && !goingDown): 
        yVelocity = -unitSize
        xVelocity = 0
        break;
        case (keyPressed == RIGHT && !goingLeft): 
        xVelocity = unitSize
        yVelocity = 0
        break;
        case (keyPressed == DOWN && !goingUp): 
        yVelocity = unitSize
        xVelocity = 0;
       
        break;
    }
}


function checkGameOver() {
    switch(true) {
        case(snake[0].x < 0): 
        running = false
        break;
        case(snake[0].x >= gameWidth): 
        running = false
        case(snake[0].y < 0): 
        running = false
        break;
        case(snake[0].y >= gameHeight): 
        running = false
        break;
    }
    for (let i = 1; i < snake.length; i++) {
        if(snake[0].x === snake[i].x &&  snake[0].y === snake[i].y) {
            running = false
        }
    }
}

function displayGameOver() {
    ctx.font = '50px MV Boli'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText('GAME OVER', gameWidth/2, gameHeight/2)
}

function resetGame() {
    running = false;
    xVelocity = unitSize;
    yVelocity = 0;
    score = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 },
    ];
   
    gameStart();
}
