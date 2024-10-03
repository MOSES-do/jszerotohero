'use strict';

// Using constructor functions
const Person = function (firstName, birthYear) {

    //Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    //Never create a method in a constructor fn() rather use prototypes and prototypal inheritance
    //create the method on the constructir fn() prototype
    // this.calcAge = function() {
    //     console.log(2037 - this.birthYear);
    // }
};

//Calling the "new" keyword on the function above initializes it to be a blueprint/class for creation of objects
// new keyword constructor function
//1. New {} is created
//2. function is called, the 'this; keyword is the new empty object this = {}
//3. object is linked to a prototype
//4. function automatically return {}
const moses = new Person('Moses', 1994);
// console.log(moses)
// console.log(moses instanceof Person)

/** PROTOTYPES */
/**
 * Every function in JS has a property called prototype
 * Every object created by a constructor function will get access to the methods and properties that we define on the constructor's prototype property
 */
// console.log(Person.prototype);
//Setting methods on prototype properties
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}
moses.calcAge();

//Setting attributes on prototype properties
Person.prototype.species = 'Homo sapiens';
// console.log(moses.species);
// console.log(moses.__proto__);

/**
 * The prototype chain
 * The constructor function inherits its prototype from object.prototype which is the top in the chain of prototype
 * and it has a value of null.
 * Jonas.prototype inherits its prototype from person.prototype through obj.__proto__ which has access to the methods
 * and attributes created in person.prototype.
 * The instance of the Person constructor fn() only has access to the properties declared in Person class. Whwnever
 * it needs to use methods if it can't be found in the instance object, it checks the .__proto__ which inheirts from 
 * Person.prototype and if it can't find it there it then moves up the chain to check in object.prototype. This is knows as the prototype chain
 */

// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
// console.log("Prototype chain")
// console.log(moses.__proto__.__proto__);
// const arr = [1, 2, 3];
// console.log(arr.__proto__);
// console.log(arr.__proto__.__proto__);
// console.log(arr.__proto__ === Array.prototype);

// constructor static method
Person.hey = function () {
    console.log('Hey there👋');
    /**this refers to the constructor function */
    console.log(this)
}
Person.hey();



// INHERITANCE BETWEEN CLASSES
const Student = function (firstName, birthYear, course) {
    //inherit from parent - step 1
    Person.call(this, firstName, birthYear)
    this.course = course;
};
//2nd step to link parent to child class
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`)
}
const mike = new Student('Mike', 2020, 'Com. Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__)
console.log(mike.__proto__.__proto__)

console.log(mike instanceof Student)
console.log(mike instanceof Person)

Student.prototype.constructor = Student;
console.log(mike);