import "../../styles/pages/interactive.css";
import shadowElementUtils from "../shadow/shadowElementUtils";
import {Menubar, Menu} from "nyx";

shadowElementUtils.defineExtend("menu-bar", Menubar, "ul");
shadowElementUtils.defineExtend("menu-button", Menu, "button");

const form = document.getElementById("sample-form");
const personal = document.getElementById("personal-info");
const account = document.getElementById("account-info");
const job = document.getElementById("job-info");
const formProgress = form.querySelector("#form-progress");
const formElementsList = document.getElementById("form-elements-list");

const password = document.getElementById("password");
const passwordError = document.getElementById("password-error");
const passwordSuggestion = document.getElementById("password-suggestion");


const total = personal.elements.length + account.elements.length + job.elements.length; // do not count submit button

formProgress.max = total;

form.addEventListener("change", () => {
    const completed = form.querySelectorAll(":valid:not(button)").length;
    formProgress.value = completed;
    formProgress.innerHTML = `${completed} of ${total}`;
});

form.addEventListener("reset", () => {
    formProgress.value = 0;
    formProgress.innerHTML = `0 of ${total}`;
});

const ul = document.createElement("ul");

Array.from(personal.elements).forEach((el) => {
    const li = document.createElement("li");
    li.innerHTML = el.id;
    ul.append(li);

    el.addEventListener("invalid", ({target}) => {
        if(target.validity.valueMissing) {
            target.setCustomValidity(target.name + " is missing!! HOW DARE YOU");
        }
    });
});

Array.from(account.elements).forEach((el) => {
    const li = document.createElement("li");
    li.innerHTML = el.id;
    ul.append(li);
});

Array.from(job.elements).forEach((el) => {
    const li = document.createElement("li");
    li.innerHTML = el.id;
    ul.append(li);
});

formElementsList.append(ul);

password.addEventListener("invalid", ({target}) => {
    target.setAttribute("aria-invalid", "true");

    passwordSuggestion.classList.remove("show");
    passwordError.classList.add("show");
    password.setAttribute("aria-describedby", "password-error");

});

password.addEventListener("change", () => {
    passwordError.classList.remove("show");
    passwordSuggestion.classList.add("show");
    password.setAttribute("aria-describedby", "password-suggestion");

});
