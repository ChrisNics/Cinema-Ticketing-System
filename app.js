const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const authController = require('./controllers/authController');
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const Email = require('./views/email');

// Start express app
const app = express();

app.enable('trust proxy'); // para sq req.headers sa authController

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1. Global Middle Wares
// Implement CORS
app.use(cors());
// Access-Controll-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
// app.use(express.static(`${__dirname}/public`));
app.use(express.static(path.join(__dirname, 'public')));

// Set Security HTTP headers
app.use(
  helmet({
    // nakita ko lang sa dc ni jonas, potek lupet. Ayaw kase magdisplay nung map dahil sa cross side issue amp.
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
); // ewan ko nilagay lang ni jonas e

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requyest from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please tey again in an hour!',
});

app.use('/api', limiter); // Pang limit ng request / basic lang yan chanchan.

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data sanitazation against XSS / Inserting malicious HTML/Javascript Code
app.use(xss());

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.post('/api/email', authController.protect, async (req, res) => {
  const email = req.user.email;
  await new Email(email).sendHire(req.body.data);

  res.status(200).json({
    status: 'success',
  });
});

// 2. Routes
app.use('/', viewRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);
// app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
