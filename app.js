require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { MONGO_DB } = require('./constants');

const { PORT = '3000' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/errorHendling'));

app.listen(PORT);
