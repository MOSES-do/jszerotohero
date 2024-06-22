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


const displayMovements = (movements) => {
    containerMovements.innerHTML = '';//clear placeholder html data before inserting elements from api
    movements.forEach((movement, i) => {
        const type = movement > 0 ? 'deposit' : 'withdrawal';
        const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div>
    `
        containerMovements.insertAdjacentHTML('afterbegin', html)
    })
}

const createUsernames = (accs) => {
    accs.forEach(acc => {
        //mutate user objects to add a username
        acc.username = acc.owner.toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    })
}
createUsernames(accounts);

const calcDisplayBalance = (mov) => {
    mov.balance = mov.movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${mov.balance}£`;
    // console.log(mov);
}

const calcDisplaySummary = (mov) => {
    const incomes = mov.movements.filter(el => el > 0).
        reduce((acc, cur) => acc + cur, 0);
    labelSumIn.textContent = `${incomes}£`

    const withdrawals = mov.movements.filter(el => el < 0).
        reduce((acc, cur) => acc + cur, 0);
    labelSumOut.textContent = `${Math.abs(withdrawals)}£`

    const interest = mov.movements.filter(el => el > 0).
        map(deposit => (deposit * mov.interestRate) / 100).
        filter(el => el >= 1).
        reduce((acc, cur) => acc + cur, 0);
    labelSumInterest.textContent = `${interest}£`

}

const updateUI = (acc) => {
    displayMovements(acc.movements);

    calcDisplayBalance(acc)

    calcDisplaySummary(acc)
}

//Event handler
let currentAccount
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    //trim to remove whitespace from name
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value.trim());
    if (currentAccount?.pin === +(inputLoginPin.value)) {
        //Display UI and welcome message
        if (currentAccount?.owner) labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        else labelWelcome.textContent = 'Login to get started';
        containerApp.style.opacity = 100;
        //clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        //clear focus
        inputLoginPin.blur();
        //Display movments
        updateUI(currentAccount);

        //Display summary
        console.log('LOGIN')
    }
})

//implemnting transfer feature using find
btnTransfer.addEventListener('click', (e) => {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value.trim());
    //clear input fields
    inputTransferAmount.value = inputTransferTo.value = '';
    //clear focus
    inputLoginPin.blur();
    // console.log(amount, receiverAcc);

    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        // console.log('Transfer valid')
        updateUI(currentAccount);
    }
})

//request loan feature
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        currentAccount.movements.push(amount);
    }

    //Update UI
    updateUI(currentAccount);

    inputLoanAmount.value = '';
})


//Delete account feature using findIndex and splice
btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentAccount.username === inputCloseUsername.value.trim() && currentAccount.pin === +(inputClosePin.value.trim())) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username)

        //delete account
        accounts.splice(index, 1)

        labelWelcome.textContent = 'Login to get started';

        //Hide UI
        containerApp.style.opacity = 0;

        //clear input fields
        inputCloseUsername.value = inputClosePin.value = '';
        //clear focus
        inputClosePin.blur();
    }


})



//NOTES
const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance)
const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals)