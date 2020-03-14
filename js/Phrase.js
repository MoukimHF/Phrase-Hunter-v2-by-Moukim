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

	
}