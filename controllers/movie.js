const Movie = require('../models/movie');

const IncorrectError = require('../errors/IncorrectError');
const NotFoundError = require('../errors/NotFoundError');
const AccessDeniedError = require('../errors/AccessDeniedError');

module.exports.getMovie = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const movies = await Movie.find({ owner: userId }).populate('owner');

    if (!movies) {
      res.json({ message: 'Вы не сохранили ни одного фильма' });
    }

    res.json(movies);
  } catch (error) {
    next(error);
  }
};

module.exports.postMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  const movie = new Movie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  });

  try {
    const newMovie = await movie.save();
    const foundMovie = await Movie.findById(newMovie).populate('owner');
    res.status(201).json(foundMovie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new IncorrectError('ValidationError'));
    } else {
      next(error);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    } else if (movie.owner._id.toString() !== userId) {
      throw new AccessDeniedError('Нельзя удалить чужой фильм');
    } else {
      await movie.deleteOne();
      res.json({ message: 'Фильм успешно удален' });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new IncorrectError('Некоректный id'));
    }
    next(error);
  }
};
