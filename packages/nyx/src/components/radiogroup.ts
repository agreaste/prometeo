import {BehaviorSubject} from "rxjs";

class RadioGroup extends HTMLUListElement {
    selectedOption: BehaviorSubject<any>;
    activeOption: BehaviorSubject<any>;
    container;
    options;

    constructor() {
        super();

        this.container = this;
        this.options = Array.from<HTMLElement>(this.querySelectorAll('[role="radio"]'));


        this.selectedOption = new BehaviorSubject(null);
        this.activeOption = new BehaviorSubject(null);

        this.shadowBuilder(this);
    }

    shadowBuilder(root: HTMLElement) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.selectedOption.asObservable().subscribe(target => {
            if (target === null)
                return;

            this.options.forEach((option) => {
                option.setAttribute('aria-checked', (target === option).toString());
                root.setAttribute('aria-activedescendant', target.id);
            });

            if (this.activeOption.getValue())
                this.activeOption.next(target);
        });

        this.activeOption.asObservable().subscribe(target => {
            this.options.forEach((option) => {
                if (option === target)
                    option.classList.add('radio--active');
                else
                    option.classList.remove('radio--active');
            });
        });

        this.container.addEventListener('focus', (_event) => {
            this.activeOption.next(this.selectedOption.getValue() ?? this.options[0]);
        });

        this.container.addEventListener('focusout', (_event) => {
            this.activeOption.next(null);
        });

        this.initOptions(root, attributes);
    }

    initOptions(root: HTMLElement, attributes: any) {
        const {id} = attributes;

        this.options.forEach((el, i) => {
            el.setAttribute('id', `${id}__option__${i}`);
            el.setAttribute('aria-checked', 'false');

            el.addEventListener('click', (event) => {
                this.selectedOption.next(event.target);
            });
        });

        this.container.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    event.preventDefault();

                    if (!this.selectedOption.getValue()) {
                        this.selectedOption.next(this.activeOption.getValue());
                    }

                    if (this.selectedOption.getValue() === this.options[0])
                        return;

                    this.selectedOption.next(this.selectedOption.getValue().previousElementSibling);
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    event.preventDefault();

                    if (!this.selectedOption.getValue()) {
                        this.selectedOption.next(this.activeOption.getValue());
                    }

                    if (this.selectedOption.getValue() === this.options[this.options.length - 1])
                        return;

                    this.selectedOption.next(this.selectedOption.getValue().nextElementSibling);
                    break;
                case ' ':
                    event.preventDefault();
                    this.selectedOption.next(this.activeOption.getValue());
                    break;
                default:
            }
        });
    }
}

export default RadioGroup;