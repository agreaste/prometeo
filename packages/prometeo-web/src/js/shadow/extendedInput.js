import shadowElementUtils from "./shadowElementUtils";
import '../../styles/components/shadowInput.css';

class ExtendedInput extends HTMLInputElement {
    constructor() {
        const self = super();
        this.shadowBuilder(self);
    }

    shadowBuilder (root) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        const {name, id, title, type = 'text'} = attributes;

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'shadow semantic');

        const input = document.createElement('input');
        input.setAttribute('type', type);
        input.setAttribute('name', name);
        input.setAttribute('id', id);
        input.setAttribute('required', true);

        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = title;

        wrapper.append(input, label);

        root.replaceWith(wrapper);
    }
}

export default ExtendedInput;