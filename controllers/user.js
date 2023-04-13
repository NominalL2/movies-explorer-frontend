const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const IncorrectError = require('../errors/IncorrectError');

function resultUser(user, res) {
  if (user) {
    res.json(user);
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
    }
    next(error);
  }
};
