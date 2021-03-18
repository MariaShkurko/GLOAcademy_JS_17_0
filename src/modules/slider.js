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

export default slider;
