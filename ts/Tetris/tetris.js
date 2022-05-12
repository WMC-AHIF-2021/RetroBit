let tetris;
class TetrisGame {
    constructor() {
        this.renderer = new Renderer();
        this.game = [];
        this.initGameArray();
        this.addBlock();
        this.start();
    }
    start() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft") {
                this.currentBlock.move("Left");
            }
            if (e.code === "ArrowRight") {
                this.currentBlock.move("Right");
            }
            if (e.code === "ArrowDown") {
                this.currentBlock.move("Down");
            }
        });
        this.startGameLoop();
    }
    addBlock() {
    }
    initGameArray() {
        for (let col = 0; col < 25; col++) {
            this.game[col] = [];
            for (let row = 0; row < 25; row++) {
                this.game[col].push(new Tile(row, col));
            }
        }
    }
    nextFrame() {
    }
    startGameLoop() {
        setInterval(() => {
            this.renderer.clearCanvas();
            this.renderer.render();
        }, 1000 / 60);
        setInterval(() => {
            this.nextFrame();
        }, 500);
    }
}
class Renderer {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.style.visibility = "visible";
        this.canvas.focus();
    }
    render() {
        this.renderLeft();
        this.renderRight();
        this.renderGame();
    }
    renderLeft() {
        this.context.beginPath();
        this.context.moveTo(500, 0);
        this.context.lineTo(500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
        this.context.fillStyle = "white";
        this.context.font = "42px 'Press Start 2P'";
        this.context.fillText("Highscores", 34, 48);
    }
    renderRight() {
        this.context.beginPath();
        this.context.moveTo(1500, 0);
        this.context.lineTo(1500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
    }
    clearCanvas() {
        this.context.clearRect(0, 0, 2000, 1000);
    }
    renderGame() {
        for (let col = 0; col < 25; col++) {
            for (let row = 0; row < 25; row++) {
                this.context.beginPath();
                this.context.lineWidth = 15;
                this.context.fillStyle = "black";
                this.context.fillRect(col * Renderer.SCALINGFACTOR + 500, row * Renderer.SCALINGFACTOR, 40, 40);
                this.context.stroke();
            }
        }
        this.renderBlock(tetris.currentBlock);
    }
    renderBlock(block) {
        for (let ti of block.tiles) {
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(ti.row * Renderer.SCALINGFACTOR, ti.col * Renderer.SCALINGFACTOR, 40, 40);
            this.context.stroke();
        }
    }
}
Renderer.SCALINGFACTOR = 40;
class Tile {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}
var BlockColor;
(function (BlockColor) {
    BlockColor["Blue"] = "#0000ff";
    /*
    Cyan = "#00ffff",
    Yellow = "#ffff00",
    Purple = "#800080",
    Green = "#00ff00",
    Red = "#ff0000",
    Orange = "#ff7f00"
     */
})(BlockColor || (BlockColor = {}));
class Direction {
}
Direction.Right = { xPos: 40, yPos: 0 };
Direction.Left = { xPos: -40, yPos: 0 };
Direction.Down = { xPos: 0, yPos: 40 };
class Block {
    constructor() {
        this.orientation = 0;
        this.isMoving = true;
        this.tiles = [];
    }
    move(dir) {
        if (this.isMoving) {
            switch (dir) {
                case Direction.Down:
                    for (let t of this.tiles) {
                        t.row++;
                    }
                    break;
                case Direction.Left:
                    for (let t of this.tiles) {
                        t.col--;
                    }
                    break;
                case Direction.Right:
                    for (let t of this.tiles) {
                        t.col++;
                    }
                    break;
            }
        }
    }
}
Block._startpos = { row: 0, col: 23 };
class OBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Blue;
    }
    rotate() {
        switch (this.orientation) {
            case 0:
                break;
            case 90:
                break;
            case 180:
                break;
            case 270:
                break;
        }
    }
}
tetris = new TetrisGame();
//# sourceMappingURL=tetris.js.map