var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Field = /** @class */ (function () {
    function Field(status) {
        if (status != BlocksType.explosive) {
            this.Status = status;
        }
        this.Symbol = this.getSymbol();
    }
    Field.prototype.getSymbol = function () {
        if (this.Status == BlocksType.explosive) {
            return '💣';
        }
        else if (this.Status == BlocksType.Flagged) {
            return '🏴';
        }
    };
    return Field;
}());
var Mine = /** @class */ (function (_super) {
    __extends(Mine, _super);
    function Mine(status) {
        var _this = _super.call(this, status) || this;
        _this.Symbol = _this.getSymbol();
        return _this;
    }
    return Mine;
}(Field));
var DrawBlocks = /** @class */ (function () {
    function DrawBlocks() {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
    }
    DrawBlocks.prototype.drawRoster = function (x, y) {
        this.context.beginPath();
        this.context.rect(x, y, 50, 50);
        this.context.stroke();
    };
    DrawBlocks.prototype.MakeBlocHidden = function (x, y) {
        this.context.fillStyle = "#888888";
        this.context.fillRect(x, y, 50, 50);
        this.context.stroke();
    };
    return DrawBlocks;
}());
var MinesweeperGame = /** @class */ (function () {
    function MinesweeperGame() {
    }
    MinesweeperGame.prototype.Create2dArray = function (fieldCount, bombCount) {
        for (var i = 0; i < fieldCount; i++) {
            this.Blocks[i] = new Array();
            for (var j = 0; j < fieldCount; j++) {
                var random = Math.floor(Math.random() * 10);
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
    };
    return MinesweeperGame;
}());
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
var cringe = new DrawBlocks();
var x = 0;
var y = 0;
for (var d = 0; d < 10; d++) {
    for (var i = 0; i < 10; i++) {
        cringe.drawRoster(x, y);
        cringe.MakeBlocHidden(x, y);
        x = x + 50;
    }
    y = y + 50;
    x = 0;
}
//# sourceMappingURL=Minesweeper.js.map