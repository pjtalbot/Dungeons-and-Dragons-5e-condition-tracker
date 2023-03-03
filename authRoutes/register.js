const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const { checkEmailIsAvailable, checkUsernameIsAvailable } = require('../helpers/dbHelpers.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');
const validateRegister = require('../helpers/inputValidators.js');

router.get('/', checkNotAuthenticated, (req, res) => {
	res.render('pages/register.ejs');
});

router.post('/', checkNotAuthenticated, async (req, res) => {
	try {
		// TODO: Add confirm password
		validateRegister(req);

		if (checkEmailIsAvailable(req.body.email) && checkUsernameIsAvailable(req.body.name)) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			let userData = {
				id: Date.now().toString(),
				name: req.body.name,
				email: req.body.email.toLowerCase(),
				password: hashedPassword
			};
			const query = `INSERT INTO users (name, email, password)
			VALUES ($1, $2, $3)`;
			let values = [ userData.name, userData.email, userData.password ];

			let cb = (err, result) => {
				if (err) {
					console.log(err);
					if (err.toString().includes('email')) {
						console.log(`db.query /register ${err.stack}`);
						req.flash('info', 'Email already in use');
					}
					if (err.toString().includes('name')) {
						console.log(`db.query /register ${err.stack}`);
						req.flash('info', 'Username already in use');
					}
					res.redirect('/register');
				} else {
					console.log(`/register`);
					console.log(res.rows);
					res.redirect('/login');
					// { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
				}
			};

			let result = await db.query(query, values, cb);
		}
	} catch (e) {
		console.log('IN CATCH');
		console.log(e);
		res.redirect('/register');
	}
});

module.exports = router;
