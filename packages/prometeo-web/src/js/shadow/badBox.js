import "../../styles/components/listbox.css";
import {BehaviorSubject} from "rxjs";

class BadBox extends HTMLDivElement {
    activeOption;
    trigger = null;
    list = null;

    constructor() {
        const self = super();

        this.trigger = self.querySelector(".list-box__button");
        this.list = self.querySelector(".list-box__container");

        this.shadowBuilder();
    }

    shadowBuilder() {
        this.activeOption = new BehaviorSubject(this.list.querySelector(".list-box__option:first-child"));
        this.activeOption.asObservable().subscribe(val => {
            this.list.querySelectorAll("li").forEach((li) => {
                li.classList.remove("list-box__option--active");
            });

            val.classList.add("list-box__option--active");
        });

        this.initTrigger();
        this.initList();
    }

    initTrigger() {
        const clickCallback = () => {
            this.list.classList.add("active");
            this.list.focus();
        };

        this.trigger.addEventListener("click", () => {
            clickCallback();
        });

        this.trigger.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "Enter":
                case " ":
                    clickCallback();
                default:
                // do nothing
            }
        });
    }

    initList() {
        this.list.querySelectorAll("li").forEach((li, i) => {
            if (i === 0) {
                li.classList.add("list-box__option--selected");
                this.trigger.innerHTML = li.innerHTML;
                this.activeOption.next(li);
            }
        });

        this.list.addEventListener("focusout", (event) => {
            event.target.classList.remove("active");
        });

        const clickCallback = (target) => {
            this.activeOption.next(target);
            this.trigger.innerHTML = target.innerHTML;
            this.list.classList.remove("active");
            this.trigger.focus();
        };

        this.list.querySelectorAll(".list-box__option").forEach((option) => {
            option.addEventListener("click", ({target}) => {
                clickCallback(target);
            });
        });

        this.list.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    event.preventDefault();
                    if (this.activeOption.getValue() === this.list.querySelector(".list-box__option:first-child"))
                        return;

                    this.activeOption.next(this.activeOption.getValue().previousElementSibling);
                    break;
                case "ArrowDown":
                    event.preventDefault();
                    if (this.activeOption.getValue() === this.list.querySelector(".list-box__option:last-child"))
                        return;

                    this.activeOption.next(this.activeOption.getValue().nextElementSibling);
                    break;
                case "Enter":
                case " ":
                    event.preventDefault();

                    this.trigger.innerHTML = this.activeOption.getValue().innerHTML;
                    this.list.classList.remove("active");
                    this.trigger.focus();
                    break;
                case "Escape":
                    this.list.classList.remove("active");
                    this.trigger.focus();
                    break;
                default:
            }
        });
    }
}

export default BadBox;