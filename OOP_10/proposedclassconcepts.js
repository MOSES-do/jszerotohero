
/**Proposed class fields for encapsulation
 * Public fields
 * Private fields
 * Public methods
 * Private methods
 * **/

class Account {
    //Public fields (instances - they are referencable by the 'this' keyword)
    locale = navigator.language;

    //private fields (only accesible within the class)
    #movements = [];
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
    }

    /**Data Encapsulation: Keeping some properties/methods private to the class */
    #approveLoan(val) {
        return true;
    }
    /**public method/interface (API) for interacting with our objects **/
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
        return this;
    }

    withdraw(val) {
        this.deposit(-val);

    }

    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
            return this;
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
//not accessible from outside
console.log(acc1.#approveLoan);
