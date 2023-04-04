const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

const Room = require('../models/Room');
const Character = require('../models/Character');

const { checkForId } = require('../helpers/general');
const { getPlayersInRoom, checkRowExists, getCharactersInRoom } = require('../helpers/dbHelpers');
const { getDescriptionById, getAllConditions } = require('../dndapi/dndApi');

router.get('/:roomId', checkAuthenticated, async (req, res, next) => {
	let roomId = req.params.roomId;
	console.log(roomId);
	let userId = req.session.passport.user;

	let room = await Room.get(roomId);

	let players = await getPlayersInRoom(roomId);

	let characters = await getCharactersInRoom(roomId);

	for (let character in characters.rows) {
		let tempConditions = {};
		console.log('IN CHARACTERS LOOP');
		console.log(characters.rows[character]);
		for (let c in characters.rows[character].conditions) {
			console.log('condition Id:');
			let conditionId = characters.rows[character].conditions[c];
			console.log(characters.rows[character].conditions[c]);
			console.log(c);
			let desc = await getDescriptionById(conditionId);
			console.log(desc);

			tempConditions[`${conditionId}`] = desc;
			// characters.rows[character].conditions[conditionId];
		}
		characters.rows[character].conditions = tempConditions;
	}

	let allConditions = await getAllConditions();

	let myCharacters = await Character.getAll(userId);
	console.log(characters);

	console.log(players);
	res.render('pages/room.ejs', {
		room: room,
		players: players,
		characters: characters,
		myCharacters: myCharacters,
		allConditions: allConditions
	});
});

router.post('/:roomId/add_character', checkAuthenticated, async (req, res, next) => {
	let roomId = req.params.roomId;
	let charId = req.body.my_characters;

	console.log;
	console.log(charId);

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
	console.log(roomId);

	let players = await getPlayersInRoom(roomId);
	console.log(players);

	let exists = await checkRowExists(roomId, 'rooms');
	console.log(exists);

	if (exists) {
		console.log(checkForId(players, userId));
		if (checkForId(players, userId)) {
			let query = `INSERT INTO user_room (user_id, room_id)
            VALUES ($1, $2);`;

			let result = await db.query(query, [ userId, roomId ]);
			console.log(result);
			res.redirect(`/room/${roomId}`);
		} else {
			res.redirect(`/room/${roomId}`);
		}
	} else {
		// TODO: add flash messages

		console.log('redirecting');
		res.redirect(`/user/rooms`);
	}
	// TODO: Check players array for userId
	// TODO: obj is not iterable at checkForId
});

router.post('/create', checkAuthenticated, async (req, res) => {
	let formData = await req.body;
	console.log(formData);

	res.redirect(`room/${formData.name}`);
});

// TODO make Edit Routes

router.post('/delete/:roomId', checkAuthenticated, async (req, res) => {
	let roomId = req.params.roomId;

	let result = await Room.delete(roomId);
	console.log(result);
	res.redirect('/user/rooms');
});

module.exports = router;
