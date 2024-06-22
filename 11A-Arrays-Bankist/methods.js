'use strict';

//Array methhods

//1. Slice: This returns a new array and does not mutate the original array

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));

//It creates a shallow copy of an array just like with the spread operator. The question is if to use spread operator or slice. The slice is preferable for the advantage of chaining other methods to itself
console.log(arr.slice());
console.log([...arr]);

//2. Splice: Mutates the original array (MOstly used to delete elements from an array)
// console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//3.REVERSE  Mutates the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//CONCAT   does not mutate the original array
const letters = arr.concat(arr2);
console.log(letters);

//5 Join
console.log(letters.join(' - '));

//Push, pop, unshift,
//EVer forget any use MDN

//ES2022 Array methods (at) on strings too
console.log('Jonas'.at(-1));

const arr3 = [23, 11, 64];
console.log(arr.at(0)); //console.log(arr[0]);

//Last index/element of an array
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1)); //useful for chaining

//LOOPING AN ARRAY

//forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  //entries makes the option to use index possible
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---forEach---');
//forEach passes in current element, index and entire array being looped. Continue and break stastement does not work in a forEach loop
movements.forEach(function (move, i, arr) {
  if (move > 0) {
    console.log(`Movement ${i + 1}: You deposited ${move} `);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(move)}`);
  }
});

//forEach with maps and sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

console.log('---forEach with Map---');
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

let money = [200, 300, 400, 500, 600, 1000];
money.push(2000, 2000);

let sum = 0;
money.map(function (ele) {
  sum += ele;
});
let total = sum;
console.log(total);

//Coding Challenge 1
const testDataJulia = [3, 5, 2, 12, 7];
const testDataKate = [9, 16, 6, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  let newDogsJulia = dogsJulia.slice();
  const newTestDataJulia = newDogsJulia.slice(1, -2);
  const dogsArray = [...newTestDataJulia, ...dogsKate];
  console.log(dogsArray);
  dogsArray.forEach(function (dog, i) {
    dog >= 3
      ? console.log(
          ` Dog number ${i + 1} is ${dog} years old and is an adult 🐕`
        )
      : console.log(
          ` Dog number ${i + 1} is ${dog} years old and  is a puppy 🐶`
        );
  });
};
checkDogs(testDataJulia, testDataKate);

console.log('---TestData2---');
checkDogs([9, 16, 6, 8, 3], [10, 5, 2, 6, 1, 4]);

//DATA TRANSFORMATION WWITH MAP, REDUCE AND REDUCE

/**
 * Map returns a new array containing the results of applying an operation on all original elements
 */
const eurToUsd = 1.1;
console.log('--Using Map---');
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementsUSD);

console.log('--Using Arrow FunCTION---');
const movementsUSDArr = movements.map(mov => mov * eurToUsd);
console.log(movementsUSDArr);

//using for-of loop
console.log('--Using for of---');
const movementsUsdfor = [];
for (const mov of movements) {
  movementsUsdfor.push(mov * eurToUsd);
}
console.log(movementsUsdfor);

const movementDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementDescriptions);
/**
 * Filter retuurns a new array containing the array elements that passed a specified test condition
 */
const deposits = movements.filter(function (mov) {
  return mov > 0 ? `${mov}` : '';
});
console.log(deposits);

//using for of
const withdrawal = [];
for (const withdraw of movements) {
  if (withdraw < 0) {
    withdrawal.push(withdraw);
  }
}
console.log(withdrawal);

console.log('---Reduce Method---');
/**
 * Reduce boils ("reduces") all array elements down to one single value (e.g adding all elements together)
 */

const seum = movements.reduce(function (x, y, i, arr) {
  console.log(`Iteration ${i}: ${x}`);
  return x + y;
}, 0);
console.log(seum);

//Arrow functions
// const seum = movements.reduce((x, y, i, arr) => x + y);
// console.log(seum);
//for of loop
let acc = 0;
for (const [i, mov] of movements.entries()) {
  console.log(`Iteration ${i}: ${acc}`);
  acc += mov;
}
console.log(acc);

//Maximum value
const max = movements.reduce(function (x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}, movements[0]);
console.log(max);

//Chalenge 2
//You can only chain a method after another one if that method returns an array. Filter returns an array map also
function calcAverageHumanAge(dogAges) {
  const arrAge = [];

  dogAges.map(function (age, i) {
    const humanAges = age <= 2 ? 2 * age : 16 + age * 4;
    // console.log(humanAges);
    humanAges >= 18 ? arrAge.push(humanAges) : '';
  });
  const adults = arrAge.reduce((acc, prog) => acc + prog) / arrAge.length;
  return adults;
}
const avrg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avrg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avrg1, avrg2);

//Teacher's solution
const calcAverageHumanAges = function (ages) {
  //using arrow functions and chaining
  const humanAges =
    ages
      .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
      .filter(age => age >= 18)
      .reduce((acc, age, i, arr) => acc + age, 0) / arr.length;

  return humanAges;

  // const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  // const adults = humanAges.filter(age => age >= 18);
  // console.log(humanAges);
  // console.log(adults);

  // // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  // const average = adults.reduce(
  //   (acc, age, i, arr) => acc + age / arr.length,
  //   0
  // );

  // // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5

  // return average;
};
const avg1 = calcAverageHumanAges([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAges([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

//Chaning Methods
//Alldeposits convert from EUR to USD and sum all up.

//PIPELINE
const totalDepositUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUsd);

//findIndex Method

//Some method
//Is useful when we need to test for at least one value that returns true or false

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

//Every
//Only returns true if every element passes the test in the callback function

// console.log(account4.movements.every(mov => mov > 0));

//More ways of creating and filling arrays

//1.) Array.fill()
const arrayed = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
const newa = arrayed.slice(); //creates a shallow copy of original array
newa.fill(8, -1);
console.log(newa);
console;
//Empty Arrays + fill method
//Fill mutates the array
const x = new Array(7);
console.log(x);
//Fil with the value of one from index position 3 - 5
x.fill(1, 3, 5);
console.log(x);

arrayed.fill(23, 2, 6);
console.log(arrayed);

//Prefereable to using array.fill()
//2. Array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

//_ represents a throwaway elements
const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

const diceRolls = Array.from({ length: 100 }, (_, i) => i + 1);
// console.log(diceRolls);

//Challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
//1
const dogsFood = function (dogs) {
  // console.log(dogs.map(dog => dog.curFood));
  dogs.forEach(dog => {
    dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
  });
};
dogsFood(dogs);

//2a function checkFoodPortion
const foodPortion = function (name) {
  if (
    name.curFood > name.recommendedFood * 0.9 &&
    name?.curFood < name.recommendedFood * 1.1
  ) {
    console.log('Eating a balanced meal');
  } else if (name.curFood < name.recommendedFood * 0.9) {
    console.log('Eating too little');
  } else if (name.curFood > name.recommendedFood * 1.1) {
    console.log(`${name.owners[0]}'s dog is eating too much`);
  }
};

function updateFoodPortion(portion) {
  foodPortion(portion);
}
//2b Universal class
let petOwners;
const dogOwner = function (name) {
  petOwners = name.find(name => name.owners[0] === 'Sarah');
  // petOwners = name.find(name => name.owners.includes('Sarah'));

  //same output as 2a only way more simplified
  // console.log(
  //   `Sarah's dog is eating too ${
  //     petOwners.curFood > petOwners.recommendedFood ? 'much' : 'little'
  //   }`
  // );

  //2a was initially in this function i was able to move it out leveraging on the power of the find method

  //checkfood portion
  updateFoodPortion(petOwners);
};
dogOwner(dogs);

//3.
const obeseDogs = function (dogOwners) {
  //Array with all owners of dogs who eat too much
  const overFedDogs = dogOwners
    .filter(name => name.curFood > name.recommendedFood * 1.1)
    .flatMap(name => name.owners);

  console.log('---Dogs eating too much');
  console.log(overFedDogs);

  //3 Array with all owners of dogs who eat too little
  const underFedDogs = dogOwners
    .filter(name => name.curFood < name.recommendedFood * 0.9)
    .flatMap(name => name.owners);
  console.log('---Dogs eating too little');
  console.log(underFedDogs);

  //4 Display to console names
  console.log(`${overFedDogs.join(' and ')}'s dogs eat too much`);
  console.log(`${underFedDogs.join(' and ')}'s dogs eats too little`);
};
obeseDogs(dogs);

//5
function exactPortion(exactDogFeed) {
  return exactDogFeed.some(
    name =>
      name.curFood === name.recommendedFood * 0.9 &&
      name.curFood === name.recommendedFood * 1.1
  );
}
console.log(exactPortion(dogs));

//6
// Array with dog eating the required/recommended portion
const balancedPortion = balancedDogFeed =>
  balancedDogFeed.curFood > balancedDogFeed.recommendedFood * 0.9 &&
  balancedDogFeed.curFood < balancedDogFeed.recommendedFood * 1.1;

console.log(dogs.some(balancedPortion));

//7
console.log(dogs.filter(balancedPortion));

//8
//Sort by recommended food portion in an ascending order
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted);
