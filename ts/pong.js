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
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.keypressEventHandler = function (e) {
            if (e.keyCode == 38) { // up
                _this.playerBat.move(0, -50);
            }
            else if (e.keyCode == 40) {
                _this.playerBat.move(0, 50);
            }
            _this.redraw();
        };
        this.gameLoop = function () {
            _this.redraw();
            _this.computerBat.update(_this.ball);
            _this.ball.update(_this.canvas, _this);
            window.requestAnimationFrame(_this.gameLoop);
        };
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        this.canvas = canvas;
        this.context = context;
        this.playerBat = new PlayerBatEntity(35, 50, 15, 100, "white");
        this.computerBat = new ComputerBatEntity(700, 50, 15, 100, "green");
        this.ball = new BallEntity(35, 50, 20, 20, "gray");
        this.pointsPlayer = 0;
        this.pointsComputer = 0;
        this.redraw();
        this.createUserEvents();
        window.requestAnimationFrame(this.gameLoop);
    }
    Game.prototype.createUserEvents = function () {
        var canvas = this.canvas;
        canvas.addEventListener("keyup", this.keypressEventHandler);
        //document.getElementById("clear").addEventListener("click", this.clearEventHandler);
    };
    Game.prototype.redraw = function () {
        this.clear();
        this.context.strokeStyle = "white";
        this.context.strokeRect(5, 5, this.canvas.width - 10, this.canvas.height - 10);
        // entities
        this.playerBat.draw(this.context);
        this.computerBat.draw(this.context);
        this.ball.draw(this.context);
        // center line
        this.context.setLineDash([5, 3]);
        this.context.beginPath();
        this.context.moveTo(this.canvas.width / 2, 0);
        this.context.lineTo(this.canvas.width / 2, this.canvas.height);
        this.context.stroke();
        this.context.setLineDash([]);
        this.context.font = "40px 'Press Start 2P'";
        this.context.fillText(pad(this.pointsPlayer, 2, '0'), this.canvas.width / 2 - 100, 55);
        this.context.fillText(pad(this.pointsComputer, 2, '0'), this.canvas.width / 2 + 20, 55);
    };
    Game.prototype.clear = function () {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return Game;
}());
var Entity = /** @class */ (function () {
    function Entity(x, y, sizeX, sizeY, color) {
        this.X = x;
        this.Y = y;
        this.SizeX = sizeX;
        this.SizeY = sizeY;
        this.Color = color;
    }
    Entity.prototype.move = function (x, y) {
        this.X += x;
        this.Y += y;
    };
    Entity.prototype.draw = function (ctx) {
        ctx.fillStyle = this.Color;
        ctx.fillRect(this.X, this.Y, this.SizeX, this.SizeY);
    };
    return Entity;
}());
var PlayerBatEntity = /** @class */ (function (_super) {
    __extends(PlayerBatEntity, _super);
    function PlayerBatEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PlayerBatEntity;
}(Entity));
var ComputerBatEntity = /** @class */ (function (_super) {
    __extends(ComputerBatEntity, _super);
    function ComputerBatEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.movementSpeed = 4;
        _this.i = 0;
        return _this;
    }
    ComputerBatEntity.prototype.update = function (ball) {
        if (ball.Y > this.Y) {
            this.Y += this.movementSpeed;
        }
        else if (ball.Y < this.Y) {
            this.Y -= this.movementSpeed;
        }
        this.i++;
        if (this.i % 20 == 0) {
            this.movementSpeed = getRandomArbitrary(5, 8);
            this.i = 0;
        }
    };
    return ComputerBatEntity;
}(Entity));
var BallEntity = /** @class */ (function (_super) {
    __extends(BallEntity, _super);
    function BallEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentDirX = 1;
        _this.currentDirY = 1;
        _this.movementSpeed = 7;
        return _this;
    }
    BallEntity.prototype.update = function (canvas, game) {
        this.X += this.currentDirX * this.movementSpeed;
        this.Y += this.currentDirY * this.movementSpeed;
        if (this.Y >= canvas.height) {
            this.currentDirY = -1;
        }
        if (this.Y <= 0) {
            this.currentDirY = 1;
        }
        if (this.X >= canvas.width) {
            this.lost(game, canvas);
            game.pointsPlayer += 1;
        }
        if (this.X <= 0) {
            this.lost(game, canvas);
            game.pointsComputer += 1;
        }
        if ((this.X <= game.computerBat.X + game.computerBat.SizeX && this.X >= game.computerBat.X) && (this.Y <= game.computerBat.Y + game.computerBat.SizeY && this.Y >= game.computerBat.Y)) {
            this.currentDirX = -1;
        }
        if ((this.X <= game.playerBat.X + game.playerBat.SizeX && this.X >= game.playerBat.X) && (this.Y <= game.playerBat.Y + game.playerBat.SizeY && this.Y >= game.playerBat.Y)) {
            this.currentDirX = 1;
        }
    };
    BallEntity.prototype.lost = function (game, canvas) {
        this.X = canvas.width / 2;
        this.Y = canvas.height / 2;
        this.currentDirX = getRandomIntWithoutZero(-1, 1);
        this.currentDirY = getRandomIntWithoutZero(-1, 1);
    };
    return BallEntity;
}(Entity));
new Game();
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomIntWithoutZero(min, max) {
    var lastResult = 0;
    while (lastResult == 0) {
        lastResult = getRandomInt(min - 1, max + 1);
    }
    return lastResult;
}
//# sourceMappingURL=pong.js.map