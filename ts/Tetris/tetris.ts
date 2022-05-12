let tetris: TetrisGame;
class TetrisGame{
    private renderer: Renderer = new Renderer();
    public game: Tile[][] = [];
    public currentBlock: Block;

    constructor() {
        this.initGameArray();
        this.addBlock();
        this.start();
    }

    public start(): void{
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft"){
                this.currentBlock.move("Left");
            }
            if (e.code === "ArrowRight"){
                this.currentBlock.move("Right");
            }
            if (e.code === "ArrowDown"){
                this.currentBlock.move("Down");
            }
        })
        this.startGameLoop();
    }

    public addBlock(): void{

    }

    private initGameArray(): void{
        for (let col = 0; col < 25; col++){
            this.game[col] = [];
            for (let row = 0; row < 25; row++){
                this.game[col].push(new Tile(row, col));
            }
        }
    }

    public nextFrame(): void{

    }

    private startGameLoop(): void {
        setInterval(() => {
            this.renderer.clearCanvas();
            this.renderer.render();
        }, 1000 / 60);
        setInterval(() => {
            this.nextFrame();
        }, 500);
    }
}


class Renderer{
    private static SCALINGFACTOR: number = 40;
    private canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");
    public constructor(){
        this.canvas.style.visibility = "visible";
        this.canvas.focus();
    }

    public render(): void{
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

    public clearCanvas(): void{
        this.context.clearRect(0, 0, 2000, 1000);
    }

    private renderGame(): void{
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

    private renderBlock(block: Block): void{
        for (let ti of block.tiles){
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(ti.row * Renderer.SCALINGFACTOR, ti.col * Renderer.SCALINGFACTOR, 40, 40);
            this.context.stroke();
        }
    }
}

class Tile{
    constructor(public row: number, public col: number) {

    }
}

enum BlockColor{
    Blue = "#0000ff",
    /*
    Cyan = "#00ffff",
    Yellow = "#ffff00",
    Purple = "#800080",
    Green = "#00ff00",
    Red = "#ff0000",
    Orange = "#ff7f00"
     */
}


class Direction{
    public static readonly Right = {xPos: 40, yPos: 0};
    public static readonly Left = {xPos: -40, yPos: 0};
    public static readonly Down = {xPos: 0, yPos: 40};
}

abstract class Block{
    protected static _startpos = {row: 0, col: 23};
    protected orientation: number = 0;
    protected isMoving: boolean = true;
    public color: BlockColor;
    public tiles: Tile[] = [];

    public move(dir: Direction): void{
        if (this.isMoving){
            switch(dir){
                case Direction.Down:
                    for (let t of this.tiles){
                        t.row++;
                    }
                    break;
                case Direction.Left:
                    for (let t of this.tiles){
                        t.col--;
                    }
                    break;
                case Direction.Right:
                    for (let t of this.tiles){
                        t.col++;
                    }
                    break;
            }
        }
    }

    public abstract rotate(): void;
}

class OBlock extends Block{
    constructor() {
        super();
        this.color = BlockColor.Blue;
    }

    rotate(): void {
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