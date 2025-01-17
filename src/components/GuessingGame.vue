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

    <div class="col" id="controls">
      <label for="upper-bound">Select Upper Bound</label>
      <input class="form-range" id="upper-bound" type="range"
             min="10" v-model="upperBound">
      <label for="guesses-remaining">Select Number of Guesses</label>

      <div class="input-group">
        <input class="form-control" id="guesses-remaining"
               min="0" type="number" v-model="guessesRemaining">
        <button class="btn btn-primary" id="confirm-guesses-btn" type="button"
                @click="disableInput('guesses-remaining');
                disableInput('confirm-guesses-btn');">
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
  methods: {
    checkNumber() {
      if(this.number === this.guessedNumber) {
        this.displayMessage = 'You got it!';
        this.gameOver = true;
      }
      if(this.guessesRemaining === 1) {
        //TODO the game over message should appear after the user makes a guess when 1 is remaining
        this.displayMessage = `You ran out of guesses! The number was ${this.number}`;

        this.gameOver = true;
        this.disableInput('guess-input');
      }
      if(this.gameOver)
      {
        this.disableInput('guess-btn');
        this.disableInput('confirm-guesses-btn')
      }
      else if(this.guessedNumber > this.number) {
        this.displayMessage = 'Too high!';
      }
      else if(this.guessedNumber < this.number) {
        this.displayMessage = 'Too low!';
      }
      this.guessesRemaining--;
      this.guesses.push(this.guessedNumber);
    },
    initializeGame() {
      document.querySelectorAll('input')
          .forEach(e => e.removeAttribute('disabled'));
      document.getElementById('guess-btn')
          .removeAttribute('disabled');
      this.displayMessage = '';
      this.gameOver = false;
      this.guesses = [];
      this.number = Math.round(Math.random() * 100 % 100);
    },
    disableInput(elementId) {
      document.getElementById(elementId)
          .setAttribute('disabled', true);
    }
  },
  computed: {
    guessesRemaining() {
      let remaining = Math.round(this.upperBound / 20) - this.guesses.length;
      if(remaining < 0) return 0;
      return remaining;
    }
  },
  data() {
    onMounted(this.initializeGame);

    return {
      upperBound: 100,
      gameOver: false,
      number: Math.round(Math.random() * 100 % 100),
      guessedNumber: 0,
      displayMessage: null,
      guesses: [],
    }
  }
};

</script>

<style scoped>

</style>