export enum BlocksType {
    hidden,
    detect,
    explosive,
    Flagged
}

export class Field {
    Status: BlocksType;
    BombCount: number;
    Symbol: string;
    Revealed: boolean;

    public constructor(status: BlocksType) {
        if (status != BlocksType.explosive) {
            this.Status = status;
            this.BombCount = 0;
            this.Revealed = false;
        } else {
            this.Revealed = true;
        }

        this.Symbol = this.getSymbol();
    }

    public getSymbol(): string {
        if (this.Status == BlocksType.explosive) {
            return '💣';
        } else if (this.Status == BlocksType.Flagged) {
            return '🏴';
        }
    }
}