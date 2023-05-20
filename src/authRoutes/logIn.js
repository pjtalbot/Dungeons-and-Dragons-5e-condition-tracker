const express = require('express');
const router = new express.Router();
const { checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');

router.get('/', checkNotAuthenticated, async (req, res) => {
	res.render('pages/login.ejs');
});

router.post(
	'/',
	checkNotAuthenticated,
	passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: true
	}),
	(req, res) => {
		res.redirect('/user');
	}
);

module.exports = router;
