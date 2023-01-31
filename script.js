'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const diceEl = document.querySelector('.dice');
const player0 =document.querySelector('.player--0');
const player1 =document.querySelector('.player--1');

const totalScore0El = document.querySelector('#score--0');
const totalScore1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// Starting conditions
let score, currentPlayer, currentScore, isPlaying;

const init = () => {
  score = [0, 0];
  currentPlayer = 0;
  currentScore = 0;
  isPlaying = true;

  totalScore0El.textContent = 0;
  totalScore1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Roling dice functionality
btnRoll.addEventListener('click', function () {
  if (!isPlaying) return;

  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
    switchPlayer();
  }
});

// Hold the score functionality
btnHold.addEventListener('click', function () {
  if (!isPlaying) return;

  score[currentPlayer] += currentScore;
  currentScore = 0;

  document.querySelector(`#score--${currentPlayer}`).textContent =
    score[currentPlayer];
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;

  // Check if score >= 100
  if (score[currentPlayer] >= 100) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    diceEl.classList.add('hidden');
    isPlaying = false;
  } else {
    switchPlayer();
  }
});

// New game functionality
btnNew.addEventListener('click', init);
