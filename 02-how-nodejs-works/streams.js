const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  // Solution 1 - Normal Read - Read whole file and send it after
  /* fs.readFile('./files/test-file.txt', (err, data) => {
    if (err) console.log(err);
    res.end(data);
  }); */

  // Solution 2 - Streams
  /* const readable = fs.createReadStream('./files/test-file.txt');
  // Read the file and send (stream) a chunk at a time
  readable.on('data', chunk => {
    res.write(chunk);
  });
  // Signal that no more data will be writen in the res
  readable.on('end', () => {
    res.end();
  });
  // If error, set status code to 500 and send a static response
  readable.on('error', err => {
    console.log('err');
    res.statusCode = 500;
    res.end('File not found!');
  }); */

  // Solution 3 - using pipe() to solve the back pressure problem
  // readableSource.pipe(writeableDest)
  const readable = fs.createReadStream('./files/test-file.txt');
  readable.pipe(res);
});

server.listen(8000, 'localhost', () => {
  console.log('Listening....');
});
