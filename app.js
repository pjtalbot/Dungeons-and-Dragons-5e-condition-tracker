if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const db = require('./db');
// Routes
const signUpRoutes = require('./authRoutes/register.js');
const loginRoutes = require('./authRoutes/login.js');
const profileRoutes = require('./protectedRoutes/profile.js');
const roomRoutes = require('./protectedRoutes/room.js');

const initializePassport = require('./passport-config');
const { checkAuthenticated } = require('./helpers/checkAuth');
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

app.use('/register', signUpRoutes);
app.use('/login', loginRoutes);
app.use('/user', profileRoutes);
app.use('/room', roomRoutes);

app.delete('/logout', (req, res) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
	});
	res.redirect('/login');
});

// app.get('/', (req, res) => {
// 	return res.redirect('/home');
// });
// app.get('/home', (req, res) => {
// 	return res.render('pages/homepage');
// });

module.exports = app;
