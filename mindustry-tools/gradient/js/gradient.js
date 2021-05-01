let textContainer = document.getElementById("text");
let firstColorContainer = document.getElementById("firstColor");
let secondColorContainer = document.getElementById("secondColor");
let resultContainer = document.getElementById("result");

let debugContainer = document.getElementById("debug");


function rgbToHex(r, g, b) {
    function componentToHex(c) {
        let hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

function makeGradient(text, color1, color2) {
    let length = text.length;
    let delta = [
        Math.floor((color2[0] - color1[0]) / length),
        Math.floor((color2[1] - color1[1]) / length),
        Math.floor((color2[2] - color1[2]) / length)
    ];

    let result = "";
    for (let i = 0; i < length; i++) {
        for (let colorIndex = 0; colorIndex < 3; colorIndex++) {
            color1[colorIndex] += delta[colorIndex]
        }

        if (rgbToHex(color1[0], color1[1], color1[2]).indexOf("-") > -1) {
            result += text[i];
        }
        else {
            result += '[' + rgbToHex(color1[0], color1[1], color1[2]) + ']' + text[i];
        }
    }

    return result;
}

function update() {
    let text = textContainer.value;
    let firstColor = firstColorContainer.value;
    let secondColor = secondColorContainer.value;
    resultContainer.value = makeGradient(text, hexToRgb(firstColor), hexToRgb(secondColor));
}

window.setInterval(update, 100);