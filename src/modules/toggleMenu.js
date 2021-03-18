import smoothScrolling from './smoothScrolling';

const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('close-btn')) {
            handlerMenu();
        } else if (target.nodeName === 'A') {
            event.preventDefault();
            handlerMenu();
            smoothScrolling(target);
        }
    });
};

export default toggleMenu;
