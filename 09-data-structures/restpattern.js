"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 0,
    mainIndex = 2,
    time = "19:00",
    address = "Via del Sole, Victoria City",
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delievered to ${address} at ${time}. `
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  //rest pattern
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};
//DESTRUCTURING

//SPREAD because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

//Rest syntax packs multiple values into an array
//REST, beccause on LEFTside of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

//REST AND SPREAD
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat, weekDays);

//2 FUNCTIONS

// My solution
const add = function (numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add([1, 2]);
add([1, 2, 3, 4, 5, 6, 7]);
add([1, 2, 6, 7, 8, 9, 0, 9]);
///////////////////////////////////////////////////

const sums = function (...numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
sums(1, 2);
sums(1, 2, 3, 4, 5, 6, 7);
sums(1, 2, 6, 7, 8, 9, 0, 9);

const x = [1, 2, 23, 3, 4];
sums(...x);

//REST
restaurant.orderPizza("chicken", "berries", "eggs", "apples");

/////////////////////
// Spread is used where we would write values separated by comas
//Rest is used 🧭 variable names separated by comas
