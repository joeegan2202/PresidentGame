const fs = require('fs'),
	http = require('http');

http.createServer(function (req, res) {
	let url = (req.url.charAt(req.url.length - 1) == '/') ? req.url + 'index.html' : req.url;

	fs.readFile(__dirname + url, function (err, data) {
		if (err) {
			res.writeHead(404);
			res.end(JSON.stringify(err));
			return;
		}
		res.writeHead(200);
		res.end(data);
	});
}).listen(80);
