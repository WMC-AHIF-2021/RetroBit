var Menu = /** @class */ (function () {
    function Menu() {
        var _this = this;
        /*private keypressEventHandler = (e) => {
            if (e.keyCode == 38) { // up
                this.playerBat.move(0, -50)
            } else if (e.keyCode == 40) {
                this.playerBat.move(0, 50);
            }
            this.redraw();
        }*/
        this.gameLoop = function () {
            _this.redraw();
            window.requestAnimationFrame(_this.gameLoop);
        };
        var canvas = document.getElementById('main');
        var context = canvas.getContext("2d");
        var cursor = new Cursor();
        canvas.focus();
        this.redraw();
        this.createUserEvents();
        window.requestAnimationFrame(this.gameLoop);
    }
    Menu.prototype.createUserEvents = function () {
        var canvas = this.canvas;
        //canvas.addEventListener("keyup",this.keypressEventHandler);
        //document.getElementById("clear").addEventListener("click", this.clearEventHandler);
    };
    Menu.prototype.redraw = function () {
        this.clear();
        this.context.strokeStyle = "white";
        this.context.strokeRect(5, 5, this.canvas.width - 10, this.canvas.height - 10);
        // entities
        this.cursor.draw(this.context);
        this.context.font = "40px 'Press Start 2P'";
        this.context.fillStyle = 'white';
        this.context.fillText("RETROBIT", 10, 10);
        this.context.fillText("Select", 100, 100);
    };
    Menu.prototype.clear = function () {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return Menu;
}());
var Cursor = /** @class */ (function () {
    function Cursor() {
    }
    Cursor.prototype.draw = function (ctx) {
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0);
        };
        image.src = "../img/selector.png";
    };
    return Cursor;
}());
new Menu();
//# sourceMappingURL=main.js.map