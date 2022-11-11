import shadowElementUtils from "shadow/shadowElementUtils";
import ListBox from "shadow/listBox";
import BadBox from "shadow/badBox";
import Tablist from "shadow/tablist";
import Accordion from "shadow/accordion";
import RadioGroup from "shadow/radiogroup";
import data from "../mock.json";
import Checkbox from "shadow/checkbox";
import SelectAll from "shadow/selectAll";
import MenuBar from "shadow/menu_bar";
import Menu from "shadow/menu";
import BasicCarousel, {CarouselControl, CarouselNext, CarouselPrevious} from "shadow/basicCarousel";
import Card from "../card";

import "styles/pages/aria.css";

// customized aria widget as I'm the laziest around, sorry mom
shadowElementUtils.defineExtend('menu-bar', MenuBar, 'ul');
shadowElementUtils.defineExtend('menu-button', Menu, 'button');
shadowElementUtils.defineExtend('list-box', ListBox, 'div');
shadowElementUtils.defineExtend('bad-box', BadBox, 'div');
shadowElementUtils.defineExtend('tab-widget', Tablist, 'div');
shadowElementUtils.defineExtend('accordion-widget', Accordion, 'div');
shadowElementUtils.defineExtend('basic-carousel', BasicCarousel, 'div');
shadowElementUtils.defineExtend('carousel-control', CarouselControl, 'button');
shadowElementUtils.defineExtend('carousel-previous', CarouselPrevious, 'button');
shadowElementUtils.defineExtend('carousel-next', CarouselNext, 'button');
shadowElementUtils.defineExtend('custom-radio', RadioGroup, 'ul');
shadowElementUtils.defineExtend('custom-checkbox', Checkbox, 'button');
shadowElementUtils.defineExtend('select-all', SelectAll, 'button');

// password example
const password = document.getElementById('fake-password');
const showPassword = document.getElementById('useless-button');
const passwordError = document.getElementById('password-error');

const changeListener = ({target}) => {
    const invalid = target.value.length < 8;
    target.setAttribute('aria-invalid', invalid.toString());

    if (!invalid) {
        passwordError.classList.remove('invalid');
        password.setAttribute('aria-describedby', 'password-suggestion');
    } else {
        passwordError.classList.add('invalid');
        password.setAttribute('aria-describedby', 'password-error');
    }
};

password.addEventListener('keydown', changeListener);
password.addEventListener('keypress', changeListener);
password.addEventListener('change', changeListener);
password.addEventListener('paste', changeListener);

showPassword.addEventListener('click', (event) => {
    event.preventDefault();
    password.type = password.type === 'password' ? 'text' : 'password';
});

// checkbox fieldset example:
const frameworkFieldset = document.getElementById('n-framework-group');
const frameworkAll = document.getElementById('n-all');
const frameworkOptions = Array.from(frameworkFieldset.elements).filter(el => el !== frameworkAll);

frameworkFieldset.addEventListener('change', (event) => {
    if (event.target === frameworkAll) {
        // select or deselect all:
        frameworkOptions.forEach(el => {
            el.checked = event.target.checked;
        })
    } else {
        const checked = frameworkOptions.filter(el => el.checked).length;

        // update select all state depending on selected options
        frameworkAll.checked = checked === frameworkOptions.length;
        frameworkAll.indeterminate = checked > 0 && checked < frameworkOptions.length;
    }
});

const selectAll = document.getElementById('c-all');

selectAll.onChange(({target}) => {
    const icon = selectAll.querySelector(`[data-indicator="${target.id}"]`);
    icon.style = 'visibility: ' + (target.getAttribute('aria-checked') === "true" ? 'visible' : 'hidden')
});

selectAll.addEventListener('click', ({target}) => {
    target.querySelectorAll('[data-indicator]').forEach(icon => {
        icon.style = 'visibility: ' + (target.getAttribute('aria-checked') === "true" ? 'visible' : 'hidden')
    });
});

// aria-live example
const cardContainer = document.getElementById('search-results');
const searchText = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
const searchLoading = document.getElementById('search-loading');
const searchNumber = document.getElementById('results-number');

data.forEach(({id, name, description, image}) => {
    cardContainer.append(Card(id, name, description, image));
});

searchNumber.innerHTML = data.length;
cardContainer.setAttribute('aria-label', `Risultati di ricerca: ${data.length} articoli trovati`);

searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    cardContainer.innerHTML = '';
    cardContainer.setAttribute('aria-busy', 'true');
    searchLoading.classList.add('loading__alert--active');
    const results = data
        .filter(card => card.name.includes(searchText.value) || card.description.includes(searchText.value));
    setTimeout(() => {
        results.forEach(({id, name, description, image}) => {
            cardContainer.append(Card(id, name, description, image));
        });
        searchLoading.classList.remove('loading__alert--active');
        searchNumber.innerHTML = results.length;
        cardContainer.setAttribute('aria-label', `Risultati di ricerca: ${results.length} articoli trovati`);
        cardContainer.setAttribute('aria-busy', 'false');
        cardContainer.focus();
    }, 3000);
});