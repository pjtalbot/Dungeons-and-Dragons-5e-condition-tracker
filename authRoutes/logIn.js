const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');
const { body, validationResult } = require('express-validator');

router.get('/', checkNotAuthenticated, (req, res) => {
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
