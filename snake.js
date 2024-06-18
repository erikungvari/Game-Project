document.getElementById('startButton').addEventListener('click', startGame);

let canvas, ctx;
let snake, food, gridSize, tileCount;
let velocity = { x: 0, y: 0 };
let gameLoop;

function startGame() {
    const mapSize = document.getElementById('mapSize').value;
    tileCount = mapSize;
    gridSize = canvas.width / tileCount;

    snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }];
    food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    velocity = { x: 0, y: 0 };

    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';

    document.addEventListener('keydown', keyDown);
    gameLoop = setInterval(drawGame, 100);
}

function keyDown(event) {
    switch (event.keyCode) {
        case 37:
            if (velocity.x === 0) velocity = { x: -1, y: 0 };
            break;
        case 38:
            if (velocity.y === 0) velocity = { x: 0, y: -1 };
            break;
        case 39:
            if (velocity.x === 0) velocity = { x: 1, y: 0 };
            break;
        case 40:
            if (velocity.y === 0) velocity = { x: 0, y: 1 };
            break;
        case 65:
            if (velocity.x === 0) velocity = { x: -1, y: 0 };
            break;
        case 87:
            if (velocity.y === 0) velocity = { x: 0, y: -1 };
            break;
        case 68:
            if (velocity.x === 0) velocity = { x: 1, y: 0 };
            break;
        case 83:
            if (velocity.y === 0) velocity = { x: 0, y: 1 };
            break;
    }
}

function drawGame() {
    updateSnake();
    if (checkGameOver()) {
        alert('Game Over!');
        clearInterval(gameLoop);
        document.location.reload();
    }
    drawCanvas();
}

function updateSnake() {
    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }

    snake.unshift(head);
}

function checkGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    });

    var img = new Image();
    img.src = "imgs/appel.jpg";
    ctx.drawImage(img, food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    const size = Math.min(window.innerWidth, window.innerHeight) - 200;
    canvas.width = size;
    canvas.height = size;
});
