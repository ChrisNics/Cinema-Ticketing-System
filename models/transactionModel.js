const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    required: [true, 'Title is required!'],
  },
  datePurchase: Date,
  movie: {
    type: String,
    required: [true, 'Movie is required!'],
  },
  date: {
    type: String,
    required: [true, 'Date is required!'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required!'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
  },
  total: {
    type: Number,
    required: [true, 'Total is required!'],
  },
});

transactionSchema.pre('save', function (next) {
  this.datePurchase = new Date().toJSON().slice(0, 10);
  next();
});

// movieSchema.post(/^find/, function (next) {
//   this.populate({
//     path: 'date',
//     select: 'synopsis',
//   });
// });
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
