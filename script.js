const gameContainer = document.getElementById('gameContainer')
const gameBoard = document.getElementById('gameBoard')
const ctx = gameBoard.getContext('2d')
const scoreText = document.getElementById('scoreText')
const resetBtn = document.getElementById('resetBtn')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBackground = 'white';
const snakeColor = 'lightgreen';
const snakeBorder = 'black'
const foodColor = 'red'
const unitSize = 20;
let score = 0;
let running = false;
let xVelocity = unitSize
let yVelocity = 0
let foodX;
let foodY;

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
        }, 100)
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
    running = true  
    scoreText.textContent = score
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