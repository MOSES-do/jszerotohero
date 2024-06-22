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

//Implementing login

/**
 * Event handlers
 */
// console.log(accounts);
let currentAccount;
//FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = '100';

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
    console.log(currentAccount.movements);
    currentAccount.movements.push(loan);
  }

  //Add loan date
  currentAccount.movementsDates.push(new Date().toISOString());
  //Update UI
  updateUI(currentAccount);
  // console.log(accounts);
  inputLoanAmount.value = '';
  // console.log('Request');
  //Create current date and time
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
//All numbers are represented as floating points in javascript

//Convert strings to number
console.log('23');
console.log(+'23');

//Parsing
console.log(Number.parseInt('23px', 10)); //base of 10
console.log(Number.parseInt('e23', 10));

console.log(Number.parseInt('2.5rem'));
console.log(Number.parseFloat('2.5rem'));

//Check if a value !is a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(20 / 0));

//Best way to check if a value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20'));
console.log(Number.isFinite(20 / 0));

console.log(Number.isInteger(20));
console.log(Number.isInteger(20.0));
console.log(Number.isInteger(20 / 0));

//Math and Rounding numbers (Math namespace)

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 12, 13, 15, 18));
console.log(Math.max(5, 12, 13, 15, '18'));
console.log(Math.max(5, 12, '13px', 15, 18));
console.log(Math.min(5, 12, 13, 15, 18));

//Area of a circle
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

//Generate random integers BTW two values
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

//Rounding iontegers
console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.9));

//Rounding decimals
//Numbers are primitive and they have no methods
console.log((2.7).toFixed(0)); //returns a string
console.log((2.7).toFixed(3));
console.log(+(2.345).toFixed(2)); //type coercion

//Remainder/Modulus Operator
console.log(5 % 2);

const checkEvenOdd = num =>
  num % 2 == 0 ? console.log('Even number') : console.log('Odd number');
checkEvenOdd(parseInt('9rem'));

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

//Numeric sepeartor

const diameter = 287_460_000_000;

//Big ints
//Numbers are represented internally as 64bits
//Math operation don't work with BigInts
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

console.log(33437374394546474363462376454367345435767535444544n);
console.log(BigInt(48263273));

const huge = 20773443424354646754845n;
const num = 23;

// console.log(huge * num); //Error
console.log(huge * BigInt(num));

//Exceptions
console.log(20n > 15);
console.log(20n === 15);
console.log(typeof 20n);
console.log(20n === '20');

//concatenate
console.log(huge + 'is REALLY big!!!!');

//Divisions
console.log(11n / 3n); //cuts off the decimal part

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
