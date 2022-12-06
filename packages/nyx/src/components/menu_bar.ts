import {BehaviorSubject} from "rxjs";

class Menubar extends HTMLUListElement {
    activeItem: BehaviorSubject<HTMLElement>;
    items: Array<HTMLElement>;
    root: HTMLElement;

    constructor() {
        super();
        this.root = this;
        this.items = Array.from<HTMLElement>(this.querySelectorAll(' [role="menuitem"]:not([role="menu"] [role="menuitem"])'));
        this.activeItem = new BehaviorSubject(this.items[0]);
        this.shadowBuilder(this);
    }

    shadowBuilder(root: HTMLElement) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.items[0].addEventListener('focus', ({target}) => {
            this.activeItem = new BehaviorSubject(target as HTMLElement);
            this.activeItem.asObservable().subscribe((target) => {
                target.focus();
            });
        });

        this.initItems(root, attributes);
    }

    initItems(root: HTMLElement, _attributes: any) {

        this.items.forEach((el, i) => {
            el.setAttribute('tabIndex', (i === 0) ? '0' : '-1');
            el.addEventListener('keyup', (event) => {
                const activeIndex = this.items.findIndex(el => el === this.activeItem.getValue());
                switch (event.key) {
                    case 'ArrowLeft':
                        event.preventDefault();
                        if (activeIndex <= 0)
                            return;

                        this.activeItem.next(this.items[activeIndex - 1]);
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        if (activeIndex >= this.items.length - 1)
                            return;

                        this.activeItem.next(this.items[activeIndex + 1]);
                        break;
                    default:
                }
            });
        });
    }
}

export default Menubar;