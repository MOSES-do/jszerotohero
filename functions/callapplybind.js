//The call and apply methods
/**
 * The call is used when a new object which is derived from the earlier object is created and needs access to its propeeties. Like a company and its subsidiary
 */
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],

  book(flightNum, passengerName) {
    console.log(
      `${passengerName} booked a seat on ${this.iataCode}${flightNum} on ${this.airline}`
    );
    this.bookings.push(
      `flight:${this.iataCode}${flightNum} on  ${this.airline}, ${passengerName}`
    );
  },
};
lufthansa.book(236, "Esumei Moses");
lufthansa.book(239, "Bukola Maria");
console.log(lufthansa.bookings);

//Subsidiary
const eurowings = {
  airline: "eurowings",
  iataCode: "LH",
  bookings: [],
};

//Instead of repeating the method from the parent airline, inside the subsidiary, we assign it to a variable the subsidiary wil then access, which ordinarily wil not work beocs a method outside its parent object becomes an ordinary  function. But with call and apply voila!

const book = lufthansa.book;

book.call(eurowings, 234, "Sammy Vinsha");
book.call(lufthansa, 234, "Mary Cooper");
console.log(lufthansa);
console.log(eurowings);

//Apply method - takes an array of the data and passes that to the function

const flightData = [583, "George Cooper"];
book.apply(eurowings, flightData);

//better still using ES6 spread operator
book.call(lufthansa, ...flightData);

//Bind Method
// book.call(eurowings, 234, "Sammy Vinsha");

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

bookEW(23, "Mannie Simmons");

//More on bind
//Presetting the bind method

const bookEW23 = book.bind(eurowings, 29); //partial application;
bookEW23("Jonas Schmedtmann");
bookEW23("Martha Cooper");
console.log(eurowings);

//Objects and binding with event-listeners (Bind)
//The "this" keyword from a function when attached to an event listener always points to the handler which is th event listener as opposed to pointing to the object by default. This is its default behaviour.

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

let btn = document.querySelector(".buy");
//this attached to handler event 🤞
// btn.addEventListener("click", lufthansa.buyPlane);

//now refereing to this in function
btn.addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//Partial applicion

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//null represents the this keyword since we don't need it here
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));
console.log(addVAT(23));

//Rewrite using a function that returns a function.

const rate = function (rate) {
  return function (value) {
    console.log(value + value * rate);
  };
};

const newVAT = rate(0.23);
newVAT(100);
newVAT(23);

//CHALLENGE 1
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const answer = prompt(
      `${this.question}\n${this.options.join("\n")}\n(Write option number)`
    );

    /**
     * Not compulsory, becos it generate error on cancel but still i like it it's my brainchild.
     */
    const promptAnswer = new Map(Object.entries(answer));
    const [option1, ...others] = promptAnswer;
    const strippedPoll = [...option1];
    let newPoll = strippedPoll[1];

    if (answer === newPoll && answer < this.answers.length) {
      this.answers[newPoll]++;
    } else {
      alert("Please choose an option BTW 0 - 3");
    }

    this.displayResults();
    this.displayResults("string");
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};
const btn1 = document.querySelector(".poll");

poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
btn1.addEventListener("click", poll.registerNewAnswer.bind(poll));
