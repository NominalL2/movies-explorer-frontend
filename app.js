const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { MONGO_DB } = require('./constants');

const { PORT = '3000' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
});

app.use('/user', require('./routes/user'));

app.use('/movie', require('./routes/movie'));

app.use(errors());

app.use((res, req, err, next) => {
  const { statusCode = 500, message } = err;

  res
    .statusCode(statusCode)
    .json({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
});

app.listen(PORT);
