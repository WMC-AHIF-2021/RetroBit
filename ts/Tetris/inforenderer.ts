import {Block, BlockColor} from "./blocks.js";

export interface Score {
    id: number;
    score: string;
    time: string;
}

export class InfoRenderer {
    private scoreboard = document.getElementById("scoreboard");
    private currentScore = document.getElementById("currentScore");
    private image: HTMLImageElement = document.getElementById("nextBlock") as HTMLImageElement;

    constructor() {
        this.renderScoreboard().then(_ => {});
    }

    private async renderScoreboard() {
        let scores = <Score[]><unknown>await $.get("http://localhost:3000/scores/");
        scores.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        })
        let counter = 0;
        for (let s of scores) {
            this.scoreboard.innerHTML += `<tr>
                        <td>${counter++}</td>
                        <td>${s.score}</td>
                        <td>${s.time}</td>
                    </tr>`;
        }
    }

    public renderCurrentScore(score: number): void{
        this.currentScore.innerHTML = score.toString();
    }

    public renderNextBlock(block: Block): void {
        switch (block.color){
            case BlockColor.Blue:
                this.image.src = "img/blocks/JBlock.PNG";
                break;
            case BlockColor.Cyan:
                this.image.src = "img/blocks/IBlock.PNG";
                break;
            case BlockColor.Yellow:
                this.image.src = "img/blocks/OBlock.PNG";
                break;
            case BlockColor.Purple:
                this.image.src = "img/blocks/TBlock.PNG";
                break;
            case BlockColor.Green:
                this.image.src = "img/blocks/ZBlock.PNG";
                break;
            case BlockColor.Red:
                this.image.src = "img/blocks/SBlock.PNG";
                break;
            case BlockColor.Orange:
                this.image.src = "img/blocks/LBlock.PNG";
                break;

        }
    }
}