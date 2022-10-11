const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const users = require('../controllers/users');

router.route('/register')
    .get(users.getRegistrationForm)
    .post(wrapAsync(users.submitRegistrationData));

router.route('/login')
    .get(users.getLoginForm)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login',
        keepSessionInfo: true
    }), users.submitLoginData);


router.get('/logout', users.logoutUser)

module.exports = router;

