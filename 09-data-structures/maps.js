"use strict";

const rest = new Map();
rest.set("name", "Classisic Italiano");
rest.set(1, "Firenze Italy");
console.log(rest.set(2, "Lisbon, Portugal"));

//chaining rest
rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open")
  .set(false, "We are closed");

console.log(rest.get("name"));
console.log(rest.get(true));

const time = 21;

console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories"));
rest.delete(2);
// rest.clear()
const arr = [1, 2];
rest.set(arr, "Test");
rest.set(document.querySelector("h1"), "Heading");
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr));

//Other and more preferable to populate map
const question = new Map([
  ["Question", "What is the best porgramming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "Javascript"],
  ["correct", 3],
  [true, "correct"],
  [false, "Try again"],
]);
console.log(question);

//Quiz App
console.log(question.get("Question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Aswer ${key}: ${value}`);
}

// const answer = Number(prompt("Your Answer"));
const answer = 3;
console.log(answer);

console.log(question.get(answer === question.get("correct")));

//Convert map to array
console.log([...question]);
// console.log([question.entries]);
console.log([question.keys()]);
console.log([question.values()]);

//Convert arrays of array(objects) to map
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
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
