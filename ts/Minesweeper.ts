enum BlocksType{
    hidden,
    detect,
    explosive,
    flagged}

class DrawBlocks{
    private canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    private context = this.canvas.getContext("2d");
    public drawRoster(x, y) {
        this.context.beginPath();
        this.context.rect(x, y, 50, 50);
        this.context.stroke();
    }

    public MakeBlocHidden(x, y){
        this.context.fillStyle = "#888888";
        this.context.fillRect(x, y, 50, 50)
        this.context.stroke();
    }
}

class DefineBlocks{
    public blocks =
        [
            {Type : BlocksType.hidden, color : "grey"},
            {Type : BlocksType.explosive, color : "red"},
            {Type: BlocksType.flagged, color : "grey"},
            {Type: BlocksType.detect, color: "blue"}
        ]
}

let cringe = new DrawBlocks();
let x = 0;
let y = 0;
for (let d = 0; d < 10; d++) {
    for (let i = 0; i < 10; i++) {
        cringe.drawRoster(x, y);
        cringe.MakeBlocHidden(x, y);
        x = x + 50;
    }
    y = y + 50;
    x = 0; }
