const db = require('../db');

function checkAuthenticated(req, res, next) {
	if (process.env.NODE_ENV === 'test') {
		return next();
	}
	if (req.isAuthenticated()) {
		// req.isAuthenticated is declared by the passport library
		return next();
	}
	res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated };
