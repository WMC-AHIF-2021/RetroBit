const serverIP = "wss://fos.the-changer.net";
// @ts-ignore
let socket = io(serverIP, {secure: true});

class Cursor {
    public static _instance : Cursor = new Cursor();

    public X: number;
    public Y: number;

    constructor() {
        document.onmousemove = (e) => {
            this.X = e.pageX;
            this.Y = e.pageY;
        }
    }
}

enum GameState
{
    NotStarted,
    WaitingForPlayers,
    InProgress,
    Finished
}
class Position
{
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
class Entity {
    public x: number;
    public y: number;
    private _nextX: number = 0;
    private _nextY: number = 0;
    public width: number;
    public height: number;
    public color: string;

    constructor(x: number, y: number, width: number, height: number, color: string, moveSmoothMode: boolean = false) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;

        if (moveSmoothMode) {
            // 6 ballStep in server, every 10 ms gameloop
            const step = 0.6;
            setInterval(() => {
                let vecX = this._nextX - this.x;
                let vecY = this._nextY - this.y;
                let distance = Math.sqrt(Math.pow(vecX, 2) + Math.pow(vecY, 2));
                if (distance > 6 && this._nextY && this._nextY) {
                    this.x = this._nextX;
                    this.y = this._nextY;
                    return;
                }
                let vecXNormalized = vecX / distance;
                let vecYNormalized = vecY / distance;
                console.log(vecX);
                console.log(vecY);
                if (!isNaN(vecXNormalized) && !isNaN(vecYNormalized)) {
                    this.x += step * vecXNormalized;
                    this.y += step * vecYNormalized;
                }
            }, 1)
        }
    }

    public moveSmooth(nextX: number, nextY: number): void {
        this._nextX = nextX;
        this._nextY = nextY;
    }
}
class Game {
    public gameState: GameState;
    // updated by RoomManager
    public players: Player[] = [];

    private socketClient: SocketClient;
    private roomManager: RoomManager;
    private renderer: Renderer;

    private playerBats: Entity[] = [];
    private playerBatIndex: number = -1;
    private ball: Entity = new Entity(500, 500, 20, 20, "gray", true);

    constructor() {
        this.gameState = GameState.NotStarted;

        this.socketClient = new SocketClient();
        this.roomManager = new RoomManager(this.socketClient);
        this.renderer = new Renderer();

        this.init();
    }
    private init() {
        document.getElementById("options_createButton").addEventListener("click", async () => {
            this.roomManager.createRoom();
        });
        document.getElementById("options_joinButton").addEventListener("click", async () => {
            this.roomManager.joinRoom();
        });

        document.getElementById("joinedRoomPanel_startGameButton").addEventListener("click", async () => {
            game.startGame(true);
        });

        window.addEventListener("keydown", (e) => {
            if (this.gameState == GameState.InProgress) {
                if (e.key == "ArrowUp") {
                    game.moveOwnBat(-10);
                }
                if (e.key == "ArrowDown") {
                    game.moveOwnBat(10);
                }
            }
        });
    }
    private playerBatFollowCursorInterval = setInterval(() => {
        if (game.playerBatIndex !== -1) {
            game.playerBats[game.playerBatIndex].y = (Cursor._instance.Y / window.screen.height) * game.renderer.canvas.height;
            this.setUpdatedOwnBatPos();
        }
    }, 20);

    public startGame(startAsHost: boolean) {
        if (startAsHost) {
            this.socketClient.sendStartGame();
        }
        this.players = this.roomManager.Players;

        for (let i = 0; i < this.players.length; i++) {
            if (i == 0) this.playerBats.push(new Entity(100, 100, 15, 100, this.players[i].isLocalPlayer ? "blue" : "red"));
            if (i == 1) this.playerBats.push(new Entity(this.renderer.canvas.width - 100, 100, 15, 100, this.players[i].isLocalPlayer ? "blue" : "red"));
        }
        this.gameState = GameState.InProgress;
        document.getElementById("joinedRoomInfoPanel").style.display = "none";
        document.getElementById("canvas").style.visibility = "visible";

        Game.renderLoop();
    }

    public updateGame(data: JSON) {
        let players = data["players"];
        for (let x in players) {
            let i: number = parseInt(x);
            if (players[i].socketId == socket.id) {
                this.playerBatIndex = i;
            } else {
                this.playerBats[i].x = players[i].playerPos[0];
                this.playerBats[i].y = players[i].playerPos[1];
            }
        }
        this.ball.moveSmooth(parseFloat(data["ballPos"][0]), parseFloat(data["ballPos"][1]));
        this.LastScoreP1 = players[0].score;
        this.LastScoreP2 = players[1].score;
        this.renderer.drawScores(data["players"][0].score, data["players"][1].score);
    }
    public moveOwnBat(y: number) {
        this.playerBats[this.playerBatIndex].y += y;
        this.setUpdatedOwnBatPos();
    }
    public setUpdatedOwnBatPos() {
        this.socketClient.sendPlayerPosUpdate(this.playerBats[this.playerBatIndex].x, this.playerBats[this.playerBatIndex].y);
    }

    public LastScoreP1: number = 0;
    public LastScoreP2: number = 0;
    private static renderLoop(): void {
        game.renderer.drawPlayArea();
        game.renderer.drawEntities(game.playerBats);
        game.renderer.drawEntity(game.ball);
        game.renderer.drawScores(game.LastScoreP1, game.LastScoreP2);
        window.requestAnimationFrame(Game.renderLoop);
    }
}
class Renderer {
    public canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor () {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    public drawEntities(entities: Entity[]) {
        for (let i = 0; i < entities.length; i++) {
            this.drawEntity(entities[i]);
        }
    }
    public drawEntity(entity: Entity) {
        this.ctx.fillStyle = entity.color;
        this.ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
    }
    public drawPlayArea() {
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
    }
    public drawScores(scoreP1: number, scoreP2: number) {
        this.ctx.textAlign = "start";
        this.ctx.font = "50px 'Press Start 2P'";
        this.ctx.fillText(pad(scoreP1, 2, '0'), this.canvas.width / 2 - 100, 55);
        this.ctx.fillText(pad(scoreP2, 2, '0'), this.canvas.width / 2 + 20, 55);
    }
}


const game = new Game();



function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}