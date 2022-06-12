import tetris, {GAMESIZE} from "./tetris.js";

export abstract class Block {
    public color: BlockColor;
    public tiles: Tile[] = [];
    protected orientation: number = -90;
    protected static startpos = {row: 1, col: 6};
    protected mainTile: Tile;
    protected firstTime = true;

    protected constructor() {
        this.mainTile = new Tile(TBlock.startpos.col, TBlock.startpos.row);
        this.rotate();
    }

    public move(dir: Direction): void {
        switch (dir) {
            case Direction.Down:
                if (this.isAbleToFall()) {
                    for (let t of this.tiles) {
                        t.row++;
                    }
                }
                return;
            case Direction.Left:
                for (let t of this.tiles) {
                    if (t.col - 1 < 0 || tetris.game[t.col - 1][t.row].containsBlock) {
                        return;
                    }
                }
                for (let t of this.tiles) {
                    t.col--;
                }
                return;
            case Direction.Right:
                for (let t of this.tiles) {
                    if (t.col + 1 > GAMESIZE.width - 1 || tetris.game[t.col + 1][t.row].containsBlock) {
                        return;
                    }
                }
                for (let t of this.tiles) {
                    t.col++;
                }
                return;
        }
    }

    public isAbleToFall(): boolean {
        for (let t of this.tiles) {
            if (t.row == GAMESIZE.height - 1 || tetris.game[t.col][t.row + 1].containsBlock) {
                return false;
            }
        }
        return true;
    }

    abstract rotate(): void;

    protected isAbleToRotate(): boolean {
        if (this.mainTile.col - 1 < 0 || this.mainTile.col + 1 >= GAMESIZE.width) {
            this.firstTime = false;
            return false;
        }
        if (this.firstTime){
            this.firstTime = false;
            return true;
        }
        for (let col = -1; col < 2; col++){
            for (let row = -1; row < 2; row++){
                if (row !== 1 && col !== 1){
                    if (tetris.game[this.mainTile.col + col][this.mainTile.row + row].containsBlock){
                        return false;
                    }
                }
            }
        }
        return true;
    }
}

export class OBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Yellow;
    }

    public rotate(): void {
        if (!this.isAbleToRotate()) {
            return;
        }
        this.orientation += 90;
        if (this.orientation == 360) {
            this.orientation = 0;
        }
        this.tiles = [];
        this.tiles.push(this.mainTile);
        switch (this.orientation) {
            case 0:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row + 1));
                break;
            case 90:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row + 1));
                break;
            case 180:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row + 1));
                break;
            case 270:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row + 1));
                break;
        }
    }
}

export class TBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Purple;
    }

    public rotate(): void {
        if (!this.isAbleToRotate()) {
            return;
        }
        this.orientation += 90;
        if (this.orientation == 360) {
            this.orientation = 0;
        }
        this.tiles = [];
        this.tiles.push(this.mainTile);
        switch (this.orientation) {
            case 0:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                break;
            case 90:
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                break;
            case 180:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                break;
            case 270:
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                break;
        }
    }
}

export class IBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Cyan;
    }

    public rotate(): void {
        if (!this.isAbleToRotate()) {
            return;
        }
        this.orientation += 90;
        if (this.orientation == 360) {
            this.orientation = 0;
        }
        this.tiles = [];
        this.tiles.push(this.mainTile);
        switch (this.orientation) {
            case 0:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 2));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                break;
            case 90:
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 2, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                break;
            case 180:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 2));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                break;
            case 270:
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 2, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                break;
        }
    }
}

export class LBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Orange;
    }

    public rotate(): void {
        if (!this.isAbleToRotate()) {
            return;
        }
        this.orientation += 90;
        if (this.orientation == 360) {
            this.orientation = 0;
        }
        this.tiles = [];
        this.tiles.push(this.mainTile);
        switch (this.orientation) {
            case 0:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row + 1));
                break;
            case 90:
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row + 1));
                break;
            case 180:
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                break;
            case 270:
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row - 1));
                break;
        }
    }
}

export class JBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Blue;
    }

    public rotate(): void {
        if (!this.isAbleToRotate()) {
            return;
        }
        this.orientation += 90;
        if (this.orientation == 360) {
            this.orientation = 0;
        }
        this.tiles = [];
        this.tiles.push(this.mainTile);
        switch (this.orientation) {
            case 0:
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                break;
            case 90:
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row - 1));
                break;
            case 180:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row - 1));
                break;
            case 270:
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row + 1));
                break;
        }
    }
}

export class SBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Red;
    }

    public rotate(): void {
        if (!this.isAbleToRotate()) {
            return;
        }
        this.orientation += 90;
        if (this.orientation == 360) {
            this.orientation = 0;
        }
        this.tiles = [];
        this.tiles.push(this.mainTile);
        switch (this.orientation) {
            case 0:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                break;
            case 90:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row + 1));
                break;
            case 180:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row));
                break;
            case 270:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row + 1));
                break;
        }
    }
}

export class ZBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Green;
    }

    public rotate(): void {
        if (!this.isAbleToRotate()) {
            return;
        }
        this.orientation += 90;
        if (this.orientation == 360) {
            this.orientation = 0;
        }
        this.tiles = [];
        this.tiles.push(this.mainTile);
        switch (this.orientation) {
            case 0:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                break;
            case 90:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row - 1));
                break;
            case 180:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col - 1, this.mainTile.row - 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                break;
            case 270:
                this.tiles.push(new Tile(this.mainTile.col, this.mainTile.row + 1));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row));
                this.tiles.push(new Tile(this.mainTile.col + 1, this.mainTile.row - 1));
                break;
        }
    }
}

export enum BlockColor {
    Blue = "#0000ff",
    Black = "#000000",
    Cyan = "#00ffff",
    Yellow = "#ffff00",
    Purple = "#800080",
    Green = "#00ff00",
    Red = "#ff0000",
    Orange = "#ff7f00"
}

export class Tile {
    public containsBlock: boolean = false;
    public color: BlockColor = BlockColor.Black;

    constructor(public col: number, public row: number) {

    }
}

export enum Direction {
    Down,
    Left,
    Right
}