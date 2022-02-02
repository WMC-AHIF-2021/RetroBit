class ImageSlider {
    private imageElements: ImageSliderElement[] = [
        new ImageSliderElement("img/gallery/pong.png", "Pong", "Pong is a two-dimensional game, which simulates table tennis. <a href='history.html#pong_header'>More...</a>"),
        new ImageSliderElement("img/gallery/tetris.png", "Tetris", "The goal is to remove as many rows as possible by filling entire rows with the falling Tetriminos. <a href='history.html#tetris_header'>More...</a>"),
        new ImageSliderElement("img/gallery/minesweeper.png", "Minesweeper", "The player needs to open all fields without clicking on the mines while the opened fields show the count of fields with mines around them. <a href='history.html#minesweeper_header'>More...</a>")
    ];
    private currentImageIndex: number = 0;

    private htmlImage: HTMLImageElement;
    private htmlTextContainer: HTMLDivElement;

    constructor() {
        this.registerUserEvents();

        this.htmlImage = <HTMLImageElement>document.getElementById("sliderImg");
        this.htmlTextContainer = <HTMLDivElement>document.getElementById("text");

        this.update();
    }
    private registerUserEvents(): void {
        document.getElementById("nextButton").addEventListener("click", () => {
            this.next();
        })
        document.getElementById("previousButton").addEventListener("click", () => {
            this.previous();
        })
    }

    private next(): void {
        if (this.currentImageIndex + 1 < this.imageElements.length) {
            this.currentImageIndex++;
        } else {
            this.currentImageIndex = 0;
        }
        this.update();
    }
    private previous(): void {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
        } else {
            this.currentImageIndex = this.imageElements.length - 1;
        }
        this.update();
    }

    private update(): void {
        let currentImgEl = this.imageElements[this.currentImageIndex];
        this.htmlImage.src = currentImgEl.imgSrc;
        this.htmlTextContainer.innerHTML = `<h3>${currentImgEl.title}</h3><p>${currentImgEl.text}</p>`;
    }
}
class ImageSliderElement {
    public imgSrc: string;
    public title: string;
    public text: string;

    constructor(imgSrc, title, text) {
        this.imgSrc = imgSrc;
        this.title = title;
        this.text = text;
    }
}

new ImageSlider();