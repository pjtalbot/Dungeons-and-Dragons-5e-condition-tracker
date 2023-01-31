const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

// Models
const User = require('../models/User');
// const Room = require('../models/Room');

router.use(function(req, res, next) {
	res.locals.user = req.user;
	console.log('in router.use() profile.jsz');
	console.log(res.locals.user);
	console.log(req.body);

	next();
});

router.get('/', checkAuthenticated, async (req, res, next) => {
	console.log('req.body');
	console.log(req.session.passport.user);
	console.log('req.user');
	console.log(req.user);
	let userId = req.session.passport.user;
	console.log(userId);

	let data = await db.query(`SELECT * FROM users WHERE id = $1`, [ userId ]);
	console.log(data.rows[0].name);
	if (res.locals.authenticated) {
		console.log('is authenticated');
		console.log(data);
	}

	console.log(res.locals.user);
	let user = data.rows[0];
	console.log(user);
	res.render('pages/index.ejs', { name: user.name });
});

router.get('/characters', checkAuthenticated, async (req, res) => {
	// TODO: set up schema, and use THAT to both create the form AND add user input
	// Find a good library for that
	res.render('pages/characters.ejs');
});

router.get('/rooms', checkAuthenticated, async (req, res) => {
	// TODO: First set up seperate client for chat
	// make sure both work simultaneously before moving on
	// simple counter?

	res.render('pages/roomForms.ejs');
});

router.post('/rooms/create', checkAuthenticated, async (req, res) => {
	console.log(req.body.name);
	let formData = { name: req.body.name };

	// let createQuery = `CREATE TABLE rooms (
	//     id serial PRIMARY KEY,
	//     name VARCHAR ( 50 )
	//  );`;

	// db.query(createQuery);

	let query = `INSERT INTO rooms (name)
    VALUES ($1) RETURNING id;`;

	let result = await db.query(query, [ formData.name ]);

	let id = result.rows[0].id;
	console.log(id);

	let room = (await db.query(`SELECT * FROM rooms WHERE id = $1`, [ id ])).rows[0];

	console.log(room);

	// let room = await db.query('SELECT * FROM rooms WHERE');

	res.render('pages/room.ejs', { room: room });

	// let room = db.query('SELECT * FROM rooms WHERE id = $1', [ 1 ]);

	//harcoded room
	// console.log(req.body);
	// let roomId = req.body.roomId;
	// console.log(roomId);
	// let room = { id: 1, name: 'Excelsior Table', party: 'The Squad' };
	// res.render('pages/roomForms.ejs'), req.params;
});

module.exports = router;
