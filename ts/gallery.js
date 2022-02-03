var ImageSlider = /** @class */ (function () {
    function ImageSlider() {
        this.imageElements = [
            new ImageSliderElement("img/gallery/pong.png", "Pong", "Pong is a two-dimensional game, which simulates table tennis. <a href='history.html#pong_header'>More...</a>"),
            new ImageSliderElement("img/gallery/tetris.png", "Tetris", "The goal is to remove as many rows as possible by filling entire rows with the falling Tetriminos. <a href='history.html#tetris_header'>More...</a>"),
            new ImageSliderElement("img/gallery/minesweeper.png", "Minesweeper", "The player needs to open all fields without clicking on the mines while the opened fields show the count of fields with mines around them. <a href='history.html#minesweeper_header'>More...</a>"),
            new ImageSliderElement("/img/gallery/MarioBros.png", "Super Mario Bros", "Mario Bros is the most famous Jump and Run game. In this game you control the main-character Mario, who is crossing many levels. Every level is differently and has a goal. </a>"),
            new ImageSliderElement("img/gallery/pac-man.png", "Pac-Man", "Pac-Man is a 2D-action game, which has a level system. In every level you steer Pac-Man, who collects little white-circles and is hunted by ghosts.</a>")
        ];
        this.currentImageIndex = 0;
        this.registerUserEvents();
        this.htmlImage = document.getElementById("sliderImg");
        this.htmlTextContainer = document.getElementById("text");
        this.update();
    }
    ImageSlider.prototype.registerUserEvents = function () {
        var _this = this;
        document.getElementById("nextButton").addEventListener("click", function () {
            _this.next();
        });
        document.getElementById("previousButton").addEventListener("click", function () {
            _this.previous();
        });
    };
    ImageSlider.prototype.next = function () {
        if (this.currentImageIndex + 1 < this.imageElements.length) {
            this.currentImageIndex++;
        }
        else {
            this.currentImageIndex = 0;
        }
        this.update();
    };
    ImageSlider.prototype.previous = function () {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
        }
        else {
            this.currentImageIndex = this.imageElements.length - 1;
        }
        this.update();
    };
    ImageSlider.prototype.update = function () {
        var currentImgEl = this.imageElements[this.currentImageIndex];
        this.htmlImage.src = currentImgEl.imgSrc;
        this.htmlTextContainer.innerHTML = "<h3>" + currentImgEl.title + "</h3><p>" + currentImgEl.text + "</p>";
    };
    return ImageSlider;
}());
var ImageSliderElement = /** @class */ (function () {
    function ImageSliderElement(imgSrc, title, text) {
        this.imgSrc = imgSrc;
        this.title = title;
        this.text = text;
    }
    return ImageSliderElement;
}());
new ImageSlider();
//# sourceMappingURL=gallery.js.map