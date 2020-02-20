const express = require('express');

const {
  getAllUsers,
  createUser,
  updateMe,
  deleteMe,
  getUser,
  updateUser,
  deleteUser,
  getMe
} = require('./../controllers/userController');

const {
  protect,
  restrictTo,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Because middleware runs in sequence we can add the protect method to the router and all the routers after will be protected
router.use(protect);
router.get('/me', getMe, getUser);
router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
