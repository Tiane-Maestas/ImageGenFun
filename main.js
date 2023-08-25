let image = require("./image.js");
let toys = require("./toyfunctions.js");

// Main Pixel Loop
for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
        image.pixels[y * image.width + x] = getPixelColor(x, y);
        // console.log(image.pixels[y * image.width + x]);
    }
}
image.write();

function getPixelColor(x, y) {
    let r = 0, g = 0, b = 0;

    // Image1.png
    // r = x + y;
    // g = y % image.height;
    // b = r + g;

    // Image2.png
    // r = toys.Fib();

    // Image3.png
    // r = toys.Fib() - toys.Fib();
    // g = toys.Fib() + toys.Fib();
    // b = toys.Fib() * toys.Fib();

    // Image4.png
    // r = (image.width / 3 < x && x < 2 * image.width / 3) ||
    //     (image.height / 3 < y && y < 2 * image.height / 3) ? 254 : 0;
    // g = (image.width / 12 < x && x < 3 * image.width / 12) ||
    //     (image.height / 12 < y && y < 3 * image.height / 12) ||
    //     (9 * image.width / 12 < x && x < 11 * image.width / 12) ||
    //     (9 * image.height / 12 < y && y < 11 * image.height / 12) ? 254 : 0;
    // b = (image.width / 36 < x && x < 2 * image.width / 36) ||
    //     (image.height / 36 < y && y < 2 * image.height / 36) ||
    //     (10 * image.width / 36 < x && x < 11 * image.width / 36) ||
    //     (10 * image.height / 36 < y && y < 11 * image.height / 36) ||
    //     (25 * image.width / 36 < x && x < 26 * image.width / 36) ||
    //     (25 * image.height / 36 < y && y < 26 * image.height / 36) ||
    //     (34 * image.width / 36 < x && x < 35 * image.width / 36) ||
    //     (34 * image.height / 36 < y && y < 35 * image.height / 36) ? 254 : 0;

    // Image5.png
    r = toys.FractalPlus(x, y, image.width, image.height, 16);
    // console.log(r);

    return new image.pixel(r, g, b);
}