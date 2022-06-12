var BlocksType;
(function (BlocksType) {
    BlocksType[BlocksType["hidden"] = 0] = "hidden";
    BlocksType[BlocksType["detect"] = 1] = "detect";
    BlocksType[BlocksType["explosive"] = 2] = "explosive";
    BlocksType[BlocksType["Flagged"] = 3] = "Flagged";
})(BlocksType || (BlocksType = {}));
class Field {
    constructor(status) {
        if (status != BlocksType.explosive) {
            this.Status = status;
            this.BombCount = 0;
            this.Revealed = false;
        }
        else {
            this.Revealed = true;
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
let field;
let allowClick = true;
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
    MakeBlocFlagged(x, y) {
        this.context.fillStyle = "#0000ff";
        this.context.fillRect(x * 50 + 1, y * 50 + 1, 48, 48);
        this.context.stroke();
    }
    RevealField(Fields) {
        let x = 0;
        let y = 0;
        for (let i = 0; i < Fields.length; i++) {
            x = 0;
            for (let j = 0; j < Fields.length; j++) {
                let text;
                if (Fields[i][j].Status === BlocksType.explosive) {
                    text = Fields[i][j].Symbol;
                }
                else {
                    this.context.fillStyle = '#000000';
                    if (Fields[i][j].BombCount != 0) {
                        text = Fields[i][j].BombCount.toString();
                    }
                    else {
                        text = "";
                    }
                }
                this.context.font = '50px serif';
                this.context.fillText(text, x + 5, y + 40, 50);
                this.context.stroke();
                x = x + 50;
            }
            y = y + 50;
        }
    }
    Create2dArray(fieldCount, bombCount) {
        let Blocks = [];
        for (let i = 0; i < fieldCount; i++) {
            Blocks.push([]);
            for (let j = 0; j < fieldCount; j++) {
                Blocks[i][j] = new Field(BlocksType.hidden);
            }
        }
        while (bombCount > 0) {
            let rand = Math.random() > 0.4;
            if (rand == true) {
                let randomX = Math.floor(Math.random() * 10);
                let randomY = Math.floor(Math.random() * 10);
                if (Blocks[randomY][randomX].Status === BlocksType.hidden) {
                    Blocks[randomY][randomX] = new Mine(BlocksType.explosive);
                    bombCount = bombCount - 1;
                }
            }
        }
        return Blocks;
    }
    GiveBlocksNumbers() {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j].Status != BlocksType.explosive) {
                    this.CheckBombsAround(i, j);
                }
            }
        }
    }
    CheckBombsAround(y, x) {
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
    AllFieldRevealed() {
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
function findEmptyFields(x, y, context) {
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
    if (XMax >= field.length) {
        XMax = x;
    }
    if (YMax >= field.length) {
        YMax = y;
    }
    for (let i = YCoordinate; i <= YMax; i++) {
        for (let j = XCoordinate; j <= XMax; j++) {
            if (field[i][j].BombCount == 0 && !field[i][j].Revealed) {
                field[i][j].Revealed = true;
                context.fillRect(j * 50 + 1, i * 50 + 1, 48, 48);
                findEmptyFields(j, i, context);
            }
        }
    }
}
function writeOnBlock(x, y, context, text) {
    context.font = '50px serif';
    context.fillText(text, (x * 50) + 5, (y * 50) + 40, 50);
    context.stroke();
}
document.getElementById("myCanvas").addEventListener("mousedown", (e) => {
    if (!allowClick) {
        return;
    }
    const gameState = document.getElementById("gameState");
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    const canvasPos = canvas.getBoundingClientRect();
    console.log(e.clientX, e.clientY);
    console.log(canvasPos.top, canvasPos.right, canvasPos.bottom, canvasPos.left);
    let x = e.clientX - Math.round(canvasPos.left);
    let y = e.clientY - Math.round(canvasPos.top);
    console.log(x, y);
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    console.log(x, y);
    let text;
    //right click
    if (e.button === 2) {
        field[y][x] = new Field(BlocksType.Flagged);
        renderer.MakeBlocFlagged(x, y);
        field[y][x].Revealed = true;
        text = field[y][x].Symbol;
    }
    else if (field[y][x].Status !== BlocksType.Flagged) {
        if (field[y][x].Status === BlocksType.explosive) {
            text = field[y][x].Symbol;
            renderer.RevealField(field);
            allowClick = false;
            gameState.innerText = "You loose!";
        }
        else {
            field[y][x].Revealed = true;
            context.fillStyle = "#000000";
            if (field[y][x].BombCount != 0) {
                text = field[y][x].BombCount.toString();
            }
            else {
                text = "";
                context.fillStyle = "#aba3a3";
                findEmptyFields(x, y, context);
                context.fillRect(x * 50 + 1, y * 50 + 1, 48, 48);
            }
        }
    }
    if (text != undefined) {
        writeOnBlock(x, y, context, text);
    }
    let gameFinished = renderer.AllFieldRevealed();
    if (gameFinished === true) {
        allowClick = false;
        renderer.RevealField(field);
        gameState.innerText = "You loose!";
    }
});
//# sourceMappingURL=Minesweeper.js.map