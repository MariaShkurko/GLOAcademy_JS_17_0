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
            menu = document.querySelector('menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        menu.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('close-btn') || target.nodeName === 'A') handlerMenu();
        });
    };

    toggleMenu();

    // popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        let count = 0,
            animationInterval;

        const animationPopUp = () => {
            animationInterval = requestAnimationFrame(animationPopUp);
            count += 0.05;
            popup.style.opacity = count;
            if (popup.style.opacity === "1") {
                cancelAnimationFrame(animationInterval);
                count = 0;
            }
        };

        popupBtn.forEach(item => item.addEventListener('click', () => {
            if (screen.width < 768) {
                popup.style.display = 'block';
            } else {
                popup.style.opacity = 0;
                popup.style.display = 'block';
                animationPopUp();
            }
        }));
        popup.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.opacity = '';
                popup.style.display = '';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.opacity = '';
                    popup.style.display = '';
                }
            }
        });
    };

    togglePopUp();

    // tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            const target = event.target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // Slider
    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slides = slider.querySelectorAll('.portfolio-item'),
            portfolioDots = slider.querySelector('.portfolio-dots');

        for (let i = 0; i < slides.length; i++) {
            const newDot = document.createElement('li');
            newDot.classList.add('dot');
            if (i === 0) {
                newDot.classList.add('dot-active');
            }
            portfolioDots.append(newDot);
        }

        const dot = portfolioDots.querySelectorAll('.dot');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slides, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;

            nextSlide(slides, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn, .dot')) stopSlide();
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn, .dot')) startSlide(5000);
        });

        startSlide(5000);
    };

    slider();
});
