"use strict";

//use any data type, return any data tyoe, short circuiting
// if the first operand is a truthy it will be returned using (||)

console.log(3 || "Jonas");
console.log("" || "Jonas");
console.log(true || 0);
console.log(undefined || null);

//Challenge

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },

  printGoals: function (...players) {
    console.log(players);
    console.log(`${players.length} goals were scored`);
  },
};

//1
const [player1, player2] = game.players;
console.log(player1, player2);

//2
//G.K and players separated
let [gk, ...fieldPlayers] = player1;
console.log(gk, fieldPlayers);
[gk, ...fieldPlayers] = player2;
console.log(gk, fieldPlayers);

//3
const allPlayers = [...player1, ...player2];
console.log(allPlayers);

//4
const player1Final = [...player1, "Thiago", "Coutinho", "Perisic"];
console.log(player1Final);

//5
const { team1 } = game.odds;
const { x: draw } = game.odds;
const { team2 } = game.odds;

//6
game.printGoals(...game.scored);
game.printGoals("Ronaldo", "Messi");

//7
console.log(`Team 1  ${(team1 ||= team2)} is more likely to win 🥇  `);

team1 < team2 && console.log(`${game.team1} is more likely to win`);
