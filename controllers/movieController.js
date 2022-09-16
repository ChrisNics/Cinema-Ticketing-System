const multer = require('multer');
const sharp = require('sharp');
const Movie = require('../models/movieModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! PLease upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

exports.uploadMoviePhoto = upload.single('photo');
// const date = new Date();

exports.resizeMoviePhoto = catchAsync(async (req, res, next) => {
  req.body.dateArray = req.body.dateArray
    .replace(/[\[\]']+/g, '', '')
    .replace(/['"]+/g, '')
    .replace(/\\/g, '');
  req.body.dateArray = req.body.dateArray.split(',');
  if (!req.file) return next();

  const filename = (req.file.filename = `movie-${
    req.body.title
  }-${Date.now()}.jpeg`);

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/movies/${filename}`);

  req.body.photo = filename;

  next();
});

exports.getAllMovie = factory.getAll(Movie);
exports.getMovie = factory.getOne(Movie); // Medyo confusing kase gumana kahit 'reviews' lang ilagay HAHAHA
exports.createMovie = factory.createOne(Movie);
exports.updateMovie = factory.updateOne(Movie);
exports.deleteMovie = factory.deleteOne(Movie);

exports.updateSeats = catchAsync(async (req, res, next) => {
  const index = req.body.index;
  const currentDateSeats = req.body.currentDateSeats;
  const pushDateSeats = req.body.pushDateSeats;
  // console.log(currentDateSeats, pushDateSeats);

  const doc = Movie.findById(req.params.id)
    .then(async (doc) => {
      doc.dateArray[index] = pushDateSeats;
      doc.markModified('dateArray');
      doc.save();
      //sent respnse to client
    })
    .catch((err) => {
      console.log('Oh! Dark');
    });

  // const doc = await Movie.findByIdAndUpdate(
  //   {
  //     _id: req.params.id,
  //   },
  //   { $set: { pushDateSeats } },
  //   { dateArray: currentDateSeats }
  // );

  if (!doc) {
    return next(new AppError('No document with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);

//   if (!tour) {
//     return next(new AppError('No Tour found with that ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// PWEDE KA MAG ADD NG FIELDS USING CONTROLLER PERO SA AGGREGATE GAYA NG EXAMPLE SA BABA
// exports.getTourStats = catchAsync(async (req, res, next) => {
//   const stats = await Tour.aggregate([
//     {
//       $match: { ratingsAverage: { $gte: 4.5 } },
//     },
//     {
//       $group: {
//         _id: { $toUpper: '$difficulty' },
//         numTours: { $sum: 1 },
//         numRatings: { $sum: '$ratingsQuantity' },
//         avgRating: { $avg: '$ratingsAverage' },
//         avgPrice: { $avg: '$price' },
//         minPrice: { $min: '$price' },
//         maxPrice: { $max: 'price' },
//       },
//     },
//     {
//       $sort: { avgPrice: 1 },
//     },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       stats,
//     },
//   });
// });

// exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = req.params.year * 1; // 2021
//   const plan = await Tour.aggregate([
//     {
//       $unwind: '$startDates',
//     },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: '$startDates' },
//         numTourStarts: { $sum: 1 },
//         tours: { $push: '$name' },
//       },
//     },
//     {
//       $addFields: {
//         month: '$_id',
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//       },
//     },
//     {
//       $sort: { numTourStarts: -1 },
//     },
//     {
//       $limit: 12,
//     },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       plan,
//     },
//   });
// });

// // /tours-within?distance=233&center=-40,45,unit=mi
// // /tours-within/233/center/14.751249615937825, 121.05405344604162/unit/mi  == Mas better yung gantong approach sa url
// exports.getToursWithin = catchAsync(async (req, res, next) => {
//   const { distance, latlng, unit } = req.params; // Sobrang solid netong topic nato.
//   const [lat, lng] = latlng.split(',');

//   const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

//   if (!lat || !lng) {
//     next(
//       new AppError(
//         'Please provice latitude and longitude in the format lat, lng',
//         400
//       )
//     );
//   }

//   const tours = await Tour.find({
//     startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }, // try mo rin yung $near instead na $geoWithin. // geoJSON - JSON ng geospatail or format.
//   });
//   z;
//   console.log(distance, lat, lng, unit, radius);

//   res.status(200).json({
//     status: 'success ',
//     result: tours.length,
//     data: {
//       data: tours,
//     },
//   });
// });

// exports.getDistances = catchAsync(async (req, res, next) => {
//   const { latlng, unit } = req.params; // Sobrang solid netong topic nato.
//   const [lat, lng] = latlng.split(',');

//   const multiplier = unit === 'mi' ? 0.000621371192 : 0.001;

//   if (!lat || !lng) {
//     next(
//       new AppError(
//         'Please provice latitude and longitude in the format lat, lng',
//         400
//       )
//     );
//   }

//   const distances = await Tour.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: [lng * 1, lat * 1],
//         },
//         distanceField: 'distance',
//         distanceMultiplier: multiplier,
//       },
//     },
//     {
//       $project: {
//         distance: 1,
//         name: 1,
//       },
//     },
//   ]);

//   res.status(200).json({
//     status: 'success ',
//     data: {
//       data: distances,
//     },
//   });
// });
