'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2022-05-12T23:36:17.929Z',
    '2022-05-16T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Dates requires accessing the full object to iterate different arrays namely movements and dates. i.e. this changes the displayMovements parameter to using the entire object.
const formatMovementDates = function (date, locale) {
  //calc days functionality
  const calcDayspassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDayspassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed === 7) return `${daysPassed} days ago`;

  /////////////////////////
  //INTL API
  return new Intl.DateTimeFormat(locale).format(date);
};
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(
    locale,
    {
      style: 'currency',
      currency: currency,
    }
    //to.Fixed(to decimal places)
  ).format(Math.abs(value.toFixed(2)));
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  //sort by position
  //slice creates a shallow copy
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  // movements.forEach(function (move, i) {changed when sort came in
  movs.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDates(date, acc.locale);

    const formattedMovIntlAPI = formatCurrency(move, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
              <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMovIntlAPI}</div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//Create usernames (Using forEach to mutate the original object to add a new property)
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner //adding a new property
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    // console.log(acc.userName);
  });
};
createUserNames(accounts);
// console.log(accounts);

//attach to D.O.M
const sumUserBalance = function (acc) {
  acc.Balance = acc.movements.reduce((x, y, i) => x + y, 0);
  // console.log(acc.Balance);
  const formattedMovIntlAPI = formatCurrency(
    acc.Balance,
    acc.locale,
    acc.currency
  );
  labelBalance.textContent = `${formattedMovIntlAPI}`;
};
//Calculate Summary, Deposit and withdrawal
const calcDisplaySummary = function (acc) {
  acc.deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(acc.deposit);
  labelSumIn.textContent = formatCurrency(
    acc.deposit,
    acc.locale,
    acc.currency
  );

  acc.withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // console.log(acc.withdrawal);
  labelSumOut.textContent = formatCurrency(
    Math.abs(acc.withdrawal.toFixed(2)),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest}€`;
};

//Calculate interest on each deposits/loan if interest is greater than "1" "My solution to the problem"
const interest = function (acc, interest) {
  acc.int = acc.movements
    .filter(deposit => deposit > 0)
    .map(deposit => (deposit * interest) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, deposit) => acc + deposit, 0);
  // console.log(acc.int);

  labelSumInterest.textContent = formatCurrency(
    Math.abs(acc.int.toFixed(2)),
    acc.locale,
    acc.currency
  );
};

//update UI w
function updateUI(acc) {
  //Display movements
  displayMovements(acc);

  //Display Balance
  sumUserBalance(acc);

  //Display Summary && intersts
  calcDisplaySummary(acc);
  interest(acc, acc.interestRate);
}

//Implement Countdown Timer interface
const startLogOutTimer = function () {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    //When timer reaches 0, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    //Decrease 1s
    time--;
  };
  //Set time to 5 minutes
  let time = 360;

  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  //to solve the [problem] of incoherent timer counting switching BTW users, er return timer and create a global variable to access timer
  return timer;
};

//Implementing login

/**
 * Event handlers
 */
// console.log(accounts);
let currentAccount, timer;
//FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = '100';

//////////////////////////////////
const loginUsers = function (e) {
  //Prevent form submission
  e.preventDefault();
  // console.log("LOGIN")

  currentAccount = accounts.find(
    acct => acct.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);

  //optional chaining(?) pin porperty will only be read if currentAccount exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //  console.log('login')
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]
      } `;

    containerApp.style.opacity = 100;

    //Create current date and time
    //Experimenting INT'L API
    const noww = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: '2-digit', //2-digit
      year: 'numeric',
      // weekday: 'long',
    };
    //Get users browser language pereference
    // const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(noww);

    //Clear input fields on login screen
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //removes the blinkinig cursor after login

    //Check if timer's already active
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
};
btnLogin.addEventListener('click', loginUsers);

//Implement transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.Balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // console.log('Transfer valid');
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
    // console.log(accounts);

    //Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

//Using findIndex method to delete user account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete');

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    //Delete user account
    accounts.splice(index, 1);

    //reset welcome message
    labelWelcome.textContent = `Log in to get started`;

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';

  console.log(accounts);
});

//Request loan using some method
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //Round off numbers
  const loan = Math.floor(inputLoanAmount.value);
  console.log(loan);
  if (loan > 0 && loan > currentAccount.movements.some(move => move * 0.1)) {
    // console.log(currentAccount.movements);
    //Loan timeout functionality
    setTimeout(function () {
      //Add loan
      currentAccount.movements.push(loan);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  // console.log(accounts);
  inputLoanAmount.value = '';
  // console.log('Request');

  //Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

//Sorting accounts using javascript built in sort methods
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//LECTURES

//Select every second row in the movements array
//Performing a task every nth time
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    //0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    console.log('Done loading');
    //0,3,6,9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
//CREATING DATES
//Four ways of creating dates in JS

//1
const now = new Date();
console.log(now);

//2
//parse date from a date string
console.log(new Date('May 17 2022 02:05:36 GMT+0100'));
console.log(new Date(account1.movementsDates[0]));

//3
console.log(new Date(2037, 10, 19, 15, 23, 5));

//4
//pass into date cf the amojnt of milliseconds passed since the begining of the unix time "Jan-1-1970"
console.log(new Date(0));
console.log(3 * 24 * 60 * 60 * 1000); //Timestamp
/**
 * Where 3 - represents days
 * 24 - represents hour
 * 60 - represents number of minutes in an hour
 * 60 - represents number of seconds in a minute
 * 1000 - represents number of milliseconds
 */

//Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); //zero index based
console.log(future.getDay());
console.log(future.toISOString()); //date to string

//current timestamp
console.log(Date.now());

future.setFullYear(2023);
console.log(future);

//Operations with dates
//Calculatingi days passed BTW two dates
//Attempting to convert times to numbers returns results in timestamps, which are in milliseconds. These milliseconds allow us to perform calculation

const future1 = new Date(2039, 10, 19, 15, 23);
console.log(+future1);

//Number API

const numm = 3884764.23;

const options = {
  style: 'currency', //unit, percent
  unit: 'celsius', //mile-per-hour
  currency: 'EUR',
  // useGrouping: false,
};

console.log('US:    ', new Intl.NumberFormat('en-US', options).format(numm));
console.log(
  'Germany:    ',
  new Intl.NumberFormat('en-GB', options).format(numm)
);
console.log('Syria:    ', new Intl.NumberFormat('ar-SY', options).format(numm));
console.log(
  'navigator-language:    ',
  new Intl.NumberFormat(navigator.language).format(numm)
);

//TIMERS
console.log('Waiting...');
setTimeout(
  (ing1, ing2) => console.log(`Here is your Pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  'Olives',
  'Spinach'
);

//Clear/delete timeout based on a condition
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your Pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
const noww = new Date();

//SetInterval
setInterval(() => {
  const nowed = new Date();
  const optioned = {
    hour: 'numeric',
    minute: 'numeric',
    // day: 'numeric',
    // month: '2-digit', //2-digit
    // year: 'numeric',
    // weekday: 'long',
  };
  new Intl.DateTimeFormat(navigator.language, optioned).format(nowed);
  console.log(nowed);
}, 1000);
