"use strict";
const airline = "TAP Air Portugal";

function checkMiddleSeat(seat) {
  const s = seat.slice(-1);
  if (s === "E" || s === "C") {
    console.log("You got the middle seat");
  } else {
    console.log("Lucky you");
  }
}
checkMiddleSeat("11E");
checkMiddleSeat("12C");
checkMiddleSeat("13D");

console.log(airline.slice(1, 6));

//Fix capitalization
const passenger = "mOses";
const passengerLower = passenger.toLowerCase();
console.log(passengerLower);
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

//Compare Emails
const email = "hello@jonas.io";
const loginEmail = "    Hello@jonas.Io \n";

//replacing
const priceGB = "288,97E";
const priceUS = priceGB.replace("E", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";
console.log(announcement.replaceAll("door", "gate"));

//Booleans
const plane = "Airbus A320neo";
console.log(plane.includes("A320"));
console.log(plane.includes("Boeing"));
console.log(plane.startsWith("Air"));

if (plane.startsWith("Airbus") && plane.endsWith("neo")) {
  console.log("Yes");
} else {
  console.log("no");
}

//Split method this returns an array based on a defined separator
console.log("a+very+nice+shawarma".split("+"));
console.log("Esumei Moses".split(" "));

//Destructure array
const [firstName, lastName] = "Esumei Moses".split(" ");

//Array conversion to string
const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizeName = name => {
  const names = name.toLowerCase().split(" ");
  const upper = [];

  for (const n of names) {
    // console.log(n[0].toUpperCase() + n.slice(1));

    // upper.push(n[0].toUpperCase() + n.slice(1));
    //or
    upper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(upper.join(" "));
};
capitalizeName("esumei moses");
capitalizeName("esumei moses chukwuemeka");
capitalizeName("joNAS scheMEDTmaN chukwuemeka");

//Padding a string
const message = "Go to gate 23!";
console.log(message.padStart(25, "+").padEnd(30, "+"));

const maskCreditCard = function (number) {
  const str = number + "";
  const ccLastNos = str.slice(-4);
  return ccLastNos.padStart(str.length, "*");
};

console.log(maskCreditCard("123412266262525255678"));

//Repeat
const message2 = "Bad weather... All Departures Delayed...";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"✈️".repeat(n)}`);
};
planesInLine(5);

//Challenge 4: Function that returns camelCase
// My Solution
// document.body.append(document.createElement("textarea"));
// document.body.append(document.createElement("button"));

// const button = document.querySelector("button");

// function convert() {
//   const text = document.querySelector("textarea").value;
//   const convertWord = text.slice(1, -2).split("+");

//   for (const cWord of convertWord) {
//     const [first, second, third, fourth] = cWord.trim().slice(1).split(";");
//     const output = `${first.startsWith("Delayed") ? "🔴" : ""} ${first.replace(
//       "_",
//       " "
//     )} ${second.slice(0, 3).toUpperCase()} ${third
//       .slice(0, 3)
//       .toUpperCase()} (${fourth.replace(":", "h")})`.padStart(36);

//     console.log(`${output.padStart(20)}`);
//   }
// }
// button.addEventListener("click", convert);
// "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45
// +_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30"

// 🔴 Delayed Departure FAO TXL (11h25)
//              Arrival BRU FAO (11h45)
//   🔴 Delayed Arrival HEL FAO (12h05)
//            Departure FAO LIS (12h30)

//Challenge 3
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const button = document.querySelector("button");

// button.addEventListener("click", camelCase);

// function camelCase() {
//   const textarea = document.querySelector("textarea").value;
//   const inputs = textarea.toLowerCase().trim().split("\n");
//   for (const input of inputs) {
//     const [first, second] = input.split("_");

//     const value = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(value);
//   }
// }
// camel_case
// start_fIRST
// instanT_meaL
// pleAse_sEat

// "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45
// +_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30"

function converter() {
  const text = document.querySelector("textarea").value;

  const rows = text.slice(2, -2).replaceAll(";", " ").split("+");

  const getCode = str => str.slice(0, 3).toUpperCase();
  for (const row of rows) {
    const [a, b, c, d] = row.trim().replace("_", "").split(" ");
    const output = `${a.startsWith("Delayed") ? "🛑" : ""} ${a.replace(
      "_",
      " "
    )} ${getCode(b)} ${getCode(c)} (${d.replaceAll(":", "h")})`.padStart(50);
    console.log(output);
  }

  // console.log(rows);
  // for (const row of rows) {
  //   const rows = text.slice(1, -1).split("+");
  //   // console.log(rows);
  //   const [first, second, third, fourth] = row
  //     .trim()
  //     .replaceAll(";", " ")
  //     .split(" ");
  //   const output = `${
  //     first.startsWith("_Delayed") ? "🛑" : ""
  //   } ${first.replaceAll("_", " ")} ${second.slice(0, 3)} ${third.slice(
  //     0,
  //     3
  //   )} (${fourth.replace(":", "h")})`.padStart(50);
  //   console.log(output);
  // }
}
button.addEventListener("click", converter);
