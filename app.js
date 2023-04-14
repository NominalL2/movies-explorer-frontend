const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/user');

const NotFoundError = require('./errors/NotFoundError');

const { signinValidation, signupValidation } = require('./validation');

const { MONGO_DB } = require('./constants');

const router = express.Router();

const { PORT = '3000' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
});

app.post('/signin', signinValidation, login);

app.post('/signup', signupValidation, createUser);

app.use('/user', auth, require('./routes/user'));

app.use('/movie', auth, require('./routes/movie'));

app.use(auth, router.use('*', (req, res, next) => {
  next(new NotFoundError('Not Found'));
}));

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .json({
      message: statusCode === 500
        ? message
        : message,
    });

  next();
});

app.listen(PORT);
