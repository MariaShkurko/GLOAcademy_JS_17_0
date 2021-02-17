"use strict";

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = (str) => {
    return (str.length !== 0) && !isNumber(str);
};

const formattingString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
};

const buttonStart = document.getElementById('start');
const buttonCansel = document.getElementById('cancel');
const buttonPlus = document.querySelectorAll('.btn_plus');
const incomePlus = buttonPlus[0];
const expensesPlus = buttonPlus[1];

const salaryAmount = document.querySelector('.salary-amount');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositСheck = document.querySelector('#deposit-check');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodValue = document.querySelector('.period-amount');

const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');

const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],

    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    incomeMonth: 0,
    expensesMonth: 0,

    mission: 0,
    period: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    start: function () {
        this.budget = parseFloat(salaryAmount.value);

        this.getIncome();
        this.getAddIncome();
        this.getExpenses();
        this.getAddExpenses();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getBudget();
        this.showResult();
    },

    reset: function () {
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

        const inputsText = document.querySelectorAll('input[type=text]');
        inputsText.forEach((item) => {
            item.value = '';
        });
        periodSelect.value = 1;
        periodValue.textContent = 1;
    },

    showResult: function () {
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
    },

    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },

    getExpenses: function () {
        expensesItems.forEach((item) => {
            let itemTitle = item.querySelector('.expenses-title').value,
                itemAmount = item.querySelector('.expenses-amount').value;

            if (isString(itemTitle) && isNumber(itemAmount)) {
                this.expenses[itemTitle] = parseFloat(itemAmount);
            }
        });
    },

    getIncome: function () {
        incomeItems.forEach((item) => {
            let itemTitle = item.querySelector('.income-title').value,
                itemAmount = item.querySelector('.income-amount').value;

            if (isString(itemTitle) && isNumber(itemAmount)) {
                this.income[itemTitle] = parseFloat(itemAmount);
            }
        });
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },

    getIncomeMonth: function () {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    },

    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },

    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },

    getStatusIncome: function () {
        if (this.budgetDay > 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDay > 600 && this.budgetDay <= 1200) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay > 0 && this.budgetDay <= 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "Что-то пошло не так";
        }
    },

    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?', 10);
            } while (!isNumber(this.percentDeposit));

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    },

    calcSavedMoney: function () {
        this.period = parseFloat(periodSelect.value);
        return this.budgetMonth * this.period;
    }
};

buttonStart.addEventListener('click', () => {
    if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
        const inputsText = document.querySelectorAll('input[type=text]');

        inputsText.forEach((item) => {
            item.disabled = true;
        });
        buttonStart.style.display = 'none';
        buttonCansel.style.display = 'block';
        appData.start();
    } else {
        salaryAmount.value = '';
        alert('Введите число в поле "Месячный доход"');
    }
});
buttonCansel.addEventListener('click', () => {
    const inputsDataText = document.querySelector('.data').querySelectorAll('input[type=text]');

    inputsDataText.forEach((item) => {
        item.disabled = false;
    });
    buttonStart.style.display = 'block';
    buttonCansel.style.display = 'none';
    appData.reset();
});
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', () => {
    periodValue.textContent = periodSelect.value;
});