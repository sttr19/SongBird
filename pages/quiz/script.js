import birdsData from "../../assets/data-birds.js";
window.addEventListener('DOMContentLoaded', () => {
	// start game
	if (document.location.href.includes('quiz')) {
		const scoreNum = document.querySelector('.game__score-num');
		const currentAnimalImg = document.querySelector(
			'.game__current-animal-img'
		);
		const currentAnimalAudio = document.querySelector(
			'.game__current-animal-audio'
		);
		const currentAnimalTitle = document.querySelector(
			'.game__current-animal-title'
		);
		const gameItem = document.querySelectorAll('.game__item');
		console.log(gameItem);
		const instruction = document.querySelector('.instruction');
		const descriptionAnimal = document.querySelector('.description-animal');
		const descriptionAnimalTitle = document.querySelector(
			'.description-animal__title'
		);
		const descriptionAnimalKind = document.querySelector(
			'.description-animal__kind'
		);
		const descriptionAnimalAudio = document.querySelector(
			'.description-animal__audio'
		);
		const descriptionAnimalImg = document.querySelector(
			'.description-animal__img'
		);
		const descriptionAnimalText = document.querySelector(
			'.description-animal__text'
		);
		const gameBtn = document.querySelector('.game__btn');
		const paginationItems = document.querySelectorAll('.game__pagination-item');

		let rightNum;

		function randomNum() {
			rightNum = Math.floor(Math.random() * 6);
		}

		randomNum();
		console.log(rightNum);

		let nextLevel = false;
		let score = 0;
		let points = 5;
		let stage = 0;

		currentAnimalAudio.src = birdsData[0][rightNum].audio;

		gameItem.forEach((item, i) => {
			item.textContent = birdsData[0][i].name;

			item.addEventListener('click', () => {
				instruction.classList.remove('instruction_active');
				descriptionAnimal.classList.add('description-animal_active');
				descriptionAnimalTitle.textContent =
					birdsData[stage][+item.getAttribute('date-item')].name;
				descriptionAnimalKind.textContent =
					birdsData[stage][+item.getAttribute('date-item')].species;
				descriptionAnimalKind.textContent =
					birdsData[stage][+item.getAttribute('date-item')].species;
				descriptionAnimalAudio.src =
					birdsData[stage][+item.getAttribute('date-item')].audio;
				descriptionAnimalImg.src =
					birdsData[stage][+item.getAttribute('date-item')].image;
				descriptionAnimalText.textContent =
					birdsData[stage][+item.getAttribute('date-item')].description;

				if (!nextLevel) {
					if (rightNum === i) {
						const audio = new Audio('../../assets/sounds/right-answer.mp3');
						audio.cloneNode().play();
						item.classList.add('game__item_right');
						currentAnimalTitle.textContent = birdsData[stage][rightNum].name;
						currentAnimalImg.src = birdsData[stage][rightNum].image;
						score += points;
						scoreNum.textContent = score;
						gameBtn.classList.add('game__btn_active');
						stage = ++stage;
						nextLevel = true;

						if (stage === 6) {
							setTimeout(() => {
								localStorage.setItem('score', score);
								document.location.href = '../results/index.html';
							}, 1000);
						}
					} else {
						const audio = new Audio('../../assets/sounds/wrong-answer.mp3');
						audio.volume = 0.25;
						audio.cloneNode().play();
						item.classList.add('game__item_wrong');
					}
				}

				points = --points;
			});
		});

		gameBtn.addEventListener('click', () => {
			if (stage < 6) {
				paginationItems.forEach((item, i) => {
					item.classList.remove('game__pagination-item_active');

					if (stage === i) {
						item.classList.add('game__pagination-item_active');
					}
				});

				gameBtn.classList.remove('game__btn_active');
				nextLevel = false;
				points = 5;
				currentAnimalTitle.textContent = '******';
				currentAnimalImg.src = 'assets/img/secret-bird.jpg';
				randomNum();
				currentAnimalAudio.src = birdsData[stage][rightNum].audio;

				instruction.classList.add('instruction_active');
				descriptionAnimal.classList.remove('description-animal_active');

				gameItem.forEach((item, i) => {
					item.textContent = birdsData[stage][i].name;
					item.classList.remove('game__item_wrong');
					item.classList.remove('game__item_right');
				});
			}
		});
	}

	if (document.location.href.includes('results')) {
		const resultScore = document.querySelector('.result__score');
		resultScore.textContent = localStorage.getItem('score');
	  }
});