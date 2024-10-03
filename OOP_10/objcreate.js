/** Another to way to create objects 
 *  This abstracts prototype properties, constructor functions and new operator
 *  We can use object.crete to manually set the prototype of an object to any object we want
 */

const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);
steven.init('Steven', 1999)
steven.calcAge();
console.log(steven);


//INHERITANCE BETWEEN CLASSES

const Student = Object.create(PersonProto);
Student.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}
Student.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`)
}
const jay = Object.create(Student);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
