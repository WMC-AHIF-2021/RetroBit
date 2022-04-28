class TetrisGame{
    private blockList: Block[] = [];

    constructor() {
        document.getElementById("options_submitButton").addEventListener("click", () => {
            this.start(parseInt((<HTMLInputElement>document.getElementById("options_difficultySelect")).value))
        })
    }

    private canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");

    public start(difficulty: number): void{
        document.getElementById("options").style.visibility = "hidden";
        this.canvas.style.visibility = "visible";
        this.canvas.focus();
        this.render()
    }

    private render(): void{
        this.renderLeft();
        this.renderRight();
        this.renderGame();
    }

    private renderLeft(): void{
        this.context.beginPath();
        this.context.moveTo(500, 0);
        this.context.lineTo(500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 5;
        this.context.stroke();
        this.context.fillStyle = "white";
        this.context.font ="48px 'Press Start'";
        this.context.fillText("Highscores", 34,48);
    }

    private renderRight(): void{
        this.context.beginPath();
        this.context.moveTo(1500, 0);
        this.context.lineTo(1500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 5;
        this.context.stroke();
    }

    private renderGame(): void{
        this.renderBlocks();
    }

    private renderBlocks(): void{
        for(let b of this.blockList){
            this.renderTile(b);
        }
        this.drawSquare();
    }

    private renderTile(b: Block): void{
        this.drawSquare()
    }

    private drawSquare(): void{
        let upperLeftX: number = 500;
        let upperLeftY: number = 0;
        let canvasWith = 1000;
        let canvasHeight = 1000;
        let squareSize: number = 100;
        this.context.beginPath();
        this.context.lineWidth = 10;
        this.context.strokeStyle = "white";
        this.context.fillRect(upperLeftX + canvasWith / 2 - squareSize / 2, canvasHeight / 2 - squareSize / 2, squareSize, squareSize);
        this.context.stroke();
    }
}

class Tile{
    public left: Tile;
    public right: Tile;
    public top: Tile;
    public bottom: Tile;
}

enum TetrisBlock{
    LBlock,
    JBlock,
    IBlock,
    OBlock,
    TBlock,
    ZBlock,
    SBlock
}

class Block{
    private static STARTPOS: number[] = [750, 0];
    public yPos: number = Block.STARTPOS[1];
    public xPos: number = Block.STARTPOS[0];
    private mainTile: Tile = new Tile();
    constructor(private readonly block: TetrisBlock) {
        this.determineBlock(block);
    }

    private determineBlock(t: TetrisBlock): void{
        switch(t){
            case TetrisBlock.LBlock:
                this.mainTile.top = new Tile();
                this.mainTile.bottom = new Tile();
                this.mainTile.bottom.right = new Tile();
                break;
            case TetrisBlock.JBlock:
                this.mainTile.top = new Tile();
                this.mainTile.bottom = new Tile();
                this.mainTile.bottom.left = new Tile();
                break;
            case TetrisBlock.IBlock:
                this.mainTile.top = new Tile();
                this.mainTile.bottom = new Tile();
                break;
            case TetrisBlock.OBlock:
                this.mainTile.right = new Tile();
                this.mainTile.bottom = new Tile();
                this.mainTile.bottom.right = new Tile();
                break;
            case TetrisBlock.TBlock:
                this.mainTile.right = new Tile();
                this.mainTile.left = new Tile();
                this.mainTile.bottom = new Tile();
                this.mainTile.bottom.bottom = new Tile();
                break;
            case TetrisBlock.ZBlock:
                this.mainTile.left = new Tile();
                this.mainTile.bottom = new Tile();
                this.mainTile.bottom.right = new Tile();
                break;
            case TetrisBlock.SBlock:
                this.mainTile.right = new Tile();
                this.mainTile.bottom = new Tile();
                this.mainTile.bottom.left = new Tile();
                break;
            default:
                break;
        }
    }
}

let t = new TetrisGame();
t.start(0);