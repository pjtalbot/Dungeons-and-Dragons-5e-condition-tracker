const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

router.get('/', checkNotAuthenticated, (req, res) => {
	res.render('pages/login.ejs');
	// let $navbar = $('')
});

router.post(
	'/',
	checkNotAuthenticated,
	passport.authenticate('local', {
		successRedirect: '/user',
		failureRedirect: '/login',
		failureFlash: true
	})
);

router.delete('/login', (req, res) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
	});
	res.redirect('/login');
});

module.exports = router;
