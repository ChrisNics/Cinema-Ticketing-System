const Movie = require('./../models/movieModel');
const User = require('./../models/userModel');
// const Booking = require('./../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

// exports.alerts = (req, res, next) => {
//   const { alert } = req.query;
//   if (alert === 'booking')
//     res.locals.alert =
//       "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediately, please comeback later";
//   next();
// };

exports.getTicket = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  //   const tours = await Tour.find();
  // 2) Build template
  // 3) Render that template using tour data from 1)

  res.status(200).render('ticket', {
    title: 'Login',
  });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  //   const tours = await Tour.find();
  // 2) Build template
  // 3) Render that template using tour data from 1)
  const movies = await Movie.find();
  const users = await User.find({ role: 'admin' });

  res.status(200).render('overview', {
    title: 'Cinema Tech',
    movies,
    users,
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const movie = await Movie.findById(req.params.id);
  // this will return string before the word programming
  let newDateArray = [];
  movie.dateArray.forEach((date) => {
    // this will return string before the word programming

    seat = date.substring(date.indexOf('_') + 1).replace(/-/g, ',');
    newDate = date.split('(')[0];
    newDateArray.push([newDate, seat]);
  });
  movie.newDateArray = newDateArray;
  res.status(200).render('movie', {
    title: 'Movie',
    movie,
  });
});

exports.getLogin = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  //   const tours = await Tour.find();
  // 2) Build template
  // 3) Render that template using tour data from 1)

  res.status(200).render('login', {
    title: 'Login',
  });
});

exports.getAdmin = catchAsync(async (req, res, next) => {
  const movies = await Movie.find();
  res.status(200).render('my-admin', {
    title: 'My Admin',
    movies,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: 'transactions',
  });

  res.status(200).render('my-account', {
    title: 'My Account',
    user,
  });
});

exports.getForgotPassword = catchAsync(async (req, res, next) => {
  // const user = await User.findById(req.user.id).populate({
  //   path: 'transactions',
  // });
  const token = req.params.token;
  res.status(200).render('forgot-password', {
    title: 'My Account',
    token,
  });
});

// exports.getTour = catchAsync(async (req, res, next) => {
//   // 1) get the data, for the requested tour (including reviews and tor guides)
//   const tour = await Tour.findOne({ slug: req.params.slug }).populate({
//     path: 'reviews',
//     fields: 'review rating user',
//   });

//   if (!tour) {
//     return next(new AppError('There is no tour with that name', 404));
//   }

//   // 2) Build template

//   // 3) Render tmeplate using data from 1)

//   res.status(200).render('tour', {
//     title: `${tour.name} Tour`,
//     tour,
//   });
// });

// exports.getSignupForm = catchAsync(async (req, res) => {
//   res.status(200).render('signup', {
//     title: 'Sign up',
//   });
// });

// exports.getLoginForm = catchAsync(async (req, res) => {
//   res.status(200).render('login', {
//     title: 'Log into your Account',
//   });
// });

// exports.getAccount = (req, res) => {
//   res.status(200).render('account', {
//     title: 'Your account',
//   });
// };

// exports.getMyTours = catchAsync(async (req, res, next) => {
//   // 1) Find all bookings
//   const bookings = await Booking.find({ user: req.user.id });

//   // 2) Find tours with the returned IDs
//   const tourIDs = bookings.map((el) => el.tour);
//   const tours = await Tour.find({ _id: { $in: tourIDs } });

//   res.status(200).render('overview', {
//     title: 'My Tours',
//     tours,
//   });
// });

// exports.updateUserData = catchAsync(async (req, res) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).render('account', {
//     title: 'Your account',
//     user: updatedUser,
//   });
// });
