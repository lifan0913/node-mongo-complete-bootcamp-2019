const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'sucess'
    /* requestedAt: req.requestTime,
    results: tours.length,
    data: { tours } */
  });
};

exports.getTour = (req, res) => {
  // hack to convert String to Int
  /*  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'sucess',
    data: { tour }
  }); */
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    // 201 means created
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
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
