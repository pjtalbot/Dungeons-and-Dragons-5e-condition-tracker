if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const { checkAuthenticated, checkNotAuthenticated } = require('./helpers/checkAuth');
const pg = require('pg');
const db = require('./db');
const signUpRoutes = require('./authRoutes/register.js');
const loginRoutes = require('./authRoutes/login.js');

const initializePassport = require('./passport-config');
initializePassport(
	passport,
	(email) => db.query(`SELECT * FROM users WHERE email = $1`, [ email ]),
	(id) => db.query(`SELECT * FROM users WHERE id = $1`, [ id ])
);

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use('/register', signUpRoutes);
app.use('/login', loginRoutes);

app.get('/', checkAuthenticated, (req, res) => {
	res.render('pages/index.ejs', { name: req.user.name });
});

app.get('/characters', checkAuthenticated, async (req, res) => {
	res.render('pages/characters.ejs');
});

app.get('/rooms', checkAuthenticated, async (rec, res) => {
	res.render('pages/rooms.ejs');
});

module.exports = app;
