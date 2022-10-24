import {BehaviorSubject} from "rxjs";
import "../../styles/components/accordion.css";

class Accordion extends HTMLDivElement {
    activeTab;
    tabs;
    panels;

    constructor() {
        const self = super();

        this.tabs = self.querySelectorAll('.accordion__header');
        this.panels = self.querySelectorAll('.accordion__panel');

        console.log(this.panels)

        this.shadowBuider(self);
    }

    shadowBuider(root) {
        const attributes = root.getAttributeNames().reduce((acc, val) => ({
            [val]: root.getAttribute(val),
            ...acc
        }), {});

        this.activeTab = new BehaviorSubject(this.panels[0]);
        this.activeTab.asObservable().subscribe(target => {
            this.tabs.forEach((tab) => {
                tab.setAttribute('aria-expanded', (target === tab).toString());
            });



            this.panels.forEach((panel) => {
                if (target.getAttribute('aria-controls') === panel.id) {
                    panel.classList.add('accordion__panel--active');
                    panel.focus();
                } else
                    panel.classList.remove('accordion__panel--active');
            });
        });

        this.initTabList(root, attributes);
        this.initPanels(root, attributes);
    }

    initTabList(root, attributes) {
        const {id} = attributes;

        this.tabs.forEach((el, i) => {
            const targetPanel = `${id}__panel__${i}`;
            el.setAttribute('id', `${id}__tab__${i}`);
            el.setAttribute('aria-controls', targetPanel);
            el.setAttribute('aria-selected', (i === 0).toString());

            el.addEventListener('click', (event) => {
                event.preventDefault();
                this.activeTab.next(event.target);
            });
        });
    }

    initPanels(root, attributes) {
        const {id} = attributes;

        this.panels.forEach((panel, i) => {
            panel.setAttribute('id', `${id}__panel__${i}`)
            panel.setAttribute('aria-labelledby', `${id}__tab__${i}`);
            panel.setAttribute('tabindex', `-1`);

            if (i === 0) {
                panel.classList.add('tabber__panel--active');
            }
        });
    }
}

export default Accordion;