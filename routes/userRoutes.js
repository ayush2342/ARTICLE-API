const express = require('express');
const router = express.Router();
const passport = require('passport');
const sourceVerification = require('../middleware/sourceVerification');

const { register, login, getProfile } = require('../controllers/userController');


router.post('/register',sourceVerification, register);
router.post('/login',sourceVerification, login);
router.get('/get-profile', passport.authenticate('jwt', { session: false }), getProfile);

module.exports = router;
