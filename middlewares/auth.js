const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/AuthorizationError');

const { JWT_SECRET } = require('../constants');

module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  const token = authHeaders.split(' ')[1];

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
