// DECLARATIONS
let guesses = [];
let userScore = 0;
let mistakes = 0;

beginGame();
// This function initiates the game.
function beginGame() {
  createRandomWordAndAlphabetButtons();
  createLetterContainer();
}

// This function resets the game. The mistakes turn to 0. Letter buttons and a new random word are created.
function resetGame() {
  document.getElementById("mistakesContainer").textContent = 0;
  document.getElementById("alphabetDisplay").innerHTML = '';
  var remove = document.getElementById("correctLetterContainer");
  remove.parentNode.removeChild(remove);
  beginGame();
}

// This function forms a random word to be guessed.
function createWord() {
  let wordlist = ["Accepting", "Afraid", "Aggravated", "Agitated", "Alive", "Amazed", "Angry", "Annoyed", "Anxious", "Apprehensive", "Awe", "Bitter", "Bliss", "Calm", "Centered", "Contempt", "Content", "Cranky", "Cynical", "Delighted", "Depleted", "Disdain", "Disgruntled", "Disturbed", "Eager", "Ecstatic", "Edgy", "Enchanted", "Energized", "Engaged", "Exhausted", "Frazzled", "Frightened", "Fulfilled", "Hesitant", "Joy", "Nervous", "Open", "Panic", "Paralyzed", "Patient", "Peaceful", "Present", "Relaxed", "Scared", "Serene", "Terrified", "Trusting", "Worried"];
  let word = wordlist[(Math.floor(Math.random() * wordlist.length))].toUpperCase();
  return word;
}

// This is a function that creates the button container and letters inside. It also checks if the selected letter is part of random word to be guessed.
function createRandomWordAndAlphabetButtons() {
  word = createWord();
  console.log('The random word is ' + word);
  createAlphabetButtons();

  function createAlphabetButtons() {
    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (let i = 0; i < alphabet.length; i++) {

      let button = document.createElement('div');
      button.classList.add('button');
      button.textContent = alphabet[i].toUpperCase();

      let alphabetDisplay = document.getElementById('alphabetDisplay');
      alphabetDisplay.appendChild(button);

      //  When the letter is clicked it is appended onto an array of collect letters 
      button.addEventListener('click', function () {
        // This block checks if clicked letter is in the index of the random word. If true, it pushes clicked letters into the array called guesses

        clickedLetter = this.innerHTML;
        this.classList.add('disabled-letters');
        console.log(clickedLetter);

        for (let i = 0; i < word.length; i++) {
          if (clickedLetter === word[i]) {
            guesses[i].innerHTML = clickedLetter; //array of correct letters
          }
        }

        if (word.indexOf(clickedLetter) === -1) {
          // if clicked letter is wrong, update mistakes scoreboard
          console.log('key pushed ' + alphabet[i].toUpperCase() + ', wrong letter');
          updateMistakes();
        } else {
          console.log('key pushed ' + alphabet[i].toUpperCase() + ', correct letter');
        }

        let content = document.getElementById('correctLetterContainer');
        correctWord = content.textContent;
        console.log('Word being formed ' + correctWord);
        checkWord(correctWord);
      });
    }
  }
}

//  This function creates the blanks _ in the word container and checks if it matches the random word. It also makes the letter appear.
function createLetterContainer() {
  wordContainer = document.getElementById('wordContainer');
  guessedWord = document.createElement('div');

  for (let i = 0; i < word.length; i++) {
    guessedWord.setAttribute('id', 'correctLetterContainer');

    letter = document.createElement('div');
    letter.setAttribute('id', 'guess');

    if (word[i] === -1) {
      let space;
      letter.innerHTML = '-';
      space = 1;
    } else {
      letter.innerHTML = '_';
    }
    guesses.push(letter);
    wordContainer.appendChild(guessedWord);
    guessedWord.appendChild(letter);
  }
}

// SCORING
// This function checks if the word has been correctly guessed and adds to the score.
function checkWord(correctWord) {
  if (correctWord.toUpperCase() == word.toUpperCase()) {
    console.log('Correct word guessed.');
    alert('You guessed correctly! Try the next word!');
    addToScore();
    checkIfGameWon();
    let userScoreContainer = document.querySelector('#userScoreContainer span');
    userScoreContainer.textContent = userScore;
    resetGame();
  }
}

// This is a function that adds 1 to user score if word was guessed correctly.
function addToScore() {
  userScore++;
  let userScoreContainer = document.querySelector('#userScoreContainer span');
  userScoreContainer.textContent = userScore;
  checkIfGameWon();
}

//  This function adds 1 to mistakes if letter was not guessed correctly
function updateMistakes() {
  mistakes++;
  document.getElementById("mistakesContainer").textContent = mistakes;
  checkIfGameLost();
}

//  This function checks if the game has been won and resets game
function checkIfGameWon() {
  if (userScore == 5) {
    resetGame();
    alert('You won!');
  }
}

//  This function checks if the game has been lost and resets game
function checkIfGameLost() {
  if (mistakes == 7) {
    alert('Oops! You lose. The correct word is ' + word + '. Try again');
    resetGame();
  }
}

//  This is an onclick function which is a reset button
document.getElementById('reset').onclick = function () {
  console.log('Restart game clicked.')
  resetGame();
}

// function animation() {}

//MODAL
var modal = document.getElementById("myModal");
var btn = document.getElementById("game-mechanics");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}