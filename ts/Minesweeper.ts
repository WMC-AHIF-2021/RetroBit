enum BlocksType {
    hidden,
    detect,
    explosive,
    Flagged
}

class Field {
    Status: BlocksType;
    BombCount: number;
    Symbol: string;
    Revealed: boolean;

    public constructor(status: BlocksType) {
        if (status != BlocksType.explosive) {
            this.Status = status;
            this.BombCount = 0;
            this.Revealed = false;
        } else {
            this.Revealed = true;
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

let field: Field[][];
let allowClick: boolean = true;

class Mine extends Field {
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

    MakeBlocFlagged(x, y){
        this.context.fillStyle = "#0000ff";
        this.context.fillRect(x*50+1, y*50+1, 48, 48);
        this.context.stroke();
    }

    public RevealField(Fields: Array<Field>[]): void {
        let x: number = 0;
        let y: number = 0;
        for (let i = 0; i < Fields.length; i++) {
            x = 0;

            for (let j = 0; j < Fields.length; j++) {

                let text: string;
                if (Fields[i][j].Status === BlocksType.explosive) {

                    text = Fields[i][j].Symbol;

                } else {
                    this.context.fillStyle = '#000000';
                    if (Fields[i][j].BombCount != 0) {
                        text = Fields[i][j].BombCount.toString();
                    } else {
                        text = "";
                    }
                }
                this.context.font = '50px serif'

                this.context.fillText(text, x + 5, y + 40, 50);
                this.context.stroke();
                x = x + 50;
            }
            y = y + 50;
        }
    }

    public Create2dArray(fieldCount: number, bombCount: number): Field[][] {
        let Blocks: Field[][] = [];
        for (let i = 0; i < fieldCount; i++) {
            Blocks.push([]);

            for (let j = 0; j < fieldCount; j++) {
                Blocks[i][j] = new Field(BlocksType.hidden);
            }
        }

        while (bombCount > 0) {
            let rand: boolean = Math.random() > 0.4;
            if(rand == true){
                let randomX: number = Math.floor(Math.random() * 10);
                let randomY: number = Math.floor(Math.random() * 10);

                if (Blocks[randomY][randomX].Status === BlocksType.hidden) {
                    Blocks[randomY][randomX] = new Mine(BlocksType.explosive);
                    bombCount = bombCount - 1;
                }
            }

        }
        return Blocks;
    }

   public GiveBlocksNumbers(): void {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j].Status != BlocksType.explosive) {
                    this.CheckBombsAround(i, j);
                }
            }
        }
    }

    private CheckBombsAround(y: number, x: number): void {
        let XCoordinate: number = x - 1;
        let YCoordinate: number = y - 1;

        let XMax: number = x + 1;
        let YMax: number = y + 1;

        if (XCoordinate < 0) {
            XCoordinate = x;

        }
        if (YCoordinate < 0) {
            YCoordinate = y;
        }
        if (XMax >= field.length) {
            XMax = x;
        }
        if (YMax >= field.length) {
            YMax = y;
        }
        for (let i = YCoordinate; i <= YMax; i++) {
            for (let j = XCoordinate; j <= XMax; j++) {
                if (field[i][j].Status == BlocksType.explosive) {
                    field[y][x].BombCount++;
                    field[y][x].Status = BlocksType.detect;
                }
            }
        }
    }

    public AllFieldRevealed(): boolean
    {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field.length; j++) {
                if (field[i][j].Revealed === false) {
                    return false;
                }
            }
        }
        return true;
    }
}

let renderer = new DrawBlocks();

let x = 0;
let y = 0;
for (let d = 0; d < 10; d++) {
    for (let i = 0; i < 10; i++) {
        renderer.drawRoster(x, y);
        renderer.MakeBlocHidden(x, y);
        x = x + 50;
    }
    y = y + 50;
    x = 0;
}

field = renderer.Create2dArray(10, 10);
renderer.GiveBlocksNumbers();

function findEmptyFields(x:number, y:number, context: CanvasRenderingContext2D) : void{
    let XCoordinate: number = x - 1;
    let YCoordinate: number = y - 1;

    let XMax: number = x + 1;
    let YMax: number = y + 1;

    if (XCoordinate < 0) {
        XCoordinate = x;
    }
    if (YCoordinate < 0) {
        YCoordinate = y;
    }
    if (XMax >= field.length) {
        XMax = x;
    }
    if (YMax >= field.length) {
        YMax = y;
    }
    for (let i = YCoordinate; i <= YMax; i++) {
        for (let j = XCoordinate; j <= XMax; j++) {
            if (field[i][j].BombCount == 0 && !field[i][j].Revealed){
                field[i][j].Revealed = true;
                context.fillRect(j*50+1, i*50+1, 48, 48);
                findEmptyFields(j,i,context);
            }
        }
    }
}

function writeOnBlock(x:number, y:number, context: CanvasRenderingContext2D, text: string):void{
    context.font = '50px serif'
    context.fillText(text, (x*50) + 5, (y*50) + 40, 50);
    context.stroke();
}

document.getElementById("myCanvas").addEventListener("mousedown", (e) => {

    if (!allowClick) {
        return
    }

    const gameState = document.getElementById("gameState") as HTMLHeadElement;
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    const canvasPos = canvas.getBoundingClientRect();


    console.log(e.clientX, e.clientY);

    console.log(canvasPos.top, canvasPos.right, canvasPos.bottom, canvasPos.left);

    let x = e.clientX - Math.round(canvasPos.left);
    let y = e.clientY - Math.round(canvasPos.top);
    console.log(x, y);

    x = Math.floor(x/50);
    y = Math.floor(y/50);
    console.log(x, y);

    let text: string;
    //right click
    if(e.button === 2){
        field[y][x] = new Field(BlocksType.Flagged);
        renderer.MakeBlocFlagged(x, y);
        field[y][x].Revealed = true;
        text = field[y][x].Symbol;
    }
    else if(field[y][x].Status !== BlocksType.Flagged){
        if (field[y][x].Status === BlocksType.explosive) {

            text = field[y][x].Symbol;
            renderer.RevealField(field);
            allowClick = false;
            gameState.innerText = "You loose!";
        }
        else {
            field[y][x].Revealed = true;
            context.fillStyle= "#000000";
            if (field[y][x].BombCount != 0) {
                text = field[y][x].BombCount.toString();
            } else {
                text = "";
                context.fillStyle = "#aba3a3";
                findEmptyFields(x, y, context);
                context.fillRect(x*50+1, y*50+1, 48, 48);
            }
        }
    }

    if(text != undefined){
        writeOnBlock(x, y, context, text);
    }


    let gameFinished = renderer.AllFieldRevealed();
    if (gameFinished === true)
    {
        allowClick = false;
        renderer.RevealField(field);
        gameState.innerText = "You loose!"
    }
})





