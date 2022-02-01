class ImageSlider {
    private imageElements: ImageSliderElement[] = [
        new ImageSliderElement("img/gallery/tetris.png", "Tetris", "1969"),
        new ImageSliderElement("img/gallery/pong.png", "Pong", "ping pong pang pumm")
    ];
    private currentImageIndex: number = 0;

    private htmlImage: HTMLImageElement;
    private htmlTextContainer: HTMLDivElement;

    constructor() {
        this.registerUserEvents();

        this.htmlImage = <HTMLImageElement>document.getElementById("sliderImg");
        this.htmlTextContainer = <HTMLDivElement>document.getElementById("text");
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