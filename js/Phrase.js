/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App By Moukim Hfaidh
 * Phrase.js */
class Phrase {
	constructor(phrase) {
		this.phrase = phrase.toLowerCase();
	};
	checkLetter(letter) {
		return this.phrase.includes(letter);
	};
	/**
	 * Display phrase on game board
	 */
	addPhraseToDisplay() {
		const phraseDiv = document.querySelector("#phrase ul");
		for (let i = 0; i < this.phrase.length; i++) {
			if (this.phrase[i] == " ") {
				let li = document.createElement('li');
				li.className = `space`;
				li.textContent = this.phrase[i];
				phraseDiv.append(li);
			} else {
				let li = document.createElement('li');
				li.className = `hide letter ${this.phrase[i]}`;
				li.textContent = this.phrase[i];
				phraseDiv.append(li);
			}
		}
	}
	
	showMatchedLetter(letter) {
		$(`.${letter}`).addClass("show").removeClass("hide");
	}

		// handles the interactions from the visual user keyboard clicks 
	handleInteraction() {
		document.getElementById("qwerty").addEventListener("click", (event) => {
			if (event.target.tagName === 'BUTTON') {
				// get the clicked letter
				const letter = event.target.textContent;
				const targetLetter = event.target;
				if (this.checkLetter(letter)) {
					this.showMatchedLetter(letter);
					targetLetter.classList.add("chosen");
					targetLetter.setAttribute("disabled","");
					game.checkForWin();
					game.gameOver();
				} else {
					targetLetter.classList.add("wrong");
					
					
					game.removeLife();
					targetLetter.setAttribute("disabled","");
				}
			}
		});
	}

	// handles the interactions from the physical user keyboard clicks 
	handleInteraction1() {
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