const smoothScrolling = anchor => {
    const blockID = anchor.getAttribute('href');

    document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

export default smoothScrolling;
