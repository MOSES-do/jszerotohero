'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //sort by position
  //slice creates a shallow copy
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // movements.forEach(function (move, i) {changed when sort came in
  movs.forEach(function (move, i) {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${Math.abs(move)}€</div>
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

  labelBalance.textContent = `${acc.Balance}€`;
};
//Calculate Summary, Deposit and withdrawal
const calcDisplaySummary = function (acc) {
  const deposit = acc.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  console.log(deposit);
  labelSumIn.textContent = `${deposit}€`;

  const withdrawal = acc
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  console.log(withdrawal);
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;

  const interest = acc
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest}€`;
};

//Calculate interest on each deposits/loan if interest is greater than "1" "My solution to the problem"
const interest = function (accounts, interest) {
  const __int = accounts
    .filter(deposit => deposit > 0)
    .map(deposit => (deposit * interest) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, deposit) => acc + deposit, 0);
  console.log(__int);
  labelSumInterest.textContent = `${__int}€`;
};

//update UI w
function updateUI(acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display Balance
  sumUserBalance(acc);

  //Display Summary && intersts
  calcDisplaySummary(acc.movements);
  interest(acc.movements, acc.interestRate);
}

//Implementing login

/**
 * Event handlers
 */
// console.log(accounts);
let currentAccount;

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
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    } `;

    containerApp.style.opacity = 100;

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
  const amount = Number(inputTransferAmount.value);
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
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }

  updateUI(currentAccount);
  // console.log(accounts);
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
  const loan = Number(inputLoanAmount.value);
  console.log(loan);
  if (loan > 0 && loan > currentAccount.movements.some(move => move * 0.1)) {
    console.log(currentAccount.movements);
    currentAccount.movements.push(loan);
  }

  //Update UI
  updateUI(currentAccount);
  // console.log(accounts);
  inputLoanAmount.value = '';
  // console.log('Request');
});

//Sorting accounts using javascript built in sort methods
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(account4.movements.every(mov => mov > 0));

//Flat and Flat map
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

//Using flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance2);

//Array.from
//Converting dom elements to arrays

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  ).map(el => Number(el.textContent.replace('€', '')));
  console.log(movementsUI);
});

/////////////////////////////////////////////////

//Exercises
//1. Sum up the total movemenst from all arrays
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum);

//2. How many deposits with at least 1,000 dollars
const dep0sitAboveOnek = accounts
  .flatMap(acc => acc.movements)
  .filter(deposits => deposits >= 1000);
console.log(dep0sitAboveOnek);
console.log(dep0sitAboveOnek.length);

//Using a more advanced method "reduce"
const numDepsits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDepsits1000);

//Prefixed++ oprerator
let a = 10;
console.log(++a);

//3. Get the total withdrawal and deposit in one goal into an object
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

//using bracket notation and destructuring
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'deposits' : 'withdrwals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

//4. //First and Last name formatter
function firstLastName(word) {
  let newWord = word
    .trim()
    .toLowerCase()
    .split(' ')
    .map(name => name[0].toUpperCase() + name.slice(1))
    .join(' ');

  console.log(newWord);
}
firstLastName('moSeS');
function titleCase(word) {
  let newWord = word.trim().toLowerCase().split(' ').join('');
  console.log(newWord[0].toUpperCase() + newWord.slice(1));
}
titleCase('m     a           n');

//4 Teacher's example
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'in', 'on', 'with'];

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('The name of the man'));
