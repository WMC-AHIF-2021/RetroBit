import {field} from "./Minesweeper.js";
import {Field, BlocksType} from "./field.js";
import {Mine} from "./mine.js";

export class Renderer {

    private canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");

    public drawRoster(x, y) {
        this.context.beginPath();
        this.context.rect(x, y, 50, 50);
        this.context.stroke();
    }

    public MakeBlocHidden(x, y) {
        this.context.fillStyle = "#888888";
        this.context.fillRect(x, y, 50, 50)
        this.context.stroke();
    }

    MakeBlocFlagged(x, y){
        this.context.fillStyle = "#0000ff";
        this.context.fillRect(x*50+1, y*50+1, 48, 48);
        this.context.stroke();
    }


    private getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    public RevealField(Fields: Array<Field>[]): void {
        let x: number = 0;
        let y: number = 0;
        for (let i = 0; i < Fields.length; i++) {
            x = 0;

            for (let j = 0; j < Fields.length; j++) {

                let text: string;
                if (Fields[i][j].Status === BlocksType.explosive) {

                    text = Fields[i][j].Symbol;

                } else {
                    this.context.fillStyle = '#000000';
                    if (Fields[i][j].BombCount != 0) {
                        text = Fields[i][j].BombCount.toString();
                    } else {
                        text = "";
                    }
                }
                this.context.font = '50px serif'

                this.context.fillText(text, x + 5, y + 40, 50);
                this.context.stroke();
                x = x + 50;
            }
            y = y + 50;
        }
    }

    public Create2dArray(fieldCount: number, bombCount: number): Field[][] {
        let Blocks: Field[][] = [];
        for (let i = 0; i < fieldCount; i++) {
            Blocks.push([]);

            for (let j = 0; j < fieldCount; j++) {
                Blocks[i][j] = new Field(BlocksType.hidden);
            }
        }

        while (bombCount > 0) {
            let randomX: number = Math.floor(Math.random() * 10);
            let randomY: number = Math.floor(Math.random() * 10);

            if (Blocks[randomY][randomX].Status === BlocksType.hidden) {
                Blocks[randomY][randomX] = new Mine(BlocksType.explosive);
                bombCount = bombCount - 1;
            }
        }
        return Blocks;
    }

    public GiveBlocksNumbers(): void {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j].Status != BlocksType.explosive) {
                    this.CheckBombsAround(i, j);
                }
            }
        }
    }

    private CheckBombsAround(y: number, x: number): void {
        let XCoordinate: number = x - 1;
        let YCoordinate: number = y - 1;

        let XMax: number = x + 1;
        let YMax: number = y + 1;

        if (XCoordinate < 0) {
            XCoordinate = x;

        }
        if (YCoordinate < 0) {
            YCoordinate = y;
        }
        if (XMax >= field.length) {
            XMax = x;
        }
        if (YMax >= field.length) {
            YMax = y;
        }
        for (let i = YCoordinate; i <= YMax; i++) {
            for (let j = XCoordinate; j <= XMax; j++) {
                if (field[i][j].Status == BlocksType.explosive) {
                    field[y][x].BombCount++;
                    field[y][x].Status = BlocksType.detect;
                }
            }
        }
    }

    public AllFieldRevealed(): boolean
    {
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field.length; j++) {
                if (field[i][j].Revealed === false) {
                    return false;
                }
            }
        }
        return true;
    }
}
