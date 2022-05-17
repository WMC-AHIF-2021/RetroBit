import tetris, { GAMESIZE } from "./tetris.js";
export class Block {
    constructor() {
        this.orientation = -90;
        this.tiles = [];
        this.mainTile = new Tile(TBlock._startpos.col, TBlock._startpos.row);
        this.rotate();
    }
    move(dir) {
        switch (dir) {
            case Direction.Down:
                if (this.isAbleToMove()) {
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
    isAbleToMove() {
        for (let t of this.tiles) {
            if (t.row == GAMESIZE.height - 1 || tetris.game[t.col][t.row + 1].containsBlock) {
                return false;
            }
        }
        return true;
    }
    isAbleToRotate() {
        return !(this.mainTile.col - 1 < 0 || this.mainTile.col + 1 >= GAMESIZE.width);
    }
}
Block._startpos = { row: 1, col: 6 };
export class OBlock extends Block {
    constructor() {
        super();
        this.color = BlockColor.Yellow;
    }
    rotate() {
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
    rotate() {
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
    rotate() {
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
    rotate() {
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
    rotate() {
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
    rotate() {
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
    rotate() {
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
export var BlockColor;
(function (BlockColor) {
    BlockColor["Blue"] = "#0000ff";
    BlockColor["Black"] = "#000000";
    BlockColor["Cyan"] = "#00ffff";
    BlockColor["Yellow"] = "#ffff00";
    BlockColor["Purple"] = "#800080";
    BlockColor["Green"] = "#00ff00";
    BlockColor["Red"] = "#ff0000";
    BlockColor["Orange"] = "#ff7f00";
})(BlockColor || (BlockColor = {}));
export class Tile {
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.containsBlock = false;
        this.color = BlockColor.Black;
    }
}
export var Direction;
(function (Direction) {
    Direction[Direction["Down"] = 0] = "Down";
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Right"] = 2] = "Right";
})(Direction || (Direction = {}));
//# sourceMappingURL=blocks.js.map