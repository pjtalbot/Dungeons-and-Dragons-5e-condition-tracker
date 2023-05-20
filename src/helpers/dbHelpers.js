const db = require('../db');

const checkRowExists = async (id, table) => {
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

const getCharactersInRoom = async (roomId) => {
	let result = await db.query(
		`SELECT * FROM characters LEFT JOIN character_room
    ON characters.id = character_room.character_id WHERE character_room.room_id = $1
	ORDER BY id`,
		[ roomId ]
	);
	console.log(result.rows);

	return result;
};

async function checkEmailIsAvailable(email) {
	let result = await db.query(`SELECT email FROM users WHERE email = $1`, [ email ]);
	if (result.rows.length > 0) {
		return false;
	}
	return true;
}

async function checkUsernameIsAvailable(username) {
	let result = await db.query(`SELECT name FROM users WHERE name = $1`, [ username ]);
	if (result.rows.length > 0) {
		return false;
	}
	return true;
}

module.exports = {
	getPlayersInRoom,
	checkRowExists,
	checkEmailIsAvailable,
	checkUsernameIsAvailable,
	getCharactersInRoom
};
