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
        this.context.font ="42px 'Press Start 2P'";
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
            this.renderBlock(b);
        }
    }

    private renderBlock(block: Block): void{
        let squareSize: number = 40;
        for (let t of block.tiles){
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.strokeStyle = "white";
            this.context.fillRect(t.xPos, t.yPos, squareSize, squareSize);
            this.context.stroke();
        }
    }

    public addBlock(b: TetrisBlock): void{
        this.blockList.push(new Block(b));
    }
}

class Tile{
    constructor(public xPos: number, public yPos: number, public readonly b: BlockColor) {

    }
}

class Block{
    private static startpos = {xPos: 1000, yPos: 0};
    public tiles: Tile[] = [];
    constructor(private readonly block: TetrisBlock) {
        this.determineBlock(block);
    }

    private determineBlock(t: TetrisBlock): void{
        let color: BlockColor = BlockColor.Blue;
        switch(t) {
            case TetrisBlock.LBlock:
                this.tiles.push(new Tile(Block.startpos.xPos, Block.startpos.yPos, color));
                this.tiles.push(new Tile(Block.startpos.xPos + Direction.Down.xPos,Block.startpos.yPos + Direction.Down.yPos , color));
                this.tiles.push(new Tile(Block.startpos.xPos + 2 * Direction.Down.xPos,Block.startpos.yPos + 2 * Direction.Down.yPos , color));
                this.tiles.push(new Tile(Block.startpos.xPos + 2 * Direction.Down.xPos + Direction.Right.xPos,Block.startpos.yPos + 2 * Direction.Down.yPos + Direction.Right.yPos, color));
                break;
            case TetrisBlock.JBlock:

                break;
            case TetrisBlock.IBlock:

                break;
            case TetrisBlock.OBlock:

                break;
            case TetrisBlock.TBlock:

                break;
            case TetrisBlock.ZBlock:

                break;
            case TetrisBlock.SBlock:

                break;
            default:
                break;
        }
    }
}

enum BlockColor{
    Cyan = "#00ffff",
    Yellow = "#ffff00",
    Purple = "#800080",
    Green = "#00ff00",
    Red = "#ff0000",
    Blue = "#0000ff",
    Orange = "#ff7f00"
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

class Direction{
    public static readonly Right = {xPos: 42, yPos: 0};
    public static readonly Left = {xPos: -42, yPos: 0};
    public static readonly Up = {xPos: 0, yPos: -42};
    public static readonly Down = {xPos: 0, yPos: 42};
}
let t = new TetrisGame();
t.addBlock(TetrisBlock.LBlock)
t.start(0);