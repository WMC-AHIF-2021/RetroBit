var ImageSlider = /** @class */ (function () {
    function ImageSlider() {
        this.imageElements = [
            new ImageSliderElement("img/gallery/tetris.png", "Tetris", "1969"),
            new ImageSliderElement("img/gallery/pong.png", "Pong", "ping pong pang pumm")
        ];
        this.currentImageIndex = 0;
        this.registerUserEvents();
        this.htmlImage = document.getElementById("sliderImg");
        this.htmlTextContainer = document.getElementById("text");
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