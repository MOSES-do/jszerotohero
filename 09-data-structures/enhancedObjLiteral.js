"use strict";
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  //ES6
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({
    starterIndex = 0,
    mainIndex = 2,
    time = "19:00",
    address = "Via del Sole, Victoria City",
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delievered to ${address} at ${time}. `
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  //rest pattern
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

//Optional chaining and nullish coalescing operators

console.log(restaurant.openingHours.Fri);

//with optional chaining
console.log(restaurant.openingHours.Mon?.open);

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we open at ${open}`);
}

//Optional Chaining on Methods
console.log(restaurant.order?.(1, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(1, 1) ?? "Method does not exist"); //does not exist because

//Arrays
const users = [{ name: "Jonas", email: "Jonas.io" }];

console.log(users[0]?.name ?? "User array empty");

//better than the expression
if (users.length > 0) console.log(users[0].name);
else console.log("uer array emepty");
