const fs = require('fs');
const superagent = require('superagent');

/* // Read File
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
}); */

/* // CONSUME PROMISE
// Read File
fs.readFile(`${__dirname}/files/dog.txt`, (errl, data) => {
  console.log(`Breed: ${data}`);

  // Get image of the breed in the file
  superagent
    // Returns a resolved Promise
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    // Handle fulfilled Promise
    .then(res => {
      console.log(res.body.message);

      // Write new file with random image
      fs.writeFile('./files/dog-img.txt', res.body.message, err => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
    })
    // Handle error Promise
    .catch(err => {
      console.log(err.message);
    });
}); */

// Promesify readFile and writeFile
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Couldn't find file!");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("Couldn't write a file!");
      resolve('Promise Success!');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/files/dog.txt`);
    console.log(`Breed: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await writeFilePro('./files/dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2 - Ready';
};

(async () => {
  try {
    console.log('1 - Will get dog pics');
    const x = await getDogPic();
    console.log(x);
    console.log('3 - Done');
  } catch (err) {
    console.log('Error ');
  }
})();

/* console.log('1 - Will get dog pics');
getDogPic()
  .then(x => {
    console.log(x);
    console.log('3 - Done');
  })
  .catch(err => {
    console.log('Error ');
  }); */

/* readFilePro(`${__dirname}/files/dog.txt`)
  .then(data => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    return writeFilePro('./files/dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch(err => {
    console.log(err);
  }); */
