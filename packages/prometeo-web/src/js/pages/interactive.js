import "../../styles/pages/interactive.css";
import shadowElementUtils from "../shadow/shadowElementUtils";
import MenuBar from "../shadow/menu_bar";
import Menu from "../shadow/menu";

shadowElementUtils.defineExtend('menu-bar', MenuBar, 'ul');
shadowElementUtils.defineExtend('menu-button', Menu, 'button');

const form = document.getElementById('sample-form');
const formProgress = form.querySelector('#form-progress');
const formElementsList = document.getElementById('form-elements-list');

const total =  form.elements.length - 1; // do not count submit button

formProgress.max = total;

form.addEventListener('change', (e) => {
    const completed = form.querySelectorAll(':valid:not(button)').length;
    formProgress.value = completed;
    formProgress.innerHTML = `${completed} on ${total}`;
});

const ul = document.createElement('ul');

Array.from(form.elements).forEach((el, i) => {
   const li = document.createElement('li');
   li.innerHTML = el.id;
   ul.append(li);
});

formElementsList.append(ul);