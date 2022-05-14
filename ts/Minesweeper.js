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
}
class MinesweeperGame {
    Create2dArray(fieldCount, bombCount) {
        for (let i = 0; i < fieldCount; i++) {
            this.Blocks[i] = new Array();
            for (let j = 0; j < fieldCount; j++) {
                let random = Math.floor(Math.random() * 10);
                if (random % 2 != 0 && bombCount > 0) {
                    this.Blocks[i][j] = new Mine(BlocksType.explosive);
                    bombCount--;
                }
                else {
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
    x = 0;
}
//# sourceMappingURL=Minesweeper.js.map