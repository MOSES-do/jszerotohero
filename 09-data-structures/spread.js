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
};

/**
 * SPREAD OPERATOR
 */

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

//output without comma separated values
console.log(...newArr);
//same as above
console.log(1, 2, 7, 8, 9); //1 2 7 8 9

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

/**
 * Note🧮
 * spread operator takes all the element from the existing array but doesn't create new variables as a consequence we can only use it as csv.
 */

//Shallow copies of array and merge two arrays together
//Copyarray
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//Join 2 arrays together
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

console.log(menu);

//WHat is an iterable?
//Iterables are arrays, strings, maps and sets, NOT objects
const str = "Moses";
const letters = [...str, " ", "S."];
console.log(letters);
console.log(str.split);

//(...spread)multiple elements separated by commas, are passed into functions or arrays.

// const ingredients = [prompt("Ing1?"), prompt("Ing2?"), prompt("Ing3?")];

// restaurant.orderPasta(...ingredients);

//////////////////////////////////////////////////////

//Spread operator on objects //ES6

const newRestaurant = { foundedIn: "2022", ...restaurant, founder: "Moses" };
console.log(newRestaurant);

//create a shallow copy
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ace Tastes";
console.log(restaurantCopy.name);
console.log(restaurant.name);
