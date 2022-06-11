import tetris, {GAMESIZE, TetrisGame} from "./tetris.js";
import {Block} from "./blocks.js";
import Tetris from "./tetris.js";

export class Renderer {
    private static SCALINGFACTOR: number = 50;
    private canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    private context: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    public constructor() {
        this.canvas.focus();
    }

    public render(): void {
        this.clearCanvas();
        this.renderGame();
    }

    public gameOver(): void {
        this.clearCanvas();
        this.context.fillStyle = "white";
        this.context.font = "98px 'Press Start 2P'";
        this.context.fillText("Game", 11, 300);
        this.context.fillText("Over", 11, 400);
        this.context.fillText("Press", 11, 500);
        this.context.fillText("Enter", 11, 600);
        this.context.fillText("To", 11, 700);
        this.context.fillText("Restart", 11, 800);
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.code === "Enter"){
                if (TetrisGame.checkUserName()){
                    location.reload();
                }
                alert("Please enter a valid Username");
            }
        });
    }

    private renderGame(): void {
        for (let col = 0; col < GAMESIZE.width; col++) {
            for (let row = 0; row < GAMESIZE.height; row++) {
                this.context.beginPath();
                this.context.lineWidth = 15;
                this.context.fillStyle = tetris.game[col][row].color;
                this.context.fillRect(col * Renderer.SCALINGFACTOR, row * Renderer.SCALINGFACTOR, 49, 49);
                this.context.stroke();
            }
        }
        this.context.beginPath();
        this.context.fillStyle = "white";
        this.context.fillRect(0, 1000, 1000, 700);
        this.context.stroke();
        this.renderBlock(tetris.currentBlock);
    }

    private clearCanvas(): void {
        this.context.clearRect(0, 0, 700, 1000);
    }

    private renderBlock(block: Block): void {
        for (let t of block.tiles) {
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(t.col * Renderer.SCALINGFACTOR, t.row * Renderer.SCALINGFACTOR, 49, 49);
            this.context.stroke();
        }
    }
}