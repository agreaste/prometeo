import {BehaviorSubject} from "rxjs";

class ListBox extends HTMLDivElement {
    activeOption;
    trigger: HTMLButtonElement;
    list: HTMLDivElement;
    options: Array<HTMLElement>;

    constructor() {
        super();

        const trigger: HTMLButtonElement | null = this.querySelector('[role="combobox"]');
        if (!trigger)
            throw 'No list-box trigger.';

        const list: HTMLDivElement | null = this.querySelector('[role="listbox"]');
        if(!list)
            throw 'No list-box options container';

        this.trigger = trigger;
        this.list = list;

        const options: Array<HTMLElement> = Array.from(this.list.querySelectorAll('[role="option"]'));

        if(options.length === 0)
            throw 'No option in list-box component';

        this.options = options;

        this.activeOption = new BehaviorSubject(options[0]);
        this.activeOption.asObservable().subscribe((val) => {
            this.trigger.setAttribute('aria-activedescendant', val.id);

            this.list.querySelectorAll('li').forEach((li, i) => {
                li.classList.remove('list-box__option--active');
            });

            val.classList.add('list-box__option--active');
        });

        this.shadowBuilder(this);
    }

    shadowBuilder(root: HTMLElement) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.initTrigger(root, attributes);
        this.initList(root, attributes);
    }

    initTrigger(root: HTMLElement, attributes: any) {
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

        this.trigger.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'Enter':
                case ' ':
                    clickCallback();
                    break;
                default:
                // do nothing
            }
        });
    }

    initList(root: HTMLElement, attributes: any) {
        const {id} = attributes;

        this.list.setAttribute('id', `${id}__list`);
        this.list.setAttribute('aria-labelledby', `${id}__trigger`);

        this.options.forEach((option, i) => {
            option.setAttribute('id', `${id}_option_${i}`);
            option.setAttribute('aria-selected', (i === 0).toString());

            if (i === 0) {
                option.classList.add('list-box__option--selected');
                this.trigger.innerHTML = option.innerHTML;
                this.activeOption.next(option);
            }
        });

        this.list.addEventListener('focusout', ({target}) => {
            (target as HTMLElement).classList.remove('active');
        });

        const clickCallback = (target: HTMLElement) => {
            this.activeOption.next(target);
            this.options.forEach(opt => {
                opt.setAttribute('aria-selected', 'false');
            });

            target.setAttribute('aria-selected', 'true');
            this.trigger.innerHTML = target.innerHTML;
            this.trigger.setAttribute('aria-activedescendant', target.id);
            this.list.classList.remove('active');
            this.trigger.focus();
        };

        this.options.forEach((option, i) => {
            option.addEventListener('click', ({target}) => {
                clickCallback(target as HTMLElement);
            });
        });

        this.list.addEventListener('keydown', (event) => {
            const optionIndex = this.options.findIndex(el => el === this.activeOption.getValue());
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault();

                    if(optionIndex <= 0)
                        return;

                    this.activeOption.next(this.options[optionIndex - 1]);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (optionIndex === this.options.length - 1)
                        return;

                    this.activeOption.next(this.options[optionIndex + 1]);
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    this.options.forEach(opt => {
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