const countriesArr = ['Mali', 'Burkina Faso', 'Niger', 'Czad', 'Kamerun', 'Nigeria', 'Benin', 'Togo', 'Ghana', 'Wybrzeże Kości Słoniowej', 
'Liberia', 'Gwinea', 'Sierra Leone', 'Gwinea Bissau', 'Senegal', 'Gambia', 'Mauretania', 'Algieria', 'Maroko', 'Tunezja', 'Libia', 'Egipt', 
'Sudan', 'Republika Środkowoafrykańska', 'Kongo', 'Sudan Południowy', 'Etiopia', 'Uganda', 'Demokratyczna Republika Konga', 'Kenia', 'Rwanda', 
'Burundi', 'Zambia', 'Malawi', 'Namibia', 'Botswana', 'Zimbabwe', 'Mozambik', 'Somalia', 'Erytrea', 'Dżibuti', 'Tanzania', 'Suazi', 
'Republika Południowej Afryki', 'Lesotho', 'Madagaskar', 'Komory', 'Angola', 'Gabon', 'Gwinea Równikowa', 'Wyspy Świętego Tomasza i Książęca', 
'Republika Zielonego Przylądka', 'Mauritius', 'Seszele'];
const countries = document.querySelectorAll('.country');
const countryName = document.querySelector('.country-name');
const score = document.querySelector('.score');
const playAgainBtn = document.querySelector('.play-again');
const btn = document.querySelector('.confirm-btn');
const roundInput = document.querySelector('.round-input');
const rounds = document.querySelector('.rounds');
const error = document.querySelector('.error');
const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');
const maxValueBtn = document.querySelector('.max-btn');
const result = document.querySelector('.result');
const checkedCountry = document.querySelector('.checked-country');
let points = 0;
let counter = 0;

let random

function newRandom() {
	random = Math.floor(Math.random()*countriesArr.length);
	countryName.textContent = countriesArr[random];
}

newRandom()

function prepareGame() {
	if(roundInput.value == '' || roundInput.value <= 0 || roundInput.value % 1 != 0 || roundInput.value > countriesArr.length) {
		error.textContent = `Podaj liczbę od 1 do ${countriesArr.length}`;
	} else {
		container1.classList.add('inactive');
		container2.classList.add('active');
		rounds.textContent = `${roundInput.value} rund`;
	}
}

function playAgain() {
	playAgainBtn.classList.add('active');
	playAgainBtn.addEventListener('click', function(){location.reload();})
	container2.textContent = `Koniec gry! Twój wynik: ${points} / ${counter}`
}

function maxValue() {
	roundInput.value = countriesArr.length;
}

btn.addEventListener('click', prepareGame)
btn.addEventListener('click', addEvents)
maxValueBtn.addEventListener('click', maxValue)

function addEvents() {
	countries.forEach(country => country.addEventListener('click', function() {
		counter++
		if(country.getAttribute('name') == countriesArr[random]) {
			points++
			score.textContent = `${points} / ${counter}`;
			result.classList.add('correct');
			result.textContent = 'Dobrze!';
			checkedCountry.innerHTML = '';
			setTimeout(function(){result.classList.remove('correct');}, 500)  
			countriesArr.splice(random, 1);
			newRandom()
		} else {
			score.textContent = `${points} / ${counter}`;
			result.classList.add('incorrect')
			result.textContent = 'Źle!';
			checkedCountry.innerHTML = `Zaznaczyłeś: <span class="wrong-country">${country.getAttribute('name')}</span>`;
			setTimeout(function(){result.classList.remove('incorrect');}, 500)
		}
		if(counter == roundInput.value) {
			playAgain()
		}
	}))
}
