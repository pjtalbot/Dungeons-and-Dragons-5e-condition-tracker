const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

router.get('/', checkNotAuthenticated, (req, res) => {
	res.render('pages/register.ejs');
});

router.post('/', checkNotAuthenticated, async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		let userData = {
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword
		};

		const query = `INSERT INTO users (name, email, password)
		VALUES ($1, $2, $3)`;
		let values = [ userData.name, userData.email, userData.password ];

		let cb = (err, result) => {
			if (err) {
				console.log(`db.query /register ${err.stack}`);
			} else {
				console.log(`/register`);
				console.log(res.rows);
				// { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
			}
		};

		db.query(query, values, cb);
		res.redirect('/login');
	} catch (e) {
		console.log(e);
		res.redirect('/register');
	}
});

module.exports = router;
