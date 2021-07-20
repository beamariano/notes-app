// DECLARATIONS
let guesses = [];
let userScore = 0;
let mistakes = 0;

function beginGame() {
  createWordAndAlphabetButtons();
  checkLetter();
}

//  This creates a randomizes an emotion word to be guessed.
let wordlist = ["Accepting", "Afraid", "Aggravated", "Agitated", "Alive", "Amazed", "Angry", "Annoyed", "Anxious", "Apprehensive", "Awe", "Bitter", "Bliss", "Calm", "Centered", "Contempt", "Content", "Cranky", "Cynical", "Delighted", "Depleted", "Disdain", "Disgruntled", "Disturbed", "Eager", "Ecstatic", "Edgy", "Enchanted", "Energized", "Engaged", "Exhausted", "Frazzled", "Frightened", "Fulfilled", "Hesitant", "Joy", "Nervous", "Open", "Panic", "Paralyzed", "Patient", "Peaceful", "Present", "Relaxed", "Scared", "Serene", "Terrified", "Trusting", "Worried"]; 

let word = wordlist[(Math.floor(Math.random() * wordlist.length))].toUpperCase();


let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// This is a function that creates the button container and letters inside. It also checks if the selected letter is part of random word to be guessed.
function createWordAndAlphabetButtons() {
  console.log('The random word is ' + word);
  for (let i = 0; i < alphabet.length; i++) {

    let button = document.createElement('div');
    button.classList.add('button');
    button.textContent = alphabet[i].toUpperCase();

    let alphabetDisplay = document.getElementById('alphabetDisplay');
    alphabetDisplay.appendChild(button);


    //  when the letter is clicked it is appended onto an array of collect letters 
    button.addEventListener('click', function () {
      let clickedLetter = this.innerHTML;
      this.classList.add('disabled-letters');

      for (let i = 0; i < word.length; i++) {
        if (clickedLetter === word[i]) {
          guesses[i].innerHTML = clickedLetter; //array of correct letters
        }
      }

      // This block checks if clicked letter is in the index of the index of the random word. If true, it pushes clicked letters into the array called guesses
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

createWordAndAlphabetButtons();

function checkWord(correctWord) {

  if (correctWord.toUpperCase() == word.toUpperCase()) {
    console.log('Correct word guessed.');
    alert('You guessed correctly! Try the next word!');
    addToScore();
    checkIfGameWon();
    //userScore++;
    let userScoreContainer = document.querySelector('#userScoreContainer span');
    userScoreContainer.textContent = userScore;

  }
}


function addToScore() {
  userScore++;
  let userScoreContainer = document.querySelector('#userScoreContainer span');
  userScoreContainer.textContent = userScore;
  
  checkIfGameWon();
}

checkLetter();
//  This function creates the blanks _ in the word container and checks if it matches the random word. It also makes the letter appear.
function checkLetter() {

  wordContainer = document.getElementById('wordContainer');
  guessedWord = document.createElement('div');

  for (let i = 0; i < word.length; i++) {
    guessedWord.setAttribute('id', 'correctLetterContainer');

    letter = document.createElement('div');
    letter.setAttribute('id', 'guess');

    let space;

    if (word[i] === -1) {
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

//  Click function resets button
document.getElementById('reset').onclick = function () {
  console.log('Restart game clicked.')
  resetGame();
}

// This function resets the game. The mistakes turn to 0. Letter buttons and a new random word are created.
function resetGame() {
  document.getElementById("mistakesContainer").textContent = 0;
  document.getElementById("alphabetDisplay").innerHTML = '';
  i = document.getElementById("correctLetterContainer");
  i.remove();
  beginGame();
}

function animation() {
}

//MODAL

 // Get the modal
 var modal = document.getElementById("myModal");
 var btn = document.getElementById("game-mechanics");
 var span = document.getElementsByClassName("close")[0];
 btn.onclick = function () {
   modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
   modal.style.display = "none";
 }

 window.onclick = function (event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }