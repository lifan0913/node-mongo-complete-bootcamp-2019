const fs = require('fs');

// Read File
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// Write File
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
