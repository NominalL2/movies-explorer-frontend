const router = require('express').Router();
const {
  patchetUserMeValidation,
} = require('../validation');

const {
  getMe,
  patchMe,
} = require('../controllers/user');

router.get('/me', getMe);

router.patch('/me', patchetUserMeValidation, patchMe);

module.exports = router;
