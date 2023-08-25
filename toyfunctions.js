const { max } = require("math");

let i = 1, j = 1;
function Fib() {
    let rtn = i + j;
    i = (rtn == Infinity) ? 1 : j;
    j = (rtn == Infinity) ? 1 : rtn;
    return rtn;
}
module.exports.Fib = Fib;

// Returns a value between 0-255. 
function FractalPlus(x, y, width, height, maxDepth, currentDepth = 0) {
    if (currentDepth == maxDepth)
        return 0;

    let color = 0;
    if (currentDepth == 0) {
        color = (width / 3 < x && x < 2 * width / 3) || (height / 3 < y && y < 2 * height / 3) ? 254 / (currentDepth + 1) : 0;
    }

    for (let d = 0; d < currentDepth; d++) {
        color = (width / (3 * (3 * currentDepth)) < x && x < 2 * width / (3 * (3 * currentDepth))) ||
            (height / (3 * (3 * currentDepth)) < y && y < 2 * height / (3 * (3 * currentDepth))) ||
            ((3 * (3 * currentDepth) - 2) * width / (3 * (3 * currentDepth)) < x && x < (3 * (3 * currentDepth) - 1) * width / (3 * (3 * currentDepth))) ||
            ((3 * (3 * currentDepth) - 2) * height / (3 * (3 * currentDepth)) < y && y < (3 * (3 * currentDepth) - 1) * height / (3 * (3 * currentDepth))) ? 254 / (currentDepth + 1) : 0;
    }

    return color + FractalPlus(x, y, width, height, maxDepth, ++currentDepth);
}
module.exports.FractalPlus = FractalPlus;