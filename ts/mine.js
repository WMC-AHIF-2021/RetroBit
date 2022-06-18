import { Field, BlocksType } from "./field.js";
export class Mine extends Field {
    constructor(status) {
        super(status);
        status = BlocksType.explosive;
        this.Status = status;
        this.Symbol = this.getSymbol();
    }
}
//# sourceMappingURL=mine.js.map