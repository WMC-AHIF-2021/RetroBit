let t: TetrisGame;
class TetrisGame{
    public blockList: Block[] = [];
    public static speed: number = 500;
    private renderer: Renderer = new Renderer();

    constructor() {
        this.addBlock();
        this.start();
    }

    public start(): void{
        document.getElementById("options").style.visibility = "hidden";
        document.addEventListener("keydown", (e) => {
            for(let b of this.blockList){
                if (e.code === "ArrowLeft"){
                    b.moveDirection("Left");
                }
                if (e.code === "ArrowRight"){
                    b.moveDirection("Right");
                }
                if (e.code === "ArrowDown"){
                    b.moveDirection("Down");
                }
            }
        })
    }

    public addBlock(): void{
        this.blockList.push(new Block(TetrisBlock.LBlock));
    }
}

class Renderer{
    private canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");
    public constructor(){
        this.canvas.style.visibility = "visible";
        this.canvas.focus();
        this.startGameLoop();
    }

    private startGameLoop(): void {
        setInterval(() => {
            this.clearCanvas();
            this.render();
        }, 1000 / 60);
        setInterval(() => {
            for (let b of t.blockList){
                b.nextFrame();
            }
        }, TetrisGame.speed);
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

    private clearCanvas(): void{
        this.context.clearRect(0, 0, 2000, 1000);
    }

    private renderGame(): void{
        for(let b of t.blockList){
            this.renderBlock(b);
        }
    }

    private renderBlock(block: Block): void{
        let squareSize: number = 39;
        for (let t of block.tiles){
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(t.xPos, t.yPos, squareSize, squareSize);
            this.context.stroke();
        }
    }
}

class Tile{
    public isFalling: boolean;
    constructor(public xPos: number, public yPos: number) {
        this.isFalling = true;
    }
}

class Block{
    private static startpos = {xPos: 1000, yPos: 0};
    public color: BlockColor = BlockColor.Blue;
    public tiles: Tile[] = [];
    constructor(private readonly block: TetrisBlock) {
        this.determineBlock(block);
    }

    private determineBlock(t: TetrisBlock): void{
        const pushNewTile = (xPos: number, yPos: number) => this.tiles.push(new Tile(xPos, yPos));
        const startX: number = Block.startpos.xPos;
        const startY: number = Block.startpos.yPos;
        const downX: number = Direction.Down.xPos;
        const downY: number = Direction.Down.yPos;
        const rightX: number = Direction.Right.xPos;
        const rightY: number = Direction.Right.yPos;
        const leftX: number = Direction.Left.xPos;
        const leftY: number = Direction.Left.yPos;
        pushNewTile(startX, startY);
        switch(t) {
            case TetrisBlock.LBlock:
                this.color = BlockColor.Blue;
                pushNewTile(startX + downX,startY + downY);
                pushNewTile(startX + 2 * downX,startY + 2 * downY);
                pushNewTile(startX + 2 * downX + rightX,startY + 2 * downY + rightY);
                break;
            case TetrisBlock.JBlock:
                this.color = BlockColor.Red;
                pushNewTile(startX + downX,startY + downY);
                pushNewTile(startX + 2 * downX,startY + 2 * downY);
                pushNewTile(startX + 2 * downX + leftX,startY + 2 * downY + leftY);
                break;
            case TetrisBlock.IBlock:
                this.color = BlockColor.Cyan;
                pushNewTile(startX + downX,startY + downY);
                pushNewTile(startX + 2 * downX,startY + 2 * downY);
                break;
            case TetrisBlock.OBlock:
                this.color = BlockColor.Green;
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + rightX, startY + rightY);
                pushNewTile(startX + downX + rightX, startY + downY + rightY);
                break;
            case TetrisBlock.TBlock:
                this.color = BlockColor.Orange;
                pushNewTile(startX + rightX,startY + rightY);
                pushNewTile(startX + leftX,startY + leftY);
                pushNewTile(startX + downX,startY + downY);
                break;
            case TetrisBlock.ZBlock:
                this.color = BlockColor.Purple;
                pushNewTile(startX + leftX, startY + leftY);
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + downX + rightX, startY + downY + rightY);
                break;
            case TetrisBlock.SBlock:
                this.color = BlockColor.Yellow;
                pushNewTile(startX + rightX, startY + rightY);
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + downX + leftX, startY + downY + leftY);
                break;
            default:
                break;
        }
    }

    public isAbleToMoveDown(): boolean{
        for(let f of this.tiles){
            if (this.getLowestPoint() > 1000 - 42){
                t.addBlock();
                return false;
            }
        }
        return true;
    }

    public nextFrame(): void{
        if (this.isAbleToMoveDown()) {
            for (let t of this.tiles) {
                t.yPos += Direction.Down.yPos;
                t.xPos += Direction.Down.xPos;
            }
        }
    }

    public moveDirection(d: String): void{
        let stopRight: boolean = false;
        let stopLeft: boolean = false;
        for(let t of this.tiles) {
            if (t.xPos < 500 + 39){
                stopLeft = true;
                break;
            }
            if (t.xPos > 1500 - 78){
                stopRight = true;
                break;
            }
        }
        if (this.isAbleToMoveDown()) {
            for (let t of this.tiles) {
                switch (d) {
                    case "Left":
                        if (!stopLeft) {
                            t.xPos += Direction.Left.xPos;
                            t.yPos += Direction.Left.yPos;
                        }
                        break;
                    case "Right":
                        if (!stopRight) {
                            t.xPos += Direction.Right.xPos;
                            t.yPos += Direction.Right.yPos;
                        }
                        break;
                    case "Down":
                        t.xPos += Direction.Down.xPos;
                        t.yPos += Direction.Down.yPos;
                        break;
                    default:
                        break;
                }
            }
        }
    }

    private getLowestPoint(): number{
        let highestY: number = 0;
        for(let i of this.tiles){
            if (i.yPos > highestY){
                highestY = i.yPos;
            }
        }
        return  highestY;
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
    public static readonly Right = {xPos: 40, yPos: 0};
    public static readonly Left = {xPos: -40, yPos: 0};
    public static readonly Down = {xPos: 0, yPos: 40};
}

t = new TetrisGame();