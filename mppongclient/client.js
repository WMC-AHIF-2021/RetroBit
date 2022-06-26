var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var serverIP = "wss://fos.the-changer.net";
// @ts-ignore
var socket = io(serverIP, { secure: true });
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
var GameState;
(function (GameState) {
    GameState[GameState["NotStarted"] = 0] = "NotStarted";
    GameState[GameState["WaitingForPlayers"] = 1] = "WaitingForPlayers";
    GameState[GameState["InProgress"] = 2] = "InProgress";
    GameState[GameState["Finished"] = 3] = "Finished";
})(GameState || (GameState = {}));
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
}());
var Entity = /** @class */ (function () {
    function Entity(x, y, width, height, color, moveSmoothMode) {
        if (moveSmoothMode === void 0) { moveSmoothMode = false; }
        var _this = this;
        this._nextX = 0;
        this._nextY = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        if (moveSmoothMode) {
            // 6 ballStep in server, every 10 ms gameloop
            var step_1 = 0.6;
            setInterval(function () {
                var vecX = _this._nextX - _this.x;
                var vecY = _this._nextY - _this.y;
                var distance = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2));
                if (distance > 6 && _this._nextY && _this._nextY) {
                    _this.x = _this._nextX;
                    _this.y = _this._nextY;
                    return;
                }
                var vecXNormalized = vecX / distance;
                var vecYNormalized = vecY / distance;
                console.log(vecX);
                console.log(vecY);
                if (!isNaN(vecXNormalized) && !isNaN(vecYNormalized)) {
                    _this.x += step_1 * vecXNormalized;
                    _this.y += step_1 * vecYNormalized;
                }
            }, 1);
        }
    }
    Entity.prototype.moveSmooth = function (nextX, nextY) {
        this._nextX = nextX;
        this._nextY = nextY;
    };
    return Entity;
}());
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        // updated by RoomManager
        this.players = [];
        this.playerBats = [];
        this.playerBatIndex = -1;
        this.ball = new Entity(500, 500, 20, 20, "gray", true);
        this.playerBatFollowCursorInterval = setInterval(function () {
            if (game.playerBatIndex !== -1) {
                game.playerBats[game.playerBatIndex].y = (Cursor._instance.Y / window.screen.height) * game.renderer.canvas.height;
                _this.setUpdatedOwnBatPos();
            }
        }, 20);
        this.LastScoreP1 = 0;
        this.LastScoreP2 = 0;
        this.gameState = GameState.NotStarted;
        this.socketClient = new SocketClient();
        this.roomManager = new RoomManager(this.socketClient);
        this.renderer = new Renderer();
        this.init();
    }
    Game.prototype.init = function () {
        var _this = this;
        document.getElementById("options_createButton").addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.roomManager.createRoom();
                return [2 /*return*/];
            });
        }); });
        document.getElementById("options_joinButton").addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.roomManager.joinRoom();
                return [2 /*return*/];
            });
        }); });
        document.getElementById("joinedRoomPanel_startGameButton").addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                game.startGame(true);
                return [2 /*return*/];
            });
        }); });
        window.addEventListener("keydown", function (e) {
            if (_this.gameState == GameState.InProgress) {
                if (e.key == "ArrowUp") {
                    game.moveOwnBat(-10);
                }
                if (e.key == "ArrowDown") {
                    game.moveOwnBat(10);
                }
            }
        });
    };
    Game.prototype.startGame = function (startAsHost) {
        if (startAsHost) {
            this.socketClient.sendStartGame();
        }
        this.players = this.roomManager.Players;
        for (var i = 0; i < this.players.length; i++) {
            if (i == 0)
                this.playerBats.push(new Entity(100, 100, 15, 100, this.players[i].isLocalPlayer ? "blue" : "red"));
            if (i == 1)
                this.playerBats.push(new Entity(this.renderer.canvas.width - 100, 100, 15, 100, this.players[i].isLocalPlayer ? "blue" : "red"));
        }
        this.gameState = GameState.InProgress;
        document.getElementById("joinedRoomInfoPanel").style.display = "none";
        document.getElementById("canvas").style.visibility = "visible";
        Game.renderLoop();
    };
    Game.prototype.updateGame = function (data) {
        var players = data["players"];
        for (var x in players) {
            var i = parseInt(x);
            if (players[i].socketId == socket.id) {
                this.playerBatIndex = i;
            }
            else {
                this.playerBats[i].x = players[i].playerPos[0];
                this.playerBats[i].y = players[i].playerPos[1];
            }
        }
        this.ball.moveSmooth(parseFloat(data["ballPos"][0]), parseFloat(data["ballPos"][1]));
        this.LastScoreP1 = players[0].score;
        this.LastScoreP2 = players[1].score;
        this.renderer.drawScores(data["players"][0].score, data["players"][1].score);
    };
    Game.prototype.moveOwnBat = function (y) {
        this.playerBats[this.playerBatIndex].y += y;
        this.setUpdatedOwnBatPos();
    };
    Game.prototype.setUpdatedOwnBatPos = function () {
        this.socketClient.sendPlayerPosUpdate(this.playerBats[this.playerBatIndex].x, this.playerBats[this.playerBatIndex].y);
    };
    Game.renderLoop = function () {
        game.renderer.drawPlayArea();
        game.renderer.drawEntities(game.playerBats);
        game.renderer.drawEntity(game.ball);
        game.renderer.drawScores(game.LastScoreP1, game.LastScoreP2);
        window.requestAnimationFrame(Game.renderLoop);
    };
    return Game;
}());
var Renderer = /** @class */ (function () {
    function Renderer() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    Renderer.prototype.drawEntities = function (entities) {
        for (var i = 0; i < entities.length; i++) {
            this.drawEntity(entities[i]);
        }
    };
    Renderer.prototype.drawEntity = function (entity) {
        this.ctx.fillStyle = entity.color;
        this.ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
    };
    Renderer.prototype.drawPlayArea = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // center line
        this.ctx.strokeStyle = "white";
        this.ctx.setLineDash([5, 3]);
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        this.ctx.closePath();
    };
    Renderer.prototype.drawScores = function (scoreP1, scoreP2) {
        this.ctx.textAlign = "start";
        this.ctx.font = "50px 'Press Start 2P'";
        this.ctx.fillText(pad(scoreP1, 2, '0'), this.canvas.width / 2 - 100, 55);
        this.ctx.fillText(pad(scoreP2, 2, '0'), this.canvas.width / 2 + 20, 55);
    };
    return Renderer;
}());
var game = new Game();
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
//# sourceMappingURL=client.js.map