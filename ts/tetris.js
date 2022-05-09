var t;
var TetrisGame = /** @class */ (function () {
    function TetrisGame() {
        this.blockList = [];
        this.renderer = new Renderer();
        this.addBlock();
        this.start();
    }
    TetrisGame.prototype.start = function () {
        var _this = this;
        document.getElementById("options").style.visibility = "hidden";
        document.addEventListener("keydown", function (e) {
            for (var _i = 0, _a = _this.blockList; _i < _a.length; _i++) {
                var b = _a[_i];
                if (e.code === "ArrowLeft") {
                    b.moveDirection("Left");
                }
                if (e.code === "ArrowRight") {
                    b.moveDirection("Right");
                }
                if (e.code === "ArrowDown") {
                    b.moveDirection("Down");
                }
            }
        });
    };
    TetrisGame.prototype.addBlock = function () {
        this.blockList.push(new Block(TetrisBlock.LBlock));
    };
    TetrisGame.speed = 500;
    return TetrisGame;
}());
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.style.visibility = "visible";
        this.canvas.focus();
        this.startGameLoop();
    }
    Renderer.prototype.startGameLoop = function () {
        var _this = this;
        setInterval(function () {
            _this.clearCanvas();
            _this.render();
        }, 1000 / 60);
        setInterval(function () {
            for (var _i = 0, _a = t.blockList; _i < _a.length; _i++) {
                var b = _a[_i];
                b.nextFrame();
            }
        }, TetrisGame.speed);
    };
    Renderer.prototype.render = function () {
        this.renderLeft();
        this.renderRight();
        this.renderGame();
    };
    Renderer.prototype.renderLeft = function () {
        this.context.beginPath();
        this.context.moveTo(500, 0);
        this.context.lineTo(500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
        this.context.fillStyle = "white";
        this.context.font = "42px 'Press Start 2P'";
        this.context.fillText("Highscores", 34, 48);
    };
    Renderer.prototype.renderRight = function () {
        this.context.beginPath();
        this.context.moveTo(1500, 0);
        this.context.lineTo(1500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
    };
    Renderer.prototype.clearCanvas = function () {
        this.context.clearRect(0, 0, 2000, 1000);
    };
    Renderer.prototype.renderGame = function () {
        for (var _i = 0, _a = t.blockList; _i < _a.length; _i++) {
            var b = _a[_i];
            this.renderBlock(b);
        }
    };
    Renderer.prototype.renderBlock = function (block) {
        var squareSize = 39;
        for (var _i = 0, _a = block.tiles; _i < _a.length; _i++) {
            var t_1 = _a[_i];
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(t_1.xPos, t_1.yPos, squareSize, squareSize);
            this.context.stroke();
        }
    };
    return Renderer;
}());
var Tile = /** @class */ (function () {
    function Tile(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.isFalling = true;
    }
    return Tile;
}());
var Block = /** @class */ (function () {
    function Block(block) {
        this.block = block;
        this.color = BlockColor.Blue;
        this.tiles = [];
        this.determineBlock(block);
    }
    Block.prototype.determineBlock = function (t) {
        var _this = this;
        var pushNewTile = function (xPos, yPos) { return _this.tiles.push(new Tile(xPos, yPos)); };
        var startX = Block.startpos.xPos;
        var startY = Block.startpos.yPos;
        var downX = Direction.Down.xPos;
        var downY = Direction.Down.yPos;
        var rightX = Direction.Right.xPos;
        var rightY = Direction.Right.yPos;
        var leftX = Direction.Left.xPos;
        var leftY = Direction.Left.yPos;
        pushNewTile(startX, startY);
        switch (t) {
            case TetrisBlock.LBlock:
                this.color = BlockColor.Blue;
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + 2 * downX, startY + 2 * downY);
                pushNewTile(startX + 2 * downX + rightX, startY + 2 * downY + rightY);
                break;
            case TetrisBlock.JBlock:
                this.color = BlockColor.Red;
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + 2 * downX, startY + 2 * downY);
                pushNewTile(startX + 2 * downX + leftX, startY + 2 * downY + leftY);
                break;
            case TetrisBlock.IBlock:
                this.color = BlockColor.Cyan;
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + 2 * downX, startY + 2 * downY);
                break;
            case TetrisBlock.OBlock:
                this.color = BlockColor.Green;
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + rightX, startY + rightY);
                pushNewTile(startX + downX + rightX, startY + downY + rightY);
                break;
            case TetrisBlock.TBlock:
                this.color = BlockColor.Orange;
                pushNewTile(startX + rightX, startY + rightY);
                pushNewTile(startX + leftX, startY + leftY);
                pushNewTile(startX + downX, startY + downY);
                break;
            case TetrisBlock.ZBlock:
                this.color = BlockColor.Purple;
                pushNewTile(startX + leftX, startY + leftY);
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + downX + rightX, startY + downY + rightY);
                break;
            case TetrisBlock.SBlock:
                this.color = BlockColor.Yellow;
                pushNewTile(startX + rightX, startY + rightY);
                pushNewTile(startX + downX, startY + downY);
                pushNewTile(startX + downX + leftX, startY + downY + leftY);
                break;
            default:
                break;
        }
    };
    Block.prototype.isAbleToMoveDown = function () {
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var f = _a[_i];
            if (this.getLowestPoint() > 1000 - 42) {
                t.addBlock();
                return false;
            }
        }
        return true;
    };
    Block.prototype.nextFrame = function () {
        if (this.isAbleToMoveDown()) {
            for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
                var t_2 = _a[_i];
                t_2.yPos += Direction.Down.yPos;
                t_2.xPos += Direction.Down.xPos;
            }
        }
    };
    Block.prototype.moveDirection = function (d) {
        var stopRight = false;
        var stopLeft = false;
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var t_3 = _a[_i];
            if (t_3.xPos < 500 + 39) {
                stopLeft = true;
                break;
            }
            if (t_3.xPos > 1500 - 78) {
                stopRight = true;
                break;
            }
        }
        if (this.isAbleToMoveDown()) {
            for (var _b = 0, _c = this.tiles; _b < _c.length; _b++) {
                var t_4 = _c[_b];
                switch (d) {
                    case "Left":
                        if (!stopLeft) {
                            t_4.xPos += Direction.Left.xPos;
                            t_4.yPos += Direction.Left.yPos;
                        }
                        break;
                    case "Right":
                        if (!stopRight) {
                            t_4.xPos += Direction.Right.xPos;
                            t_4.yPos += Direction.Right.yPos;
                        }
                        break;
                    case "Down":
                        t_4.xPos += Direction.Down.xPos;
                        t_4.yPos += Direction.Down.yPos;
                        break;
                    default:
                        break;
                }
            }
        }
    };
    Block.prototype.getLowestPoint = function () {
        var highestY = 0;
        for (var _i = 0, _a = this.tiles; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.yPos > highestY) {
                highestY = i.yPos;
            }
        }
        return highestY;
    };
    Block.startpos = { xPos: 1000, yPos: 0 };
    return Block;
}());
var BlockColor;
(function (BlockColor) {
    BlockColor["Cyan"] = "#00ffff";
    BlockColor["Yellow"] = "#ffff00";
    BlockColor["Purple"] = "#800080";
    BlockColor["Green"] = "#00ff00";
    BlockColor["Red"] = "#ff0000";
    BlockColor["Blue"] = "#0000ff";
    BlockColor["Orange"] = "#ff7f00";
})(BlockColor || (BlockColor = {}));
var TetrisBlock;
(function (TetrisBlock) {
    TetrisBlock[TetrisBlock["LBlock"] = 0] = "LBlock";
    TetrisBlock[TetrisBlock["JBlock"] = 1] = "JBlock";
    TetrisBlock[TetrisBlock["IBlock"] = 2] = "IBlock";
    TetrisBlock[TetrisBlock["OBlock"] = 3] = "OBlock";
    TetrisBlock[TetrisBlock["TBlock"] = 4] = "TBlock";
    TetrisBlock[TetrisBlock["ZBlock"] = 5] = "ZBlock";
    TetrisBlock[TetrisBlock["SBlock"] = 6] = "SBlock";
})(TetrisBlock || (TetrisBlock = {}));
var Direction = /** @class */ (function () {
    function Direction() {
    }
    Direction.Right = { xPos: 40, yPos: 0 };
    Direction.Left = { xPos: -40, yPos: 0 };
    Direction.Down = { xPos: 0, yPos: 40 };
    return Direction;
}());
t = new TetrisGame();
//# sourceMappingURL=tetris.js.map