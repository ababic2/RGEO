const {createCanvas} = require("canvas");
const fs = require("fs");

function createAndSaveCanvas(drawFunction, filename, taskIndex, ...args) {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    drawFunction(ctx, ...args);

    fs.writeFileSync(`images/zadatak${taskIndex}_${filename}.png`, canvas.toBuffer('image/png'));
}

module.exports = {createAndSaveCanvas};