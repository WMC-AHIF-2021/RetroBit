import { Direction, IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, Tile, ZBlock } from "./blocks.js";
import { Renderer } from "./renderer.js";
export const GAMESIZE = { height: 20, width: 10 };
// Todo: Fix Blocks Glitching Out When Turning On An Edge
// Todo: Add Gameover
// Todo: Add Music
// Todo: Add Scoring System
// Todo: Smooth Up Gameplay
// Todo: Split up canvas for better mobile experience
let tetris;
class TetrisGame {
    constructor() {
        this.game = [];
        this.renderer = new Renderer();
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
        setInterval(() => {
            this.renderer.render();
        }, 1000 / 60);
        setInterval(() => {
            this.nextFrame();
        }, 500);
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
            this.addBlock();
        }
    }
}
export default tetris = new TetrisGame();
//# sourceMappingURL=tetris.js.map