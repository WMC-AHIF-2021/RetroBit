class MenuNavigator {
    private menuElements: HTMLElement[];
    private selectedIndex: number;

    private arrowElement: HTMLImageElement;
    private navbar: HTMLElement;

    constructor() {
        this.navbar = document.getElementById("navbar");
        this.menuElements = Array.prototype.slice.call(this.navbar.children);
        this.selectedIndex = 0;

        this.registerUserEvents();
    }
    private registerUserEvents = () => {
        document.addEventListener("keydown", e => {
            if (e.key == "ArrowRight") {
                this.selectNext();
            } else if (e.key == "ArrowLeft") {
                this.selectPrevious();
            } else if (e.key == "Enter") {
                this.clickOnElement();
            }
        })
    }

    private selectNext = () => {
        if (this.selectedIndex + 1 < this.menuElements.length) {
            this.selectedIndex++;
        }
        this.updateArrow();
    }
    private selectPrevious = () => {
        if (this.selectedIndex - 1 >= 0) {
            this.selectedIndex--;
        }
        this.updateArrow();
    }

    private updateArrow = () => {
        if (this.arrowElement == null) {
            this.arrowElement = new Image();
            this.arrowElement.src = "/img/arrow.png";
            this.arrowElement.id = "navbarArrow";
        }
        let selectedElement = this.menuElements[this.selectedIndex];
        this.arrowElement.style.left = (selectedElement.offsetLeft + selectedElement.offsetWidth/2 - 27.5) + "px";
        this.arrowElement.style.top = (selectedElement.offsetTop - 50) + "px";

        this.navbar.append(this.arrowElement);
    }

    private clickOnElement = () => {
        let selectedElement = this.menuElements[this.selectedIndex];
        if (selectedElement != null) {
            window.location.href = (<HTMLAnchorElement>selectedElement).href;
        }
    }
}

new MenuNavigator();