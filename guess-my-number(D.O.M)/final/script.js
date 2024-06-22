//random number generator
let secretNumber = Math.trunc(Math.random() * 20 + 1);

let score = 20; //This is a representation of the score in th ehtml doc, creating a replica here ensures the code has a working memeory of current score. State variable(All relevant data to the application)

let highScore = 0;

//Rest button (Play Again)
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.number').textContent = ' ?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.score').textContent = score;
});
//end reset button

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //Game logic (conditionals)
  //when guess input on submit is empty

  if (!guess) {
    document.querySelector('.message').textContent = "' 🚏 No number! ";

    //when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNumber ? '🌬 Too High! ' : '🌬 Too Low';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = ' 🚏You lost the game ';
      document.querySelector('.score').textContent = '0';
    }

    //when guess is correct!
  } else {
    //displays correct number
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.message').textContent = ' 🥳   Congratulations! ';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  }
});
