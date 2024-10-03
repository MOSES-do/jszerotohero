class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.locale = navigator.language;
        //properties not based on user input
        this._pin = pin;
        this._movements = [];//protected property
    }

    /**Data Encapsulation: Keeping some properties/methods private to the class */
    _approveLoan(val) {
        return true;
    }
    /**public interface (API) for interacting with our objects **/
    getMovements() {
        return this._movements;
    }

    deposit(val) {
        this._movements.push(val);
    }

    withdraw(val) {
        this.deposit(-val);
    }

    requestLoan(val) {
        if (this._approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved')
        }
    }
}

const acc1 = new Account('Moses', 'GBP', 1234);
acc1.deposit(500);
acc1.withdraw(200);
acc1.requestLoan(1200);
console.log(acc1.getMovements());
console.log(acc1)