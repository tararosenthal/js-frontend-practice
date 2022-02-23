document.getElementById("cat").onclick = changeBackgroundCat;
document.getElementById("dog").onclick = changeBackgroundDog;
document.getElementById("raccoon").onclick = changeBackgroundRaccoon;
document.getElementById("fox").onclick = changeBackgroundFox;
document.getElementById("giraffe").onclick = changeBackgroundGiraffe;

function changeBackgroundCat() {
    document.querySelector("body").style.backgroundColor = "#2898b2";
    document.querySelector("body").style.backgroundImage = "url(./img/cat.jpg)";
    document.querySelector("body").style.backgroundPosition = "center 35%";
    changeFontAndBorderColor();
}

function changeBackgroundDog() {
    document.querySelector("body").style.backgroundColor = "#cdc3c1";
    document.querySelector("body").style.backgroundImage = "url(./img/dog.jpg)";
    document.querySelector("body").style.backgroundPosition = "center 85%";
    changeFontAndBorderColor("black");
}

function changeBackgroundRaccoon() {
    document.querySelector("body").style.backgroundColor = "#7c9051";
    document.querySelector("body").style.backgroundImage = "url(./img/raccoon.jpg)";
    document.querySelector("body").style.backgroundPosition = "center";
    changeFontAndBorderColor();
}

function changeBackgroundFox() {
    document.querySelector("body").style.backgroundColor = "#544a88";
    document.querySelector("body").style.backgroundImage = "url(./img/fox.jpg)";
    document.querySelector("body").style.backgroundPosition = "center 40%";
    changeFontAndBorderColor("black");
}

function changeBackgroundGiraffe() {
    document.querySelector("body").style.backgroundColor = "#017c9d";
    document.querySelector("body").style.backgroundImage = "url(./img/giraffe.jpg)";
    document.querySelector("body").style.backgroundPosition = "center";
    changeFontAndBorderColor("black");
}

function changeFontAndBorderColor(color = "white") {
    document.querySelector("body").style.color = color;
    let array = document.querySelectorAll("li");
    array.forEach(element => {
        element.style.border = `3px solid ${color}`;
    });
}