const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'sucess',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  // 1) Get the token and check if it exists
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }
  if (!token)
    return next(
      new AppError('You are not loggen in! Please log in to get access', 401)
    );

  // 2) Verification of the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );

  // 4) Check if user changed password after the JTWT (token) was issued
  if (freshUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );

  // Grant access to Protected Route
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 203)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nThis token is only valid for 10 minutes.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password Reset Token',
      message
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later'),
      500
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email!'
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the Token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) Set the new Password if token has not expired and if there is a user
  if (!user) {
    return next(new AppError('Token is invalid or has expired'), 400);
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the current user

  // 4) Log the user in, send JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  });
});
