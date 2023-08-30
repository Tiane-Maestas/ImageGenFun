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
        color = (width / 3 < x && x < 2 * width / 3) || (height / 3 < y && y < 2 * height / 3) ? 165 / (currentDepth + 1) : 0;
    }

    for (let d = 0; d < currentDepth; d++) {
        color = (width / (3 * (3 ** currentDepth)) < x && x < 2 * width / (3 * (3 ** currentDepth))) ||
            (height / (3 * (3 ** currentDepth)) < y && y < 2 * height / (3 * (3 ** currentDepth))) ||
            ((3 * (3 ** currentDepth) - 2) * width / (3 * (3 ** currentDepth)) < x && x < (3 * (3 ** currentDepth) - 1) * width / (3 * (3 ** currentDepth))) ||
            ((3 * (3 ** currentDepth) - 2) * height / (3 * (3 ** currentDepth)) < y && y < (3 * (3 ** currentDepth) - 1) * height / (3 * (3 ** currentDepth))) ? 165 / (currentDepth + 1) : 0;
    }

    return color + FractalPlus(x, y, width, height, maxDepth, ++currentDepth);
}
module.exports.FractalPlus = FractalPlus;

// Returns a value between 0-165. Just eyeballed so there was no saturation in main color pattern.
function FractalPlus2(x, y, width, height, maxDepth, currentDepth = 0) {
    if (currentDepth == maxDepth)
        return 0;

    // Allows the pattern to repeat.
    x = x % width;
    y = y % height;

    let color = 0;
    if (currentDepth == 0) {
        color += (width / 3 < x && x < 2 * width / 3) || (height / 3 < y && y < 2 * height / 3) ? 165 / (currentDepth + 1) : 0;
        return color + FractalPlus2(x, y, width, height, maxDepth, ++currentDepth);
    }

    const range = [0, 3 * (3 ** currentDepth)];
    let offsetList = buildOffsetList(maxDepth);
    let offsetIndex = 0;
    let offset = 0;
    // Bottom half of range.
    for (let d = 0; d < 2 ** (currentDepth - 1); d++) {
        if (d != 0 && d % 2 == 0) {
            offset += offsetList[offsetIndex++]; // Offset changes only on every other loop iteration after a couple of depths.
        }

        color += ((width + (d * 6 * width) + (offset * width)) / range[1] < x && x < (2 * width + (d * 6 * width) + (offset * width)) / range[1]) ? 165 / (currentDepth + 1) : 0;
        color += ((height + (d * 6 * height) + (offset * height)) / range[1] < y && y < (2 * height + (d * 6 * height) + (offset * height)) / range[1]) ? 165 / (currentDepth + 1) : 0;
    }

    offsetIndex = 0;
    offset = 0;
    // Top half of range.
    for (let d = 0; d < 2 ** (currentDepth - 1); d++) {
        if (d != 0 && d % 2 == 0) {
            offset += offsetList[offsetIndex++]; // Offset changes only on every other loop iteration.
        }

        color += (((range[1] - 2) * width - (d * 6 * width) - (offset * width)) / range[1] < x && x < ((range[1] - 1) * width - (d * 6 * width) - (offset * width)) / range[1]) ? 165 / (currentDepth + 1) : 0;
        color += (((range[1] - 2) * height - (d * 6 * height) - (offset * height)) / range[1] < y && y < ((range[1] - 1) * height - (d * 6 * height) - (offset * height)) / range[1]) ? 165 / (currentDepth + 1) : 0;
    }

    return color + FractalPlus2(x, y, width, height, maxDepth, ++currentDepth);
}

// Note: 'offset' needs to follow the patterns:
//      'maxDepth' from main of 6 => [1, 4, 1, 13, 1 ,4, 1]
//      'maxDepth' from main of 7 => [1, 4, 1, 13, 1 ,4, 1, 40, 1, 4, 1, 13, 1, 4, 1]
// Recurence relation for large offsets -> [1, 4, ..., 13, ..., 40]
//      3^1 + 1 = 4, 3^2 + 4 = 13, 3^3 + 13 = 40 ...
//      The number of large offsets is: 'maxDepth' - 4
// Then the number of '141' blocks between each large offset increase is in powers of 2. (1, 2, 4...)
//  3, 4,         5,              6.
function buildOffsetList(maxDepth) {
    // if (offsetList.length > 1) { return; } // Performance help.
    let offsetList = [1]; // Would like to only set this once so it's not built every iteration.

    let largeOffsetCount = maxDepth - 4;
    let lastLargeNumber = 1;
    for (let i = 0; i < largeOffsetCount; i++) {
        lastLargeNumber = 3 ** (i + 1) + lastLargeNumber;
        offsetList.push(lastLargeNumber);
        copyFirstHalf(offsetList);
    }

    // Lastly multiply offset by 6 for proper units.
    for (let i = 0; i < offsetList.length; i++) {
        offsetList[i] = 6 * offsetList[i];
    }

    return offsetList;
}

// Copies the [0, length - 2] in reverse order to end of offsets.
function copyFirstHalf(offsetList) {
    for (let i = offsetList.length - 2; i >= 0; i--) {
        offsetList.push(offsetList[i]);
    }
    return offsetList;
}
module.exports.FractalPlus2 = FractalPlus2;