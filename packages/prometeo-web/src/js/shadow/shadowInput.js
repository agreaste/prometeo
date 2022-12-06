import AbstractShadowElement from "./abstractShadowElement";

import styleString from '!!css-loader!!postcss-loader!../../styles/components/shadowInput.css';

class ShadowInput extends AbstractShadowElement {
    constructor() {
        super();
        this.shadowMount();
    }

    shadowBuilder() {
        // build attributes object:
        const attributes = this.getAttributeNames().reduce((acc, val) => ({
            [val]: this.getAttribute(val),
            ...acc
        }), {});

        const {name, id, text, type = 'text'} = attributes;

        const wrapper = document.createElement('div');

        wrapper.setAttribute('class', 'shadow');

        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('name', name);
        input.setAttribute('id', id);
        input.setAttribute('required', true);

        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = text;

        wrapper.append(input, label);

        return {
            element: wrapper,
            style: this.css(styleString.toString())
        };
    }
}

export default ShadowInput;