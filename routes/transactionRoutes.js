const express = require('express');
const transactionController = require('./../controllers/transactionController');
const authController = require('./../controllers/authController');

// const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router
  .route('/')
  .get(transactionController.getAllTransaction)
  .post(
    transactionController.createTransaction
    // authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
  )
  .patch(
    // authController.protect,
    // authController.restrictTo('admin', 'lead-guide'),
    transactionController.updateTransaction
  );

router.route('/:id').get(transactionController.getTransaction).delete(
  // authController.protect,
  // authController.restrictTo('admin', 'lead-guide'),
  transactionController.deleteTransaction
);

module.exports = router;
