'use strict';

let money = Number(prompt('Ваш месячный доход?', 0)),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    income = 'фриланс',
    mission = 2000000,
    period = 36,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = Number(prompt('Во сколько это обойдется?')),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = Number(prompt('Во сколько это обойдется?')),
    accumulatedMonth,
    budgetMonth,
    budgetDay;

function showTypeOf (data) {
  console.log(data, typeof data);
}

function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}

function getAccumulatedMonth(money, amount) {
  return money - amount;
}

function getTargetMonth(accumulatedMonth, mission) {
  return Math.ceil(mission / accumulatedMonth);
}

function getStatusIncome(budgetDay) {
  if (budgetDay > 1200) {
    return'У вас высокий уровень дохода';
  } else if (budgetDay > 600 && budgetDay <= 1200) {
    return'У вас средний уровень дохода';
  } else if (budgetDay > 0 && budgetDay <= 600) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return'Что-то пошло не так';
  }
}

accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Расходы за месяц ' + getExpensesMonth(amount1, amount2));
console.log(addExpenses !== null ? addExpenses.toLowerCase().split(', ') : addExpenses);
console.log('Цель будет достигнута за ' + getTargetMonth(accumulatedMonth, mission) + ' месяцев(-а)');
console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome(budgetDay));
