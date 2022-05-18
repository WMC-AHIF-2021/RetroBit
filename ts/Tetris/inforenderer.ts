export interface Score {
    id: number;
    score: string;
    time: string;
}

export class InfoRenderer {
    private scoreboard = document.getElementById("scoreboard");
    private currentScore = document.getElementById("currentScore");

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
}