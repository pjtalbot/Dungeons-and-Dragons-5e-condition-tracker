const db = require('../db');

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		console.log('IS AUTHENTICATED');
		return res.redirect('/');
	}
	next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated };
