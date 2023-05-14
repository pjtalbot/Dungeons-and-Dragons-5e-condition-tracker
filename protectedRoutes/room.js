const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM('').window;
global.document = document;

var $ = (jQuery = require('jquery')(window));

const Room = require('../models/Room');
const Character = require('../models/Character');

const { checkForId } = require('../helpers/general');
const { getPlayersInRoom, checkRowExists, getCharactersInRoom } = require('../helpers/dbHelpers');
const { getDescriptionById, getAllConditions } = require('../dndapi/dndApi');

router.get('/:roomId', checkAuthenticated, async (req, res, next) => {
	let roomId = req.params.roomId;
	let userId = req.session.passport.user;
	let position = req.body.scrollPosition;
	console.log(`position: ${position}`);

	let room = await Room.get(roomId);

	let players = await getPlayersInRoom(roomId);

	let characters = await getCharactersInRoom(roomId);

	for (let character in characters.rows) {
		let tempConditions = {};
		for (let c in characters.rows[character].conditions) {
			let conditionId = characters.rows[character].conditions[c];
			let desc = await getDescriptionById(conditionId);

			tempConditions[`${conditionId}`] = desc;
		}
		characters.rows[character].conditions = tempConditions;
	}

	let allConditions = await getAllConditions();

	let myCharacters = await Character.getAll(userId);

	res.render('pages/room.ejs', {
		room: room,
		players: players,
		characters: characters,
		myCharacters: myCharacters,
		allConditions: allConditions,
		position: position
	});
});

router.post('/:roomId/add_character', checkAuthenticated, async (req, res, next) => {
	let roomId = req.params.roomId;
	let charId = req.body.my_character;
	console.log(charId);

	// check that character is not already in room.
	let charactersInRoom = (await getCharactersInRoom(roomId)).rows;

	for (let character of charactersInRoom) {
		if (+charId == character.id) {
			// add flash message
			return res.redirect(`/room/${roomId}`);
		}
	}
	let result = await Room.addCharacter(roomId, charId);

	res.redirect(`/room/${roomId}`);
});

router.post('/:roomId/remove_character/:charId', checkAuthenticated, async (req, res) => {
	let roomId = req.params.roomId;
	let charId = req.params.charId;

	let result = await Room.removeCharacter(roomId, charId);

	res.redirect(`/room/${roomId}`);
});

router.post('/join', checkAuthenticated, async (req, res) => {
	let userId = req.session.passport.user;
	let roomId = req.body.room_id;

	let players = await getPlayersInRoom(roomId);

	let exists = await checkRowExists(roomId, 'rooms');

	if (exists) {
		console.log(checkForId(players, userId));
		if (checkForId(players, userId)) {
			let query = `INSERT INTO user_room (user_id, room_id)
            VALUES ($1, $2);`;

			let result = await db.query(query, [ userId, roomId ]);

			res.redirect(`/room/${roomId}`);
		} else {
			// TODO: add flash message
			res.redirect(`/room/${roomId}`);
		}
	} else {
		// TODO: add flash messages

		console.log('redirecting');
		res.redirect(`/user/rooms`);
	}
});

router.post('/create', checkAuthenticated, async (req, res) => {
	let formData = await req.body;

	res.redirect(`room/${formData.name}`);
});

// TODO make Edit Routes

router.post('/delete/:roomId', checkAuthenticated, async (req, res) => {
	let roomId = req.params.roomId;

	let result = await Room.delete(roomId);
	res.redirect('/user/rooms');
});

module.exports = router;
