const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('../views/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // basic pre kumbaga times 24 kase 24 hours a 1day tas, both 60 sa min tsaka seconds then 1000 para sa milliseccond
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-pro'] === 'https',
  });

  // Remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const url = `${req.protocol}://${req.get('host')}/me`;

  //   await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  // 2) Check if the user exist && password is correct
  const user = await User.findOne({ email }).select('+password');
  console.log(user);
  if (user.role === 'user') {
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  } else {
    if (password !== user.password) {
      return next(new AppError('Incorrect email or password', 401));
    }
  }

  // 3) If everything is okay, send token to client
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

// Only for rendereed pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      ); // JWT Secret nagpapalakas ng security // promisify confusing potaena

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued  // Kopyahin mo nalang tong piece of code na to HAHAHAHA
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // There is a loggin user
      res.locals.user = currentUser;

      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please login to get access.', 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // JWT Secret nagpapalakas ng security // promisify confusing potaena

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The token belonging to this user does no longer exist')
    );
  }

  // 4) Check if user changed password after the token was issued  // Kopyahin mo nalang tong piece of code na to HAHAHAHA
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again', 401)
    );
  }

  // Grant Access to protected route
  console.log(req.body);
  res.locals.user = currentUser;
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }
  // 2) Generate the random token
  const resetToken = user.createPasswordResetToken(); // magkakaroon ng dalawang baong fields, reset expires and reset token
  await user.save({ validateBeforeSave: false }); // para madagdag yung dinagdag na fields

  // 3) Sent it to user's mail

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/resetPassword/${resetToken}`;

    await new Email(user.email, resetURL, resetToken).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on the token
  console.log('this is', req.params.token);
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) if token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changePasswordAt property for the user
  // 4) log in the user in, send jwt
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  console.log(req.body);
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // 4) Log user in

  createSendToken(user, 201, req, res);
});
