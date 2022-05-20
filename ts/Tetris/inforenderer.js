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
            let scores = yield $.get("http://localhost:3000/scores/");
            scores.sort((a, b) => {
                if (parseInt(a.score) > parseInt(b.score))
                    return -1;
                else if (parseInt(a.score) < parseInt(b.score))
                    return 1;
                return 0;
            });
            let counter = 0;
            for (let s of scores) {
                this.scoreboard.innerHTML += `<tr>
                        <td>${++counter}</td>
                        <td>${s.score}</td>
                        <td>${s.time}</td>
                    </tr>`;
            }
        });
    }
}
//# sourceMappingURL=inforenderer.js.map