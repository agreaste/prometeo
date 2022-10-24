import colors from "tailwindcss/colors";
import Color from "color";

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
}

const paletteHolder = document.getElementById('palette-luminance');

Object.keys(colors).forEach(hue => {
    if (typeof colors[hue] === 'object')
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

            palette.addEventListener('mouseover', (event) => {
                palette.style.backgroundColor = tint.hex();
            });

            palette.addEventListener('mouseleave', (event) => {
                palette.style.backgroundColor = tint.grayscale().hex();
            });


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