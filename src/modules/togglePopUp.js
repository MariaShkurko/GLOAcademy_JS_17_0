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

export default togglePopUp;
