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

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//Looping over property names/keys
// for (const day of Object.keys(openingHours)) {
//   console.log(day);
// }
const properties = Object.keys(openingHours);

let openStr = `We are open on ${properties.length} days:`;
for (const day of properties) {
  openStr += ` ${day}, `;
}
console.log(openStr);

//Property values
for (const value of Object.values(openingHours)) {
  console.log(value);
}

//Entire Object
const entries = Object.entries(openingHours);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//Challenge

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...players) {
    console.log(players);
    console.log(`${players.length} goals were scored`);
  },
};

//1 Loop over the game.scored
console.log("Task 1");
const { scored } = game;

let Goal = 1;
for (const score of scored) {
  console.log(`Goal ${Goal++}: ${score}`);
}
//Jonas way
for (const [i, player] of game.scored.entries()) {
  console.log(`${i + 1}: ${player}`);
}

console.log("Task 2: Calculate Average");

//2 Calculate Average
const { odds: odd } = game;
let sum = 0;
for (const value of Object.values(odd)) {
  let average = Object.keys(odd).length;

  sum += value / average;
}
console.log(sum);

console.log("Task 3");

//3
const { team1: teamA, team2: teamB } = game;
const {
  odds: { team1, x, team2 },
} = game;

console.log(`Odd of victory ${teamA}: ${team1} `);
console.log(`Odd of victory draw: ${x} `);
console.log(`Odd of victory ${teamB}: ${team2} `);
//3 Jonas solution
//[key, values]
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}
//BONUS:
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
