import '../../styles/components/listbox.css'
import {BehaviorSubject} from "rxjs";

class ListBox extends HTMLDivElement {
    activeOption;
    trigger = null;
    list = null;

    constructor() {
        const self = super();

        this.trigger = self.querySelector('[role="combobox"]');
        this.list = self.querySelector('[role="listbox"]');

        this.shadowBuilder(self);
    }

    shadowBuilder(root) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.activeOption = new BehaviorSubject(this.list.querySelector('[role="option"]:first-child'));
        this.activeOption.asObservable().subscribe(val => {
            this.trigger.setAttribute('aria-activedescendant', val.id);

            this.list.querySelectorAll('li').forEach((li, i) => {
                li.classList.remove('list-box__option--active');
            });

            val.classList.add('list-box__option--active');
        });

        this.initTrigger(root, attributes);
        this.initList(root, attributes);
    }

    initTrigger(root, attributes) {
        const {id} = attributes;

        this.trigger.setAttribute('id', `${id}__trigger`);
        this.trigger.setAttribute('aria-controls', `${id}__list`);

        const clickCallback = () => {
            this.list.classList.add('active');
            this.list.focus();
        };

        this.trigger.addEventListener('click', (event) => {
            clickCallback();
        });

        this.trigger.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'Enter':
                case ' ':
                    clickCallback();
                default:
                // do nothing
            }
        });
    }

    initList(root, attributes) {
        const {id} = attributes;

        this.list.setAttribute('id', `${id}__list`);
        this.list.setAttribute('aria-labelledby', `${id}__trigger`);

        this.list.querySelectorAll('li').forEach((li, i) => {
            li.setAttribute('id', `${id}_option_${i}`);
            li.setAttribute('aria-selected', (i === 0).toString());

            if (i === 0) {
                li.classList.add('list-box__option--selected');
                this.trigger.innerHTML = li.innerHTML;
                this.activeOption.next(li);
            }
        });

        this.list.addEventListener('focusout', (event) => {
            event.target.classList.remove('active');
        });

        const clickCallback = (target) => {
            this.activeOption.next(target);
            this.list.querySelectorAll('[role="option"]').forEach(opt => {
                opt.setAttribute('aria-selected', 'false');
            });

            target.setAttribute('aria-selected', 'true');
            this.trigger.innerHTML = target.innerHTML;
            this.trigger.setAttribute('aria-activedescendant', target.id);
            this.list.classList.remove('active');
            this.trigger.focus();
        };

        this.list.querySelectorAll('[role="option"]').forEach((option, i) => {
            option.addEventListener('click', ({target}) => {
                clickCallback(target);
            });
        });

        this.list.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();
                    if (this.activeOption.getValue() === this.list.querySelector('[role="option"]:first-child'))
                        return;

                    this.activeOption.next(this.activeOption.getValue().previousElementSibling);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (this.activeOption.getValue() === this.list.querySelector('[role="option"]:last-child'))
                        return;

                    this.activeOption.next(this.activeOption.getValue().nextElementSibling);
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    this.list.querySelectorAll('[role="option"]').forEach(opt => {
                        opt.setAttribute('aria-selected', 'false');
                    });

                    this.activeOption.getValue().setAttribute('aria-selected', 'true');
                    this.trigger.innerHTML = this.activeOption.getValue().innerHTML;
                    this.list.classList.remove('active');
                    this.trigger.focus();
                    break;
                case 'Escape':
                    this.list.classList.remove('active');
                    this.trigger.focus();
                    break;
                default:
            }
        });
    }
}

export default ListBox;