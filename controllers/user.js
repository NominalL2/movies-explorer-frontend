const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const IncorrectError = require('../errors/IncorrectError');
const ExistsEmailError = require('../errors/ExistsEmailError');
const AuthorizationError = require('../errors/AuthorizationError');

const { JWT_SECRET } = require('../constants');

function resultUser(user, res) {
  if (user) {
    return res.json(user);
  }
  throw new NotFoundError('User not found');
}

async function findUserById(userId, res) {
  const user = await User.findById(userId);

  return resultUser(user, res);
}

async function findUserByIdAndUpdate(userId, res, args) {
  const user = await User.findByIdAndUpdate(
    userId,
    args,
    { new: true, runValidators: true },
  );

  return resultUser(user, res);
}

module.exports.getMe = async (req, res, next) => {
  const userId = req.user._id;

  try {
    await findUserById(userId, res);
  } catch (error) {
    next(error);
  }
};

module.exports.patchMe = async (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  try {
    await findUserByIdAndUpdate(userId, res, { email, name });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new IncorrectError('ValidationError'));
    } else if (error.code === 11000) {
      next(new ExistsEmailError('Пользователь с этой почтой уже существует'));
    }
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create(new User({
      name,
      email,
      password: hash,
    }));

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new IncorrectError('ValidationError'));
    } else if (error.code === 11000) {
      next(new ExistsEmailError('Пользователь с этой почтой уже существует'));
    } else {
      next(error);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthorizationError('Неправельные логин или пароль');
    }

    const login = bcrypt.compare(password, user.password);
    if (!login) {
      throw new AuthorizationError('Неправельные логин или пароль');
    }

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
