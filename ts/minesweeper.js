var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Field, BlocksType } from "./field.js";
import { Renderer } from "./renderer.js";
let totalTime = 0;
export let field;
let allowClick = true;
let renderer = new Renderer();
function buttonHandler() {
    document.getElementById('reloadGame').onclick = function () {
        window.location.reload();
    };
}
function sorting(dataScore) {
    for (let i = 0; i < dataScore.length; i++) {
        for (let j = i; j < dataScore.length; j++) {
            if (dataScore[i].score > dataScore[j].score) {
                let temp = dataScore[i];
                dataScore[i] = dataScore[j];
                dataScore[j] = temp;
            }
        }
    }
    return dataScore;
}
function getDataTable() {
    let table = document.getElementById("HighScoresTable");
    $.get("http://45.85.219.167:5000/pongScores", function (data) {
        let sort = sorting(data);
        for (let i = 0; i < 10; i++) {
            table.innerHTML +=
                (`<tr>
                    <td>${data[i].score}</td>
                    <td>${data[i].time}</td>
                 </tr>`);
        }
    });
}
function deleteAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield $.get("http://45.85.219.167:5000/pongScores", function (data) {
            $.ajax({
                url: "http://45.85.219.167:5000/pongScores",
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify(data)
            });
        });
    });
}
let x = 0;
let y = 0;
for (let d = 0; d < 10; d++) {
    for (let i = 0; i < 10; i++) {
        renderer.drawRoster(x, y);
        renderer.MakeBlocHidden(x, y);
        x = x + 50;
    }
    y = y + 50;
    x = 0;
}
field = renderer.Create2dArray(10, 10);
renderer.GiveBlocksNumbers();
function findEmptyFields(x, y, context) {
    let XCoordinate = x - 1;
    let YCoordinate = y - 1;
    let XMax = x + 1;
    let YMax = y + 1;
    if (XCoordinate < 0) {
        XCoordinate = x;
    }
    if (YCoordinate < 0) {
        YCoordinate = y;
    }
    if (XMax >= field.length) {
        XMax = x;
    }
    if (YMax >= field.length) {
        YMax = y;
    }
    for (let i = YCoordinate; i <= YMax; i++) {
        for (let j = XCoordinate; j <= XMax; j++) {
            if (field[i][j].BombCount == 0 && !field[i][j].Revealed) {
                field[i][j].Revealed = true;
                context.fillRect(j * 50 + 1, i * 50 + 1, 48, 48);
                findEmptyFields(j, i, context);
            }
        }
    }
}
function writeOnBlock(x, y, context, text) {
    context.font = '50px serif';
    context.fillText(text, (x * 50) + 5, (y * 50) + 40, 50);
    context.stroke();
}
function PostResults(score) {
    let d = new Date();
    let data = {
        "score": score,
        "time": `${d.toLocaleDateString("en-GB")}`
    };
    jQuery.ajax({
        url: "http://45.85.219.167:5000/pongScores",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
}
document.getElementById("myCanvas").addEventListener("mousedown", (e) => {
    let time = performance.now();
    if (!allowClick) {
        renderer.RevealField(field);
        return;
    }
    const gamestate = document.getElementById("gameState");
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    const canvasPos = canvas.getBoundingClientRect();
    console.log(e.clientX, e.clientY);
    console.log(canvasPos.top, canvasPos.right, canvasPos.bottom, canvasPos.left);
    let x = e.clientX - Math.round(canvasPos.left);
    let y = e.clientY - Math.round(canvasPos.top);
    console.log(x, y);
    x = Math.floor(x / 50);
    y = Math.floor(y / 50);
    console.log(x, y);
    let text;
    //right click
    if (e.button === 2) {
        field[y][x] = new Field(BlocksType.Flagged);
        renderer.MakeBlocFlagged(x, y);
        field[y][x].Revealed = true;
        text = field[y][x].Symbol;
    }
    else if (field[y][x].Status !== BlocksType.Flagged) {
        if (field[y][x].Status === BlocksType.explosive) {
            text = field[y][x].Symbol;
            renderer.RevealField(field);
            allowClick = false;
            gamestate.innerText = "You loose!";
            document.getElementById("Time").innerHTML = ("<p>Time: </p>" + totalTime);
        }
        else {
            field[y][x].Revealed = true;
            context.fillStyle = "#000000";
            if (field[y][x].BombCount != 0) {
                text = field[y][x].BombCount.toString();
            }
            else {
                text = "";
                context.fillStyle = "#aba3a3";
                findEmptyFields(x, y, context);
                context.fillRect(x * 50 + 1, y * 50 + 1, 48, 48);
            }
        }
    }
    if (text != undefined) {
        writeOnBlock(x, y, context, text);
    }
    let gameFinished = renderer.AllFieldRevealed();
    if (gameFinished === true) {
        allowClick = false;
        renderer.RevealField(field);
        document.getElementById("Time").innerHTML = ("<p>Time: </p>" + totalTime);
        PostResults(totalTime);
        gamestate.innerText = "You Won!";
    }
    totalTime = totalTime + (Math.round(time / 1000));
});
getDataTable();
buttonHandler();
//deleteAllData(); geht nicht
//# sourceMappingURL=minesweeper.js.map