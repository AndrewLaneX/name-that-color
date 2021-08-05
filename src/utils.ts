// adopted from: Farbtastic 1.2
// http://acko.net/dev/farbtastic
export const rgb = (color: string, divider = 1): [number, number, number] => {
    return [
        parseInt(color.slice(1, 3), 16) / divider,
        parseInt(color.slice(3, 5), 16) / divider,
        parseInt(color.slice(5, 7), 16) / divider,
    ];
};

// adopted from: Farbtastic 1.2
// http://acko.net/dev/farbtastic
export const hsl = (color: string): [number, number, number] => {
    const [r, g, b] = rgb(color, 255);

    const min = Math.min(r, Math.min(g, b));
    const max = Math.max(r, Math.max(g, b));
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (min + max) / 2;

    if (l > 0 && l < 1) {
        s = delta / (l < 0.5 ? 2 * l : 2 - 2 * l);
    }

    if (delta > 0) {
        if (max === r && max !== g) {
            h += (g - b) / delta;
        }
        if (max === g && max !== b) {
            h += 2 + (b - r) / delta;
        }
        if (max === b && max !== r) {
            h += 4 + (r - g) / delta;
        }

        h /= 6;
    }

    return [h * 255, s * 255, l * 255];
};
