# NYX
Vanilla javascript implementation of ARIA compliant widget.

## Available patterns
- accordion
- autoplay carousel
- checkboxes
- combobox with listbox popup
- menubar and menu
- radio
- tablist

## Usage
Nyx exploits [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) web component to implement ARIA requirements, so it is necessary to import and define a custom element:
```js
// index.mjs
import {ListBox} from "nyx";

customElements.define("aria-listbox", ListBox, {extends: "div"});

// index.cjs
const nyx = require("nyx");

customElements.define("aria-listbox", nyx.ListBox, {extends: "div"});

// there is also a umd format export, but I don't actually know how it works, cheers.
```
Then custom component is available to use and can be bound to html code:
```html
<html>
    <head>
        ...
    </head>
    <body>
        ...
        <div id="custom-aria" is="aria-listbox">
            <label id="aria-type">Which aria is better?</label>
            <div aria-labelledby="aria-type" role="combobox" class="list-box__button" aria-haspopup="listbox"
                 tabindex="0" aria-expanded="false"></div>
            <ul class="list-box__container" role="listbox" tabindex="-1">
                <li class="list-box__option" role="option">
                    Select option
                </li>
                <li class="list-box__option" role="option">
                    No aria
                </li>
                <li class="list-box__option" role="option">
                    Bad aria
                </li>
            </ul>
        </div>
        ...
    </body>
</html>     
```
Note that nyx only add required logic and keyboard interaction, in order to work you must provide well-formed html as indicated in [aria pattern](https://www.w3.org/WAI/ARIA/apg/patterns/).