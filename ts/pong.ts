class Game {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private playerBat: PlayerBatEntity;
    private computerBat: ComputerBatEntity;
    private ball: BallEntity;

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");

        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        this.canvas = canvas;
        this.context = context;

        this.playerBat = new PlayerBatEntity(5, 500, 50, 200, "white");
        this.computerBat = new ComputerBatEntity(600, 500, 50, 200, "green");
        this.ball = new BallEntity(35, 50, 2, 2, "gray");

        this.redraw();
        this.createUserEvents();
    }

    private createUserEvents() {
        let canvas = this.canvas;

        canvas.addEventListener("keyup",this.keypressEventHandler);

        //document.getElementById("clear").addEventListener("click", this.clearEventHandler);
    }
    private keypressEventHandler(e) {
        if (e.keyCode == 38) { // up
            this.playerBat.move(0, 5)
        } else if (e.keyCode == 40) {
            this.playerBat.move(0, -5);
        }
        this.redraw();
    }

    private redraw() {
        this.playerBat.draw(this.context);
        this.computerBat.draw(this.context);
        this.ball.draw(this.context);
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

}

class BallEntity extends Entity {

}

new Game();