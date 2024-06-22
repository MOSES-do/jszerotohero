"use strict";

//Array destructuring

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic", "Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

const arr = [2, 3, 4];

//desturcture array
const [x, y, z] = arr;
// console.log(x, y, z);
// console.log(arr);

//destructe catgories array
let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

/**
 * //Long way of doing it
 * Switching variables
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);
 */

//short hand via destructuring
[main, secondary] = [secondary, main];
// console.log(main, secondary);

//Functions returns an array and then is destructed
const [starter, mainCourse] = restaurant.order(4, 1);
// console.log(`${starter}, ${mainCourse}`);

//Nested destructuring
const nested = [2, 4, [5, 6]];

// const [a, , c] = nested;
// console.log(a, c);

//destructuring inside destructuring
const [a, , [d, e]] = nested;
// console.log(a, d, e);

//setting default values to destructors

const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
