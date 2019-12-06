const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
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

  // if (id > tours.length) {
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'sucess',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  console.log(req.body);
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
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: {
        tour: 'Invalid ID'
      }
    });
  }

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
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: {
        tour: 'Invalid ID'
      }
    });
  }

  // 204 means no content
  res.status(204).json({
    status: 'sucess',
    data: {
      tour: null
    }
  });
};
