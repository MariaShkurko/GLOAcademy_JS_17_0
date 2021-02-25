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
    depositBank = document.querySelector('.deposit-bank'),
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

        this.getIncome();
        this.getAddIncome();
        this.getExpenses();
        this.getAddExpenses();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();
    }

    reset() {
        this.income = {
        };
        this.addIncome = [];
        this.expenses = {
        };
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

        depositСheck.checked = false;
        this.depositHandler();
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

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            const itemTitle = item.querySelector('.expenses-title').value,
                itemAmount = item.querySelector('.expenses-amount').value;

            if (isString(itemTitle) && isNumber(itemAmount)) {
                this.expenses[itemTitle] = parseFloat(itemAmount);
            }
        });
    }

    getIncome() {
        incomeItems.forEach((item) => {
            const itemTitle = item.querySelector('.income-title').value,
                itemAmount = item.querySelector('.income-amount').value;

            if (isString(itemTitle) && isNumber(itemAmount)) {
                this.income[itemTitle] = parseFloat(itemAmount);
            }
        });
    }

    getAddExpenses() {
        const addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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

    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = parseFloat(depositPercent.value);
            this.moneyDeposit = isNumber(depositAmount.value) ? parseFloat(depositAmount.value) : 0;
        }
    }

    calcSavedMoney() {
        this.period = parseFloat(periodSelect.value);
        return this.budgetMonth * this.period;
    }

    depositHandler() {
        if (depositСheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositBank.value = '';
            depositAmount.style.display = 'none';
            depositAmount.value = '';
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    changePercent() {
        const valueSelect = this.value;

        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }
    }

    eventsListeners() {
        buttonStart.addEventListener('click', () => {
            if (salaryAmount.value !== '' && isNumber(salaryAmount.value)) {
                if (this.deposit && depositBank.value === '') {
                    alert('Выберите банк');
                } else {
                    this.start();
                }
            } else {
                salaryAmount.value = '';
                alert('Введите число в поле "Месячный доход"');
            }
        });
        buttonCansel.addEventListener('click', () => { this.reset(); });
        incomePlus.addEventListener('click', this.addIncomeBlock);
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        periodSelect.addEventListener('input', () => {
            periodValue.textContent = periodSelect.value;
        });
        depositСheck.addEventListener('change', () => { this.depositHandler(); });
        depositPercent.addEventListener('input', () => {
            if (!isNumber(depositPercent.value)) {
                depositPercent.value = '';
            } else if (0 > parseFloat(depositPercent.value) || parseFloat(depositPercent.value) > 100) {
                depositPercent.value = 0;
            } else {
                depositPercent.value = parseFloat(depositPercent.value);
            }
        })
    }
};

const appData = new AppData();

appData.eventsListeners();