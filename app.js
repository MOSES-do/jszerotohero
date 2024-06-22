"use strict";

let num = 23;

if (num === 23) {
  console.log("yay");
}

let x = 1;
let y = 2;

console.log(x + y);

console.log("23" - "10" - 3);
console.log("23" - "10" + "3");
console.log("3" + "10" + "3");

//Assignment

let minimumScore = 100;
let dolphins = [1, 2, 3, 34, 5];

let koalas = [1, 2, 3, 4];
let ans = 0;

//reduce
let sumDolph = dolphins.reduce((x, y) => x + y);
let countDolph = dolphins.length;
let averDolph = sumDolph / countDolph;
console.log(averDolph + " Dolphins test score");

//map
koalas.map(score => {
  ans += score;
});
let countKoala = koalas.length;
let averKoala = ans / countKoala;
console.log(averKoala + " Koalas test score");

function checkWinner(averDolph, averKoala, minimumScore) {
  if (averDolph === averKoala && averDolph && averKoala >= minimumScore) {
    console.log("Tie score");
  } else if (averDolph === averKoala && averDolph && averKoala < minimumScore) {
    console.log("Below minimum score, failed!");
  } else if (averDolph > averKoala && averDolph < minimumScore) {
    console.log(
      `Dolphins win by ${
        averDolph - averKoala
      } points but doesn't take first by the set standard`
    );
  } else if (averKoala > averDolph && averKoala < minimumScore) {
    console.log(
      `Koalas win by ${
        averKoala - averDolph
      } points but doesn't take first by the set standard`
    );
  } else if (averDolph > averKoala && averDolph >= minimumScore) {
    console.log(
      `Dolphins win by ${
        averDolph - averKoala
      } points and takes first grade by the set standard`
    );
  } else {
    console.log(
      `Koalas win by ${
        averKoala - averDolph
      } points and takes first grade by the set standard`
    );
  }
}

checkWinner(averDolph, averKoala, minimumScore);

//Bonus 1

// if(averDolph >= minimumScore){
//     console.log("Dolphins win");
// } else if(averKoala >){

// }

console.log("wine 🍷");

// let bill = 301;
// let int = bill <=300 && bill >=50 ? .15
//          : .20;

// console.log(`🤬Your bill is ${bill}, tip is ${int*bill} and the total = ${bill}`);

function fruitProcessor(apple, orange) {
  console.log(apple, orange);

  let juice = `Juice with ${apple} apple and${orange} oranges `;

  return juice;
}

fruitProcessor(1, 1);

let fruitProcessed = fruitProcessor(1, 1);
console.log(fruitProcessed);

//function callback

const calcAge = function (birthYear) {
  return 2022 - birthYear;
};

const yearsUntilRetirement = function (firstName, birthYear) {
  const age = calcAge(birthYear);
  const retirement = 40 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    return -1;
  }
};

console.log(yearsUntilRetirement("Moses", 1950));

function calcAges(by, fn) {
  const age = 2037 - by;
  console.log(`${age} ${fn}`);

  return age;
}

console.log(calcAges(1999, "Segun"));

//Challenge 4
/**
 * function creates a code that takes  an empty array and returns
 * the average of whatever set of numbers is passed into  it.
 */
function scores(gameResults = []) {
  let totalScore = gameResults.reduce((x, y) => x + y);
  let averScore = totalScore / gameResults.length;
  return averScore;
}
//test 1
/**
 * Automatic name switch in console ,
 * if team change is required
 */
let Dolphins = "Dolphins";
let Koalas = "Koalas";
let team = [Dolphins, Koalas];

/**
 * Function invokation/call
 */
let result1 = scores([4400, 23, 71]);
let result2 = scores([4400, 23, 71]);
let resultSet = [result1, result2];

{
  // fuynction now works this single block of code is not necessary
  // const koalasGameResults = [23, 34, 27,10000];
  // let totalKoalas = koalasGameResults.reduce((x,y) =>x+y);
  // let averKoalas = totalKoalas / koalasGameResults.length;
}

const checkWinTeam = (averDolphin, averKoalas) => {
  if (averDolphin >= averKoalas * 2) {
    console.log(
      `${team[0]} wins by ${resultSet[0]} points. Congrats! Here's your 😄🏆`
    );
  } else if (averKoalas >= averDolphin * 2) {
    console.log(
      `${team[1]} wins by ${resultSet[1]} points. Congrats! Here's your 😄🏆`
    );
  } else {
    console.log("Sorry, no winner. Try Again!😢");
  }
};

checkWinTeam(resultSet[0], resultSet[1]);
checkWinTeam(400, 4000);

//Test 2

Dolphins = "Chelsea";
Koalas = "RealMadrid";
team = [Dolphins, Koalas];

result1 = scores([44000, 23, 71]);
result2 = scores([440, 23, 71]);
resultSet = [result1, result2];
checkWinTeam(resultSet[0], resultSet[1]);

//Challenge 5 (Arrays)

function calcTip(bill) {
  return bill <= 300 && bill >= 50 ? tips[0] * bill : tips[1] * bill;
  //  return(`🤬Your bill is ${bill}`);
}

const bills = [125, 555, 44];
const tips = [0.15, 0.2];
const tip = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totalValues = [tip[0] + bills[0], tip[1] + bills[1], tip[2] + bills[2]];
console.log(`Total bill = ${totalValues}`);
console.log(bills, tip, totalValues);
/////////////////////////////////////////////////////////////

const moses = {
  firstName: "Moses",
  lastName: "Esumei",
  birthYeah: 1994,
  job: "Accountant/Software Engineer",
  friends: ["Oba", "Afolabi", "Dammy"],
  hasDriversLicense: true,

  calcAge1: function () {
    return 2022 - this.birthYeah;
  },

  /**
   *
   * @returns this keyword is more appropriate because it
   * references the object, and so if there is a name change on the object, we don't have to change it at every occurence in our expression as "this" reflects the change throughout the expression.
   */
  calcAge: function () {
    /**
     * creates a new property and value and allows for assignment without calling the method.
     */

    this.age = 2022 - this.birthYeah;
    console.log(this);
    return this.age;
  },

  getSummary: function () {
    //This outputs boolean hasDriversLicene using comments
    const comment = [
      this.hasDriversLicense
        ? "he has a drivers's license"
        : "No driver's license",
    ];

    // return (`${this.firstName} ${this.lastName} ${this.birthYeah}, ${this.calcAge()}, ${this.job}, ${comment} ${this.friends}`);

    return `${this.firstName} ${this.lastName} ${
      this.birthYeah
    }, ${this.calcAge()}, ${this.job}, ${
      this.hasDriversLicense ? "has driver's license" : "no driver's license"
    } ${this.friends}`;
  },
};
moses.location = "London";
const nameKey = "Name";
console.log(moses["first" + nameKey]);
console.log(moses["last" + nameKey]);

// const interestedIn = prompt('What do you want to know about Moses? Choose between', "First Name, Last Name, Age, Job and Friends");

// console.log(moses[interestedIn]);

//Chalenge 6
//Moses has 3 friends and his best friend's name his Oba
console.log(
  `${moses.firstName} has ${moses.friends.length} friends, and is best friend's name is called ${moses.friends[0]}`
);

console.log(moses.calcAge());
console.log(moses.getSummary());
console.log(moses.age);

//challenge 7:

const person1 = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,

  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const person2 = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,

  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};
person1.calcBMI();
person2.calcBMI();
if (person1.BMI > person2.BMI) {
  console.log(
    `${person1.fullName}'s BMI:${person1.BMI} is higher than ${person2.fullName}'s ${person2.BMI}`
  );
} else {
  console.log(
    `${person2.fullName}'s BMI:${person2.BMI} is higher than ${person1.fullName}'s ${person1.BMI}`
  );
}

//Loops
for (let i = 10; i >= 1; i--) {
  if (i === 3 || i === 6) {
    continue;
  }
  // console.log(`Lifting weights ${[i]} 🏋️‍♂️ `);
}

/////////////////////////////////////////////////////////////
const yearss = [1999, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < yearss.length; i++) {
  ages.push(2037 - yearss[i]);
}
// console.log(ages);

/**DECREMENT COUNTER */
for (let i = yearss.length - 1; i >= 0; i--) {
  // console.log(`${i} :`, yearss[i])
}

//  LOOP INSIDE A LOOP

for (let exercise = 1; exercise < 4; exercise++) {
  // console.log(`-----Starting exercise ${exercise}🏋`);

  for (let rep = 1; rep < 6; rep++) {
    // console.log(`Lifting weight repetition ${rep}🏋`);
  }
}

//While loop Instance of a random number
//Loop wihtout a counter i.e. You don ot know how many iterations the loop will have

let dice = Math.trunc(Math.random() * 6) + 1;
// console.log(dice);

while (dice !== 6) {
  // console.log(`You rolled a ${dice}`);
  //initialize again
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log(`${dice} rolled...loop ends now`);
}

//Chalenge 7

let billArray = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

let tipse = [];
let totalse = [];

function calcTip(bill) {
  return bill <= 300 && bill >= 50 ? tips[0] * bill : tips[1] * bill;
}

for (let b = 0; b < billArray.length; b++) {
  const tip = calcTip(billArray[b]);
  tipse.push(tip);
  totalse.push(tip + billArray[b]);
}
console.log(tipse);
console.log(totalse);

//Average
function calcAverage(arr) {
  let totalArray = arr.reduce((x, y) => x + y);
  let aveScore = totalArray / arr.length;
  return aveScore;
}

let averageResult = calcAverage(totalse);
console.log(Math.trunc(averageResult));

let c = "23";
console.log();

// Assignment

// TODO :Project Manager. "We need a function that reverses whatever we pass into it"

/**
 * Problem
 * 1. Function shuold output temperatures from highest to lowest
 *
 * Sub-problem
 * 1. Create an array oof temperatures
 * 2. Loop over themes3. On output add an incrementer to increase the number of days
 *
 */

//My challenge
let temp = [17, 21, 23];
let counter = 1;

const printForecast = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr.length) counter++;
    console.log(`... ${arr[i]}oC in${i + 1} days`);
  }
};
printForecast(temp);
printForecast([12, 5, -5, 0, 4]);

//Jonas Challenge
const printForecast1 = function (arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += `${arr[i]}oC in ${i + 1} days ...`;
  }
  console.log("... " + str);
};
printForecast1(temp);
printForecast1([12, 5, -5, 0, 4]);
