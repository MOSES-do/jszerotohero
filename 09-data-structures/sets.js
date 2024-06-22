"use strict";

const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);
console.log(ordersSet);

console.log(new Set("Jonas"));

console.log(ordersSet.size);
console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("Bread"));
ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
console.log(ordersSet);
ordersSet.delete("Garlic Bread");
console.log(ordersSet);

/////////////////////////////////////////
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
console.log(staff);

// convert array to set
// const staffUnique = new Set(staff);
// console.log(staffUnique);

//convert set back nto array using spread operator
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

console.log(new Set("mosesesumei").size);
