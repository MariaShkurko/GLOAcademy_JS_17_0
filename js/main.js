window.addEventListener('DOMContentLoaded', () => {

    // Timer
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);

            return { timeRemaining, hours, minutes, seconds };
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            const formatNumbers = number => {
                if (String(number).length < 2) {
                    return '0' + String(number);
                }

                return String(number);
            };

            timerHours.textContent = formatNumbers(timer.hours);
            timerMinutes.textContent = formatNumbers(timer.minutes);
            timerSeconds.textContent = formatNumbers(timer.seconds);

            if (timer.timeRemaining < 1) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                return 0;
            }
        };

        updateClock();
        const idInterval = setInterval(() => {
            const res = updateClock();
            if (res === 0) {
                clearInterval(idInterval);
            }
        }, 1000);
    };

    countTimer('2 march 2021');

    // Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = menu.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        let count = -100,
            animationInterval;

        // Animation menu
        const animationMenu = () => {
            animationInterval = requestAnimationFrame(animationMenu);
            count += 5;
            menu.style.transform = `translateX(${count}%)`;
            if (menu.style.transform === 'translateX(100%)') cancelAnimationFrame(animationInterval);
        };

        const handlerMenu = () => {
            if (screen.width < 768) {
                menu.classList.toggle('active-menu');
            } else {
                if (!menu.style.transform || menu.style.transform === 'translateX(-100%)') {
                    console.log('start animation');
                    count = -100;
                    animationMenu();
                } else {
                    console.log('start close');
                    menu.style.transform = '';
                }
            }
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(item => item.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    // popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupClose = popup.querySelector('.popup-close'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach(item => item.addEventListener('click', () => popup.style.display = 'block'));
        popupClose.addEventListener('click', () => popup.style.display = '');
    };

    togglePopUp();
});
