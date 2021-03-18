import countTimer from './modules/countTimer';
import smoothScrolling from './modules/smoothScrolling';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import validation from './modules/validation';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
countTimer('20 march 2021');
// Validation
const errorList = validation();
// Menu
toggleMenu();
// popup
togglePopUp();
// tabs
tabs();
// Slider
slider();
// Calculate
calc(100);
// send-ajax-form
sendForm(errorList);

// smooth scrolling on main btn
const btnMain = document.querySelector('main>a');
btnMain.addEventListener('click', event => {
    event.preventDefault();
    smoothScrolling(btnMain);
});

// Command photo
const commandBlock = document.querySelector('.command > .container > .row');
commandBlock.addEventListener('mouseover', event => {
    const target = event.target;
    if (target.matches('.command__photo')) {
        target.dataset.src = target.getAttribute("src");
        target.src = target.dataset.img;
    }
});
commandBlock.addEventListener('mouseout', event => {
    const target = event.target;
    if (target.matches('.command__photo')) {
        target.src = target.dataset.src;
        target.dataset.src = '';
    }
});
