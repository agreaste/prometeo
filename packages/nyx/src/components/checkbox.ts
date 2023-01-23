class CheckBox extends HTMLButtonElement {
    checked = false;

    constructor() {
        super();

        this.addEventListener("click", (event) => {
            this.toggle(!this.checked);

            this.dispatchEvent(new Event("change", {bubbles: true, cancelable: false}));
        });
    }

    toggle(val: boolean) {
        this.checked = val;
        this.setAttribute("aria-checked", val.toString());
    }
}

export default CheckBox;