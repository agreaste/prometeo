import colors from "tailwindcss/colors";
import Color from "color";
import shadowElementUtils from "../shadow/shadowElementUtils";
import {MenuBar, Menu} from "nyx";

shadowElementUtils.defineExtend('menu-bar', MenuBar, 'ul');
shadowElementUtils.defineExtend('menu-button', Menu, 'button');

const minContrast = (background) => {
    let ratio = 0.1;
    let foreground = background;

    while(background.contrast(foreground) < 4.5 && (foreground.luminosity() > 0 && foreground.luminosity() < 1)) {
        ratio += .1;
        foreground = background.isDark() ? background.lighten(ratio) : background.darken(ratio);
    }

    if(background.contrast(foreground) < 4.5)
        foreground = foreground.negate();

    return [foreground, Number(ratio).toPrecision(2), Number(background.contrast(foreground)).toPrecision(3)];
};

const paletteHolder = document.getElementById('palette-luminance');
const palette = ['red', 'orange', 'amber', 'yellow', 'lime', 'emerald', 'green', 'teal', 'cyan', 'blue', 'indigo', 'violet', 'purple'];

Object.keys(colors).forEach(hue => {
    console.log(hue)
    if (typeof colors[hue] === 'object' && palette.includes(hue))
        Object.keys(colors[hue]).forEach(luminosity => {
            const palette = document.createElement('div');
            const tint = Color(colors[hue][luminosity]);
            palette.style.backgroundColor = tint.grayscale().hex();
            palette.style.transition = 'all .2s ease';
            palette.style.padding = '.5rem .75rem';
            palette.style.borderRadius = '.25rem';

            palette.style.textAlign = 'center';
            palette.style.color = tint.isDark() ? 'white' : 'black';
            palette.innerHTML = `<p>${Number(tint.luminosity()).toPrecision(2)}</p>`;

            // if(tint.contrast(foreground) >= 4.55)
            paletteHolder.append(palette);
        });
});


const bg = Color('#4ade80');
const fg = Color('#fdba74');

// console.log(bg.contrast(fg), bg.luminosity(), fg.luminosity(), bg.grayscale().hex(), fg.grayscale().hex());

// '#A7A7A7' '#C6C6C6'

const obg = Color('#99F6E4')
const ofg = Color('#BE123C')

console.log(obg.contrast(ofg), obg.luminosity(), ofg.luminosity(), obg.grayscale().hex(), ofg.grayscale().hex());