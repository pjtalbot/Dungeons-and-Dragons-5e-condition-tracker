const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

const { checkForId } = require('../helpers/general');
const { getPlayersInRoom, checkRoomExists } = require('../helpers/dbHelpers');

router.get('/:roomId', checkAuthenticated, async (req, res, next) => {
	let roomId = req.params.roomId;
	console.log(roomId);

	let room = (await db.query(`SELECT * FROM rooms WHERE id = $1`, [ roomId ])).rows[0];

	let players = await getPlayersInRoom(roomId);

	console.log(players);
	res.render('pages/room.ejs', { room: room, players: players });
});

router.post('/join', checkAuthenticated, async (req, res) => {
	let userId = req.session.passport.user;
	let roomId = req.body.room_id;
	console.log(roomId);

	let players = await getPlayersInRoom(roomId);
	console.log(players);

	let exists = await checkRoomExists(roomId, 'rooms');
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

	res.redirect(`room/${formData.name}`);
});

// TODO make Edit Routes

router.delete('/delete/:roomId', checkAuthenticated, async (req, res) => {});

module.exports = router;
