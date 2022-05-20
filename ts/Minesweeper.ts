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
            this.Revealed = true;
        } else {
            this.Revealed = false;
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

    // private click = this.canvas.addEventListener("click", this.getMousePos(canvas, ));
    //
    //
    //
    // private pos = canvas.getBoundingClientRect();

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

    private getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
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
}

function Create2dArray(fieldCount: number, bombCount: number): Field[][] {
    let Blocks: Field[][] = [];
    for (let i = 0; i < fieldCount; i++) {
        Blocks.push([]);

        for (let j = 0; j < fieldCount; j++) {
            Blocks[i][j] = new Field(BlocksType.hidden);
        }
    }

    while (bombCount > 0) {
        let randomX: number = Math.floor(Math.random() * 10);
        let randomY: number = Math.floor(Math.random() * 10);

        if (Blocks[randomY][randomX].Status === BlocksType.hidden) {
            Blocks[randomY][randomX] = new Mine(BlocksType.explosive);
            bombCount = bombCount - 1;
        }
    }
    return Blocks;
}

function GiveBlocksNumbers(): void {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j].Status != BlocksType.explosive) {
                CheckBombsAround(i, j);
            }
        }
    }

}

function CheckBombsAround(y: number, x: number): void {
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

function allFieldRevealed(): boolean
{
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field.length; j++) {
            if (field[i][j].Revealed === false) {
                return false;
            }
        }etw. aufdecken
    }
    return true;
}

let cringe = new DrawBlocks();

function cellClick(){
    const button = document.getElementById('myCanvas');
    // button?.addEventListener("click", fieldClicked);

}

let x = 0;
let y = 0;
for (let d = 0; d < 10; d++) {
    for (let i = 0; i < 10; i++) {
        cringe.drawRoster(x, y);
        cringe.MakeBlocHidden(x, y);
        x = x + 50;
    }
    y = y + 50;
    x = 0;
}

document.getElementById("myCanvas").addEventListener("click", (e) => {

    const gamestate = document.getElementById("gameState") as HTMLHeadElement;
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
    if (field[y][x].Status === BlocksType.explosive) {

        text = field[y][x].Symbol;
        cringe.RevealField(field);
        gamestate.innerText = "You loose!"
    } else {
        field[y][x].Revealed = true;
        context.fillStyle= "#000000";
        if (field[y][x].BombCount != 0) {
            text = field[y][x].BombCount.toString();
        } else {
            text = "";
            context.fillStyle = "#aba3a3";
            context.fillRect(x*50+1, y*50+1, 48, 48);
        }
    }
    context.font = '50px serif'
    console.log(x*50);
    console.log(y*50);
    context.fillText(text, (x*50) + 5, (y*50) + 40, 50);
    context.stroke();
})

field = Create2dArray(10, 10);
GiveBlocksNumbers();

cellClick();