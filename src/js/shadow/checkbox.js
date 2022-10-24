import "../../styles/components/checkbox.css";

class CheckBox extends HTMLButtonElement {
    checked = false;

    constructor() {
        const self = super();

        self.addEventListener('click', (event) => {
           this.toggle(!this.checked);

            this.dispatchEvent(new Event('change', {bubbles: true, cancelable: false}));
        });
    }

    toggle(val) {
        this.checked = val;
        this.setAttribute('aria-checked', val.toString());
    }
}

export default CheckBox;