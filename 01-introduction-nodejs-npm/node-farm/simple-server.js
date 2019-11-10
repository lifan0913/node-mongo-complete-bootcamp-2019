const http = require('http');
const url = require('url');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

// Templates
const templateOverview = fs.readFileSync(
	`${__dirname}/templates/overview.html`,
	'utf-8'
);
const templateCard = fs.readFileSync(
	`${__dirname}/templates/card.html`,
	'utf-8'
);
const templateProduct = fs.readFileSync(
	`${__dirname}/templates/product.html`,
	'utf-8'
);

const replateTemplate = (temp, product) => {
	let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
	output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
	output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
	output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
	output = output.replace(/{%PRODUCT_ID%}/g, product.id);
	output = output.replace(/{%PRODUCT_ORIGIN%}/g, product.from);
	output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);

	if (!product.organic) {
		output = output.replace(/{%PRODUCT_NOT_ORGANIC%}/g, 'not-organic');
	}

	return output;
};

const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	if (pathname === '/overview' || pathname === '/') {
		//Overview Page
		res.writeHead(200, { 'Content-type': 'text/html' });
		const cardsHtml = dataObject
			.map(card => replateTemplate(templateCard, card))
			.join('');

		const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
		res.end(output);
	} else if (pathname === '/product') {
		// Product Page
		res.writeHead(200, { 'Content-type': 'text/html' });
		const product = dataObject[query.id];
		const output = replateTemplate(templateProduct, product);
		res.end(output);
	} else if (pathname === '/api') {
		// API
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
