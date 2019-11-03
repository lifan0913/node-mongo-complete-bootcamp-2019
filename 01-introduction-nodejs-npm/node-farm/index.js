const fs = require('fs');

/**
 * Blocking, synchronous way
 */
// Read File
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// Write File
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');

/**
 * Non-blocking, asynchronous way
 */
// Read File
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
	console.log(data);
});
console.log('Will read file!!');

// Welcome to callback hell
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
		console.log(data2);
		fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
			console.log(data3);
			fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
				console.log('Just saved the file!');
			});
		});
		console.log(data2);
	});
});
