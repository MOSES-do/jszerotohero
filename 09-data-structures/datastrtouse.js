/*
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, it was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

/**
 * Step 1: convert map to set
 * Step 2: Convert set to array
 *
 */
console.log("Question 1", "conversion to array");
//conversion to set
const Events = new Set(gameEvents.values());
//to array
const eventsArr = [...new Set(Events)];
console.log(eventsArr);
//or
// const Events = [...new Set(gameEvents.values())];
// console.log(Events);

//2
console.log("Question2");
//Already a map so delete function works
gameEvents.delete(64);

//3
console.log("Question 3");
//To be more precise
const time = [...new Set(gameEvents.keys())].pop();
console.log(time);
console.log(
  `An event happened, on average, every minutes ${time / gameEvents.size}`
);

//4
console.log("Question 4");
for (const [key, value] of gameEvents) {
  if (key <= 45) console.log(`First Half ${key} minute: ${value}   `);
  else console.log(`Second Half  ${key} minute: ${value} `);
}
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`${half} HALF ${min}: ${event} `);
}

/**
 * Question 1 conversion to array
datastrtouse.js:35 (4) ['⚽️ GOAL', '🔁 Substitution', '🔶 Yellow card', '🔴 Red card']
datastrtouse.js:41 Question2
gameEvents.delete(64);
datastrtouse.js:46 Question 3
datastrtouse.js:49 92
datastrtouse.js:50 An event happened, on average, every minutes 9.2
datastrtouse.js:55 Question 4
datastrtouse.js:57  17 minute: ⚽️ GOAL - First Half 
datastrtouse.js:57  36 minute: 🔁 Substitution - First Half 
datastrtouse.js:58  47 minute: ⚽️ GOAL - Second Half 
datastrtouse.js:58  61 minute: 🔁 Substitution - Second Half 
datastrtouse.js:58  69 minute: 🔴 Red card - Second Half 
datastrtouse.js:58  70 minute: 🔁 Substitution - Second Half 
datastrtouse.js:58  72 minute: 🔁 Substitution - Second Half 
datastrtouse.js:58  76 minute: ⚽️ GOAL - Second Half 
datastrtouse.js:58  80 minute: ⚽️ GOAL - Second Half 
datastrtouse.js:58  92 minute: 🔶 Yellow card - Second Half 
 */
