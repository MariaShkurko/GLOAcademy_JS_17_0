"use strict";

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const isString = function (str) {
    return (str.length !== 0) && !isNumber(str);
}

const formattingString = function (str) {
        return str[0].toUpperCase() + str.slice(1);
    }

const start = function () {
    let money;

    do {
        money = prompt("Ваш месячный доход?", 0);
    } while (!isNumber(money));

    return parseFloat(money);
};

let money = start(),
    appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],

        budget: money,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,

        mission: 2000000,
        period: 36,
        deposit: false,
        percentDeposit: 0,
        moneyDeposit: 0,

        asking: function () {
            let expenses,
                amount,
                addExpenses = prompt(
                    "Перечислите возможные расходы за рассчитываемый период через запятую"
                );

            if (addExpenses !== null) {
                let str = '';

                appData.addExpenses = addExpenses.toLowerCase().split(', ');

                appData.addExpenses.forEach(element => {
                    element = formattingString(element);
                    str += element + ', ';
                });

                console.log(str.substring(0, str.length - 2));
            }

            if (confirm('Есть ли у вас дополнительный источник заработка?')) {
                let itemIncome,
                    cashIncome;

                do {
                    itemIncome = prompt('Какой у вас дополнительный заработок?');
                } while (!isString(itemIncome));

                do {
                    cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
                } while (!isNumber(cashIncome));

                appData.income[itemIncome] = cashIncome;
            }

            appData.deposit = confirm("Есть ли у вас депозит в банке?");
            appData.getInfoDeposit();

            for (let i = 0; i < 2; i++) {
                do {
                    expenses = prompt("Введите обязательную статью расходов?");
                } while (!isString(expenses));
                
                do {
                    amount = prompt("Во сколько это обойдется?");
                } while (!isNumber(amount));

                appData.expenses[expenses] = parseFloat(amount);
            }
        },

        getExpensesMonth: function () {
            for (let expense in appData.expenses) {
                appData.expensesMonth += appData.expenses[expense];
            }
        },

        getBudget: function () {
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = appData.budgetMonth / 30;
        },

        getTargetMonth: function () {
            return Math.ceil(appData.mission / appData.budgetMonth);
        },

        getStatusIncome: function () {
            if (appData.budgetDay > 1200) {
                return "У вас высокий уровень дохода";
            } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
                return "У вас средний уровень дохода";
            } else if (appData.budgetDay > 0 && appData.budgetDay <= 600) {
                return "К сожалению у вас уровень дохода ниже среднего";
            } else {
                return "Что-то пошло не так";
            }
        },

        getInfoDeposit: function() {
            if (appData.deposit) {
                do {
                    appData.percentDeposit = prompt('Какой годовой процент?', 10);
                } while (!isNumber(appData.percentDeposit));

                do {
                    appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
                } while (!isNumber(appData.moneyDeposit));
            }
        },

        calcSavedMoney: function() {
            return appData.budgetMonth * appData.period;
        }
    };

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

console.log("Расходы за месяц " + appData.expensesMonth);

if (appData.getTargetMonth() >= 0) {
    console.log("Цель будет достигнута за " + appData.getTargetMonth() + " месяцев(-а)");
} else {
    console.log("Цель не будет достигнута");
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let prop in appData) {
    console.log(prop + ': ', appData[prop]);
}