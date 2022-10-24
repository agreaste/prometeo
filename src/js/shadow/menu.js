import {BehaviorSubject} from "rxjs";
import "../../styles/components/menu.css";

class Menu extends HTMLButtonElement {
    activeItem;
    expanded;
    items;
    trigger;
    list;

    constructor() {
        const self = super();
        this.trigger = self;
        this.list = self.nextElementSibling;
        // pattern requires that element list is the next element of trigger
        this.items = Array.from(this.list.querySelectorAll('[role="menuitem"]'));
        this.expanded = false;
        this.shadowBuilder(self);
    }

    shadowBuilder(root) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.expanded = new BehaviorSubject(false);
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
            this.activeItem.asObservable().subscribe(target => {
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

        this.trigger.addEventListener('click', (event) => {
            if (this.expanded.getValue())
                this.expanded.next(false);
            else
                openMenu();
        });

        this.trigger.addEventListener('focusout', (event) => {
            if (this.expanded.getValue()) {

            }
        });

        this.initItems(root, attributes);
    }

    initItems(root, attributes) {
        const {id} = attributes;

        this.items.forEach((el, i) => {
            el.setAttribute('id', `${id}-menu-item-${i}`);

            el.addEventListener('mouseenter', (event) => {
                this.activeItem.next(event.target)
            });
        });

        this.list.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'Escape':
                    this.expanded.next(false);
                    this.trigger.focus();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    if (this.activeItem.getValue() === this.items[0]) {
                        this.expanded.next(false);
                        this.trigger.focus();
                        return;
                    }

                    this.activeItem.next(this.items[this.items.findIndex((el) => el === this.activeItem.getValue()) - 1]);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (this.activeItem.getValue() === this.items[this.items.length - 1])
                        return;

                    this.activeItem.next(this.items[this.items.findIndex((el) => el === this.activeItem.getValue()) + 1]);
                    break;
                case 'Tab':
                    this.expanded.next(false);
                    break;
                case ' ':
                case 'Enter':
                    event.preventDefault();
                    this.activeItem.getValue().click();
                default:
                // do nothing
            }
        });

        this.list.addEventListener('focusout', (event) => {
            if(!event.target.matches(':focus-within')) {
                this.expanded.next(false);
                this.activeItem.next(this.items[0])
            }
        });
    }
}

export default Menu;