import { Direction, IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, Tile, ZBlock } from "./blocks.js";
import { Renderer } from "./renderer.js";
import { InfoRenderer } from "./inforenderer.js";
export const GAMESIZE = { height: 20, width: 14 };
let tetris;
let inforenderer;
export class TetrisGame {
    constructor() {
        this.game = [];
        this.speed = 30;
        this.renderer = new Renderer();
        this.queue = [];
        this.score = 0;
        this.initGameArray();
        this.addBlock();
        this.start();
        inforenderer.renderCurrentScore(this.score);
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
                    while (this.currentBlock.isAbleToFall()) {
                        this.currentBlock.move(Direction.Down);
                    }
                    break;
            }
        });
        let counter = 0;
        this.interval = (setInterval(() => {
            this.renderer.render();
            counter++;
            if (counter === Math.floor(this.speed)) {
                this.nextFrame();
                counter = 0;
            }
        }, 1000 / 60));
    }
    addBlock() {
        this.speed = this.speed * 0.98;
        let lengthIsZero = () => {
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
        };
        lengthIsZero();
        this.currentBlock = this.queue.pop();
        lengthIsZero();
        inforenderer.renderNextBlock(this.queue[this.queue.length - 1]);
    }
    nextFrame() {
        let checkIntact = () => {
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
                return true;
            }
            return false;
        };
        let add = 0;
        for (let i = 0; i < 4; i++) {
            if (checkIntact()) {
                add += 100;
                this.score += add;
            }
        }
        inforenderer.renderCurrentScore(this.score);
        if (this.currentBlock.isAbleToFall()) {
            this.currentBlock.move(Direction.Down);
        }
        else {
            for (let t of this.currentBlock.tiles) {
                this.game[t.col][t.row].containsBlock = true;
                this.game[t.col][t.row].color = this.currentBlock.color;
            }
            if (this.game[6][2].containsBlock) {
                clearInterval(this.interval);
                this.renderer.gameOver();
                let d = new Date();
                let data = {
                    "name": TetrisGame.inputName,
                    "score": this.score,
                    "time": `${d.toLocaleDateString("en-GB")}`
                };
                $.ajax({
                    url: "http://45.85.219.167:5000/tetrisScores",
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                });
            }
            this.addBlock();
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
}
TetrisGame.inputName = "";
inforenderer = new InfoRenderer();
export default tetris = new TetrisGame();
document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
        history.back();
        return false;
    }
});
//# sourceMappingURL=tetris.js.map