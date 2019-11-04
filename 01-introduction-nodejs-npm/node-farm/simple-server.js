const http = require('http');
const url = require('url');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;
	if (pathName === '/overview' || pathName === '/') {
		res.end('This is the OVERVIEW');
	} else if (pathName === '/product') {
		res.end('This is the PRODUCT');
	} else if (pathName === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html'
		});
		res.end('<h1>Page not Found!!</h1>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening to requests on port 8000');
});
