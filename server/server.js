var http = require('http');
var url = require('url');
var sha = require('sha1');
//TODO: Check if necessary

http.createServer( function (req, res) {
	//TODO: parse request to if statement
	//
	var qdat = url.parse(req.url, true).query;
	console.log(`Room: ${qdat.room}, Player ID: ${qdat.id}, Action: ${qdat.action}, Name: ${qdat.name}`);
	if (qdat.action === 'establish') {
		// parse name and hash to id
		// parse game room and determine if it's available.
		// post id and add id to game list
		
		let id = sha(qdat.name);

		var found = false;
		for (room of game.rooms) {
			if (room.id === qdat.room) {
				console.log(`Connection established: Room: ${room.id}, Player ID: ${id}, Player Name: ${qdat.name}`);
				room.players.push({name: qdat.name, id: id, cards: []});
				found = true;
				break;
			}
		}

		if (!found) {
			var code = parseInt(Math.random() * 10000);

			game.rooms.push({
				id: code,
				players: [{name: qdat.name, id: id, cards: []}],
				state: {
					inPlay: false,
					dealing: false,
					turn: {id: 0, name: ""},
					mod: 1, // For game: Singles, doubles, or triples
				}
			});
		}

		res.write('connection established:id ' + id);
	} else if (qdat.action === 'status') {
		// parse id and query game status for whose turn it is
		let id; //TODO: Parse
		let room; //TODO: Parse
		res.write(game.room(room).status);
	} else if (qdat.action === 'play') {
		// parse id and verify turn
		// parse room number and attempt play
		// return play result
	} else {
		res.write('Testing');
	}
	res.end();
}).listen(8080);

var game = {
	rooms: [{
		id: 0,
		players: [],
		state: {
			inPlay: false,
			dealing: false,
			turn: {id: 0, name: ""},
			mod: 1, // For game: Singles, doubles, or triples
		}
	}],
	find: function (code) {
		var result = 'invalid';
		for(room of rooms) {
			if (room.code = code) {
				result = room;
			}
		}
		return result;
	},
	remove: function (code) {
		for (room of rooms) {
			if (room.code === code) {
				//rooms.remove(
			}
		}
	}
}

var playLoop = function () {
	//TODO: Implement updating of all games.
	
	for (room of game.rooms) {
		console.log(`Room id: ${room.id}`);
	}
}

var gameInterval = setInterval(playLoop, 1000);
