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

    const errorValidate = new Set();

    const validatePhone = event => {
        const target = event.target;
        target.value = target.value.replace(/^[^0-9+]*/g, '')
            .replace(/\D*$/g, '')
            .replace(/^\++/g, '+');

        if (!target.value.length) {
            errorValidate.add(target.id);
        } else if ((target.value.length > 6 || target.value.length < 13) &&
            target.value.search(/^(\+7|8)\d{5,10}$/) === -1) {
            target.style.border = '2px solid red';
            errorValidate.add(target.id);
        } else {
            target.style.border = '';
            errorValidate.delete(target.id);
        }
    };
    const validateName = event => {
        const target = event.target;
        target.value = target.value.trim()
            .replace(/ +/g, ' ')
            .split(' ')
            .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        if (target.value.length < 2) {
            target.style.border = '2px solid red';
            errorValidate.add(target.id);
        } else if (!target.value) {
            errorValidate.add(target.id);
        } else {
            target.style.border = '';
            errorValidate.delete(target.id);
        }
    };
    const validateEmail = event => {
        const target = event.target;
        target.value = target.value.toLowerCase()
            .replace(/^-*/g, '')
            .replace(/\W*$/g, '');
        if (target.value && target.value.search(/\w+@\w+\.\w{2,3}/) === -1) {
            target.style.border = '2px solid red';
            errorValidate.add(target.id);
        } else if (!target.value) {
            errorValidate.add(target.id);
        } else {
            target.style.border = '';
            errorValidate.delete(target.id);
        }
    };

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
            target.value = target.value.replace(/[^а-яё ]/gi, '');
        } else if (target.matches('#form1-email')) {
            target.value = target.value.replace(/[^a-z@_!~'-.*]/gi, '');
        } else if (target.matches('#form1-phone')) {
            target.value = target.value.replace(/[^0-9+]/gi, '');
        }
    });
    mainFormName.addEventListener('blur', event => { validateName(event); });
    mainFormEmail.addEventListener('blur', event => { validateEmail(event); });
    mainFormPhone.addEventListener('blur', event => { validatePhone(event); });

    connectForm.addEventListener('input', event => {
        const target = event.target;
        if (target.matches('#form2-name')) {
            target.value = target.value.replace(/[^а-яё ]/gi, '');
        } else if (target.matches('#form2-message')) {
            target.value = target.value.replace(/[^а-яё0-9.,\-!?:;'`"()@ ]/gi, '');
        } else if (target.matches('#form2-email')) {
            target.value = target.value.replace(/[^a-z@_!~'\-.*]/gi, '');
        } else if (target.matches('#form2-phone')) {
            target.value = target.value.replace(/[^0-9+]/gi, '');
        }
    });
    connectFormName.addEventListener('blur', event => { validateName(event); });
    connectFormEmail.addEventListener('blur', event => { validateEmail(event); });
    connectFormPhone.addEventListener('blur', event => { validatePhone(event); });
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
            target.value = target.value.replace(/[^а-яё ]/gi, '');
        } else if (target.matches('#form3-email')) {
            target.value = target.value.replace(/[^a-z@_!~'-.*]/gi, '');
        } else if (target.matches('#form3-phone')) {
            target.value = target.value.replace(/[^0-9+]/gi, '');
        }
    });
    popUpFormName.addEventListener('blur', event => { validateName(event); });
    popUpFormEmail.addEventListener('blur', event => { validateEmail(event); });
    popUpFormPhone.addEventListener('blur', event => { validatePhone(event); });

    return errorValidate;
};

export default validation;
