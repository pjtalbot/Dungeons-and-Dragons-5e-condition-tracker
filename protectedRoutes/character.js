const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

const Character = require('../models/Character');

router.get('/:charId', checkAuthenticated, async (req, res, next) => {
	let currentUser = req.session.passport.user;
	let charId = req.params.charId;

	let character = await Character.get(charId);

	console.log('&&&&&&&&&&&&&&');
	console.log(character);
	res.render('pages/character.ejs', { character: character, currentUser: currentUser });
});

// router.post('/join', checkAuthenticated, async (req, res) => {
// 	let userId = req.session.passport.user;
// 	let roomId = req.body.room_id;

// 	// let createQuery = `CREATE TABLE rooms (
// 	//     id serial PRIMARY KEY,
// 	//     name VARCHAR ( 50 )
// 	//  );`;

// 	// db.query(createQuery);
// 	console.log('%%%%%%%%');
// 	console.log(req.body.room_id);

// 	let query = `INSERT INTO user_room (user_id, room_id)
//     VALUES ($1, $2);`;

// 	let result = await db.query(query, [ userId, roomId ]);

// 	console.log(result);

// 	let room = (await db.query(`SELECT * FROM rooms WHERE id = $1`, [ roomId ])).rows[0];

// 	console.log(room);

// 	// let room = await db.query('SELECT * FROM rooms WHERE');

// 	// TODO: change to redirect to room's page.

// 	res.render('pages/room.ejs', { room: room });

// 	// let room = db.query('SELECT * FROM rooms WHERE id = $1', [ 1 ]);

// 	//harcoded room
// 	// console.log(req.body);
// 	// let roomId = req.body.roomId;
// 	// console.log(roomId);
// 	// let room = { id: 1, name: 'Excelsior Table', party: 'The Squad' };
// 	// res.render('pages/roomForms.ejs'), req.params;
// });

router.post('/create', checkAuthenticated, async (req, res) => {
	let formData = await req.body;

	res.redirect(`room/${formData.name}`);
});

router.post('/delete/:charId', checkAuthenticated, async (req, res) => {
	let charId = req.params.charId;
	console.log(charId);
	let result = await Character.delete(charId);
	console.log(result);
	res.redirect('/user/characters');
});

module.exports = router;
