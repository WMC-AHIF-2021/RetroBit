class MenuNavigator {
    constructor() {
        this.isVertical = false;
        this.registerUserEvents = () => {
            document.addEventListener("keydown", e => {
                if (!this.isVertical) {
                    if (e.key == "ArrowRight") {
                        this.selectNext();
                    }
                    else if (e.key == "ArrowLeft") {
                        this.selectPrevious();
                    }
                }
                else {
                    if (e.key == "ArrowDown") {
                        this.selectNext();
                    }
                    else if (e.key == "ArrowUp") {
                        this.selectPrevious();
                    }
                }
                if (e.key == "Enter") {
                    this.clickOnElement();
                }
            });
        };
        this.selectNext = () => {
            if (this.selectedIndex + 1 < this.menuElements.length) {
                this.selectedIndex++;
            }
            this.updateArrow();
        };
        this.selectPrevious = () => {
            if (this.selectedIndex - 1 >= 0) {
                this.selectedIndex--;
            }
            this.updateArrow();
        };
        this.updateArrow = () => {
            if (this.arrowElement == null) {
                this.arrowElement = new Image();
                this.arrowElement.src = "img/arrow.png";
                this.arrowElement.id = "navbarArrow";
            }
            let selectedElement = this.menuElements[this.selectedIndex];
            if (this.isVertical) {
                this.arrowElement.style.transform = "rotate(270deg)";
                this.arrowElement.style.left = (selectedElement.children[0].offsetLeft - 60) + "px";
                this.arrowElement.style.top = (selectedElement.offsetTop) + "px";
            }
            else {
                this.arrowElement.style.left = (selectedElement.offsetLeft + selectedElement.offsetWidth / 2 - 27.5) + "px";
                this.arrowElement.style.top = (selectedElement.offsetTop - 50) + "px";
            }
            this.navbar.append(this.arrowElement);
        };
        this.clickOnElement = () => {
            let selectedElement = this.menuElements[this.selectedIndex];
            if (selectedElement != null) {
                if (this.isVertical) {
                    window.location.href = selectedElement.children[0].href;
                }
                else {
                    window.location.href = selectedElement.href;
                }
            }
        };
        this.navbar = document.getElementById("navbar");
        if (this.navbar == null) {
            this.navbar = document.getElementById("verticalNavbar");
            this.isVertical = true;
        }
        this.menuElements = Array.prototype.slice.call(this.navbar.children);
        this.selectedIndex = 0;
        this.registerUserEvents();
    }
}
new MenuNavigator();
//# sourceMappingURL=menuNavigation.js.map