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
            this.Revealed = true;
        }
        else {
            this.Revealed = false;
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
    // private click = this.canvas.addEventListener("click", this.getMousePos(canvas, ));
    //
    //
    //
    // private pos = canvas.getBoundingClientRect();
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
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
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
            let randomX = Math.floor(Math.random() * 10);
            let randomY = Math.floor(Math.random() * 10);
            if (Blocks[randomY][randomX].Status === BlocksType.hidden) {
                Blocks[randomY][randomX] = new Mine(BlocksType.explosive);
                bombCount = bombCount - 1;
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
function buttonHandler() {
    window.location.reload();
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
field = cringe.Create2dArray(10, 10);
cringe.GiveBlocksNumbers();
document.getElementById("myCanvas").addEventListener("click", (e) => {
    const gamestate = document.getElementById("gameState");
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
    if (field[y][x].Status === BlocksType.explosive) {
        text = field[y][x].Symbol;
        cringe.RevealField(field);
        gamestate.innerText = "You loose!";
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
            context.fillRect(x * 50 + 1, y * 50 + 1, 48, 48);
        }
    }
    context.font = '50px serif';
    console.log(x * 50);
    console.log(y * 50);
    context.fillText(text, (x * 50) + 5, (y * 50) + 40, 50);
    context.stroke();
    let gameFinished = cringe.AllFieldRevealed();
    if (gameFinished === true) {
        cringe.RevealField(field);
        gamestate.innerText = "You loose!";
    }
});
//# sourceMappingURL=Minesweeper.js.map