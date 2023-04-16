const router = require('express').Router();

const auth = require('../middlewares/auth');

const { login, createUser } = require('../controllers/user');

const { signinValidation, signupValidation } = require('../validation');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', signinValidation, login);

router.post('/signup', signupValidation, createUser);

router.use('/users', auth, require('./user'));

router.use('/movies', auth, require('./movie'));

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Not Found'));
});

module.exports = router;
