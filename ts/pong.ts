class Options {
    public static winningPoints = 11;
    // computerSpeedRange should NOT BE FASTER than ballSpeedRange because then the bat becomes jittery
    public static computerSpeedRange = [6, 8];
    public static ballSpeedRange = [6, 8];

    public static computerBatHeight = 100;

    public static isMouseControl: boolean;

    public static difficultyIndex: number;

    public static setOptions = () => {
        // set difficulty
        let difficulty : number = parseInt((<HTMLInputElement>document.getElementById("options_difficultySelect")).value);
        switch (difficulty) {
            case 0:
                Options.computerSpeedRange = [4,6];
                Options.ballSpeedRange = [4,7];
                Options.computerBatHeight = 100;
                break;
            case 1:
                Options.computerSpeedRange = [6,8];
                Options.ballSpeedRange = [6,9];
                Options.computerBatHeight = 100;
                break;
            case 2:
                Options.computerSpeedRange = [8,10];
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
        this.difficultyIndex = difficulty;
        // set other options
        this.isMouseControl = (<HTMLInputElement>document.getElementById("options_enableMouseControl")).checked;
    }
}

class Game {
    private readonly canvas: HTMLCanvasElement;
    private readonly context: CanvasRenderingContext2D;

    public playerBat: PlayerBatEntity;
    public computerBat: ComputerBatEntity;
    private readonly ball: BallEntity;

    public pointsPlayer: number;
    public pointsComputer: number;

    private currentWinner: number;
    private isRunning: boolean;

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");
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

    private createUserEvents() {
        let canvas = this.canvas;
        canvas.addEventListener("keyup",this.keypressEventHandler);

        document.getElementById("options_submitButton").addEventListener("click", () => {
            this.startGame();
        })
    }
    private keypressEventHandler = (e) => {
        switch (e.keyCode) {
            case 38:
                this.playerBat.move(0, -50)
                break;
            case 40:
                this.playerBat.move(0, 50);
                break;
            case 32:
                // restart game if somebody has won and player presses space
                if (this.currentWinner != -1) {
                    this.restartGame();
                }
                break;
            case 13:
                // open difficulty window if somebody has won and player presses enter
                if (this.currentWinner != -1) {
                    this.stopGame();
                }
                break
            case 27:
                // terminate current game
                this.stopGame();
        }
        this.redraw();
    }

    private stopGame = () => {
        document.getElementById("options").style.visibility = "visible";
        let canvasEl = document.getElementById("canvas");
        canvasEl.style.visibility = "hidden";
        this.isRunning = false;
        this.restartGame();
    }

    private startGame = () => {
        Options.setOptions();
        document.getElementById("options").style.visibility = "hidden";
        let canvasEl = document.getElementById("canvas");
        canvasEl.style.visibility = "visible";
        setTimeout(() => {
            canvasEl.focus();
            this.ball.updateMovementSpeed();
            setTimeout(() => {
                this.computerBat.updateMovementSpeed();
            }, 500);
            this.computerBat = new ComputerBatEntity(this.canvas.width - 50, 50, 15, Options.computerBatHeight, "#ff901f");
            this.isRunning = true;
            if (Options.difficultyIndex == 5) {
                this.pointsPlayer = -9;
            } else {
                this.pointsPlayer = 0;
            }
        }, 1000);
    }

    private restartGame = () => {
        this.pointsComputer = 0;
        this.currentWinner = -1;
        this.pointsPlayer = 0;

        if (Options.difficultyIndex == 5) {
            this.pointsPlayer = -9;
        }
    }

    private gameLoop = () => {
        if (this.isRunning) {
            this.redraw();

            if (this.currentWinner == -1) {
                this.computerBat.update(this.ball);
                this.ball.update(this.canvas, this);
            }
            if (this.pointsPlayer >= Options.winningPoints) {
                this.currentWinner = 0;
            }
            if (this.pointsComputer >= Options.winningPoints) {
                this.currentWinner = 1;
            }

            if (Options.isMouseControl) {
                this.playerBat.Y = (Cursor._instance.Y / window.screen.height) * this.canvas.height;
            }

        }
        window.requestAnimationFrame(this.gameLoop);
    }


    private redraw() {
        this.clear();

        this.context.strokeStyle = "white";
        this.context.strokeRect(5,5,this.canvas.width - 10,this.canvas.height - 10);

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
        } else if (this.currentWinner == 1) {
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
    }

    private clear() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Entity {
    public X: number;
    public Y: number;
    public SizeX: number;
    public SizeY: number;

    public Color: string;

    constructor(x:number, y:number, sizeX:number, sizeY:number, color:string) {
        this.X = x;
        this.Y = y;
        this.SizeX = sizeX;
        this.SizeY = sizeY;
        this.Color = color;
    }

    public move(x:number, y:number) {
        this.X += x;
        this.Y += y;
    }

    public draw(ctx:CanvasRenderingContext2D) {
        ctx.fillStyle = this.Color;
        ctx.fillRect(this.X, this.Y, this.SizeX, this.SizeY);
    }
}

class PlayerBatEntity extends Entity {}

class ComputerBatEntity extends Entity {
    private movementSpeed: number = 4;

    private i:number = 0;
    public update(ball:BallEntity) {
        if (ball.Y > this.Y + this.SizeY/2) {
            this.Y += this.movementSpeed;
        } else if (ball.Y < this.Y + this.SizeY/2) {
            this.Y -= this.movementSpeed;
        }
        this.i++;
        if (this.i % 200 == 0) {
            this.updateMovementSpeed();
            this.i = 0;
        }
    }
    public updateMovementSpeed() {
        this.movementSpeed = getRandomInt(Options.computerSpeedRange[0], Options.computerSpeedRange[1]);
    }
}

class BallEntity extends Entity {
    private currentDirX: number = 1;
    private currentDirY: number = 1;

    private movementSpeed: number = 7;

    public update(canvas:HTMLCanvasElement, game:Game) {
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
    }
    private lost(canvas:HTMLCanvasElement) {
        this.currentDirX = getRandomIntWithoutZero(-1, 1);
        this.currentDirY = getRandomIntWithoutZero(-1, 1);
        this.updateMovementSpeed();
        this.Y = canvas.height / 2;
        if (this.currentDirX < 0){
            this.X = 3 * canvas.width / 4;
        }
        else{
            this.X = canvas.width / 4;
        }
    }
    public updateMovementSpeed() {
        this.movementSpeed = getRandomInt(Options.ballSpeedRange[0], Options.ballSpeedRange[1]);
    }
}

new Game();

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
    let lastResult = 0;
    while(lastResult == 0) {
        lastResult = getRandomInt(min-1,max+1);
    }
    return lastResult;
}