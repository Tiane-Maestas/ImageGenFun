let math = require("math");
module.exports = {
    name: "Image",
    width: 1920,
    height: 1080,
    background: 'red',
    pixel: function (r, g, b) {
        r = math.abs(parseInt(r)); b = math.abs(parseInt(b)); g = math.abs(parseInt(g));
        // this.r = (r > 255) ? 255 : r; this.g = (g > 255) ? 255 : g; this.b = (b > 255) ? 255 : b;
        this.r = r % 255; this.g = g % 255; this.b = b % 255;
    },
    pixels: [module.exports.width * module.exports.height]
}

let Jimp = require('jimp');
function write() {
    let image = new Jimp(module.exports.width, module.exports.height, module.exports.background, (err, image) => { if (err) throw err; });
    for (let i = 0; i < module.exports.width * module.exports.height; i++) {
        let x = i % module.exports.width;
        let y = parseInt(i / module.exports.width);
        let pixel = module.exports.pixels[y * module.exports.width + x];
        image.setPixelColor(Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, 255), x, y);
    }
    image.write(`./${module.exports.name}.png`);
}
module.exports.write = write;
