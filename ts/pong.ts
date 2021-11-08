class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public playerBat: PlayerBatEntity;
    public computerBat: ComputerBatEntity;
    private ball: BallEntity;

    public pointsPlayer: number;
    public pointsComputer: number;

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");

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

    private createUserEvents() {
        let canvas = this.canvas;

        canvas.addEventListener("keyup",this.keypressEventHandler);

        //document.getElementById("clear").addEventListener("click", this.clearEventHandler);
    }
    private keypressEventHandler = (e) => {
        if (e.keyCode == 38) { // up
            this.playerBat.move(0, -50)
        } else if (e.keyCode == 40) {
            this.playerBat.move(0, 50);
        }
        this.redraw();
    }


    private gameLoop = () => {
        this.redraw();

        this.computerBat.update(this.ball);
        this.ball.update(this.canvas, this);

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

        this.context.font = "40px 'Press Start 2P'";
        this.context.fillText(pad(this.pointsPlayer, 2, '0'), this.canvas.width / 2 - 100, 55);
        this.context.fillText(pad(this.pointsComputer, 2, '0'), this.canvas.width / 2 + 20, 55);
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

class PlayerBatEntity extends Entity {
    
}

class ComputerBatEntity extends Entity {
    private movementSpeed: number = 4;

    private i:number = 0;
    public update(ball:BallEntity) {
        if (ball.Y > this.Y) {
            this.Y += this.movementSpeed;
        } else if (ball.Y < this.Y) {
            this.Y -= this.movementSpeed;
        }
        this.i++;
        if (this.i % 20 == 0) {
            this.movementSpeed = getRandomArbitrary(5, 8);
            this.i = 0;
        }
    }
}

class BallEntity extends Entity {
    private currentDirX: number = 1;
    private currentDirY: number = 1;

    private movementSpeed: number = 7;

    public update(canvas:HTMLCanvasElement, game:Game) {
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
    }
    private lost(game:Game, canvas:HTMLCanvasElement) {
        this.X = canvas.width / 2;
        this.Y = canvas.height / 2;

        this.currentDirX = getRandomIntWithoutZero(-1, 1);
        this.currentDirY = getRandomIntWithoutZero(-1, 1);
    }
}

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
    while(lastResult == 0) {
        lastResult = getRandomInt(min-1,max+1);
    }
    return lastResult;
}