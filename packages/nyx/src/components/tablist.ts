import {BehaviorSubject} from "rxjs";

class Tablist extends HTMLDivElement {
    activeTab: BehaviorSubject<any>; // e che cazzo
    tabs: Array<HTMLElement>;
    tablist: HTMLElement;
    panels: Array<HTMLElement>;

    constructor() {
        super();

        this.tabs = Array.from<HTMLElement>(this.querySelectorAll('[role="tab"]'));

        const tablist = this.querySelector('[role="tablist"]');

        if(!tablist)
            throw 'no role="tablist" found in element.'

        this.tablist = tablist as HTMLElement;

        this.panels = Array.from<HTMLElement>(this.querySelectorAll('[role="tabpanel"]'));

        this.activeTab = new BehaviorSubject(null);
        this.shadowBuilder(this);
    }

    shadowBuilder(root: HTMLElement) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.activeTab.asObservable().subscribe((target: HTMLElement | null) => {
            if(!target)
                return;

            target.classList.add('tabber__tablist__tab--active');

            this.tabs.forEach((tab) => {
                tab.setAttribute('aria-selected', (target === tab).toString());
                if(tab.id !== target.id)
                    tab.classList.remove('tabber__tablist__tab--active');
            });

            target.focus()
        });

        this.initTabList(root, attributes);
        this.initPanels(root, attributes);
    }

    initTabList(root: HTMLElement, attributes: any) {
        const {id} = attributes;

        this.tabs[0].addEventListener('focus', ({target}) => {
           this.activeTab.next(target as HTMLElement);
        });

        this.tabs.forEach((el, i) => {
            const targetPanel = `${id}__panel__${i}`;
            el.setAttribute('id', `${id}__tab__${i}`);
            el.setAttribute('aria-controls', targetPanel);
            el.setAttribute('aria-selected', (i===0).toString());

            el.addEventListener('click', ({target}) => {
                this.activeTab.next(target);
            });
        });

        this.tabs.forEach((el, i) => {
            const targetPanel = `${id}__panel__${i}`;
            el.setAttribute('id', `${id}__tab__${i}`);
            el.setAttribute('aria-controls', targetPanel);
            el.setAttribute('aria-selected', (i===0).toString());
            el.setAttribute('tabIndex', (i === 0) ? '0' : '-1');

            el.addEventListener('click', ({target}) => {
                this.panels.forEach((panel) => {
                    if(panel.getAttribute('aria-labelledby') === (target as HTMLElement).id) {
                        panel.classList.add('tabber__panel--active');
                    }
                    else
                        panel.classList.remove('tabber__panel--active');
                });

                this.panels[i].focus();
            });

            el.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'ArrowLeft':
                        event.preventDefault();
                        if (this.activeTab.getValue() === this.tabs[0])
                            return;

                        this.activeTab.next(this.tabs[this.tabs.findIndex((el) => el === this.activeTab.getValue()) - 1]);
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        if (this.activeTab.getValue() === this.tabs[this.tabs.length - 1])
                            return;

                        this.activeTab.next(this.tabs[this.tabs.findIndex((el) => el === this.activeTab.getValue()) + 1]);
                        break;
                    default:
                }
            });
        });
    }

    initPanels(root: HTMLElement, attributes: any) {
        const {id} = attributes;

        this.panels.forEach((panel, i) => {
            panel.setAttribute('aria-labelledby', `${id}__tab__${i}`);
            panel.setAttribute('tabindex', `-1`);

            if(i === 0) {
                panel.classList.add('tabber__panel--active');
            }
        });
    }
}

export default Tablist;