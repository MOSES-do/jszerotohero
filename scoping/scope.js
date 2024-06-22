"use strict";

// const myName = "Jonas";

// function first() {
//   var age = 30;

//   if (age >= 30) {
//     const decade = 3;
//     var millenial = true;
//     console.log(age);
//   }

//   function second() {
//     const job = "teacher";

//     console.log(`${myName} is a ${age} year old ${job}`);
//   }

//   second();
// }

// first();

// const a = "Jonas";
// first();

// function first() {
//   const b = "Hello!";
//   second();

//   function second() {
//     const c = "Hi!";
//     third();
//   }
// }

// function third() {
//   const d = "Hey!";
//   console.log(d, a);
//   //Referene Error
// }

// function calcAge(birthYear) {
//   const age = 2022 - birthYear;
//   console.log(firstName);
//   return age;
// }

// const firstName = "Moses";
// console.log(calcAge(1994));

// access();
// function access() {
//   console.log("Hello");
//   var gender = "Male";
//   console.log(gender);
// }

// console.log(constExpr());

// var constExpr = function () {
//   return "Hello";
// };
var newName = "Moses";
const moses = {
  firstName: "Moses",
  year: 1994,
  calcAge() {
    console.log(this);
    console.log(2022 - this.year);

    const male = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
      console.log(`Hey ${this.firstName}`);
    };
    male();
  },

  //wrong
  greet: () => console.log(`Hey ${this.firstName}`),
};
moses.greet();
moses.calcAge();
