const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Our own Middlewares
app.use((req, res, next) => {
  console.log('Hello from the Middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Route Handlers
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'sucess',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours }
  });
};

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined'
  });
};

// Routers
// Create a new Router
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllTours)
  .post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Use the Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
