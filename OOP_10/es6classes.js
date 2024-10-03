'use strict';

/**CLASSES */
/*class expression
const PersonCl = class {}
*/

// class declaration
class PersonCl {
    //static method
    static hey() {
        console.log('Hey there👋');
        console.log(this)
    }

    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    //instance methods
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    get age() {
        return 2037 - this.birthYear;
    }

    //using setter for data validation
    set fullName(name) {
        // console.log(name)
        //defined as _fullName becos it also tries to set fullName to the this.fullName as 
        //is done by the constructor above which leads to satck errors
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`)
    }

    get fullName() {
        return this._fullName;
    }
}

const jessica = new PersonCl('Jessica Davies', 1999);
console.log(jessica.constructor);
console.log(jessica);
jessica.calcAge();
jessica.birthYear = 2001;
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);
console.log(jessica.age)
console.log(jessica);
PersonCl.hey();

// INHERITANCE BETWEEN CLASSES
class Student extends PersonCl {
    constructor(fullName, birthYear, course) {
        //super is always called first because it creates the 'this' keyword in the subclass
        super(fullName, birthYear)
        this.course = course
    }
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`)
    }

    //polymorphism/override
    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student I fell
        a lot older like ${2037 - this.birthYear + 10}`);
    }
};

const mary = new Student('Mary Gladwell', 2015, 'BioPhysics');
mary.introduce();
mary.calcAge();




















//Setters and getters in objects
const account = {
    owner: 'Moses',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    }
};

console.log(account.latest);
account.latest = 50;
console.log(account.movements);