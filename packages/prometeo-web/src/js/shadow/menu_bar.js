import {BehaviorSubject} from "rxjs";
import "../../styles/components/menubar.css";

class MenuBar extends HTMLUListElement {
    activeItem;
    items;
    root;

    constructor() {
        const self = super();
        this.root = self;
        this.items = Array.from(self.querySelectorAll(' [role="menuitem"]:not([role="menu"] [role="menuitem"])'));
        this.shadowBuilder(self);
    }

    shadowBuilder(root) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        console.log('menubar items: ', this.items);

        this.items[0].addEventListener('focus', (event) => {
            this.activeItem = new BehaviorSubject(event.target);
            this.activeItem.asObservable().subscribe(target => {
                target.focus();
            });
        });

        this.initItems(root, attributes);
    }

    initItems(root, attributes) {
        const {id} = attributes;

        this.items.forEach((el, i) => {
            el.setAttribute('tabIndex', (i === 0) ? '0' : '-1');
            el.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'ArrowLeft':
                        event.preventDefault();
                        if (this.activeItem.getValue() === this.items[0])
                            return;

                        this.activeItem.next(this.items[this.items.findIndex((el) => el === this.activeItem.getValue()) - 1]);
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        if (this.activeItem.getValue() === this.items[this.items.length - 1])
                            return;

                        this.activeItem.next(this.items[this.items.findIndex((el) => el === this.activeItem.getValue()) + 1]);
                        break;
                    default:
                }
            });
        });
    }
}

export default MenuBar;