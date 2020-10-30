canvas = document.getElementById("tetrisCanvas");
context = canvas.getContext('2d');

context.scale(40, 40);

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;

let isStarted = false;
let isPaused = false;

const arena = createMatrix(12, 20);

const greyScaleColors = [
    null,
    '#333333',
    '#4C4C4C',
    '#666666',
    '#7F7F7F',
    '#999999',
    '#B2B2B2',
    '#CCCCCC'
];
const colors = [
    null,
    '#fff100',
    '#a6a8ab',
    '#eb008b',
    '#652d90',
    '#00adee',
    '#8bc53f',
    '#ec1c24'
]

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

const player = {
    pos: {x: 6, y: 0},
    matrix: null,
    score: 0
}

function createPiece(type) {
    switch (type) {
        case 'T':
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ];
            break;

        case 'O':
            return [
                [2, 2],
                [2, 2]
            ];
            break;

        case 'L':
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3]
            ];
            break;

        case 'J':
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0]
            ];
            break;
            
        case 'I':
            return [
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0],
                [0, 5, 0, 0]
            ];
            break;

        case 'S':
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0]
            ];
            break;

        case 'Z':
            return [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0]
            ];
            break;
    }
}

clearCanvas();

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value != 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function clearCanvas() {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function playerDrop() {

    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerRotate(dir) {
    let offset = 1;
    
    rotate(player.matrix, dir);

    while(collide(arena, player)) {
        const pos = player.pos.x;
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function playerReset() {
    const pieces = 'ILJOTSZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 |0);

    if (collide(arena, player)) {
        gameReset();        
    }
 }

function gameReset() {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
}

function arenaSweep() {
    let rowCount = 1;

    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] == 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] != 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) != 0)  {
                return true;
            }
        }
    }
    return false;
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x]
            ] = [
                matrix[y][x],
                matrix[x][y]
            ]
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function draw() {
    clearCanvas();
    
    updateScore();

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function updateScore() {
    context.font = "1px Comic Sans Arial";
    context.textAlign = "left";
    context.fillStyle = "#ffffff";
    context.fillText("Score: " + player.score, 0.1, 0.9);
}

function update(time = 0) {
    if (isStarted == true) {
        clearCanvas
        if (isPaused == false) {
            const deltaTime = time - lastTime;
            lastTime = time;
            timeTest = time;

            dropCounter += deltaTime
            if (dropCounter > dropInterval) {
                playerDrop();
            }

            draw();
        } else {
            clearCanvas();

            context.font = "1px Comic Sans Arial";
            context.textAlign = "center";
            context.fillStyle = "#ffffff";
            context.fillText("Paused", canvas.width/2 / 40, 1);
        }
    }
    requestAnimationFrame(update);

}

let timeTest = 0;
let timeT = 0;
let timeFrame = 1000;
let pressCount = 0;

document.addEventListener('keydown', event => {
    if(isPaused == false) {
        switch(event.keyCode) {
            case 37:
                playerMove(-1);
                break;

            case 39:
                playerMove(1);
                break;

            case 40:
                playerDrop();
                break;

            case 69: 
                playerRotate(1);
                break;

            case 81:
                playerRotate(-1);
                break;

            case 82:
                playerReset();
                gameReset();
                break;
        }
    }
    switch(event.keyCode) {
        case 27:
            if (isStarted == true) {
                isPaused = !isPaused;
                console.log(isPaused);
            }
            break;

        case 13:
            if (isStarted == false) {
                isStarted = true;
                console.log(isStarted);
            }
            break;
    }
})

const pieces = 'ILJOTSZ';
player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);

clearCanvas();

context.font = "1px Comic Sans Arial";
context.textAlign = "center";
context.fillStyle = "#ffffff";
context.fillText("Tetris scuffed edition", canvas.width/2 / 40, 1);
context.fillText("Controls", canvas.width/2 / 40, 3);
context.fillText("Q and E to rotate", canvas.width/2 / 40, 4);
context.fillText("Arrow keys to move", canvas.width/2 / 40, 5);
context.fillText("Escape to pause/unpause", canvas.width/2 / 40, 6);
context.fillText("R to restart", canvas.width/2 / 40, 7);
context.fillText("Press Enter to start", canvas.width/2 / 40, 9);

update();