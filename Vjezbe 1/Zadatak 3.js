const { createAndSaveCanvas } = require('./canvasInit.js');

const x = 50; // x koordinata krajnjeg lijevog ugla Quad-a
const y = 50; // y koordinata krajnjeg lijevog ugla Quad-a
const d = 50; // dužina jedne stranice kvadrata

const { drawQuad } = require('./basicShapes.js');

createAndSaveCanvas(drawQuad, 'drawQuad', 3, x, y, d)
