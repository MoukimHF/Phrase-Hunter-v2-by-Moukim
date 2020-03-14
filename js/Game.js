/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App By Moukim Hfaidh
 * Game.js */
class Game {
	constructor(missed, phrases, activePhrase) {
		this.missed = 0;
		this.phrases = this.createPhrases();
		this.activePhrase = this.getRandomPhrase();
	}
	/**
	 * Creates phrases for use in game
	 * @return {array} An array of phrases that could be used in the game
	 */
	createPhrases() {
		const phrases = ["tell me the dream","moukim","teamTreeHouse","i am a legend","Super","well Done","samsung"];
		return phrases;
	}
	/** * Selects random phrase from phrases property 
	 * @return {Object} Phrase object chosen to be used 
	 */
	getRandomPhrase() {
		const min = 0;
		let max = this.phrases.length;
		let random = Math.floor(Math.random() * (max - min) + min);
		for (let i = 0; i < max; i++) {
			if (random == i) return this.phrases[i];
		}
	}
	startGame() {
		document.querySelector("#overlay").style.display = 'none';
		this.activePhrase = this.getRandomPhrase();
		let phrase = new Phrase(this.activePhrase);
		phrase.addPhraseToDisplay();
		this.handleInteraction();
		this.handleInteractionKeys();
	}
	/**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
	checkForWin() {
		let win = true;
		const letters = document.querySelectorAll("#phrase ul li");
		for (let i = 0; i < letters.length; i++) {
			if (letters[i].className.includes('hide')) {
				win = false;
			}
		}
		return win;
	};
	/**
	 * Increases the value of the missed property
	 * Removes a life from the scoreboard
	 * Checks if player has remaining lives and ends game if player is out
	 */
	removeLife() {
		let heart = document.querySelectorAll(".tries img");
		heart[0].src = "images/lostHeart.png";
		heart[0].parentNode.classList.remove("tries");
		this.missed++;
		if (this.missed == 5) {
			this.gameOver("lose");
		}
	}
	/**
	 * Displays game over message
	 * @param {boolean} gameWon - Whether or not the user won the game
	 */
	gameOver(gameWon) {
		let startbtn = document.querySelector("#overlay");
		const resetBtn = document.getElementById("btn__reset");
		let title = document.querySelector('.title');
		if (gameWon == "lose") {
			startbtn.style.display = 'block';
            startbtn.classList.toggle("lose");
            title.textContent = "You Lost :(";
            title.classList.add('vibrate-1')
            resetBtn.textContent = "Repeat :D ";
            resetBtn.addEventListener('click', () => {
				window.location.reload();
			})
		} else if (this.checkForWin()) {
			startbtn.style.display = 'block';
			startbtn.classList.toggle("win");
			resetBtn.textContent = "Repeat :D ";
			resetBtn.style.color = "black";
			resetBtn.style.fontWeight = "bold";
			title.textContent = "You Won the Game !";
			title.classList.add('kenburns-top');
			resetBtn.addEventListener('click', () => {
				window.location.reload();
			})
		}
	}



		// handles the interactions from the visual user keyboard clicks 
		handleInteraction() {
			document.getElementById("qwerty").addEventListener("click", (event) => {
				if (event.target.tagName === 'BUTTON') {
					// get the clicked letter
					let phrase = new Phrase(game.activePhrase)
					const letter = event.target.textContent;
					const targetLetter = event.target;
					if (phrase.checkLetter(letter)) {
						phrase.showMatchedLetter(letter);
						targetLetter.classList.add("chosen");
						targetLetter.setAttribute("disabled","");
						this.checkForWin();
						this.gameOver();
					} else {
						targetLetter.classList.add("wrong");
						
						
						this.removeLife();
						targetLetter.setAttribute("disabled","");
					}
				}
			});
		}
	
		// handles the interactions from the physical user keyboard clicks 
		handleInteractionKeys() {
			document.onkeydown = function(event) {
				function getElementFromLetter(letter) {
					let buttons = document.querySelectorAll(".keyrow button");
					for (let i = 0; i < buttons.length; i++) {
						if (buttons[i].textContent == letter) return buttons[i];
					}
				}
				let phrase = new Phrase(game.activePhrase)
				// get the clicked letter from the keyboard
				let LetterCode = parseInt(event.keyCode);
				if (LetterCode > 64 && LetterCode < 91) {
					let letter = keyCodes[LetterCode];
					let targetLetter = getElementFromLetter(letter);
					if (phrase.checkLetter(letter)) {
						phrase.showMatchedLetter(letter);
						targetLetter.classList.add("chosen");
						targetLetter.setAttribute("disabled","");
						game.checkForWin();
						game.gameOver();
					} else {
						if(targetLetter.disabled==false)
						{
						targetLetter.classList.add("wrong");
						game.removeLife();
						
						targetLetter.setAttribute("disabled","");
					}
						
					}
				}
			}
		}
}