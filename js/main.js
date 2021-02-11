let conteinerBooks = document.querySelector('.books'),
    books = document.querySelectorAll('.book'),
    ulBook2 = books[0].querySelector('ul'),
    chaptersBook2 = ulBook2.querySelectorAll('li'),
    ulBook5 = books[5].querySelector('ul'),
    chaptersBook5 = ulBook5.querySelectorAll('li'),
    chaptersBook6 = books[2].querySelectorAll('li'),
    newChapter = chaptersBook6[0].cloneNode(true);

conteinerBooks.append(books[1]);
conteinerBooks.append(books[0]);
conteinerBooks.append(books[4]);
conteinerBooks.append(books[3]);
conteinerBooks.append(books[5]);
conteinerBooks.append(books[2]);

ulBook2.append(chaptersBook2[0]);
ulBook2.append(chaptersBook2[1]);
ulBook2.append(chaptersBook2[3]);
ulBook2.append(chaptersBook2[6]);
ulBook2.append(chaptersBook2[8]);
ulBook2.append(chaptersBook2[4]);
ulBook2.append(chaptersBook2[5]);
ulBook2.append(chaptersBook2[7]);
ulBook2.append(chaptersBook2[9]);
ulBook2.append(chaptersBook2[2]);
ulBook2.append(chaptersBook2[10]);

ulBook5.append(chaptersBook5[0]);
ulBook5.append(chaptersBook5[1]);
ulBook5.append(chaptersBook5[9]);
ulBook5.append(chaptersBook5[3]);
ulBook5.append(chaptersBook5[4]);
ulBook5.append(chaptersBook5[2]);
ulBook5.append(chaptersBook5[6]);
ulBook5.append(chaptersBook5[7]);
ulBook5.append(chaptersBook5[5]);
ulBook5.append(chaptersBook5[8]);
ulBook5.append(chaptersBook5[10]);

newChapter.textContent = 'Глава 8: За пределами ES6';
chaptersBook6[8].after(newChapter);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
books[4].querySelector('h2 > a').textContent = 'Книга 3. this и Прототипы Объектов';
document.querySelector('.adv').remove();