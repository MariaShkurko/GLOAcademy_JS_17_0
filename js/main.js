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

    countTimer('15 march 2021');

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

    // Validation
    const validation = () => {
        const calcBlock = document.querySelector('.calc-block'),
            mainForm = document.getElementById('form1'),
            mainFormName = document.getElementById('form1-name'),
            mainFormEmail = document.getElementById('form1-email'),
            mainFormPhone = document.getElementById('form1-phone'),
            connectForm = document.getElementById('form2'),
            connectFormName = document.getElementById('form2-name'),
            connectFormEmail = document.getElementById('form2-email'),
            connectFormPhone = document.getElementById('form2-phone'),
            connectFormMessage = document.getElementById('form2-message'),
            popUpForm = document.getElementById('form3'),
            popUpFormName = document.getElementById('form3-name'),
            popUpFormEmail = document.getElementById('form3-email'),
            popUpFormPhone = document.getElementById('form3-phone');

        calcBlock.addEventListener('input', event => {
            const target = event.target;
            if (target.matches('.calc-square') ||
                target.matches('.calc-count') ||
                target.matches('.calc-day')) {
                target.value = target.value.replace(/\D/g, '');
            }
        });

        mainForm.addEventListener('input', event => {
            const target = event.target;
            if (target.matches('#form1-name')) {
                target.value = target.value.replace(/[^а-яё\- ]/gi, '');
            } else if (target.matches('#form1-email')) {
                target.value = target.value.replace(/[^a-z@_!~'-.*]/gi, '');
            } else if (target.matches('#form1-phone')) {
                target.value = target.value.replace(/[^0-9()-]/gi, '');
            }
        });
        mainFormName.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.trim()
                .replace(/^-*/g, '')
                .replace(/-*$/g, '')
                .replace(/-+/g, '-')
                .replace(/ +/g, ' ')
                .split(' ')
                .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        });
        mainFormEmail.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.toLowerCase()
                .replace(/^-*/g, '')
                .replace(/\W*$/g, '');
            if (target.value && target.value.search(/\w+@\w+\.\w{2,3}/) === -1) {
                alert('Некорректный email');
            }
        });
        mainFormPhone.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.replace(/^\D*/g, '')
                .replace(/\D*$/g, '')
                .replace(/-+/g, '-')
                .replace(/\(+/g, '(')
                .replace(/\)+/g, ')');
            if (target.value && target.value.search(/[78](([()-]*\d){10}|\d{10,11})/) === -1) {
                alert('Некорректный номер телефона');
            }
        });

        connectForm.addEventListener('input', event => {
            const target = event.target;
            if (target.matches('#form2-name') || target.matches('#form2-message')) {
                target.value = target.value.replace(/[^а-яё\- ]/gi, '');
            } else if (target.matches('#form2-email')) {
                target.value = target.value.replace(/[^a-z@_!~'\-.*]/gi, '');
            } else if (target.matches('#form2-phone')) {
                target.value = target.value.replace(/[^0-9()-]/gi, '');
            }
        });
        connectFormName.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.trim()
                .replace(/^-*/g, '')
                .replace(/-*$/g, '')
                .replace(/-+/g, '-')
                .replace(/ +/g, ' ')
                .split(' ')
                .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        });
        connectFormEmail.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.toLowerCase()
                .replace(/^-*/g, '')
                .replace(/\W*$/g, '');
            if (target.value && target.value.search(/\w+@\w+\.\w{2,3}/) === -1) {
                alert('Некорректный email');
            }
        });
        connectFormPhone.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.replace(/^\D*/g, '')
                .replace(/\D*$/g, '')
                .replace(/-+/g, '-')
                .replace(/\(+/g, '(')
                .replace(/\)+/g, ')');
            if (target.value && target.value.search(/[78](([()-]*\d){10}|\d{10,11})/) === -1) {
                alert('Некорректный номер телефона');
            }
        });
        connectFormMessage.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.trim()
                .replace(/^-*/g, '')
                .replace(/-*$/g, '')
                .replace(/-+/g, '-')
                .replace(/ +/g, ' ');
        });

        popUpForm.addEventListener('input', event => {
            const target = event.target;
            if (target.matches('#form3-name')) {
                target.value = target.value.replace(/[^а-яё\- ]/gi, '');
            } else if (target.matches('#form3-email')) {
                target.value = target.value.replace(/[^a-z@_!~'\-.*]/gi, '');
            } else if (target.matches('#form3-phone')) {
                target.value = target.value.replace(/[^0-9()-]/gi, '');
            }
        });
        popUpFormName.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.trim()
                .replace(/^-*/g, '')
                .replace(/-*$/g, '')
                .replace(/-+/g, '-')
                .replace(/ +/g, ' ')
                .split(' ')
                .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        });
        popUpFormEmail.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.toLowerCase()
                .replace(/^-*/g, '')
                .replace(/\W*$/g, '');
            if (target.value && target.value.search(/\w+@\w+\.\w{2,3}/) === -1) {
                alert('Некорректный email');
            }
        });
        popUpFormPhone.addEventListener('blur', event => {
            const target = event.target;
            target.value = target.value.replace(/^\D*/g, '')
                .replace(/\D*$/g, '')
                .replace(/-+/g, '-')
                .replace(/\(+/g, '(')
                .replace(/\)+/g, ')');
            if (target.value && target.value.search(/[78](([()-]*\d){10}|\d{10,11})/) === -1) {
                alert('Некорректный номер телефона');
            }
        });

    };

    validation();

    // Calculate
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = calcBlock.querySelector('.calc-type'),
            calcSquare = calcBlock.querySelector('.calc-square'),
            calcCount = calcBlock.querySelector('.calc-count'),
            calcDay = calcBlock.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value && calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = Math.ceil(total);
        };

        calcBlock.addEventListener('change', event => {
            const target = event.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calc(100);
});
