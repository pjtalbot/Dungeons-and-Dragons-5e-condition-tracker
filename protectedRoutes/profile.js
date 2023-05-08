const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');
const { getAllConditions } = require('../dndapi/dndApi');

// Models
const Character = require('../models/Character');
const Room = require('../models/Room');
const Card = require('../models/Card');

router.get('/', checkAuthenticated, async (req, res, next) => {
	let userId = req.session.passport.user;
	req.flash('info', 'Welcome');

	await getAllConditions();

	let data = await db.query(`SELECT * FROM users WHERE id = $1`, [ userId ]);
	let user = data.rows[0];
	res.render('pages/index.ejs', { name: user.name });
});

router.get('/characters', checkAuthenticated, async (req, res) => {
	// TODO: set up schema, and use THAT to both create the form AND add user input

	let userId = req.session.passport.user;
	let userCharacters = await Character.getAll(userId);
	// let userCharacters = (await db.query(`SELECT * FROM characters WHERE created_by = $1`, [ userId ])).rows;

	res.render('pages/characterForm.ejs', { characters: userCharacters });
});

router.get('/cards', checkAuthenticated, async (req, res) => {
	// TODO: set up schema, and use THAT to both create the form AND add user input

	let userId = req.session.passport.user;
	let userCharacters = await Card.getAll(userId);
	// let userCharacters = (await db.query(`SELECT * FROM characters WHERE created_by = $1`, [ userId ])).rows;

	res.render('pages/characterForm.ejs', { characters: userCharacters });
});

router.post('/characters/create', checkAuthenticated, async (req, res) => {
	let userId = req.session.passport.user;
	console.log(userId);
	let formData = {
		name: req.body.name,
		class: req.body.class,
		species: req.body.species,
		createdBy: userId
	};
	await Character.create(formData.name, formData.class, formData.species, formData.createdBy);
	// retrieve last created character ID (generated Serial)
	let charId = (await db.query(`SELECT currval('characters_id_seq')`)).rows[0].currval;

	let character = (await db.query(`SELECT * FROM characters WHERE id = $1`, [ charId ])).rows[0];
	res.redirect(`/character/${character.id}`);
});

router.get('/rooms', checkAuthenticated, async (req, res) => {
	// TODO: First set up seperate client for chat
	// make sure both work simultaneously before moving on
	// simple counter

	let userId = req.session.passport.user;
	let userRooms = (await db.query(`SELECT id, name FROM rooms WHERE created_by = $1`, [ userId ])).rows;
	let joinedRooms = (await db.query(
		`SELECT rooms.id, rooms.name FROM rooms JOIN
    user_room ON rooms.id = user_room.room_id AND user_id = $1`,
		[ userId ]
	)).rows;
	res.render('pages/roomForms.ejs', { userRooms: userRooms, joinedRooms: joinedRooms });
});

router.post('/rooms/create', checkAuthenticated, async (req, res) => {
	let userId = req.session.passport.user;
	let formData = { name: req.body.name };
	let newRoom = await Room.create(formData, userId);
	res.redirect(`/room/${newRoom.id}`);
});

module.exports = router;
