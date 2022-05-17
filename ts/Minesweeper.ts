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
            this.BombCount = 0;
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
        status = BlocksType.explosive;
        this.Status = status;
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

    public RevealField(Fields: Array<Field>[]) : void {
        let x: number = 0;
        let y: number = 0;
        for (let i = 0; i < Fields.length; i++) {
            x = 0;

            for (let j = 0; j < Fields[i].length; j++) {

                let text : string;
                if (Fields[i][j].Status == BlocksType.explosive){

                    text = Fields[i][j].Symbol;
                } else{

                    text = Fields[i][j].BombCount.toString();
                }
                this.context.font = '50px serif'
                this.context.fillText(text, x, y, 20);
                this.context.stroke();
                x =x+ 500;
            }
            y = y+ 500;
        }
    }
}

function Create2dArray(fieldCount: number, bombCount: number) : Field[][] {
    let Blocks:Field[][] = [];
    for (let i = 0; i < fieldCount; i++) {
        Blocks.push([]);

        for (let j = 0; j < fieldCount; j++) {

            let random: number = Math.floor(Math.random() * 10);
            if (random %2 != 0 && bombCount > 0){
                let field: Mine = new Mine(BlocksType.explosive);
                Blocks[i][j] = field;
                bombCount--;
            }
            else{
                let field: Field = new Field(BlocksType.hidden)
                Blocks[i][j] = field;
            }
        }
    }
    return Blocks;
}

function GiveBlocksNumbers(Fields: Field[][]) : Field[][]
{
    for (let i = 0; i < Fields.length; i++) {
        for (let j = 0; j < Fields[i].length; j++) {
            if(Fields[i][j].Status != BlocksType.explosive) {
                Fields[i][j] = CheckBombsAround(Fields, y, x);
            }
        }
    }

    return Fields;
}

function CheckBombsAround(Fields: Field[][], y:number, x:number): Field{
    let XCoordinate : number = x-1;
    let YCoordinate : number = y-1;

    let XMax : number = x+1;
    let YMax : number = y+1;

    if (XCoordinate < 0){
        XCoordinate = x;

    }
    if(YCoordinate < 0){
        YCoordinate = y;
    }
    if(XMax >= Fields[0].length) {
        XMax = x;
    }
    if(YMax >= Fields.length){
        YMax = y;
    }
    for (let i = YCoordinate; i < YMax; i++) {
        for (let j = XCoordinate; j < XMax; j++) {
            if(Fields[i][j].Status === BlocksType.explosive) {
                Fields[x][y].BombCount++;
                Fields[x][y].Status = BlocksType.detect;
            }
        }
    }
    return Fields[x][y];
}



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

let field: Field[][] = Create2dArray(10, 6);
field = GiveBlocksNumbers(field);
cringe.RevealField(field);