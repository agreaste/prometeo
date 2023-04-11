import {BehaviorSubject} from "rxjs";

interface HTMLAttributes {
    [key: string]: string;
}

const attributes = (root: HTMLElement): HTMLAttributes => root.getAttributeNames()
    .reduce((acc, val) => ({
        [val]: root.getAttribute(val),
        ...acc
    }), {});

class Accordion extends HTMLDivElement { //
    activeTab: BehaviorSubject<HTMLDivElement> | undefined;
    tabs;
    panels;

    constructor() {
        super();

        this.tabs = this.querySelectorAll<HTMLDivElement>(".accordion__header");
        this.panels = this.querySelectorAll<HTMLDivElement>(".accordion__panel");

        this.shadowBuilder(this);
    }

    shadowBuilder(root: HTMLElement) {
        const attr = attributes(root);

        this.activeTab = new BehaviorSubject(this.panels[0]);
        this.activeTab.asObservable().subscribe((target) => {
            this.tabs.forEach((tab) => {
                tab.setAttribute("aria-expanded", (target === tab).toString());
            });


            this.panels.forEach((panel) => {
                if (target.getAttribute("aria-controls") === panel.id) {
                    panel.classList.add("accordion__panel--active");
                    panel.focus();
                } else
                    panel.classList.remove("accordion__panel--active");
            });
        });

        this.initTabList(root, attr);
        this.initPanels(root, attr);
    }

    // TODO: fix attributes type
    initTabList(root: HTMLElement, attributes: any) {
        const {id} = attributes;

        this.tabs.forEach((el, i) => {
            const targetPanel = `${id}__panel__${i}`;
            el.setAttribute("id", `${id}__tab__${i}`);
            el.setAttribute("aria-controls", targetPanel);
            el.setAttribute("aria-selected", (i === 0).toString());

            el.addEventListener('click', (event) => {
                event.preventDefault();
                if (this.activeTab)
                    this.activeTab.next(event.target as HTMLDivElement);
            });
        });
    }

    initPanels(root: HTMLElement, attributes: HTMLAttributes) {
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