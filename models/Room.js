'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');

class Room {
	static async create(data, userId) {
		let query = `INSERT INTO rooms (name, created_by)
    VALUES ($1, $2) RETURNING id;`;
		const result = await db.query(query, [ data.name, userId ]);

		let room = result.rows[0];
		query = `INSERT INTO user_room (room_id, user_id)
    VALUES ($1, $2);`;

		let relation = await db.query(query, [ room.id, userId ]);

		return room;
	}

	static async get(id) {
		const result = await db.query(
			`SELECT *
           FROM rooms
           WHERE id = $1`,
			[ id ]
		);

		const room = result.rows[0];

		if (!room) throw new NotFoundError(`No room: ${id}`);

		return room;
	}

	static async getCharacters(roomId) {
		let query = `SELECT character_id FROM character_room
		WHERE room_id = $1 ORDER BY character_id`;
		const result = await db.query(query, [ roomId ]);

		return result.rows;
	}

	static async addCharacter(roomId, characterId) {
		let result = db.query(
			`INSERT INTO character_room (room_id, character_id)
		VALUES ($1, $2)`,
			[ roomId, characterId ]
		);

		return result;
	}

	static async removeCharacter(roomId, characterId) {
		let result = db.query(
			`DELETE FROM character_room WHERE room_id = $1
			AND character_id = $2`,
			[ roomId, characterId ]
		);

		return result;
	}

	static async delete(id) {
		const result = await db.query(
			`DELETE
               FROM rooms
               WHERE id = $1
               RETURNING id`,
			[ id ]
		);
		return result;
	}
}

module.exports = Room;
