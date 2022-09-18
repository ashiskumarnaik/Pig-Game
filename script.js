'use strict';

// selecting the elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const scores = [0, 0];

let activePlayer = 0;
let playing = true;
let currentScore = 0;
//default values
score0EL.textContent = 0;
score1EL.textContent = 0;
// Hiding the center dice
diceEL.classList.add('hidden');

const switchPlayer = function () {
  // switch to next player
//   diceEL.classList.add('hidden');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Rolling the dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a new dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display dice
    diceEL.classList.remove('hidden');

    diceEL.src = `dice-${dice}.png`;
    // 3. check for rooled : 1 , if true switch to next player
    if (dice !== 1) {
      // add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // change it to the next player
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if players score is >= 100 and finish the game
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch the game
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  diceEL.classList.add('hidden');
  playing = true;
  currentScore = 0;

  for (let i = 0; i < 2; i++) {
    scores[i] = 0;
    document.getElementById(`current--${i}`).textContent = currentScore;
    document.getElementById(`score--${i}`).textContent = scores[i];
  }
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
});
