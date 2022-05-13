let tetris: TetrisGame;
class TetrisGame{
    private renderer: Renderer = new Renderer();
    public game: Tile[][] = [];
    public currentBlock: Block;

    constructor() {
        this.initGameArray();
        this.addBlock();
        this.start();
    }

    public start(): void{
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft"){
                this.currentBlock.move(Direction.Left);
            }
            if (e.code === "ArrowRight"){
                this.currentBlock.move(Direction.Right);
            }
            if (e.code === "ArrowDown"){
                this.currentBlock.move(Direction.Down);
            }
        })
        this.startGameLoop();
    }

    public addBlock(): void{
        this.currentBlock = new OBlock();
    }

    private initGameArray(): void{
        for (let col = 0; col < 25; col++){
            this.game[col] = [];
            for (let row = 0; row < 25; row++){
                this.game[col].push(new Tile(row, col));
            }
        }
    }

    public nextFrame(): void{
        if (this.currentBlock.isAbleToMove()){
            this.currentBlock.move(Direction.Down);
        }
        else{
            for (let t of this.currentBlock.tiles){
                this.game[t.col][t.row].containsBlock = true;
                this.game[t.col][t.row].color = this.currentBlock.color;
            }
            this.addBlock();
        }
    }

    private startGameLoop(): void {
        setInterval(() => {
            this.renderer.clearCanvas();
            this.renderer.render();
        }, 1000 / 60);
        setInterval(() => {
            this.nextFrame();
        }, 500);
    }
}


class Renderer{
    private static SCALINGFACTOR: number = 40;
    private canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");
    public constructor(){
        this.canvas.style.visibility = "visible";
        this.canvas.focus();
    }

    public render(): void{
        this.renderLeft();
        this.renderRight();
        this.renderGame();
    }

    private renderLeft(): void{
        this.context.beginPath();
        this.context.moveTo(500, 0);
        this.context.lineTo(500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
        this.context.fillStyle = "white";
        this.context.font = "42px 'Press Start 2P'";
        this.context.fillText("Highscores", 34,48);
    }

    private renderRight(): void{
        this.context.beginPath();
        this.context.moveTo(1500, 0);
        this.context.lineTo(1500, 1000);
        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 10;
        this.context.stroke();
    }

    private renderGame(): void{
        for (let col = 0; col < 25; col++) {
            for (let row = 0; row < 25; row++) {
                this.context.beginPath();
                this.context.lineWidth = 15;
                this.context.fillStyle = tetris.game[col][row].color;
                this.context.fillRect(col * Renderer.SCALINGFACTOR + 500, row * Renderer.SCALINGFACTOR, 40, 40);
                this.context.stroke();
            }
        }
        this.renderBlock(tetris.currentBlock);
    }

    public clearCanvas(): void{
        this.context.clearRect(0, 0, 2000, 1000);
    }

    private renderBlock(block: Block): void{
        for (let t of block.tiles){
            this.context.beginPath();
            this.context.lineWidth = 10;
            this.context.fillStyle = block.color;
            this.context.fillRect(t.col * Renderer.SCALINGFACTOR + 500,t.row * Renderer.SCALINGFACTOR,40, 40);
            this.context.stroke();
        }
    }
}

class Tile{
    public containsBlock: boolean = false;
    public color: BlockColor = BlockColor.Black;
    constructor(public row: number, public col: number) {

    }
}

abstract class Block{
    protected static _startpos = {row: 0, col: 12};
    protected orientation: number = 0;
    protected mainTile: Tile;
    public color: BlockColor;
    public tiles: Tile[] = [];

    public move(dir: Direction): void{
        if (this.isAbleToMove()){
            switch(dir){
                case Direction.Down:
                    for (let t of this.tiles){
                        t.row++;
                    }
                    break;
                case Direction.Left:
                    for (let t of this.tiles){
                        if (t.col - 1 < 0){
                            return;
                        }
                    }
                    for (let t of this.tiles){
                        t.col--;
                    }
                    break;
                case Direction.Right:
                    for (let t of this.tiles){
                        if (t.col + 1 >= 25){
                            return;
                        }
                    }
                    for (let t of this.tiles){
                        t.col++;
                    }
                    break;
            }
        }
        else {
            console.log("false")
        }
    }

    public isAbleToMove(): boolean{
        let game = tetris.game;
        for (let t of this.tiles){
            if (t.row == 24){
                return false;
            }
        }
        for (let col = 0; col < 25; col++){
            for (let row = 0; row < 24; row++){
                for (let t of this.tiles){
                    if (game[col][row + 1].containsBlock && game[col][row].col == t.col && game[col][row].row + 1 == t.row){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    abstract rotate(): void;
}

class OBlock extends Block{
    constructor() {
        super();
        this.color = BlockColor.Blue;
        this.rotate();
    }

    public rotate(): void {
        switch (this.orientation) {
            case 0:
                    this.tiles.push(new Tile(OBlock._startpos.row, OBlock._startpos.col));
                    this.mainTile = this.tiles[0];
                    this.tiles.push(new Tile(OBlock._startpos.row , OBlock._startpos.col + 1));
                    this.tiles.push(new Tile(OBlock._startpos.row + 1, OBlock._startpos.col));
                    this.tiles.push(new Tile(OBlock._startpos.row + 1, OBlock._startpos.col + 1));
                break;
            case 90:

                break;
            case 180:

                break;
            case 270:

                break;
        }
    }
}

enum BlockColor{
    Blue = "#0000ff",
    Black ="#000000"
    /*
    Cyan = "#00ffff",
    Yellow = "#ffff00",
    Purple = "#800080",
    Green = "#00ff00",
    Red = "#ff0000",
    Orange = "#ff7f00"
     */
}

enum Direction{
    Down,
    Left,
    Right
}

tetris = new TetrisGame();