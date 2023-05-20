if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM('').window;
global.document = document;

var $ = (jQuery = require('jquery')(window));

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

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
	// This is where the session cookie comes from
	// from "https://stackoverflow.com/questions/28789857/how-is-the-express-req-session-object-persisted"
	// Part of establishing a session for a given browser client is creating a unique client key (which will usually be stored in a cookie) that becomes the index into the global session object.
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);
// app.use(express.json());

app.use(passport.initialize());
app.use(methodOverride('_method'));

app.use(passport.session());

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

app.post('/logout', (req, res) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
	});
	res.redirect('/login');
});

app.use(function(req, res, next) {
	res.status(404).render('pages/404.ejs');
});

app.use(function(req, res, next) {
	const err = new ExpressError('Not found!', 404);
	return next(err);
});

module.exports = app;
