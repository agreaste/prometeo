import "../../styles/pages/keyboard_navigation.css";
import shadowElementUtils from "../shadow/shadowElementUtils";
import MenuBar from "../shadow/menu_bar";
import Menu from "../shadow/menu";

shadowElementUtils.defineExtend('menu-bar', MenuBar, 'ul');
shadowElementUtils.defineExtend('menu-button', Menu, 'button');

const form = document.getElementById('sample-form');
const formProgress = form.querySelector('#form-progress');

const total = form.elements.length - 1; // do not count submit button
formProgress.max = total;

form.addEventListener('change', (e) => {
    const completed = form.querySelectorAll(':valid:not(button)').length;
    formProgress.value = completed;
    formProgress.innerHTML = `${completed} of ${total}`;
});

const disableFocus = document.getElementById('disable-focus');

disableFocus.addEventListener('change', (event) => {
    if (event.target.checked)
        form.classList.add('disable-focus');
    else
        form.classList.remove('disable-focus');

    form.focus();
});

const namePosition = document.getElementById('name-position');

namePosition.max = total;
namePosition.value = 0;

const nameField = form.elements.namedItem('name');
const orderClasses = new Array(total).fill('').map((el, i) => `order-${i}`);

namePosition.addEventListener('change', (event) => {
    const value = event.target.value;

    nameField.parentNode.classList.remove(...orderClasses);
    nameField.parentNode.classList.add(`order-${Math.abs(value) - 1}`);
});

const trapButton = document.getElementById('trap-button');

const trapHandler = (event) => {
    switch (event.key) {
        case "Tab":
            if (event.shiftKey) {
                if (document.activeElement === form.elements.namedItem('name')) {
                    event.preventDefault();
                    form.elements[form.elements.length-1].focus();

                }
            } else {
                if (document.activeElement === form.elements.namedItem('submit')) {
                    event.preventDefault();
                    form.elements[0].focus();
                }
            }
            break;
        default:
        // do nothing;
    }
};

const escHandler = (event) => {
    switch (event.key) {
        case "Escape":
            form.removeEventListener('keydown', trapHandler);
            form.removeEventListener('keydown', escHandler);
            trapButton.focus();
            break;
        default:
        // do nothing;
    }
}

form.addEventListener('keydown', escHandler);

trapButton.addEventListener('click', (event) => {
    form.focus();
    form.addEventListener('keydown', trapHandler);
    form.addEventListener('keydown', escHandler);
});

const listboxButton = document.getElementById('listbox-label');
const listboxOptions = document.getElementById('job-listbox');

listboxButton.addEventListener('click', (event) => {
   listboxButton.setAttribute('aria-expanded', 'true');
   listboxOptions.focus();
});

listboxButton.parentNode.addEventListener('focusout', (event) => {
    listboxButton.setAttribute('aria-expanded', 'false');
});

