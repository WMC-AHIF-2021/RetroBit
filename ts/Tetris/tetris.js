import { Direction, IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, Tile, ZBlock } from "./blocks.js";
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
                this.currentBlock.move(Direction.Left);
            }
            if (e.code === "ArrowRight") {
                this.currentBlock.move(Direction.Right);
            }
            if (e.code === "ArrowDown") {
                this.currentBlock.move(Direction.Down);
            }
            if (e.code === "ArrowUp") {
                this.currentBlock.rotate();
            }
        });
        this.startGameLoop();
    }
    addBlock() {
        switch (Math.floor(Math.random() * 7)) {
            case 0:
                this.currentBlock = new TBlock();
                break;
            case 1:
                this.currentBlock = new OBlock();
                break;
            case 2:
                this.currentBlock = new IBlock();
                break;
            case 3:
                this.currentBlock = new LBlock();
                break;
            case 4:
                this.currentBlock = new JBlock();
                break;
            case 5:
                this.currentBlock = new SBlock();
                break;
            case 6:
                this.currentBlock = new ZBlock();
                break;
        }
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
        if (this.currentBlock.isAbleToMove()) {
            this.currentBlock.move(Direction.Down);
        }
        else {
            for (let t of this.currentBlock.tiles) {
                this.game[t.col][t.row].containsBlock = true;
                this.game[t.col][t.row].color = this.currentBlock.color;
            }
            this.addBlock();
        }
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
    renderGame() {
        for (let col = 0; col < 25; col++) {
            for (let row = 0; row < 25; row++) {
                this.context.beginPath();
                this.context.lineWidth = 15;
                this.context.fillStyle = tetris.game[col][row].color;
                this.context.fillRect(col * Renderer.SCALINGFACTOR + 500, row * Renderer.SCALINGFACTOR, 40, 40);
                this.context.stroke();
            }
        }
        this.renderBlock(tetris.currentBlock);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, 2000, 1000);
    }
    renderBlock(block) {
        for (let t of block.tiles) {
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(t.col * Renderer.SCALINGFACTOR + 500, t.row * Renderer.SCALINGFACTOR, 40, 40);
            this.context.stroke();
        }
    }
}
Renderer.SCALINGFACTOR = 40;
export default tetris = new TetrisGame();
//# sourceMappingURL=tetris.js.map