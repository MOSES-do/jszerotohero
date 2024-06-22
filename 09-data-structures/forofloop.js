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

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (let index = 0; index < menu.length; index++) {
//   const element = menu[index];
//   console.log(element);
// }

// menu.forEach(menu => {
//   console.log(menu);
// });

//For-of-loop
// for (const item of menu) console.log(item);

for (const item of menu.entries()) {
  //   console.log(`${item[0] + 1}: ${item[1]}`);
}

//A better way
for (const [i, el] of menu.entries()) {
  //   console.log(`${i + 1}: ${el}`);
}
// console.log([...menu.entries()]);

//Challenge 2
