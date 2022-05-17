import tetris, { GAMESIZE } from "./tetris.js";
export class Renderer {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.style.visibility = "visible";
        this.canvas.focus();
    }
    render() {
        this.clearCanvas();
        this.renderGame();
    }
    renderGame() {
        for (let col = 0; col < GAMESIZE.width; col++) {
            for (let row = 0; row < GAMESIZE.height; row++) {
                this.context.beginPath();
                this.context.lineWidth = 15;
                this.context.fillStyle = tetris.game[col][row].color;
                this.context.fillRect(col * Renderer.SCALINGFACTOR, row * Renderer.SCALINGFACTOR, 49, 49);
                this.context.stroke();
            }
        }
        this.renderBlock(tetris.currentBlock);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, 666, 1000);
    }
    renderBlock(block) {
        for (let t of block.tiles) {
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(t.col * Renderer.SCALINGFACTOR, t.row * Renderer.SCALINGFACTOR, 49, 49);
            this.context.stroke();
        }
    }
}
Renderer.SCALINGFACTOR = 50;
//# sourceMappingURL=renderer.js.map