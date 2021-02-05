"use strict";

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

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

        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,

        mission: 2000000,
        period: 36,
        deposit: false,

        asking: function () {
            let expenses,
                amount,
                addExpenses = prompt(
                    "Перечислите возможные расходы за рассчитываемый период через запятую"
                );

            appData.deposit = confirm("Есть ли у вас депозит в банке?");
            appData.addExpenses = addExpenses !== null ? addExpenses.toLowerCase().split(', ') : addExpenses;

            for (let i = 0; i < 2; i++) {
                expenses = prompt("Введите обязательную статью расходов?");

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
        }
    };

appData.budget = money;

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