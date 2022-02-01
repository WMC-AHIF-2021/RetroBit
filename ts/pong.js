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
var Options = /** @class */ (function () {
    function Options() {
    }
    var _a;
    _a = Options;
    Options.winningPoints = 11;
    // computerSpeedRange should NOT BE FASTER than ballSpeedRange because then the bat becomes jittery
    Options.computerSpeedRange = [6, 8];
    Options.ballSpeedRange = [6, 8];
    Options.computerBatHeight = 100;
    Options.setOptions = function () {
        // set difficulty
        var difficulty = parseInt(document.getElementById("options_difficultySelect").value);
        switch (difficulty) {
            case 0:
                Options.computerSpeedRange = [4, 6];
                Options.ballSpeedRange = [4, 7];
                Options.computerBatHeight = 100;
                break;
            case 1:
                Options.computerSpeedRange = [6, 8];
                Options.ballSpeedRange = [6, 9];
                Options.computerBatHeight = 100;
                break;
            case 2:
                Options.computerSpeedRange = [8, 10];
                Options.ballSpeedRange = [7, 10];
                Options.computerBatHeight = 100;
                break;
            case 3:
                Options.computerSpeedRange = [12, 16];
                Options.ballSpeedRange = [12, 16];
                Options.computerBatHeight = 150;
                break;
            case 4:
                Options.computerSpeedRange = [16, 20];
                Options.ballSpeedRange = [16, 20];
                Options.computerBatHeight = 200;
                break;
            case 5:
                Options.computerSpeedRange = [70, 70];
                Options.ballSpeedRange = [35, 35];
                Options.computerBatHeight = 300;
                break;
        }
        _a.difficultyIndex = difficulty;
        // set other options
        _a.isMouseControl = document.getElementById("options_enableMouseControl").checked;
    };
    return Options;
}());
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.keypressEventHandler = function (e) {
            switch (e.keyCode) {
                case 38:
                    _this.playerBat.move(0, -50);
                    break;
                case 40:
                    _this.playerBat.move(0, 50);
                    break;
                case 32:
                    // restart game if somebody has won and player presses space
                    if (_this.currentWinner != -1) {
                        _this.restartGame();
                    }
                    break;
                case 13:
                    // open difficulty window if somebody has won and player presses enter
                    if (_this.currentWinner != -1) {
                        _this.stopGame();
                    }
                    break;
                case 27:
                    // terminate current game
                    _this.stopGame();
            }
            _this.redraw();
        };
        this.stopGame = function () {
            document.getElementById("options").style.visibility = "visible";
            var canvasEl = document.getElementById("canvas");
            canvasEl.style.visibility = "hidden";
            _this.isRunning = false;
            _this.restartGame();
        };
        this.startGame = function () {
            Options.setOptions();
            document.getElementById("options").style.visibility = "hidden";
            var canvasEl = document.getElementById("canvas");
            canvasEl.style.visibility = "visible";
            setTimeout(function () {
                canvasEl.focus();
                _this.ball.updateMovementSpeed();
                setTimeout(function () {
                    _this.computerBat.updateMovementSpeed();
                }, 500);
                _this.computerBat = new ComputerBatEntity(_this.canvas.width - 50, 50, 15, Options.computerBatHeight, "#ff901f");
                _this.isRunning = true;
                if (Options.difficultyIndex == 5) {
                    _this.pointsPlayer = -9;
                }
                else {
                    _this.pointsPlayer = 0;
                }
            }, 1000);
        };
        this.restartGame = function () {
            _this.pointsComputer = 0;
            _this.currentWinner = -1;
            _this.pointsPlayer = 0;
            if (Options.difficultyIndex == 5) {
                _this.pointsPlayer = -9;
            }
        };
        this.gameLoop = function () {
            if (_this.isRunning) {
                _this.redraw();
                if (_this.currentWinner == -1) {
                    _this.computerBat.update(_this.ball);
                    _this.ball.update(_this.canvas, _this);
                }
                if (_this.pointsPlayer >= Options.winningPoints) {
                    _this.currentWinner = 0;
                }
                if (_this.pointsComputer >= Options.winningPoints) {
                    _this.currentWinner = 1;
                }
                if (Options.isMouseControl) {
                    _this.playerBat.Y = (Cursor._instance.Y / window.screen.height) * _this.canvas.height;
                }
            }
            window.requestAnimationFrame(_this.gameLoop);
        };
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        canvas.focus();
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        this.canvas = canvas;
        this.context = context;
        this.playerBat = new PlayerBatEntity(35, 50, 15, 100, "#8c1eff");
        this.computerBat = new ComputerBatEntity(this.canvas.width - 50, 50, 15, 100, "#ff901f");
        this.ball = new BallEntity(35, 50, 20, 20, "gray");
        this.pointsPlayer = 0;
        this.pointsComputer = 0;
        this.currentWinner = -1;
        this.redraw();
        this.createUserEvents();
        window.requestAnimationFrame(this.gameLoop);
    }
    Game.prototype.createUserEvents = function () {
        var _this = this;
        var canvas = this.canvas;
        canvas.addEventListener("keyup", this.keypressEventHandler);
        document.getElementById("options_submitButton").addEventListener("click", function () {
            _this.startGame();
        });
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
        // score text
        this.context.textAlign = "start";
        this.context.font = "50px 'Press Start 2P'";
        this.context.fillText(pad(this.pointsPlayer, 2, '0'), this.canvas.width / 2 - 100, 55);
        this.context.fillText(pad(this.pointsComputer, 2, '0'), this.canvas.width / 2 + 20, 55);
        // draw winner text
        this.context.font = "24px 'Press Start 2P'";
        this.context.textAlign = "center";
        if (this.currentWinner == 0) {
            // the player won
            this.context.fillText("You Won!", this.canvas.width / 4, this.canvas.height / 3);
        }
        else if (this.currentWinner == 1) {
            // the player won
            this.context.fillText("Computer Won!", this.canvas.width / 1.5, this.canvas.height / 3);
        }
        // draw restart with space text
        this.context.font = "14px 'Press Start 2P'";
        this.context.fillStyle = "#aaaaaa";
        if (this.currentWinner != -1) {
            this.context.fillText("Press SPACE to RESTART", this.canvas.width / 2, this.canvas.height - 200);
            this.context.fillText("Press ENTER to CHANGE DIFFICULTY", this.canvas.width / 2, this.canvas.height - 150);
        }
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
        if (this.i % 200 == 0) {
            this.updateMovementSpeed();
            this.i = 0;
        }
    };
    ComputerBatEntity.prototype.updateMovementSpeed = function () {
        this.movementSpeed = getRandomInt(Options.computerSpeedRange[0], Options.computerSpeedRange[1]);
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
        if (this.Y + this.SizeY >= canvas.height) {
            this.currentDirY = -1;
        }
        if (this.Y <= 0) {
            this.currentDirY = 1;
        }
        if (this.X >= canvas.width) {
            this.lost(canvas);
            game.pointsPlayer += 1;
        }
        if (this.X <= 0) {
            this.lost(canvas);
            game.pointsComputer += 1;
        }
        if (((this.X <= game.computerBat.X + game.computerBat.SizeX && this.X >= game.computerBat.X) && (this.Y <= game.computerBat.Y + game.computerBat.SizeY && this.Y >= game.computerBat.Y)) || ((this.X + this.SizeX <= game.computerBat.X + game.computerBat.SizeX && this.X + this.SizeX >= game.computerBat.X) && (this.Y + this.SizeY <= game.computerBat.Y + game.computerBat.SizeY && this.Y + this.SizeY >= game.computerBat.Y)) || ((this.X <= game.computerBat.X + game.computerBat.SizeX && this.X + this.SizeX >= game.computerBat.X) && (this.Y + this.SizeY <= game.computerBat.Y + game.computerBat.SizeY && this.Y + this.SizeY >= game.computerBat.Y)) || ((this.X + this.SizeX <= game.computerBat.X + game.computerBat.SizeX && this.X + this.SizeX >= game.computerBat.X) && (this.Y <= game.computerBat.Y + game.computerBat.SizeY && this.Y + this.SizeY >= game.computerBat.Y))) {
            this.currentDirX = -1;
            this.updateMovementSpeed();
            game.computerBat.updateMovementSpeed();
        }
        if (((this.X <= game.playerBat.X + game.playerBat.SizeX && this.X >= game.playerBat.X) && (this.Y <= game.playerBat.Y + game.playerBat.SizeY && this.Y >= game.playerBat.Y)) || ((this.X + this.SizeX <= game.playerBat.X + game.playerBat.SizeX && this.X >= game.playerBat.X) && (this.Y + this.SizeY <= game.playerBat.Y + game.playerBat.SizeY && this.Y >= game.playerBat.Y)) || ((this.X <= game.playerBat.X + game.playerBat.SizeX && this.X >= game.playerBat.X) && (this.Y + this.SizeY <= game.playerBat.Y + game.playerBat.SizeY && this.Y >= game.playerBat.Y)) || ((this.X + this.SizeX <= game.playerBat.X + game.playerBat.SizeX && this.X >= game.playerBat.X) && (this.Y <= game.playerBat.Y + game.playerBat.SizeY && this.Y >= game.playerBat.Y))) {
            this.currentDirX = 1;
            this.updateMovementSpeed();
        }
    };
    BallEntity.prototype.lost = function (canvas) {
        this.currentDirX = getRandomIntWithoutZero(-1, 1);
        this.currentDirY = getRandomIntWithoutZero(-1, 1);
        this.updateMovementSpeed();
        this.Y = canvas.height / 2;
        if (this.currentDirX < 0) {
            this.X = 3 * canvas.width / 4;
        }
        else {
            this.X = canvas.width / 4;
        }
    };
    BallEntity.prototype.updateMovementSpeed = function () {
        this.movementSpeed = getRandomInt(Options.ballSpeedRange[0], Options.ballSpeedRange[1]);
    };
    return BallEntity;
}(Entity));
new Game();
var Cursor = /** @class */ (function () {
    function Cursor() {
        var _this = this;
        document.onmousemove = function (e) {
            _this.X = e.pageX;
            _this.Y = e.pageY;
        };
    }
    Cursor._instance = new Cursor();
    return Cursor;
}());
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