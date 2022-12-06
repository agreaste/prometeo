import "../../styles/components/clearButton.css";

class ClearButton extends HTMLButtonElement {
    constructor() {
        const self = super();
        this.shadowBuilder(self);
    }

    shadowBuilder (root) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        const {'aria-controls': ariaControl} = attributes;

        root.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById(ariaControl).value = null;
        });
    }
}

export default ClearButton;