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

export default countTimer;
