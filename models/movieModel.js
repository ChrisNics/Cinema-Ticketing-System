const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'Title is required!'],
  },
  slug: String,
  category: {
    type: String,
    required: [true, 'Category is required!'],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required!'],
  },
  cast: {
    type: String,
    required: [true, 'Cast is required!'],
  },
  synopsis: {
    type: String,
    required: [true, 'Synopsis is required!'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
  },
  parental: {
    type: String,
    required: [true, 'Parental is required'],
    enum: ['G', 'PG', 'SPG'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  dateArray: {
    type: Array,
    required: false,
  },
});

movieSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// movieSchema.post(/^find/, function (next) {
//   this.populate({
//     path: 'date',
//     select: 'synopsis',
//   });
// });
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
