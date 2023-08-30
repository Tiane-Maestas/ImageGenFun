const image = require("./image.js");
const toys = require("./toyfunctions.js");

// Main Pixel Loop
for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
        image.pixels[y * image.width + x] = getPixelColor(x, y);
        // console.log(image.pixels[y * image.width + x]);
    }
    console.log(`Percent Done: ${x / image.width}%`);
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
    // g = (image.width / 9 < x && x < 2 * image.width / 9) ||
    //     (image.height / 9 < y && y < 2 * image.height / 9) ||
    //     (7 * image.width / 9 < x && x < 8 * image.width / 9) ||
    //     (7 * image.height / 9 < y && y < 8 * image.height / 9) ? 254 : 0;
    // b = (image.width / 27 < x && x < 2 * image.width / 27) ||
    //     (image.height / 27 < y && y < 2 * image.height / 27) ||
    //     (7 * image.width / 27 < x && x < 8 * image.width / 27) ||
    //     (7 * image.height / 27 < y && y < 8 * image.height / 27) ||
    //     (19 * image.width / 27 < x && x < 20 * image.width / 27) ||
    //     (19 * image.height / 27 < y && y < 20 * image.height / 27) ||
    //     (25 * image.width / 27 < x && x < 26 * image.width / 27) ||
    //     (25 * image.height / 27 < y && y < 26 * image.height / 27) ? 254 : 0;

    // Image5.png
    // r = toys.FractalPlus(x, y, image.width, image.height, 5);

    // Image.png
    let xOffset = image.width / 2;
    let yOffset = image.height / 2;
    r = toys.FractalPlus2(4 * x + xOffset, 4 * y + yOffset, image.width, image.height, 5);
    g = r / 2;
    b = g / 2;

    return new image.pixel(r, g, b);
}