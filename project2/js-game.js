// DECLARATIONS
let guesses = []; // contains array of letters clicked
let userScore = 0;
let mistakes = 0;

function beginGame() {
  createWordAndAlphabetButtons();
  checkLetter();
}

let wordlist = ["Accepting", "Afraid", "Aggravated", "Agitated", "Alive", "Amazed", "Angry", "Annoyed", "Anxious", "Apprehensive", "Awe", "Bitter", "Bliss", "Calm", "Centered", "Contempt", "Content", "Cranky", "Cynical", "Delighted", "Depleted", "Disdain", "Disgruntled", "Disturbed", "Eager", "Ecstatic", "Edgy", "Enchanted", "Energized", "Engaged", "Exhausted", "Frazzled", "Frightened", "Fulfilled", "Hesitant", "Joy", "Nervous", "Open", "Panic", "Paralyzed", "Patient", "Peaceful", "Present", "Relaxed", "Scared", "Serene", "Terrified", "Trusting", "Worried"];

let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// This creates randomizes an emotion word to be guessed.
var word = wordlist[(Math.floor(Math.random() * wordlist.length))];

console.log('Random word: ' + word.toUpperCase());

//This is a function that creates the button container and letters inside. It also checks if the selected letter is part of random word to be guessed.
function createWordAndAlphabetButtons(word) {
  for (let i = 0; i < alphabet.length; i++) {

    let button = document.createElement('div');
    button.classList.add('button');
    button.textContent = alphabet[i].toUpperCase();

    let alphabetDisplay = document.getElementById('alphabetDisplay');
    alphabetDisplay.appendChild(button);


    // when the letter is clicked it is appended onto an array of correct letters 
    button.addEventListener('click', checkLetters());
  }
}

function checkLetters(){
  
  let clickedLetter = this.innerHTML;
  this.classList.add('disabled-letters');
  console.log(word);


  for (let i = 0; i < word.length; i++) {
    if (clickedLetter === word[i]) {
      guesses[i].innerHTML = clickedLetter; // array of correct letters
    }
  }

  //This block checks if the clicked letter is in the index of the index of the random word. 

  if (word.indexOf(clickedLetter) === -1) { // if clicked letter is wrong, update mistakes scoreboard
    console.log('key pushed: ' + alphabet[i].toUpperCase() + ', wrong letter');
    updateMistakes();

  } else { // if clicked letter is correct, add letters to array called guesses
    console.log('key pushed: ' + alphabet[i].toUpperCase() + ', correct letter');
  }

  let content = document.getElementById('correctLetterContainer');
  correctWord = content.textContent;
  console.log('Word being formed: ' + correctWord);
  checkWord(correctWord);
}


createWordAndAlphabetButtons();

function checkWord(correctWord) {

  if (correctWord.toUpperCase() == word.toUpperCase()) {
    console.log('Correct word guessed.');
    alert('Cool. You guessed correctly! Try the next word!');
    addToScore();
    checkIfGameWon();
    // let userScoreContainer = document.querySelector('#userScoreContainer span');
    // userScore++;
    // userScoreContainer.textContent = userScore;


  }
}


function addToScore() {
  let userScoreContainer = document.querySelector('#userScoreContainer span');
  userScoreContainer.textContent = userScore;
  userScore++;
  checkIfGameWon();
}

checkLetter(word);
// This function creates the blanks _ in the word container and checks if it matches the random word. If true, it pushes clicked letters into the array called guesses. It also makes the letter appear.
function checkLetter(word) {
  wordContainer = document.getElementById('wordContainer');
  guessedWord = document.createElement('div');

  for (let i = 0; i < word.length; i++) {
    guessedWord.setAttribute('id', 'correctLetterContainer');

    letter = document.createElement('div');
    letter.setAttribute('id', 'guess');

    let space;

    if (word[i] === "-") {
      letter.innerHTML = "-";
      space = 1;
    } else {
      letter.innerHTML = "_";
    }
    guesses.push(letter);
    wordContainer.appendChild(guessedWord);
    guessedWord.appendChild(letter);
  }
}

// This function adds 1 to mistakes if letter was not guessed correctly
function updateMistakes() {
  let mistakes = 0;
  let mistakesContainer = document.querySelector('#mistakesContainer span');
  mistakes++;
  mistakesContainer.textContent = mistakes;
  checkIfGameLost();
}

// This function checks if the game has been won and resets game
function checkIfGameWon() {
  if (userScore == 5) {
    resetGame();
    alert('You won!');
  }
  if (mistakes == 7) {
    alert('You lose.');
    resetGame();
  } else {
    resetGame();
  }
}

// This function checks if the game has been lost and resets game
function checkIfGameLost() {
  if (mistakes == 7) {
    alert('Oops! You lose. The correct word is ' + word + '. Try again?');
    resetGame();
  }
}


// Click function resets button
document.getElementById('reset').onclick = function () {
  console.log('Restart game clicked.')
  resetGame();
}

//This function resets the game. The mistakes turn to 0. Letter buttons and a new random word are created.
function resetGame() {
  document.getElementById("mistakesContainer").textContent = '0';
  document.getElementById("alphabetDisplay").innerHTML = '';
  let i = document.getElementById("correctLetterContainer");
  i.remove();
  beginGame();
}

function animation() {

}