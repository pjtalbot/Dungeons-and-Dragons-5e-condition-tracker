const db = require('../db');

const checkRoomExists = async (id, table) => {
	let result = await db.query(
		`
        SELECT * FROM ${table} WHERE id = $1 LIMIT 1`,
		[ id ]
	);
	console.log('//////////////');
	console.log(result.rowCount);

	if (result.rowCount == 0) {
		return false;
	} else {
		return true;
	}
};

const getPlayersInRoom = async (roomId) => {
	// takes roomId and returns array of objects of user's ID + name
	let result = (await db.query(
		`SELECT users.id, users.name FROM users LEFT JOIN user_room
    ON users.id = user_room.user_id where user_room.room_id = $1`,
		[ roomId ]
	)).rows;

	return result;
};

const dropRowFromDb = async (Model, userId) => {
	let result = (await db.query(
		`SELECT users.id, users.name FROM users LEFT JOIN user_room
    ON users.id = user_room.user_id where user_room.room_id = $1`,
		[ roomId ]
	)).rows;
};
module.exports = { getPlayersInRoom, checkRoomExists };
