import shadowElementUtils from "../shadow/shadowElementUtils";
import MenuBar from "../shadow/menu_bar";
import Menu from "../shadow/menu";

shadowElementUtils.defineExtend('menu-bar', MenuBar, 'ul');
shadowElementUtils.defineExtend('menu-button', Menu, 'button');

const title = document.getElementById('title');
const layoutViewport = document.getElementById('layout-viewport');
const visualViewport = document.getElementById('visual-viewport');

title.innerText = `${window.innerWidth} CSS Viewport`;
layoutViewport.innerText = `${window.innerWidth} X ${window.innerHeight}`;
visualViewport.innerText = `${window.visualViewport.width} X ${window.visualViewport.height}`;

window.addEventListener('resize', (event) => {
    title.innerText = `${window.innerWidth} CSS Viewport`;
    layoutViewport.innerText = `${window.innerWidth} X ${window.innerHeight}`;
});

window.visualViewport.addEventListener('resize', (event) => {
    visualViewport.innerText = `${Math.round(window.visualViewport.width)} X ${Math.round(window.visualViewport.height)}`;
});