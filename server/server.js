var http = require('http');
//TODO: Check if necessary

http.createServer( function (req, res) {
	//TODO: parse request to if statement
	//
	res.write('Testing');
	res.end();
	if ('establish') {
		// parse name and hash to id
		// parse game room and determine if it's available.
		// post id and add id to game list
		let id = 0;
		res.write('connection established:id ' + id);
	} else if ('status') {
		// parse id and query game status for whose turn it is
		let id; //TODO: Parse
		let room; //TODO: Parse
		res.write(game.room(room).status);
	} else if ('play') {
		// parse id and verify turn
		// parse room number and attempt play
		// return play result
	}
}).listen(8080);

var game = {
	rooms: [],
	find: function (code) {
		var result = 'invalid';
		for(room in rooms) {
			if (room.code = code) {
				result = room;
			}
		}
		return result;
	},
	add: function (name) {
		//TODO: hash name and truncate to code
		let code;

		var result = code;

		for (room in rooms) {
			if (room.code === code) {
				result = 'occupied';
			}
		}

		let created = new room(code, name);
		if (created === 'invalid') {
			result = 'invalid';
		}
		return result;
	},
	remove: function (code) {
		for (room in rooms) {
			if (room.code === code) {
				//rooms.remove(
			}
		}
	}
}

