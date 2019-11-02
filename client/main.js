document.body.onload = function () {
	document.querySelector('#placeholder').style.display = "none";
	document.querySelector('#findGame').style.display = "initial";
	document.querySelector('#find').onclick = establish;
};

var playerData = {
	name: '',
	id: '',
	room: 0,
	cards: []
};

var statusInterval;

//<++>

var establish = function () {
	let room = document.querySelector('#roomCode').value;
	let name = document.querySelector('#playerName').value;
	console.log(`Establishing connection with room ${room} by player ${name}...`);
	playerData.name = name;

	const server = new XMLHttpRequest();
	server.open("GET", `http://localhost:8080?action=establish&room=${room}&name=${name}`);

	server.onreadystatechange = (e) => {
		if(server.readyState === 4 && server.status === 200) {
			let response = JSON.parse(server.responseText);
			console.log(server.responseText);
			console.log(response.player);
			playerData.id = response.player;
			playerData.room = response.room;

			statusInterval = setInterval(checkStatus, 3000);

			document.querySelector('#findGame').style.display = "none";
			document.querySelector('#gamePlay').style.display = "initial";
			document.querySelector('#play').onclick = play;
		}
	}
	server.send();
}

//<++>

var checkStatus = function () {
	const server = new XMLHttpRequest();
	server.open("GET", `http://localhost:8080?action=status&room=${playerData.room}&id=${playerData.id}`);

	server.onreadystatechange = (e) => {
		if(server.readyState === 4 && server.status === 200) {
			let response = JSON.parse(server.responseText);
			console.log(server.responseText);
			console.log(response);

			document.querySelector('#status').innerHTML = server.responseText;
		}
	}
	server.send();
}

// <++>

var play = function () {
	let cards = document.querySelector('#cards').value;

	const server = new XMLHttpRequest();
	server.open("GET", `http://localhost:8080?action=play&room=${playerData.room}&id=${playerData.id}&cards=${cards}`);

	server.onreadystatechange = (e) => {
		if(server.readyState === 4 && server.status === 200) {
			console.log(server.responseText);
		}
	}
	server.send();
}

// <++>
