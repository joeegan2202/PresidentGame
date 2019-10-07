var http = require("http");
var JSON = require("JSON");
//TODO: Check if necessary

http.createServer( function (req, res) {
	//TODO: parse request to if statement
	//
	if ("establish") {
		// parse name and hash to id
		// parse game room and determine if it's available.
		// post id and add id to game list
		let id = 0;
		res.write("connection established:id " + id);
	} else if ("status") {
		// parse id and query game status for whose turn it is
		let id; //TODO: Parse
		let room; //TODO: Parse
		res.write(game.room(room).status);
	} else if ("play") {
		// parse id and verify turn
		// parse room number and attempt play
		// return play result
	}
}

var game = {
	var rooms = {},
	find -> (code) {
		var result = "invalid";
		for(room in rooms) {
			if (room.code = code) {
				result = room;
			}
		}
		return result;
	},
	add -> (name) {
		//TODO: hash name and truncate to code
		let code;

		var result = code;

		for (room in rooms) {
			if (room.code === code) {
				result = "occupied";
			}
		}

		let created = new room(code, name);
		if (created === "invalid") {
			result = "invalid";
		}
		return result;
	},
	remove -> (code) {
		for (room in rooms) {
			if (room.code === code) {
				rooms.remove
