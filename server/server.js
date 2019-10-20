var http = require('http');
var url = require('url');
var sha = require('sha1');
//TODO: Check if necessary

http.createServer( function (req, res) {
	//TODO: parse request to if statement
	//
	var qdat = url.parse(req.url, true).query;
	console.log(`Room: ${qdat.room}, Player ID: ${qdat.id}, Action: ${qdat.action}, Name: ${qdat.name}, Cards: ${qdat.cards}`);
	// ============================================Establish========================================================================//
	if (qdat.action === 'establish') {
		// parse name and hash to id
		// parse game room and determine if it's available.
		// post id and add id to game list

		console.log(`Establishing name: ${qdat.name}, Room: ${qdat.room}`);
		let id = sha(qdat.name);

		var room = game.find(qdat.room);
		if (room !== 'invalid') {
			console.log(`Connection established: Room: ${room.id}, Player ID: ${id}, Player Name: ${qdat.name}`);
			room.players.push({name: qdat.name, id: id, cards: []});
		} else {
			console.log(`Room not found`);
			var code = parseInt(Math.random() * 10000);

			game.rooms.push({
				id: code,
				players: [{name: qdat.name, id: id, cards: []}],
				state: {
					inPlay: false,
					dealing: false,
					turn: {id: 0, name: ""},
					mod: 1, // For game: Singles, doubles, or triples
					pile: [],
					stock: [],
				},
				requests: [],
			});
			res.write('room established:room ' + code);
		}

		res.write('connection established:id ' + id);
		res.write('room established:room ' + qdat.room);
	// ============================================Status============================================================================//
	} else if (qdat.action === 'status') {
		// parse id and query game status for whose turn it is
		res.write(JSON.stringify(game.find(qdat.room).state));
	// ============================================Play==============================================================================//
	} else if (qdat.action === 'play') {
		// request play action from room given

		var room = game.find(qdat.room);

		if (room != 'invalid') {
			room.requests.push({player: qdat.id, cards: JSON.parse(qdat.cards)});
			res.write('requested');
		} else {
			res.write('invalid');
		}

	} else {
		res.write('Testing');
	}
	res.end();
}).listen(8080);

// ============================================Game Definition=======================================================================//
var game = {
	rooms: [],
	find: function (code) {
		var result = 'invalid';
		for(room of this.rooms) {
			if (room.code = code) {
				result = room;
			}
		}
		return result;
	},
}

// ============================================Play Loop============================================================================//
var playLoop = function () {
	//TODO: Implement updating of all games.

	for (room of game.rooms) {
		console.log(`Room id: ${room.id}, Players: ${JSON.stringify(room.players)}, Requests: ${JSON.stringify(room.requests)}`);

		for (request of room.requests) {
			if (request.player === room.state.turn.id) { // Allow play
				room.pile.push(request.cards);
			}
		}
	}
}

const playValid = function (request, ) {
	

var gameInterval = setInterval(playLoop, 1000);

// ============================================Prototypes============================================================================//
// Room:
// {
//		id: 0,
//		players: [],
//		state: {
//			inPlay: false,
//			dealing: false,
//			turn: {id: 0, name: ""},
//			mod: 1, // For game: Singles, doubles, or triples
//			pile: ['1d', '3h'],
//			stock: ['5c', '8h'],
//		},
//		requests: [{player: playerId, cards: ['1c', '3h']],
//	}
