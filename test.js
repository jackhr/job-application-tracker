const deduction = 800;
let totalMonths = 0;
let leftOver = 0;

// const howManyMonthsToGetBelowThirtyPercent = function(CCName, limit, used, APR) {
//   const thirtyPercent = limit * 0.3;
//   const monthlyInterestRate = APR / 12 / 100; // Convert APR to monthly interest rate
//   let months = 0;

//   while (used > thirtyPercent) {
//     months++;
//     totalMonths++;

//     const interestCharge = used * monthlyInterestRate;
//     const monthlyPayment = deduction - interestCharge;

//     used -= monthlyPayment;

//     console.log(`${CCName} used:`, used);
//   }
//   let buffer = '       ';
//   if (CCName === 'APPLE') buffer += '';
//   if (CCName === 'AMEX') buffer += ' ';
//   if (CCName === 'TD') buffer += '   ';
//   if (CCName === 'CITI') buffer += ' ';

//   return `${CCName}${buffer}after ${months} months: $${used.toFixed(2)}     limit is $${limit}     30% is $${thirtyPercent}`;
// }

const howManyMonthsToGetBelowThirtyPercent = function(CCName, limit, used, APR) {
  const thirtyPercent = limit * 0.3;
  const monthlyInterestRate = (APR / 365) * 31; // Convert APR to monthly interest rate
  let months = 0;
  
  while (used >= thirtyPercent) {
    months++;
    totalMonths++;
    // const thisMonthInterest = used * monthlyInterestRate;
    // used += thisMonthInterest;

    used -= deduction; // Deduct the payment
    // used -= leftOver;
    if (leftOver) leftOver = 0;

  }
  leftOver = Math.abs(used);

  let buffer = '       ';
  if (CCName === 'APPLE') buffer += '';
  if (CCName === 'AMEX') buffer += ' ';
  if (CCName === 'TD') buffer += '   ';
  if (CCName === 'CITI') buffer += ' ';

  return `${CCName}${buffer}after ${months} months: $${used.toFixed(2)}     limit is $${limit}     30% is $${thirtyPercent}`;
}


// AMEX        after 4 months: $603.74     limit is $4000     30% is $1200
// TD          after 1 months: $543.75     limit is $2000     30% is $600
// APPLE       after 2 months: $828.76     limit is $3000     30% is $900
// CITI        after 2 months: $872.21     limit is $3300     30% is $990


const AMEX = howManyMonthsToGetBelowThirtyPercent('AMEX', 4000, 3801.16, 0.2974);
const TD = howManyMonthsToGetBelowThirtyPercent('TD', 2000, 1947.18, 0.2799);
const APPLE = howManyMonthsToGetBelowThirtyPercent('APPLE', 3000, 2971.60, 0.2699);
const CITI = howManyMonthsToGetBelowThirtyPercent('CITI', 3300, 3300, 0.2799);

console.log('');
console.log('');
console.log(`After deducting $${deduction} each month until all cards are completely paid off after being below 30% and paying without help ($400/month):`);
console.log('');
console.log(AMEX);
console.log(TD);
console.log(APPLE);
console.log(CITI);
console.log('');
console.log(`Total months: ${totalMonths}`);
console.log('');
console.log(`${Math.trunc(totalMonths/12)} year${Math.trunc(totalMonths/12) == 1 ? '' : 's'} and ${totalMonths % 12} month${(totalMonths % 12) == 1 ? '' : 's'}`);
console.log('');
console.log('');