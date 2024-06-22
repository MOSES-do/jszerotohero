"use strict";

const createBookings = function (
  flightNum,
  numPassengers = 4,
  price = 500 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  //   console.log(booking);
};

createBookings("LH123", 10, undefined);

//HOW PASSING ARGUMENTS WORKS: VALUE VS REFERENCE

// While passing an object to function whatver is changed in the copy will also be changed in the original. This is not so with primitive types

const flight = "LH123"; //primitive
const jonas = {
  //object
  name: "Jonas Schmedttmann",
  passport: 24567880378465,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = `Mr ${passenger.name}`;

  if (passenger.passport === 24567880378465) {
    // alert("Checked in");
  } else {
    // alert("Wrong passport!");
  }
};
checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

//NOTE: The interaction of the same object by multiple functions can cause issues

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(jonas);
checkIn(flight, jonas);

//Passing by value and by reference
// JS does not have pasing by reference
