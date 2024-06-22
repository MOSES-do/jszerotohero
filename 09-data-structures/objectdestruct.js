//Destructurig objects

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurantNew = {
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
};

// console.log(restaurantNew.order(2, 1));

restaurantNew.orderDelivery({
  time: "22:30",
  address: "Via del Sole, Victoria City",
  mainIndex: 2,
  starterIndex: 1,
});

//setting default values
restaurantNew.orderDelivery({
  address: "Via del Sole, Victoria City",
});

//Create a new object from existing object (destructuring)
const { name, openingHours, categories } = restaurantNew;
console.log(name, openingHours, categories);

//Rename existing variables with a different name
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurantNew;
console.log(restaurantName, hours, tags);

//Dealing with third party data (API Calls)
//Trying to read a property that does not exist on object
//i.e. restaurant.menu (We don't know if it exists)//undefined

const { menu = [], starterMenu: starters = [] } = restaurantNew;
console.log(menu, starters);

//testing destructured
function startMenu() {
  console.log(starters);
}
startMenu();

//Variable mutation in object destruction

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
//Destructure object
({ a, b } = obj);

console.log(a, b);

//Nested objects
//step 1: test destructuring
const { fri } = openingHours;
console.log(fri);
//step 2🧮
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
//if you wish to change variable names
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
