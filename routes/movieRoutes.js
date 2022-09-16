const express = require('express');
const movieController = require('./../controllers/movieController');
const authController = require('./../controllers/authController');
// const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/2323131/reviews
// GET /tour/2323131/reviews
// GET /tour/2323131/reviews/3232323

// tangina nakakabobo yung logic

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );

// routes sa routes HAHAHA  / Mounting daw tawag
// router.use('/:tourId/reviews', reviewRouter);

// router
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTours, tourController.getAllTours); // THE POWER OF MIDDLEWARE HAHAHA

// router.route('/tour-stats').get(tourController.getTourStats);
// router
//   .route('/monthly-plan/:year')
//   .get(
//     authController.protect,
//     authController.restrictTo('user', 'admin', 'lead-guide'),
//     tourController.getMonthlyPlan
//   );

// router
//   .route('/tours-within/:distance/center/:latlng/unit/:unit')
//   .get(tourController.getToursWithin);
// // /tours-within?distance=233&center=-40,45,unit=mi
// // /tours-within/233/center/-40,45/unit/mi  == Mas better yung gantong approach sa url

// router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(movieController.getAllMovie)
  .post(
    movieController.uploadMoviePhoto,
    movieController.resizeMoviePhoto,
    movieController.createMovie
    // authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
  )
  .patch(
    // authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
    movieController.uploadMoviePhoto,
    movieController.resizeMoviePhoto,
    movieController.updateMovie
  );

router
  .route('/:id')
  .get(movieController.getMovie)
  .patch(movieController.updateSeats)
  .delete(
    // authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
    movieController.deleteMovie
  );

module.exports = router;
