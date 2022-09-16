const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.use(viewsController.alerts);
// router.use(authController.protect);

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/ticket', viewsController.getTicket);
router.get(
  '/movie/:slug/:id',
  authController.protect,
  authController.restrictTo('user'),
  viewsController.getMovie
);
// router.get('/login', viewsController.getLogin);
// router.get('/my-admin', viewsController.getAdmin);
router.get(
  '/my-account',
  authController.protect,
  authController.restrictTo('user'),
  viewsController.getAccount
);

router.get('/resetPassword/:token', viewsController.getForgotPassword);

// router.get('/', authController.isLoggedIn, viewsController.getOverview);

// router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
// router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
// router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
// router.get('/me', authController.protect, viewsController.getAccount);

// router.get(
//   '/my-tours',
//   authController.protect,
//   // bookingController.createBookingCheckout,
//   viewsController.getMyTours
// );

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

module.exports = router;
