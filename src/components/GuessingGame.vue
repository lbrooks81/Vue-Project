<template>
  <h1 class="text-center">Guessing Game</h1>
  <p class="text-center" v-if="displayMessage">{{ displayMessage }}</p>
  <div class="row mb-3">
    <div class="col">
      <div class="d-flex">
        <label class="form-label text-center" for="guess-input">Guess a number between 1 and {{ upperBound }} </label>
      </div>
      <div class="input-group d-flex mb-2">
        <input class="form-control w-25" id="guess-input" type="number" min="0" max="200" v-model="guessedNumber"/>
        <button class="btn btn-primary" id="guess-btn" type="button" @click="checkNumber">Guess</button>
      </div>
      <div>
        <p>Guesses Remaining: {{ guessesRemaining }}</p>
      </div>
    </div>
    <!-- Controls -->
    <div class="col" id="controls">
      <!-- Upper Bound Selection -->
      <label for="upper-bound">Select Upper Bound</label>
      <input class="form-range controls" id="upper-bound" type="range"
             min="10" v-model="upperBound">
      <label for="guesses-remaining">Select Number of Guesses</label>
      <!-- Number of Guesses Selection -->
      <div class="input-group">
        <input class="form-control controls" id="guesses-remaining"
               min="0" type="number" @input="this.manual = true;" v-model="guessesRemaining">
        <button class="btn btn-primary controls" id="confirm-guesses-btn" type="button"
                @click="confirmNumberOfGuesses">
          Confirm
        </button>
      </div>
    </div>
  </div>
  <div class="text-center h3" id="guesses">
    <p>Guesses</p>
    <div class="d-flex justify-content-evenly">
      <p v-for="guess in guesses">
        {{ guess }}
      </p>
    </div>
  </div>
  <div class="row">
    <button class="row btn btn-success align-content-center" v-if="gameOver" @click="initializeGame">
      Play Again
    </button>
  </div>
</template>

<script>
import {onMounted} from "vue";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: 'Guessing Game',
  data() {
    onMounted(this.initializeGame);

    return {
      upperBound: 100,
      gameOver: false,
      guessedNumber: 0,
      displayMessage: null,
      guesses: [],
      guessesRemaining: 5,
      selectedGuesses: 5,
      manual: false
    }
  },
  methods: {
    checkNumber() {
      if (this.number === this.guessedNumber) {
        this.displayMessage = 'You got it!';
        this.gameOver = true;
      }
      if (this.guessesRemaining === 1) {
        this.displayMessage = `You ran out of guesses! The number was ${this.number}`;

        this.gameOver = true;
        this.disableInput('guess-input');
      }
      if (this.gameOver)
      {
        this.disableInput('guess-btn');
        this.disableInput('confirm-guesses-btn')
      }
      else if (this.guessedNumber > this.number) {
        this.displayMessage = 'Too high!';
      }
      else if (this.guessedNumber < this.number) {
        this.displayMessage = 'Too low!';
      }
      this.guessesRemaining--;
      this.guesses.push(this.guessedNumber);
    },
    initializeGame() {
      document.querySelectorAll('input')
          .forEach(e => e.removeAttribute('disabled'));
      document.querySelectorAll('button')
          .forEach(e => e.removeAttribute('disabled'));
      this.displayMessage = '';
      this.gameOver = false;
      this.guesses = [];
      this.guessesRemaining = this.selectedGuesses;
    },
    disableInput(elementId) {
      document.getElementById(elementId)
          .setAttribute('disabled', 'true');
    },
    confirmNumberOfGuesses()
    {
      this.selectedGuesses = document.getElementById('guesses-remaining').value;
      document.querySelectorAll('.controls')
          .forEach(e => this.disableInput(e.id));
    }
  },
  // TODO logic error
  //* After clicking play again, the guesses will be allowed to go under zero and the game will never end
  watch: {
    upperBound() {
      let remaining = Math.round(this.upperBound / 20) - this.guesses.length;
      if (remaining < 0) return 0;
      if (this.manual)
      {
        this.manual = false;
        remaining = document.getElementById('guesses-remaining').value;
      }
      this.guessesRemaining = remaining;
    }
  },
  computed:
  {
    number() {
      return Math.round(Math.random() * this.upperBound);
    }
  }
};

</script>

<style scoped>

</style>