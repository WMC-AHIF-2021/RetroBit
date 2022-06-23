var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BlockColor } from "./blocks.js";
export class InfoRenderer {
    constructor() {
        this.scoreboard = document.getElementById("scoreboard");
        this.currentScore = document.getElementById("currentScore");
        this.image = document.getElementById("nextBlock");
        this.renderScoreboard().then(_ => { });
        InfoRenderer.checkAspectRatio();
    }
    renderCurrentScore(score) {
        this.currentScore.innerHTML = score.toString();
    }
    renderNextBlock(block) {
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
    renderScoreboard() {
        return __awaiter(this, void 0, void 0, function* () {
            InfoRenderer.data = yield $.ajax({
                url: "http://45.85.219.167:5000/tetrisScores",
                type: 'GET'
            });
            let scores = InfoRenderer.data;
            let sort = (a) => {
                for (let i = 0; i < a.length; i++) {
                    for (let j = 0; j < a.length - 1; j++) {
                        if (parseInt(a[j].score) < parseInt(a[j + 1].score)) {
                            let temp = a[j];
                            a[j] = a[j + 1];
                            a[j + 1] = temp;
                        }
                    }
                }
                return a;
            };
            scores = sort(scores);
            for (let i = 0; i < Math.min(scores.length, 10); i++) {
                let s = scores[i];
                this.scoreboard.innerHTML +=
                    `<tr>
                    <td>${s.name}</td>
                    <td>${s.score}</td>
                    <td>${s.time}</td>
                </tr>`;
            }
        });
    }
    static checkAspectRatio() {
        let warning = document.getElementById("aspectwarning");
        let ratio = window.innerWidth / window.innerHeight;
        if (ratio === 1536 / 739 || ratio === 1536 / 864) {
            warning.hidden = true;
        }
    }
}
//# sourceMappingURL=inforenderer.js.map