import {Field, BlocksType} from "./field.js";

export class Mine extends Field {
    Status: BlocksType;

    constructor(status: BlocksType) {
        super(status);
        status = BlocksType.explosive;
        this.Status = status;
        this.Symbol = this.getSymbol();
    }
}