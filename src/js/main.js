const state = {
	view: {
		squares: document.querySelectorAll(".square"),
		enemy: document.querySelector(".enemy"),
		time: document.querySelector("#time"),
		score: document.querySelector("#score"),
		live: document.querySelector("#live"),
	},
	values: {
		timerId: null,
		gameVelocity: 1000,
		hitPosition: 0,
		result: 0,
		currentTime: 60,
	},
	actions: {
		countDownTimerId: setInterval(countDown, 1000),
	},
};

function countDown() {
	state.values.currentTime--;
	state.view.time.innerHTML = state.values.currentTime;
	// TODO: implementar GameOver
}

function randomSquare() {
	state.view.squares.forEach((square) => {
		square.classList.remove("enemy");
	});
	let random = Math.floor(Math.random() * 9);
	let randomSquare = state.view.squares[random];
	randomSquare.classList.add("enemy");
	state.values.hitPosition = randomSquare.id;
}
function playSound(audioName) {
	let audio = new Audio(`./src/sounds/${audioName}.m4a`);
	audio.volume = 0.2;
	audio.play();
}

function moveEnemy() {
	state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
	state.view.squares.forEach((square) => {
		square.addEventListener("mousedown", () => {
			if (square.id === state.values.hitPosition) {
				state.values.result++;
				state.view.score.innerHTML = state.values.result;
				state.values.hitPosition = null;
				playSound("hit");
			}
		});
	});
}

function initialize() {
	moveEnemy();
	addListenerHitBox();
}

initialize();
