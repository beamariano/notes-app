// Sample wordlist
let wordlist = ["Accepting", "Afraid", "Aggravated", "Agitated", "Alive", "Amazed", "Angry", "Annoyed", "", "Anxious", "Apprehensive", "Awe", "Bitter", "Bliss", "Calm", "Centered", "Contempt", "Content", "Cranky", "Cynical", "Delighted", "Depleted", "Disdain", "Disgruntled", "Disturbed", "Eager", "Ecstatic", "Edgy", "Enchanted", "Energized", "Engaged", "Exhausted", "Frazzled", "Frightened", "Fulfilled", "Hesitant", "Joy", "Nervous", "Open", "Panic", "Paralyzed", "Patient", "Peaceful", "Present", "Relaxed", "Scared", "Serene", "Terrified", "Trusting", "Worried"]; //40+ words

// This function picks a random word for guessing
let word = wordlist[(Math.floor(Math.random() * wordlist.length))].toUpperCase();
console.log('The random word is ' + word); // shows random word

/// DECLARATIONS

//This creates the letter containers
let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let clickedLetter = ""; // to make it string; one character
let guesses = []; // where all the clicked letters are stored
let space; // Number of spaces in word '-'



//This part displays the alphabet buttons
//This is a loop that creates the button container and letter inside and checks if the selected letter is part of random word to be guessed

for (let i = 0; i < alphabet.length; i++) {
  let button = document.createElement('div');
  button.classList.add('button');
  button.textContent = alphabet[i].toUpperCase();
  let alphabetDisplay = document.getElementById('alphabetDisplay');
  alphabetDisplay.appendChild(button);

  // when the letter is clicked it is appended onto the random word's container
  button.addEventListener('click', function() {
    console.log('key pushed: ' + alphabet[i]);
    
    let clickedLetter = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
    for (let i = 0; i < word.length; i++) {
      if (clickedLetter === word[i]) {
        guesses[i].innerHTML = clickedLetter; // array of correct letters
      }
    }

    let j = (word.indexOf(clickedLetter)); // if arrays is in word
    if (j === -1) {
      console.log('wrong letter');
      updateMistakes();
    } 
    else {
      console.log('correct letter');
    }
  });
}

checkLetter(); // result();

// This function creates the blanks _ in the word container and checks if it matches the random word
function checkLetter() {
  wordContainer = document.getElementById('wordContainer');
  correctWord = document.createElement('div');

  for (var i = 0; i < word.length; i++) {
    correctWord.setAttribute('id', 'letterContainer');

    clickedLetter = document.createElement('div'); // doubled?
    clickedLetter.setAttribute('class', 'guess');

    if (word[i] === "-") {
        clickedLetter.innerHTML = "-";
      space = 1;
    } 
    else {
        clickedLetter.innerHTML = "_";
    }
    guesses.push(clickedLetter);
    wordContainer.appendChild(correctWord);
    correctWord.appendChild(clickedLetter);
 

    // guessedWord();
    // checkIfGuessedCorrectly();
  }
}


//have to convert array into string

  // function guessedWord() { // 
  //   // wordStatus = word.map(letter => guessed.indexOf(letter) >= 0 ? dletter : " _ "()).join('');

  //   if (guessed.lenght == word.lenght) {
  //     for (const ltr of guessed) {
  //       if (!word.includes(ltr)) {
  //         break;
  //       }
  //       console.log(ltr);
  //     }
  //     checkIfGuessedCorrectly();
  //   }

  // }


// This function checks if the guessed word is the same as the random word. If so, it adds 1 to the userScore if the random word was guessed correctly
function checkIfGuessedCorrectly() {
    (guesses === word); // is it array?
    let userScoreContainer = document.querySelector('#userScoreContainer span');
    alert("Congratulations. You guessed the word!");
    userScore++;
    userScoreContainer.textContent = userScore;
    checkIfGameWon();
  }

  
function checkIfGameWon() {
    if (wordStatus === answer) {
      document.getElementById('keyboard').innerHTML = 'You Won!!!';
    }
  }



let userScore = 0;
var mistakes = 0;
// This function adds 1 to mistakes if letter was not guessed correctly
function updateMistakes() {
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
  }
}
// This function checks if the game has been lost and resets game
function checkIfGameLost() {
  if (mistakes == 7) {
    alert('You have lost. The correct word is ' + word + '. Try again?');
    resetGame();
  }
}
//This function resets the game
function resetGame() {
  userScore = 0;
  mistakes = 0;
}

// TO-DO
// - create reset button
// - create score buttons and timer?
// -make buttons depressed when clicked on
// -over-all lewk
// -hangman