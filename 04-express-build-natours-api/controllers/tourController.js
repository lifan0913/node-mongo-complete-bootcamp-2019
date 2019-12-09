const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (val > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: {
        tour: 'Invalid ID'
      }
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  // hack to convert String to Int
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'sucess',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      // 201 means created
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  /**
   * We aren't implementing the method because this is a dummy API and we will not use files to save the data in a real context
   * This is only to demonstrate how to send back data when using the PATHC Method.
   */

  res.status(200).json({
    status: 'sucess',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deleteTour = (req, res) => {
  /**
   * We aren't implementing the method because this is a dummy API and we will not use files to save the data in a real context
   * This is only to demonstrate how to send back data when using the PATHC Method.
   */

  // 204 means no content
  res.status(204).json({
    status: 'sucess',
    data: {
      tour: null
    }
  });
};
