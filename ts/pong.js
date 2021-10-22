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
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        this.canvas = canvas;
        this.context = context;
        this.playerBat = new PlayerBatEntity(5, 50, 5, 20, "white");
        this.computerBat = new ComputerBatEntity(60, 50, 5, 20, "green");
        this.ball = new BallEntity(35, 50, 2, 2, "gray");
        this.redraw();
        this.createUserEvents();
    }
    Game.prototype.createUserEvents = function () {
        var canvas = this.canvas;
        canvas.addEventListener("keyup", this.keypressEventHandler);
        //document.getElementById("clear").addEventListener("click", this.clearEventHandler);
    };
    Game.prototype.keypressEventHandler = function (e) {
        if (e.keyCode == 38) { // up
            this.playerBat.move(0, 5);
        }
        else if (e.keyCode == 40) {
            this.playerBat.move(0, -5);
        }
        this.redraw();
    };
    Game.prototype.redraw = function () {
        this.playerBat.draw(this.context);
        this.computerBat.draw(this.context);
        this.ball.draw(this.context);
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
        ctx.rect(this.X, this.Y, this.SizeX, this.SizeY);
        ctx.fillStyle = this.Color;
        ctx.fill();
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ComputerBatEntity;
}(Entity));
var BallEntity = /** @class */ (function (_super) {
    __extends(BallEntity, _super);
    function BallEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BallEntity;
}(Entity));
new Game();
//# sourceMappingURL=pong.js.map