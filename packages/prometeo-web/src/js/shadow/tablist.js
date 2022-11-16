import {BehaviorSubject} from "rxjs";
import "../../styles/components/tabber.css";

class Tablist extends HTMLDivElement {
    activeTab;
    tabs;
    tablist;
    panels;

    constructor() {
        const self = super();

        this.tabs = Array.from(self.querySelectorAll('[role="tab"]'));
        this.tablist = self.querySelector('[role="tablist"]');
        this.panels = Array.from(self.querySelectorAll('[role="tabpanel"]'));

        this.shadowBuider(self);
    }

    shadowBuider(root) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.activeTab = new BehaviorSubject(null);
        this.activeTab.asObservable().subscribe(target => {
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

    initTabList(root, attributes) {
        const {id} = attributes;

        this.tabs[0].addEventListener('focus', (event) => {
           this.activeTab.next(event.target);
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
                    if(panel.getAttribute('aria-labelledby') === target.id) {
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

    initPanels(root, attributes) {
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