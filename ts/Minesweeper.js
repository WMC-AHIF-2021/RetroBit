var BlocksType;
(function (BlocksType) {
    BlocksType[BlocksType["hidden"] = 0] = "hidden";
    BlocksType[BlocksType["detect"] = 1] = "detect";
    BlocksType[BlocksType["explosive"] = 2] = "explosive";
    BlocksType[BlocksType["flagged"] = 3] = "flagged";
})(BlocksType || (BlocksType = {}));
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
var DefineBlocks = /** @class */ (function () {
    function DefineBlocks() {
        this.blocks = [
            { Type: BlocksType.hidden, color: "grey" },
            { Type: BlocksType.explosive, color: "red" },
            { Type: BlocksType.flagged, color: "grey" },
            { Type: BlocksType.detect, color: "blue" }
        ];
    }
    return DefineBlocks;
}());
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