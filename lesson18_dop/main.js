/* Добрый день(утро, вечер, ночь в зависимости от времени суток)
Сегодня: Понедельник
Текущее время: 12: 05: 15 PM
До нового года осталось 175 дней */

setInterval(() => {
    const paragraph = document.querySelector('p'),
        newYearDate = new Date('1 january 2022'),
        currentDate = new Date(),
        dayOfWeek = currentDate.getDay(),
        currentTime = currentDate.toLocaleTimeString('en-US'),
        daysUntilTheNewYear = Math.ceil((newYearDate.getTime() - currentDate.getTime()) / 1000 / 3600 / 24);

    const week = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    paragraph.innerHTML = `Сегодня: ${week[dayOfWeek]} <br>
                        Текущее время: ${currentTime} <br>
                        До нового года осталось ${daysUntilTheNewYear} дней`;
}, 1000);
