const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Transaction = require('../models/transactionModel');

exports.getAllTransaction = factory.getAll(Transaction);
exports.getTransaction = factory.getOne(Transaction); // Medyo confusing kase gumana kahit 'reviews' lang ilagay HAHAHA
exports.createTransaction = factory.createOne(Transaction);
exports.updateTransaction = factory.updateOne(Transaction);
exports.deleteTransaction = factory.deleteOne(Transaction);
