"use strict";

//Higher order functions
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};
//Write  function that takes food order later
//Higher order function
const transformed = function (str, fn) {
  console.log(str);

  console.log(`${fn(str)}`);

  // function method
  console.log(`${fn.name}`);
};
transformed("Moses is the greates developer alive", upperFirstWord);

transformed("Moses is the greates developer alive", oneWord);

// function returning functions

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greetReturn = greet("Hello");
// greetReturn("Moses");

//Arrow functions returning functions
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greetReturn = greet("Hello");
greetReturn("Moses");
