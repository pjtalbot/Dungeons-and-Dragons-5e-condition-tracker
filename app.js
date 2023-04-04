if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// TODO: BLOP or S3 simple storage service (aws)

const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const ExpressError = require('./expressError');

const db = require('./db');
// Routes
const signUpRoutes = require('./authRoutes/register.js');
const loginRoutes = require('./authRoutes/login.js');
const profileRoutes = require('./protectedRoutes/profile.js');
const roomRoutes = require('./protectedRoutes/room.js');
const characterRoutes = require('./protectedRoutes/character.js');
const cardRoutes = require('./protectedRoutes/card.js');

const initializePassport = require('./passport-config');
const { checkAuthenticated, checkNotAuthenticated } = require('./helpers/checkAuth');
initializePassport(
	passport,
	(email) => db.query(`SELECT * FROM users WHERE email = $1`, [ email ]),
	(id) => db.query(`SELECT * FROM users WHERE id = $1`, [ id ])
);

// TODO: make a parent directory for both projects
// Todo: Move dice-roller directory into the parent
// TODO: install dependencies
// TODO: import the (dice-roller) app.js as a module (const rollerChat = require('./<path to roller>'))
// TODO:

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);
// app.use(express.json());

app.use(passport.initialize());

app.use(passport.session());

app.use(methodOverride('_method'));

// ROUTES
app.use('/', function(req, res, next) {
	console.log(`%&%&%&%&%@#@#@#@#@ PATH ${req.url}, ${req.path} %&%&%&%&%@#@#@#@#@`);
	next();
});

app.use('/register', signUpRoutes);
app.use('/login', loginRoutes);
app.use('/user', profileRoutes);
app.use('/room', roomRoutes);
app.use('/character', characterRoutes);
app.use('/card', cardRoutes);

app.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect('/user');
	} else {
		res.redirect('/login');
	}
});

app.delete('/logout', (req, res) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
	});
	res.redirect('/login');
});

app.use(function(req, res, next) {
	const err = new ExpressError('Not found!', 404);
	return next(err);
});

module.exports = app;
