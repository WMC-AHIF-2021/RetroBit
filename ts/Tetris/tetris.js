import { Direction, IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, Tile, ZBlock } from "./blocks.js";
import { Renderer } from "./renderer.js";
export const GAMESIZE = { height: 20, width: 14 };
// Todo: Add Music
// Todo: Add Scoring System
let tetris;
class TetrisGame {
    constructor() {
        this.game = [];
        this.renderer = new Renderer();
        this.queue = [];
        this.intervals = [];
        this.initGameArray();
        this.addBlock();
        this.start();
    }
    start() {
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                    this.currentBlock.move(Direction.Left);
                    break;
                case "ArrowRight":
                    this.currentBlock.move(Direction.Right);
                    break;
                case "ArrowUp":
                    this.currentBlock.rotate();
                    break;
                case "ArrowDown":
                    this.currentBlock.move(Direction.Down);
                    break;
                case "Space":
                    while (this.currentBlock.isAbleToMove()) {
                        this.currentBlock.move(Direction.Down);
                    }
                    break;
            }
        });
        this.intervals.push(setInterval(() => {
            this.renderer.render();
        }, 1000 / 60));
        this.intervals.push(setInterval(() => {
            this.nextFrame();
        }, 500));
    }
    addBlock() {
        if (this.queue.length === 0) {
            this.queue.push(new TBlock());
            this.queue.push(new LBlock());
            this.queue.push(new JBlock());
            this.queue.push(new SBlock());
            this.queue.push(new ZBlock());
            this.queue.push(new OBlock());
            this.queue.push(new IBlock());
            for (let i = this.queue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
            }
        }
        this.currentBlock = this.queue.pop();
    }
    initGameArray() {
        for (let col = 0; col < GAMESIZE.width; col++) {
            this.game[col] = [];
            for (let row = 0; row < GAMESIZE.height; row++) {
                this.game[col].push(new Tile(row, col));
            }
        }
    }
    nextFrame() {
        let rowIntact = false;
        let lastRow = 0;
        for (let row = 0; row < GAMESIZE.height; row++) {
            for (let col = 0; col < GAMESIZE.width; col++) {
                lastRow = row;
                rowIntact = true;
                if (!this.game[col][row].containsBlock) {
                    rowIntact = false;
                    break;
                }
            }
            if (rowIntact)
                break;
            rowIntact = false;
        }
        if (rowIntact) {
            for (let row = lastRow; row > 0; row--) {
                for (let col = 0; col < GAMESIZE.width; col++) {
                    this.game[col][row].containsBlock = this.game[col][row - 1].containsBlock;
                    this.game[col][row].color = this.game[col][row - 1].color;
                }
            }
        }
        if (this.currentBlock.isAbleToMove()) {
            this.currentBlock.move(Direction.Down);
        }
        else {
            for (let t of this.currentBlock.tiles) {
                this.game[t.col][t.row].containsBlock = true;
                this.game[t.col][t.row].color = this.currentBlock.color;
            }
            if (this.game[6][1].containsBlock) {
                clearInterval(this.intervals.pop());
                clearInterval(this.intervals.pop());
                this.renderer.gameOver();
                return;
            }
            this.addBlock();
        }
    }
}
export default tetris = new TetrisGame();
//# sourceMappingURL=tetris.js.map