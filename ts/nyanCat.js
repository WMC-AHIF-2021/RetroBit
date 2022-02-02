function enableNyanCat() {
    document.getElementById("header").innerHTML = "NYAN CAT!!!";
    var body = document.getElementsByTagName("body")[0];
    body.style.animation = randomInRange(1, 2) + "s rainbowBg infinite linear";
    // noinspection JSIgnoredPromiseFromCall
    document.getElementById("nyanCatMusic").play();
    Array.prototype.slice.call(body.children).forEach(function (el) {
        el.style.animation = randomInRange(0.2, 2) + "s rotate infinite linear";
    });
}
function randomInRange(min, max) {
    return Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
}
//# sourceMappingURL=nyanCat.js.map