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
        this.renderLeft();
        this.renderRight();
        this.renderGame();
    }
    renderLeft() {
        this.context.beginPath();
        this.context.moveTo(750, 0);
        this.context.lineTo(750, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
        this.context.fillStyle = "white";
        this.context.font = "42px 'Press Start 2P'";
        this.context.fillText("Highscores", 34, 48);
    }
    renderRight() {
        this.context.beginPath();
        this.context.moveTo(1250, 0);
        this.context.lineTo(1250, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
    }
    renderGame() {
        for (let col = 0; col < GAMESIZE.width; col++) {
            for (let row = 0; row < GAMESIZE.height; row++) {
                this.context.beginPath();
                this.context.lineWidth = 15;
                this.context.fillStyle = tetris.game[col][row].color;
                this.context.fillRect(col * Renderer.SCALINGFACTOR + 750, row * Renderer.SCALINGFACTOR, 49, 49);
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
            this.context.fillRect(t.col * Renderer.SCALINGFACTOR + 750, t.row * Renderer.SCALINGFACTOR, 49, 49);
            this.context.stroke();
        }
    }
}
Renderer.SCALINGFACTOR = 50;
//# sourceMappingURL=renderer.js.map