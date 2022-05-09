/*class MinesweeperGame{
    private canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");

    public draw(){
        this.context.beginPath();
        this.context.moveTo(300, 200);
        this.context.lineTo(300, 150);
        this.context.strokeStyle = '#ffffff';
        this.canvas.focus();
    }
}*/
var DrawBlocks = /** @class */ (function () {
    function DrawBlocks() {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
    }
    DrawBlocks.prototype.draw = function (x, y) {
        this.context.beginPath();
        this.context.rect(x, y, 50, 50);
        this.context.stroke();
    };
    return DrawBlocks;
}());
var BlocksType;
(function (BlocksType) {
    BlocksType[BlocksType["hidden"] = 0] = "hidden";
    BlocksType[BlocksType["uncovered"] = 1] = "uncovered";
    BlocksType[BlocksType["explosive"] = 2] = "explosive";
    BlocksType[BlocksType["harmless"] = 3] = "harmless";
})(BlocksType || (BlocksType = {}));
var cringe = new DrawBlocks();
var x = 0;
var y = 0;
for (var d = 0; d < 10; d++) {
    for (var i = 0; i < 10; i++) {
        cringe.draw(x, y);
        x = x + 50;
    }
    y = y + 50;
    x = 0;
}
//# sourceMappingURL=Minesweeper.js.map