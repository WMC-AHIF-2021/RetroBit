document.getElementById("warning").hidden = true;
function enableNyanCat() {
    document.getElementById("header").innerHTML = "NYAN CAT!!!";
    let body = document.getElementsByTagName("body")[0];
    body.style.animation = randomInRange(1, 2) + "s rainbowBg infinite linear";
    // noinspection JSIgnoredPromiseFromCall
    document.getElementById("nyanCatMusic").play();
    Array.prototype.slice.call(body.children).forEach(el => {
        el.style.animation = randomInRange(0.2, 2) + "s rotate infinite linear";
    });
    document.getElementById("warning").hidden = false;
}
function disableNyanCat() {
    document.getElementById("header").innerHTML = "RETROBIT";
    let body = document.getElementsByTagName("body")[0];
    body.style.animation = "";
    document.getElementById("nyanCatMusic").pause();
    Array.prototype.slice.call(body.children).forEach(el => {
        el.style.animation = "";
    });
    document.getElementById("warning").hidden = true;
}
document.addEventListener("keydown", e => {
    if (e.key == "Escape") {
        disableNyanCat();
    }
});
function randomInRange(min, max) {
    return Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);
}
//# sourceMappingURL=nyanCat.js.map