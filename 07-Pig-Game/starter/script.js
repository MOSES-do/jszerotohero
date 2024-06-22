'use strict';
//player class
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//loop toggle('.player--active)
const players = document.querySelectorAll('.player');
const currentScores = document.querySelectorAll('.current-score');
//cumulative scores
const scoreEl1 = document.getElementById('score--0');
const scoreEl2 = document.getElementById('score--1');

//diceroll(img/array)
const dice = document.querySelector('.dice');

//current score
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

//new game, roll dice and switchplayer
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Variable declaration
let scores, currentScore, activePlayer, playing;

const init = () => {
  //current Score from JS
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  //State variable
  playing = true;

  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //Starting conditions
  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;

    if (diceRoll !== 1) {
      //Add dice to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's scrore is >=100//Finish th game
    if (scores[activePlayer] >= 10) {
      playing = false;
      dice.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //switchplayer
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
// function rollDice(currentPlayer) {
//   //1. Generate a random dice roll
//   const diceRoll = Math.trunc(Math.random() * 6) + 1;

//   //2. Display Dice
//   dice.classList.remove('hidden');
//   dice.src = `dice-${diceRoll}.png`;

//   //3. Check for rolled 1: if true, switch to next player

//   //Add dice to current score
//   playerOneScore += diceRoll;

//   diceRoll === 1
//     ? switchPlayer()
//     : (currentPlayer.textContent = playerOneScore);
// }

// function rollDice1(currentPlayer) {
//   //1. Generate a random dice roll
//   const diceRoll = Math.trunc(Math.random() * 6) + 1;

//   //2. Display Dice
//   dice.classList.remove('hidden');
//   dice.src = `dice-${diceRoll}.png`;

//   //3. Check for rolled 1: if true, switch to next player
//   playerTwoScore += diceRoll;

//   diceRoll === 1
//     ? switchPlayer()
//     : (currentPlayer.textContent = playerTwoScore);
// }

// //Rolling dice automatically
// btnRoll.addEventListener('click', function () {
//   if (player1 && player1.classList.contains('player--active')) {
//     rollDice(currentScore1);
//   } else {
//     rollDice1(currentScore2);
//   }
// });
// btnHold.addEventListener('click', switchPlayer);
// btnNew.addEventListener('click', gameReset);
