import '../styles/global.css';
import '../styles/index.css';
import shadowElementUtils from "./shadow/shadowElementUtils";
import MenuBar from "./shadow/menu_bar";
import Menu from "./shadow/menu";

shadowElementUtils.defineExtend('menu-bar', MenuBar, 'ul');
shadowElementUtils.defineExtend('menu-button', Menu, 'button');

const titles = document.querySelectorAll('h2, h3, h4, h5, h6');
const tableOfContents = document.getElementById('table-of-contents');

titles.forEach(title => {

    if(!title.id) {
        title.setAttribute('id', title.textContent.trim().toLocaleLowerCase().replaceAll(' ', '-'));
    }

    if(title.id !== 'content-list-title') {
        const item = document.createElement('li');
        item.innerHTML = `<a href="#${title.id}">${title.textContent}</a>`
        tableOfContents.appendChild(item);
    }
});

window.skipLinks = [
    {
        label: 'Skip to main content',
        anchor: '#main-content'
    },
    {
        label: 'Skip to head content',
        anchor: '#head-content'
    }
];