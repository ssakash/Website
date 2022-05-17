let curRow = 0;
let nexrowblock = 0;
let score = 0;
let recievedinput = 0;
let gameEnd = 0;
let keyPress;
let restart;
let restart2;
let enterClick;
let deleteClick;
let objArray = []
let wordlist = ['BASIC','COVER','TEMPO','CARVE'];
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

let container = document.createElement('div');
container.id = 'container';
document.body.append(container);

init();

function gameexit(){
	gameEnd = 1;
	document.removeEventListener('keyup', deleteClick, false);
	document.removeEventListener('keyup', enterClick, false);
	document.removeEventListener('keyup', keyPress, false);
	document.removeEventListener('keyup', restart, false);
	document.addEventListener('keyup', restart = function(event) {
		if (event.key === 'Enter') {
			document.removeEventListener('keyup', restart, false);
			init();
		}
	});
}

function init(){
	container.innerHTML = '';
	gameEnd = 0;
	curRow = 0;
	nexrowblock = 0;
	score = 0;
	recievedinput = 0;
	let rand = Math.floor(Math.random() * wordlist.length);
	chosenWord = wordlist[rand];

	let logo = document.createElement('div');
	logo.className = 'logo';

	let domName = 'WORDLES';
	for(i = 0; i < domName.length; i++){
		let spanClass = "logo_out";
		let logoSpan = document.createElement('span');
		logoSpan.className = spanClass;
		logoSpan.innerText = domName[i];
		logo.append(logoSpan);
	}

	container.append(logo);

	let gameboaRD = document.createElement('div');
	gameboaRD.className = 'nav_bar';
		let Giveup = document.createElement('button');
		Giveup.id = 'giveUpBtn';
		Giveup.innerText = 'Give up';
		Giveup.addEventListener("click", function quitClick(event) {
			if(gameEnd == 0){
				notification.innerText = 'The word was ' + chosenWord + '. Press Enter to play again';
				gameexit();
			}
		});
	gameboaRD.append(Giveup);
	container.append(gameboaRD);

	let gameArea = document.createElement('div');
	gameArea.className = 'game_area';
	for(i = 0; i < 6; i++){
		let row = document.createElement('div');
		row.className = 'row';
		for(j = 0; j < 5; j++){
			let rowBlock = document.createElement('div');
			rowBlock.className = 'row_block';
			row.append(rowBlock);
		}
		gameArea.append(row);
	}
	container.append(gameArea);

	let notification = document.createElement('div');
	notification.id = 'notification';
	notification.innerText = 'Start guessing!'
	container.append(notification);

	let key1 = 'QWERTYUIOP';
	let key2 = 'ASDFGHJKL';
	let key3 = 'ZXCVBNM';

	let keyboard = document.createElement('div');
	keyboard.id = 'keyboard';

		let topKeys = document.createElement('div');
		topKeys.id = 'topKeys';
		appendkeys(topKeys, key1, 'keyboardKey_s');
		keyboard.append(topKeys);

		let midKeys = document.createElement('div');
		midKeys.id = 'midKeys';
		appendkeys(midKeys, key2, 'keyboardKey_m');
		keyboard.append(midKeys);

		let botKeys = document.createElement('div');
		botKeys.id = 'botKeys';
		let deleteKey = document.createElement('span');
		deleteKey.className = 'keyboardKey_l';
		deleteKey.innerHTML = '&#x2190;';
		deleteKey.addEventListener("click", function deleteClick(event) {
			if(gameEnd == 0){
				let wordRow = document.getElementsByClassName('row')[curRow];
				let rowBlockEl = wordRow.childNodes;
				deleteLetter(rowBlockEl);
			}
		});
		botKeys.append(deleteKey);
		appendkeys(botKeys, key3, 'keyboardKey_s');
		let enterKey = document.createElement('span');
		enterKey.className = 'keyboardKey_l';
		enterKey.innerText = 'Enter';
		enterKey.addEventListener("click", enterClick = function(event) {
			if(gameEnd == 0){
				let wordRow = document.getElementsByClassName('row')[curRow];
				let rowBlockEl = wordRow.childNodes;
				submitWord(wordRow);
			}
		});
		botKeys.append(enterKey);
		keyboard.append(botKeys);

	container.append(keyboard);

	let alphabet = 'abcdefghijklmnopqrstuvwxyz';
	document.addEventListener('keyup', keyPress = function(event) {
		if(gameEnd == 0){
			let wordRow = document.getElementsByClassName('row')[curRow];
			let rowBlockEl = wordRow.childNodes;
			for(i = 0; i < alphabet.length; i++){
				if ((event.key === alphabet[i] || event.key === alphabet[i].toUpperCase())) {
					appendletter(rowBlockEl, alphabet[i]);
				}
			}
			if (event.key === 'Enter') {
				submitWord(wordRow, keyPress);
			}
			if (event.key === 'Backspace') {
				deleteLetter(rowBlockEl);
			}
		}
	});
}

function deleteLetter(rowBlockEl){
	if(nexrowblock > 0){
		nexrowblock--;
		rowBlockEl[nexrowblock].innerText = '';
	}
}

function length(str, find) {
    return (str.split(find)).length - 1;
}

function submitWord(row_w, keyPress){
	if(nexrowblock > 0 && nexrowblock % 5 == 0){
		let word = row_w.innerText.replace(/[\n\r]/g, '');
		if(wordlist.includes(word)){
			let answer = [];
			for(i = 0; i < word.length; i++){
				let letter = word[i].toUpperCase();
				answer.push(letter);
				let blockClass = 'blockGrey';
				if(chosenWord.toUpperCase().includes(letter)){
					if(chosenWord[i].toUpperCase() === letter){
						score++;
						blockClass = ' blockGreen';
						if(length(word, letter) > length(chosenWord, letter)){
							for(j = 0; j < row_w.childNodes.length; j++){
								if(row_w.childNodes[j].innerText == letter && row_w.childNodes[j].className == 'row_block  blockGold'){
									row_w.childNodes[j].className = 'row_block  blockGrey';
									let index = answer.indexOf(letter);
									if (index !== -1) {
										answer.splice(index, 1);
									}
								}
							}
						}
					}else{
						if(countOccurrences(answer, letter) <= length(chosenWord, letter)){
							blockClass = ' blockGold';
						}
						else{
							blockClass = ' blockGrey';
						}
					}
				}
				row_w.childNodes[i].className = 'row_block ' + blockClass;
				let keyboard = document.getElementById('keyboard_' + letter);
				if(chosenWord.toUpperCase().includes(letter)){
					keyboard.className += ' blockGreen';
				}
				else{
					keyboard.className += ' blockGrey';
				}
			}

			if(score === 5){
				notification.innerText = 'Well done, you won! Enter to play again';
				gameexit();
			}
			else if(curRow == 5){
				notification.innerText = 'You lost. The word was ' + chosenWord + '. Press Enter to play again';
				gameexit();
			}
			else{
				score = 0;
				nexrowblock = 0;
				curRow++;
			}
		}else{
			recievedinput = 0;
			notification.innerText = 'Word is not in list';
		}
	}else{
		recievedinput = 0;
		notification.innerText = '5 Letters need to be provided';
	}
}

function appendkeys(el, layout, keyClass){
	for(i = 0; i < layout.length; i++){
		let j = i;
		let key = document.createElement('span');
		key.className = keyClass;
		key.id = 'keyboard_' + layout[i];
		key.innerText = layout[i];
		key.addEventListener("click", function keyboardPress(event) {
			if(gameEnd == 0){
				let wordRow = document.getElementsByClassName('row')[curRow];
				let rbnum = wordRow.childNodes;
				appendletter(rbnum, layout[j]);
			}
		});
		el.append(key);
	}
}

function appendletter(rowBlockEl, letter){
	if(recievedinput == 0){
		recievedinput = 1;
		notification.innerText = '';
	}
	if(nexrowblock < 5){
		rowBlockEl[nexrowblock].innerText = letter.toUpperCase();
		nexrowblock++;
	}
}