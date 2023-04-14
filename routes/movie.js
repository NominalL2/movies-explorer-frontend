const router = require('express').Router();

const {
  postMovieValidation,
  deleteMovieIdValidation,
} = require('../validation');

const {
  getMovie,
  postMovie,
  deleteMovie,
} = require('../controllers/movie');

router.get('/', getMovie);

router.post('/', postMovieValidation, postMovie);

router.delete('/:movieId', deleteMovieIdValidation, deleteMovie);

module.exports = router;
