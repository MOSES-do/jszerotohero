"use strict";

//Two ways to write  an IIFE
(function () {
  console.log("This won't run again");
})();

(() => console.log("This won't ALSO run again"))();

//CLOSURE
/**
 * A closure is a function that executes itself on call and the result of its execution is required by another function within the same variable envirnment.
 *
 * It is important to note closures take priority over scope chain
 */
function passenger() {
  let passengerCount = 0;

  return function () {
    passengerCount++;

    console.log(passengerCount);
  };
}

const booker = passenger();
booker();

console.dir(booker);

//Challenge - Explain to someone

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();

for (let i = 0; i < 10; i++) {
  console.count();
}
