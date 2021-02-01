'use strict'

let money = 100000,
    income = 'фриланс',
    addExpenses = 'интернет, такси, коммуналка',
    deposit = true,
    mission = 2000000,
    period = 36,
    budgetMonth,
    budgetDay = money / 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

money = Number(prompt('Ваш месячный доход?'));
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let depositStr = prompt('Есть ли у вас депозит в банке?');
deposit = (depositStr !== null) && ((depositStr.toLowerCase() === 'да') || (depositStr.toLowerCase() === 'yes')) ? true : false;

console.log(addExpenses !== null ? addExpenses.toLowerCase().split(', ') : addExpenses);

let expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = Number(prompt('Во сколько это обойдется?')),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = Number(prompt('Во сколько это обойдется?'));

budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ' + budgetMonth);

console.log('Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев(-а)');

budgetDay = budgetMonth / 30;

console.log('Бюджет на день: ' + budgetDay);

switch (true) {
  case budgetDay > 1200:
    console.log('У вас высокий уровень дохода');
    break;
  case budgetDay > 600 && budgetDay <= 1200:
    console.log('У вас средний уровень дохода');
    break;
  case budgetDay > 0 && budgetDay <= 600:
    console.log('К сожалению у вас уровень дохода ниже среднего');
    break;
  default:
    console.log('Что-то пошло не так');
}