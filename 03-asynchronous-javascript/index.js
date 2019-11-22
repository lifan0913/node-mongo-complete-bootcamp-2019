const fs = require('fs');
const superagent = require('superagent');

// Read File
fs.readFile(`${__dirname}/files/dog.txt`, (errl, data) => {
  console.log(`Breed: ${data}`);

  // Get image of the breed in the file
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) return console.log(err.message);
      console.log(res.body.message);

      // Write new file with random image
      fs.writeFile('./files/dog-img.txt', res.body.message, err => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
    });
});
