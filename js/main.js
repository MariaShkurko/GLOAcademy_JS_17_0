"use strict";

const buttonStart = document.getElementById('start'),
    buttonCansel = document.getElementById('cancel'),
    buttonPlus = document.querySelectorAll('.btn_plus'),
    incomePlus = buttonPlus[0],
    expensesPlus = buttonPlus[1],
    salaryAmount = document.querySelector('.salary-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositСheck = document.querySelector('#deposit-check'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodValue = document.querySelector('.period-amount'),
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = (str) => {
    return (str.length !== 0) && !isNumber(str);
};

const formattingString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
};

class AppData {
    constructor() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonth = 0;
        this.expensesMonth = 0;

        this.mission = 0;
        this.period = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }

    start() {
        const inputsText = document.querySelectorAll('input[type=text]');

        inputsText.forEach((item) => {
            item.disabled = true;
        });
        buttonStart.style.display = 'none';
        buttonCansel.style.display = 'block';

        this.budget = parseFloat(salaryAmount.value);

        this.getExpInc();
        this.getAddExpInc(additionalExpensesItem);
        this.getAddExpInc(additionalIncomeItem);
        this.getExpIncMonth();
        this.getBudget();
        this.showResult();
    }

    reset() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.incomeMonth = 0;
        this.expensesMonth = 0;
        this.mission = 0;
        this.period = 0;
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;

        const inputsDataText = document.querySelector('.data').querySelectorAll('input[type=text]');
        const inputsText = document.querySelectorAll('input[type=text]');

        inputsDataText.forEach((item) => {
            item.disabled = false;
        });
        buttonStart.style.display = 'block';
        buttonCansel.style.display = 'none';

        inputsText.forEach((item) => {
            item.value = '';
        });
        periodSelect.value = 1;
        periodValue.textContent = 1;

        for (let i = 1; i < expensesItems.length; i++) {
            if (expensesItems[i] !== undefined) {
                expensesItems[i].remove();
            }
        }

        for (let i = 1; i < incomeItems.length; i++) {
            if (incomeItems[i] !== undefined) {
                incomeItems[i].remove();
            }
        }

        expensesPlus.style.display = 'inline-block';
        incomePlus.style.display = 'inline-block';
    }

    showResult() {
        budgetMonthValue.value = parseFloat(this.budgetMonth.toFixed(2));
        budgetDayValue.value = parseFloat(this.budgetDay.toFixed(2));
        expensesMonthValue.value = parseFloat(this.expensesMonth.toFixed(2));
        additionalIncomeValue.value = this.addIncome.join(', ');
        additionalExpensesValue.value = this.addExpenses.join(', ');
        incomePeriodValue.value = this.calcSavedMoney();
        targetMonthValue.value = this.getTargetMonth();

        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney();
            targetMonthValue.value = this.getTargetMonth();
        });
    }

    addExpIncBlock(items, btn) {
        const cloneItem = items[0].cloneNode(true);
        items[0].parentNode.insertBefore(cloneItem, btn);

        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');

        if (items.length === 3) {
            btn.style.display = 'none';
        }
    }

    getExpInc() {
        const count = item => {
            const strStart = item.className.split('-')[0],
                itemTitle = item.querySelector(`.${strStart}-title`).value,
                itemAmount = item.querySelector(`.${strStart}-amount`).value;

            if (isString(itemTitle) && isNumber(itemAmount)) {
                this[strStart][itemTitle] = parseFloat(itemAmount);
            }
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);
    }

    getAddExpInc(addItem) {
        const condition = addItem.className.split('-')[0] === 'additional_expenses';
        let add;

        if (condition) {
            add = addItem.value.split(',');
        } else {
            add = addItem;
        }

        add.forEach((item) => {
            const itemValue = condition ? item.trim() : item.value.trim();
            if (itemValue !== '') {
                this[condition ? addExpenses : addIncome].push(itemValue);
            }
        });
    }

    getExpIncMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    /* getStatusIncome() {
        if (this.budgetDay > 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay > 0 && this.budgetDay <= 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "Что-то пошло не так";
        }
    } */

    /* getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            } while (!isNumber(this.percentDeposit));
     
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    } */

    calcSavedMoney() {
        this.period = parseFloat(periodSelect.value);
        return this.budgetMonth * this.period;
    }

    eventsListeners() {
        buttonStart.addEventListener('click', () => {
            if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
                this.start();
            } else {
                salaryAmount.value = '';
                alert('Введите число в поле "Месячный доход"');
            }
        });
        buttonCansel.addEventListener('click', () => {
            this.reset();
        });
        incomePlus.addEventListener('click', () => { this.addExpIncBlock(incomeItems, incomePlus); });
        expensesPlus.addEventListener('click', () => { this.addExpIncBlock(expensesItems, expensesPlus); });
        periodSelect.addEventListener('input', () => {
            periodValue.textContent = periodSelect.value;
        });
    }
};

const appData = new AppData();

appData.eventsListeners();