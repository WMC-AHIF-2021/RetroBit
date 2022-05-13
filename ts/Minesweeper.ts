enum BlocksType{
    hidden,
    detect,
    explosive,
    Flagged}

/*export type Block = {
    Status: BlocksType;
    bombCount: number;
    Bomb: Boolean;
}*/

class Field{
    Status: BlocksType;
    BombCount: number;
    Symbol: string;

    public constructor(status: BlocksType) {
        if(status != BlocksType.explosive){
            this.Status = status;
        }

        this.Symbol = this.getSymbol();
    }

    public getSymbol(): string {
        if (this.Status == BlocksType.explosive) {
            return '💣';
        } else if (this.Status == BlocksType.Flagged) {
            return '🏴';
        }
    }
}

class Mine extends Field{
    Status: BlocksType;
    constructor(status: BlocksType) {
        super(status);
        this.Symbol = this.getSymbol();
    }
}

class DrawBlocks {
    private canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");

    public drawRoster(x, y) {
        this.context.beginPath();
        this.context.rect(x, y, 50, 50);
        this.context.stroke();
    }

    public MakeBlocHidden(x, y) {
        this.context.fillStyle = "#888888";
        this.context.fillRect(x, y, 50, 50)
        this.context.stroke();
    }
}

class MinesweeperGame{
    private Blocks: Array<Field>[];
    public Create2dArray(fieldCount: number, bombCount: number) : Field[][] {

        for (let i = 0; i < fieldCount; i++) {
            this.Blocks[i] = new Array<Field>();
            for (let j = 0; j < fieldCount; j++) {
                let random: number = Math.floor(Math.random() * 10);
                if (random %2 != 0 && bombCount > 0){
                    this.Blocks[i][j] = new Mine(BlocksType.explosive);
                    bombCount--;
                }
                else{
                    this.Blocks[i][j] = new Field(BlocksType.hidden);
                }
            }
        }
        return this.Blocks;
    }
}

/*class Create2DArray {
    private things: BlocksType[][];
    this.things = [];

    for(let i: number = 0; i < 10; i++) {
        this.things[i] = [];
            for(let j: number = 0; j< 10; j++) {
                this.things[i][j] = new BlocksType();
            }
    }
}*/

let cringe = new DrawBlocks();
let x = 0;
let y = 0;
for (let d = 0; d < 10; d++) {
    for (let i = 0; i < 10; i++) {
        cringe.drawRoster(x, y);
        cringe.MakeBlocHidden(x, y);
        x = x + 50;
    }
    y = y + 50;
    x = 0; }