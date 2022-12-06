import {BehaviorSubject} from "rxjs";

class Menu extends HTMLButtonElement {
    activeItem: BehaviorSubject<HTMLElement> | undefined;
    expanded;
    items: Array<HTMLElement>;
    trigger;
    list;

    constructor() {
        super();
        this.trigger = this;

        const list = this.trigger.nextElementSibling; // pattern requires that element list is the next element of trigger
        if (!list)
            throw 'No list element found near trigger';

        this.list = list as HTMLElement;

        this.items = Array.from(this.list.querySelectorAll('[role="menuitem"]'));

        if (!this.items.length)
            throw 'Menu has no options.';

        this.expanded = new BehaviorSubject(false);
        this.shadowBuilder(this);
    }

    shadowBuilder(root: HTMLElement) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.expanded.asObservable().subscribe(value => {
            this.setAttribute('aria-expanded', value.toString());
            if (value) {
                this.list.focus();
            }
        });

        this.list.setAttribute('tabIndex', '-1');

        const openMenu = () => {
            this.expanded.next(true);
            this.activeItem = new BehaviorSubject(this.items[0]);
            this.activeItem.asObservable().subscribe((target) => {
                this.trigger.setAttribute('aria-activedescendant', target.id);

                this.items.forEach(el => {
                    if (el === target) {
                        el.classList.add('menu__item--active');
                    } else {
                        el.classList.remove('menu__item--active');
                    }
                })
            });
        };

        this.trigger.addEventListener('keydown', (event) => {
            switch (event.key) {
                case ' ':
                case 'ArrowDown':
                    event.preventDefault();
                    openMenu();
                    break;
                default:
            }
        });

        this.trigger.addEventListener('click', () => {
            if (this.expanded.getValue())
                this.expanded.next(false);
            else
                openMenu();
        });

        this.trigger.addEventListener('focusout', () => {
            if (this.expanded.getValue()) {

            }
        });

        this.initItems(root, attributes);
    }

    initItems(root: HTMLElement, attributes: any) {
        const {id} = attributes;

        this.items.forEach((el, i) => {
            el.setAttribute('id', `${id}-menu-item-${i}`);

            el.addEventListener('mouseenter', (event) => {
                if (this.activeItem)
                    this.activeItem.next(event.target as HTMLElement)
            });
        });

        this.list.addEventListener('keydown', (event) => {
            if (!this.activeItem)
                return;

            const activeItem = this.activeItem;

            const activeIndex = this.items.findIndex((el) => el === activeItem.getValue());
            switch (event.key) {
                case 'Escape':
                    this.expanded.next(false);
                    this.trigger.focus();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    if (activeIndex === 0) {
                        this.expanded.next(false);
                        this.trigger.focus();
                        return;
                    }

                    this.activeItem.next(this.items[activeIndex - 1]);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (activeIndex === this.items.length - 1)
                        return;

                    this.activeItem.next(this.items[activeIndex + 1]);
                    break;
                case 'Tab':
                    this.expanded.next(false);
                    break;
                case ' ':
                case 'Enter':
                    event.preventDefault();
                    this.activeItem.getValue().click();
                    break;
                default:
                // do nothing
            }
        });

        this.list.addEventListener('focusout', ({target}) => {
            if (!(target as HTMLElement).matches(':focus-within')) {
                this.expanded.next(false);
                if (this.activeItem)
                    this.activeItem.next(this.items[0])
            }
        });
    }
}

export default Menu;