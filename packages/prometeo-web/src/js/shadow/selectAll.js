import {BehaviorSubject} from "rxjs";
import "../../styles/components/checkbox.css";

class SelectAll extends HTMLButtonElement {
    checked = false;
    indeterminate = false;
    group;

    constructor() {
        const self = super();
        this.group = self.parentNode;
        const options = this.group.querySelectorAll('[role="checkbox"]:not([is="select-all"])')

        self.addEventListener('click', (event) => {
            self.checked = this.indeterminate || !self.checked;
            self.indeterminate = false;

            self.setAttribute('aria-checked', self.checked.toString());

            options.forEach(option => {
                option.toggle(self.checked);
            })
        });

        this.group.addEventListener('change', (event) => {
            const checked = Array.from(options).filter(option => option.getAttribute('aria-checked') === 'true').length;

            // update select all state depending on selected options
            this.checked = checked === options.length;
            this.indeterminate = checked > 0 && checked < options.length;

            self.setAttribute('aria-checked', this.indeterminate ? 'mixed' : this.checked.toString());
        });
    }

    onChange(callback) {
        this.group.addEventListener('change', callback);
    }
}

export default SelectAll;