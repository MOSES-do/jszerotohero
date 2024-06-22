'use strict';

let playerName0 = prompt('Please enter your name');
let playerName1 = prompt('Please enter your name');

//player class
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//names
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');

const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');

//loop toggle('.player--active)
const players = document.querySelectorAll('.player');

//cumulative scores
const scoreEl1 = document.getElementById('score--0');
const scoreEl2 = document.getElementById('score--1');

//diceroll(img/array)
const dice = document.querySelector('.dice');

//new game, rematch, roll dice and switchplayer
const btnNew = document.querySelector('.btn--new');
const btnRematch = document.querySelector('.btn--rematch');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerWin = document.querySelector('.playerWin');

//current Score from JS
let scores, activePlayer, currentScore, playing;

const init = () => {
  activePlayer = 0;
  scores = [0, 0];
  currentScore = 0;
  //State variable
  playing = true;

  //Starting conditions
  scoreEl1.textContent = 0;
  scoreEl2.textContent = 0;
  dice.classList.add('hidden');
};
init();

function displayNames() {
  if (playerName0 || playerName1) {
    playerName0 !== ''
      ? (name0.textContent = playerName0)
      : (name0.textContent = 'Player 1');
    playerName1 !== ''
      ? (name1.textContent = playerName1)
      : (name1.textContent = 'Player 2');
  } else {
    name0.textContent = 'Player 1';
    name1.textContent = 'Player 2';
  }
}
displayNames();

const reMatch = function () {
  init();
  //1. Hide Dice Img
  dice.classList.add('hidden');

  //Add dice to current score

  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;

  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  scoreEl1.style.fontSize = '8rem';
  scoreEl2.style.fontSize = '8rem';

  btnRoll.classList.remove('hidden');
  playerWin.classList.add('hidden');

  player1.classList.remove('winBackground');
  player2.classList.remove('winBackground');
};

function gameReset() {
  init();
  btnRematch.addEventListener('click', reMatch);

  playerName0 = prompt('Please enter your name', 'Player 1');
  playerName1 = prompt('Please enter your name', 'Computer');

  if (playerName0 || playerName1) {
    playerName0 !== ''
      ? (name0.textContent = playerName0)
      : (name0.textContent = 'Player 1');
    playerName1 !== ''
      ? (name1.textContent = playerName1)
      : (name1.textContent = 'Player 2');
  } else {
    name0.textContent = 'Player 1';
    name1.textContent = 'Player 2';
  }

  //If "cancel" is chosen by user1 or 2 and "ok" is chosen by user1 or user2. Corrects the issue of null player name
  if (playerName0 === null) {
    name0.textContent = 'Player 1';
  }
  if (playerName1 === null) {
    name1.textContent = 'Player 2';
  }
  ///////////////////////////////////////////////
  //1. Hide Dice Img
  dice.classList.add('hidden');

  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;

  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;

  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  scoreEl1.style.fontSize = '8rem';
  scoreEl2.style.fontSize = '8rem';

  btnRoll.classList.remove('hidden');
  playerWin.classList.add('hidden');

  player1.classList.remove('winBackground');
  player2.classList.remove('winBackground');
}

function winner() {
  //Player 1 wins
  if (
    //if score is equal or greater than 30 on switch, then player 1 wins

    scoreEl1.textContent >= 30 &&
    !player1.classList.contains('.player--active')
  ) {
    playing = false;
    scoreEl1.style.fontSize = '35px';
    playerWin.classList.remove('hidden');
    player1.classList.remove('player--active');
    player2.classList.remove('player--active');
    player1.classList.add('winBackground');
    playerWin.textContent =
      playerName0 !== '' && !null
        ? `😇 ${playerName0}  wins `
        : 'Player 1 wins💯';

    //on null result set player name to default of "player 2"
    if (playerName0 === null) {
      playerWin.textContent = 'Player 1 wins💯';
    }
    dice.classList.add('hidden');

    ///////////////////////////////////
  } else if (
    //Player 2 wins
    scoreEl2.textContent >= 30 &&
    !player2.classList.contains('.player--active')
  ) {
    playing = false;
    scoreEl2.style.fontSize = '35px';
    playerWin.classList.remove('hidden');
    player1.classList.remove('player--active');
    player2.classList.remove('player--active');
    player2.classList.add('winBackground');
    playerWin.textContent =
      playerName1 !== '' && !null
        ? `😇 ${playerName1}  wins`
        : `Player Two wins 💯 `;

    //on null result set player name to default of "player 2"
    if (playerName1 === null) {
      playerWin.textContent = 'Player 2 wins💯';
    }
    dice.classList.add('hidden');

    ////////////////////////////////////
  }
}

function rollDice() {
  if (playing) {
    //1. Generate a random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRoll}.png`;

    //3. Check for rolled 1: if true, switch to next player
    if (diceRoll === 1) {
      switchPlayer();
    } else {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
}

//Rolling dice automatically
btnRoll.addEventListener('click', rollDice);

const switchPlayer = function () {
  if (playing) {
    //1. Switch to activePlayer
    for (let i = 0; i < players.length; i++) {
      players[i].classList.toggle('player--active');
    }
    //set active player to zero
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    currentScore = 0;
    //switch to next player--active
    activePlayer = activePlayer === 0 ? 1 : 0;
    winner();
  }
};

btnHold.addEventListener('click', function () {
  if (playing) {
  }
  //Assigns current score to 0
  scores[activePlayer] += currentScore;
  //Add current score to active player

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //switchPlayer
  switchPlayer();
});

//check username function
const userNames = function () {
  if (!playerName0 || !playerName1) {
    playing = false;
    playerWin.textContent = 'Player names required 🖐️📢';
    btnRematch.removeEventListener('click', reMatch);
  }
};
userNames();

btnNew.addEventListener('click', gameReset);
btnRematch.addEventListener('click', reMatch);
