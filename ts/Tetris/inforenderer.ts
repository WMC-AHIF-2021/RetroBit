import {Block, BlockColor} from "./blocks.js";

export interface Score {
    name: string;
    score: string;
    time: string;
}

export class InfoRenderer {
    private scoreboard: HTMLTableElement = document.getElementById("scoreboard") as HTMLTableElement;
    private currentScore: HTMLHeadElement = document.getElementById("currentScore") as HTMLHeadElement;
    private image: HTMLImageElement = document.getElementById("nextBlock") as HTMLImageElement;

    constructor() {
        this.renderScoreboard().then(_ => {});
        InfoRenderer.checkAspectRatio();
    }

    public renderCurrentScore(score: number): void {
        this.currentScore.innerHTML = score.toString();
    }

    public renderNextBlock(block: Block): void {
        switch (block.color) {
            case BlockColor.Blue:
                this.image.src = "img/blocks/JBlock.PNG";
                break;
            case BlockColor.Cyan:
                this.image.src = "img/blocks/IBlock.png";
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

    private async renderScoreboard() {
        let input = await $.get("http://localhost:5000/api/scores");
        let scores = input.scores;
        let sort = (a: Score[]): Score[] => {
            for(let i = 0; i < a.length; i++){
                for(let j = 0; j < a.length - 1; j++){
                    if (parseInt(a[j].score) < parseInt(a[j + 1].score)){
                        let temp: Score = a[j];
                        a[j] = a[j + 1];
                        a[j + 1] = temp;
                    }
                }
            }
            return a;
        }
        scores = sort(scores);
        for (let i = 0; i < Math.min(scores.length, 10); i++) {
            let s: Score = scores[i];
            this.scoreboard.innerHTML +=
                `<tr>
                    <td>${s.name}</td>
                    <td>${s.score}</td>
                    <td>${s.time}</td>
                </tr>`;
        }
    }

    private static checkAspectRatio(): void{
        let warning: HTMLParagraphElement = document.getElementById("aspectwarning") as HTMLParagraphElement;
        let ratio = window.innerWidth / window.innerHeight;
        if (ratio === 1536 / 739 || ratio === 1536 / 864){
            warning.hidden = true;
        }
    }
}