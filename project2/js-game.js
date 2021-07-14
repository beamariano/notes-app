// Sample wordlist
let wordlist = ["Accepting", "Afraid", "Aggravated", "Agitated", "Alive", "Amazed", "Angry", "Annoyed", "", "Anxious", "Apprehensive", "Awe", "Bitter", "Bliss", "Calm", "Centered", "Contempt", "Content", "Cranky", "Cynical", "Delighted", "Depleted", "Disdain", "Disgruntled", "Disturbed", "Eager", "Ecstatic", "Edgy", "Enchanted", "Energized", "Engaged", "Exhausted", "Frazzled", "Frightened", "Fulfilled", "Hesitant", "Joy", "Nervous", "Open", "Panic", "Paralyzed", "Patient", "Peaceful", "Present", "Relaxed", "Scared", "Serene", "Terrified", "Trusting", "Worried"]; //40+ words

// This function picks a random word for guessing
let word = wordlist[(Math.floor(Math.random() * wordlist.length))].toUpperCase(); // remember that 'word' is a string

console.log('The random word is ' + word); // shows random word

//This creates the letter containers
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// let clickedLetter = ""; // to make it string; one character
// where all the clicked letters are stored

let guesses = []; // contains array of clicked letters
// let mainDisplay = document.getElementById('mainDisplay');

//This part displays the alphabet buttons
//This is a loop that creates the button container and letter inside and checks if the selected letter is part of random word to be guessed

for (let i = 0; i < alphabet.length; i++) {

  let button = document.createElement('div');
  button.classList.add('button');
  button.textContent = alphabet[i].toUpperCase();

  let alphabetDisplay = document.getElementById('alphabetDisplay');
  alphabetDisplay.appendChild(button);

  // when the letter is clicked it is appended onto the  container 

  button.addEventListener('click', function () {
    let clickedLetter = (this.innerHTML);
    this.setAttribute("style", "background-color: lightGrey; pointer-events: none; border: 0.5px solid grey"); // shows that the letter has been pushed and disables it from being clicked again

    for (let i = 0; i < word.length; i++) {
      if (clickedLetter === word[i]) {
        guesses[i].innerHTML = clickedLetter; // array of correct letters
      }
    }

    //This block checks if clicked letter is in the index of the index of the random word. If true, it pushes clicked letters into the array called guesses
    if (word.indexOf(clickedLetter) === -1) { // if clicked letter is wrong, update mistakes scoreboard
      console.log('key pushed: ' + alphabet[i].toUpperCase() + ', wrong letter');
      updateMistakes();
    } else { // if clicked letter is correct, add letters to array called guesses
      console.log('key pushed: ' + alphabet[i].toUpperCase() + ', correct letter');
    }

    let content = document.getElementById('correctLetterContainer');
    correctWord = content.textContent;
    console.log(correctWord);
    checkWord(correctWord);
    checkIfGameWon();
  });
}
function checkWord(correctWord) {

  if (correctWord.toUpperCase() == word.toUpperCase()) {

    console.log('Correct word guessed.');
    let userScoreContainer = document.querySelector('#userScoreContainer span');
    console.log('You win!');
    userScore++;
    userScoreContainer.textContent = userScore;
    checkIfGameWon();

  }
}


checkLetter();

// This function creates the blanks _ in the word container and checks if it matches the random word. It also makes the letter appear.

function checkLetter() {

  wordContainer = document.getElementById('wordContainer');
  correctWord = document.createElement('div');

  for (var i = 0; i < word.length; i++) {
    correctWord.setAttribute('id', 'correctLetterContainer');

    letter = document.createElement('div'); // doubled?
    letter.setAttribute('id', 'guess');

    let space;

    if (word[i] === "-") {
      letter.innerHTML = "-";
      space = 1;
    } else {
      letter.innerHTML = "_";
    }
    guesses.push(letter);
    wordContainer.appendChild(correctWord);
    correctWord.appendChild(letter);
  }
  

}



// // // This function checks if the guessed letters are in the index of the random word called word. If so, it adds 1 to the userScore and the user wins this round.
// //Note: guesses is an array, while word is a string
// function checkLetter() {

// // HOW DO I GET THE TEXTS INSIDE the div with id? and then concatenate it? afterwards compare if it's the same word??

// }




var mistakes = 0;
// This function adds 1 to mistakes if letter was not guessed correctly
function updateMistakes() {
  let mistakesContainer = document.querySelector('#mistakesContainer span');
  mistakes++;
  mistakesContainer.textContent = mistakes;
  checkIfGameLost();
}

let userScore = 0;
// This function checks if the game has been won and resets game
function checkIfGameWon() {
  if (userScore == 1) {
    resetGame();
    alert('You won!');
  }
  if (mistakes == 7) {
    alert('You lose.');
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
//This function resets the game
function resetGame() {
  userScore = 0;
  mistakes = 0;
}
