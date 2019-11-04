let http = require('http')
let url = require('url')
let sha = require('sha1')

http.createServer( (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Content-Type', 'application/json')

	let qdat = url.parse(req.url, true).query
	console.log(`Room: ${qdat.room}, Player ID: ${qdat.id}, Action: ${qdat.action}, Name: ${qdat.name}, Cards: ${qdat.cards}`)
	// =============<++>===========================Establish========================================================================//
	//
	if (qdat.action === 'establish') {
		// parse name and hash to id
		// parse game room and determine if it's available.
		// post id and add id to game list
		var roomExisting = false
		var response = '{'

		console.log(`Establishing name: ${qdat.name}, Room: ${qdat.room}`)
		let id = sha(qdat.name)

		let room = game.find(qdat.room)
		if (room !== 'invalid') {
			console.log(`Connection established: Room: ${room.id}, Player ID: ${id}, Player Name: ${qdat.name}`)
			room.players.push(new Player(qdat.name, id))
			roomExisting = true
		} else {
			console.log(`Room not found`)
			let code = parseInt(Math.random() * 10000)

			// TODO Fix with constructor function
			game.rooms.push(
				new Room({
				id: code,
				players: [new Player(qdat.name,id)],
			}))
			response += `"room":"${code}",`
		}

		if (roomExisting) {
			response += `"room":"${qdat.room}",`
		}
		response += `"player":"${id}"}`
		res.write(response)
	// =============<++>===========================Status============================================================================//
	} else if (qdat.action === 'status') {
		// parse id and query game status for whose turn it is
		res.write(JSON.stringify(game.find(qdat.room).state))
	// ============<++>================================Play==============================================================================//
	} else if (qdat.action === 'play') {
		// request play action from room given

		let room = game.find(qdat.room)

		if (room != 'invalid') {
			room.requests.push(new Request(qdat.id, JSON.parse(qdat.cards)))
			res.write('requested')
		} else {
			res.write('invalid')
		}

	} else {
		res.write('Testing')
	}
	res.end()
}).listen(8080)

// ================<++>========================Game Definition=======================================================================//
var game = {
	rooms: [],
	find: function (code) {
		var result = 'invalid'
		for(room of this.rooms) {
			if (room.code = code) {
				result = room
			}
		}
		return result
	},
}

// ===============<++>=========================Play Loop============================================================================//
var playLoop = function () {
	//TODO: Implement updating of all games.

	for (room of game.rooms) {
		console.log(`Room id: ${room.id}, Players: ${JSON.stringify(room.players)}, Requests: ${JSON.stringify(room.requests)}`)

		for (request of room.requests) {
			if (request.player === room.state.turn.id) { // Allow play
				room.pile.push(request.cards)
			}
		}
	}
}

const playValid = function (request, room) {
	// Check for game modifier
	if (request.length != room.state.mod ||
		request.player != room.state.turn.id ||
		((cards) => {for (card of cards) {
			if (room.state.pile.includes(card)){
				return true
			}
		} return false})(request.cards) ||
		((cards) => {for (card of cards) {
			if (room.state.pile.includes(card)){
				return true
			}
		} return false})(request.cards)
		){

		return 'invalid'
	}
}


var gameInterval = setInterval(playLoop, 1000)

// ==============<++>==========================Classes============================================================================//

let Room = function (args) {
	this.id = (args.id) ? args.id : console.log('Room created without code!!!')
	this.players = (args.players) ? args.players : []
	this.state = {
		inPlay: false,
		dealing: false,
		turn: { id: 0, name: ''},
		mod: 1,
		pile: [],
		stock: [],
	}
	this.requests = []
}

let Request = function (player, cards) {
	this.player = (player) ? player : console.log('Request made with no player id given!!!')
	this.cards = (cards) ? cards : console.log('Request made with no cards given!!!')
}

let Player = function (name, id, cards) {
	this.name = (name) ? name : console.log('Player created with no name!!!')
	this.id = (id) ? id : console.log('Player created with no ID!!!')
	this.cards = (cards) ? cards : []
}

