var MenuNavigator = /** @class */ (function () {
    function MenuNavigator() {
        var _this = this;
        this.isVertical = false;
        this.registerUserEvents = function () {
            document.addEventListener("keydown", function (e) {
                if (!_this.isVertical) {
                    if (e.key == "ArrowRight") {
                        _this.selectNext();
                    }
                    else if (e.key == "ArrowLeft") {
                        _this.selectPrevious();
                    }
                }
                else {
                    if (e.key == "ArrowDown") {
                        _this.selectNext();
                    }
                    else if (e.key == "ArrowUp") {
                        _this.selectPrevious();
                    }
                }
                if (e.key == "Enter") {
                    _this.clickOnElement();
                }
            });
        };
        this.selectNext = function () {
            if (_this.selectedIndex + 1 < _this.menuElements.length) {
                _this.selectedIndex++;
            }
            _this.updateArrow();
        };
        this.selectPrevious = function () {
            if (_this.selectedIndex - 1 >= 0) {
                _this.selectedIndex--;
            }
            _this.updateArrow();
        };
        this.updateArrow = function () {
            if (_this.arrowElement == null) {
                _this.arrowElement = new Image();
                _this.arrowElement.src = "/img/arrow.png";
                _this.arrowElement.id = "navbarArrow";
            }
            var selectedElement = _this.menuElements[_this.selectedIndex];
            if (_this.isVertical) {
                _this.arrowElement.style.transform = "rotate(270deg)";
                _this.arrowElement.style.left = (selectedElement.children[0].offsetLeft - 60) + "px";
                _this.arrowElement.style.top = (selectedElement.offsetTop) + "px";
            }
            else {
                _this.arrowElement.style.left = (selectedElement.offsetLeft + selectedElement.offsetWidth / 2 - 27.5) + "px";
                _this.arrowElement.style.top = (selectedElement.offsetTop - 50) + "px";
            }
            _this.navbar.append(_this.arrowElement);
        };
        this.clickOnElement = function () {
            var selectedElement = _this.menuElements[_this.selectedIndex];
            if (selectedElement != null) {
                if (_this.isVertical) {
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
    return MenuNavigator;
}());
new MenuNavigator();
//# sourceMappingURL=menuNavigation.js.map