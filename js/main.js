'use strict';

const isNumber = function(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const start = function() {
  let money;

  do {
    money = prompt('Ваш месячный доход?', 0);
  } while (!isNumber(money));

  return parseFloat(money);
};

const showTypeOf = function(data) {
  console.log(data, typeof data);
};

const getExpensesMonth = function () {
  let sum = 0, amount = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');

    do {
    amount = prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));

    sum += parseFloat(amount);
  }

  console.log(expenses);

  return sum;
};

const getAccumulatedMonth = function (money, amount) {
  return money - amount;
};

const getTargetMonth = function (accumulatedMonth, mission) {
  return Math.ceil(mission / accumulatedMonth);
};

const getStatusIncome = function (budgetDay) {
  if (budgetDay > 1200) {
    return'У вас высокий уровень дохода';
  } else if (budgetDay > 600 && budgetDay <= 1200) {
    return'У вас средний уровень дохода';
  } else if (budgetDay > 0 && budgetDay <= 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return'Что-то пошло не так';
  }
};

let money = start(),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    income = 'фриланс',
    mission = 2000000,
    period = 36,
    expenses = [],
    expensesMonth = getExpensesMonth(),
    accumulatedMonth = getAccumulatedMonth(money, expensesMonth),
    targetMonth = getTargetMonth(accumulatedMonth, mission),
    budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц ' + expensesMonth);
console.log(addExpenses !== null ? addExpenses.toLowerCase().split(', ') : addExpenses);

if (targetMonth >= 0) {
  console.log('Цель будет достигнута за ' + targetMonth + ' месяцев(-а)');
} else {
  console.log('Цель не будет достигнута');
}

console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome(budgetDay));
