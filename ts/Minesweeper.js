var BlocksType;
(function (BlocksType) {
    BlocksType[BlocksType["hidden"] = 0] = "hidden";
    BlocksType[BlocksType["detect"] = 1] = "detect";
    BlocksType[BlocksType["explosive"] = 2] = "explosive";
    BlocksType[BlocksType["Flagged"] = 3] = "Flagged";
})(BlocksType || (BlocksType = {}));
/*export type Block = {
    Status: BlocksType;
    bombCount: number;
    Bomb: Boolean;
}*/
class Field {
    constructor(status) {
        if (status != BlocksType.explosive) {
            this.Status = status;
            this.BombCount = 0;
        }
        this.Symbol = this.getSymbol();
    }
    getSymbol() {
        if (this.Status == BlocksType.explosive) {
            return '💣';
        }
        else if (this.Status == BlocksType.Flagged) {
            return '🏴';
        }
    }
}
class Mine extends Field {
    constructor(status) {
        super(status);
        status = BlocksType.explosive;
        this.Status = status;
        this.Symbol = this.getSymbol();
    }
}
class DrawBlocks {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
    }
    drawRoster(x, y) {
        this.context.beginPath();
        this.context.rect(x, y, 50, 50);
        this.context.stroke();
    }
    MakeBlocHidden(x, y) {
        this.context.fillStyle = "#888888";
        this.context.fillRect(x, y, 50, 50);
        this.context.stroke();
    }
    RevealField(Fields) {
        let x = 0;
        let y = 0;
        for (let i = 0; i < Fields.length; i++) {
            x = 0;
            for (let j = 0; j < Fields[i].length; j++) {
                let text;
                if (Fields[i][j].Status == BlocksType.explosive) {
                    text = Fields[i][j].Symbol;
                }
                else {
                    text = Fields[i][j].BombCount.toString();
                }
                this.context.font = '50px serif';
                this.context.fillText(text, x, y, 20);
                this.context.stroke();
                x = x + 500;
            }
            y = y + 500;
        }
    }
}
function Create2dArray(fieldCount, bombCount) {
    let Blocks = [];
    for (let i = 0; i < fieldCount; i++) {
        Blocks.push([]);
        for (let j = 0; j < fieldCount; j++) {
            let random = Math.floor(Math.random() * 10);
            if (random % 2 != 0 && bombCount > 0) {
                let field = new Mine(BlocksType.explosive);
                Blocks[i][j] = field;
                bombCount--;
            }
            else {
                let field = new Field(BlocksType.hidden);
                Blocks[i][j] = field;
            }
        }
    }
    return Blocks;
}
function GiveBlocksNumbers(Fields) {
    for (let i = 0; i < Fields.length; i++) {
        for (let j = 0; j < Fields[i].length; j++) {
            if (Fields[i][j].Status != BlocksType.explosive) {
                Fields[i][j] = CheckBombsAround(Fields, y, x);
            }
        }
    }
    return Fields;
}
function CheckBombsAround(Fields, y, x) {
    let XCoordinate = x - 1;
    let YCoordinate = y - 1;
    let XMax = x + 1;
    let YMax = y + 1;
    if (XCoordinate < 0) {
        XCoordinate = x;
    }
    if (YCoordinate < 0) {
        YCoordinate = y;
    }
    if (XMax >= Fields[0].length) {
        XMax = x;
    }
    if (YMax >= Fields.length) {
        YMax = y;
    }
    for (let i = YCoordinate; i < YMax; i++) {
        for (let j = XCoordinate; j < XMax; j++) {
            if (Fields[i][j].Status === BlocksType.explosive) {
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
    x = 0;
}
let field = Create2dArray(10, 6);
field = GiveBlocksNumbers(field);
cringe.RevealField(field);
//# sourceMappingURL=Minesweeper.js.map