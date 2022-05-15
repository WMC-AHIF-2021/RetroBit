import tetris from "./tetris.js";
import {Block} from "./blocks.js";

export class Renderer{
    private static SCALINGFACTOR: number = 40;
    private canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");
    public constructor(){
        this.canvas.style.visibility = "visible";
        this.canvas.focus();
    }

    public render(): void{
        this.clearCanvas();
        this.renderLeft();
        this.renderRight();
        this.renderGame();
    }

    private renderLeft(): void{
        this.context.beginPath();
        this.context.moveTo(500, 0);
        this.context.lineTo(500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
        this.context.fillStyle = "white";
        this.context.font = "42px 'Press Start 2P'";
        this.context.fillText("Highscores", 34,48);
    }

    private renderRight(): void{
        this.context.beginPath();
        this.context.moveTo(1500, 0);
        this.context.lineTo(1500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
    }

    private renderGame(): void{
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

    private clearCanvas(): void{
        this.context.clearRect(0, 0, 2000, 1000);
    }

    private renderBlock(block: Block): void{
        for (let t of block.tiles){
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(t.col * Renderer.SCALINGFACTOR + 500,t.row * Renderer.SCALINGFACTOR,40, 40);
            this.context.stroke();
        }
    }
}