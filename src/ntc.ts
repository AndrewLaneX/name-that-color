/*
+-----------------------------------------------------------------+
|     Created by Chirag Mehta - http://chir.ag/projects/ntc       |
|-----------------------------------------------------------------|
|               ntc js (Name that Color JavaScript)               |
+-----------------------------------------------------------------+

All the functions, code, lists etc. have been written specifically
for the Name that Color JavaScript by Chirag Mehta unless otherwise
specified.

This script is released under the: Creative Commons License:
Attribution 2.5 http://creativecommons.org/licenses/by/2.5/
*/

import * as utils from './utils';
import names from './names';

const getColorName = (color: string): [string, string, boolean] => {
    color = color.toUpperCase();
    if (color.length < 3 || color.length > 7) {
        return ['#000000', `Invalid Color: ${color}`, false];
    }

    if (color.length % 3 == 0) {
        color = `#${color}`;
    }

    if (color.length == 4) {
        color = `#${color[1].repeat(2)}${color[2].repeat(2)}${color[3].repeat(
            2,
        )}`;
    }

    const [r, g, b] = utils.rgb(color);
    const [h, s, l] = utils.hsl(color);

    let cl = -1;
    let df = -1;

    for (let i = 0; i < names.length; i++) {
        if (color === names[i][0]) {
            return [names[i][0], names[i][1], true];
        }

        const ndf1 =
            Math.pow(r - names[i][2], 2) +
            Math.pow(g - names[i][3], 2) +
            Math.pow(b - names[i][4], 2);
        const ndf2 =
            Math.pow(h - names[i][5], 2) +
            Math.pow(s - names[i][6], 2) +
            Math.pow(l - names[i][7], 2);
        const ndf = ndf1 + ndf2 * 2;

        if (df < 0 || df > ndf) {
            df = ndf;
            cl = i;
        }
    }

    return cl < 0
        ? ['#000000', `Invalid Color: ${color}`, false]
        : [names[cl][0], names[cl][1], false];
};

export default getColorName;
