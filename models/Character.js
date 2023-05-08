const db = require('../db');
const bcrypt = require('bcrypt');
const ExpressError = require('express');

class Character {
	constructor(name, Class, species, createdBy) {
		this.name = name;
		this.class = Class;
		this.species = species;
		this.createdBy = createdBy;
	}

	static async create(name, Class, species, createdBy) {
		try {
			const result = await db.query(
				`INSERT INTO characters (
              name,
              class,
              species,
              created_by,
			  created_at)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING id, name, created_by`,
				[ name, Class, species, createdBy ]
			);
			return result.rows[0];
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async get(id) {
		try {
			console.log('%%%%%%% INSIDE CHARACTER CLASS get()');
			const result = await db.query(
				`SELECT *
            FROM characters
            WHERE id = $1`,
				[ id ]
			);

			if (!result.rows[0]) {
				throw new ExpressError(`No such Character: ${id}`, 404);
			}

			return result.rows[0];
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async duplicate(id, newName) {
		try {
			let originalChar = await Character.get(id);

			const result = await db.query(
				`INSERT INTO characters (
              name,
              class,
              species,
              created_by,
			  created_at,
			  max_hp,
			  current_hp,
			  ac,
			  resistances,
			  strength,
			  dexterity,
			  constitution,
			  intelligence,
			  wisdom,
			  charisma)
            VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING id, name, created_by`,
				[
					newName,
					originalChar.class,
					originalChar.species,
					originalChar.created_by,
					originalChar.max_hp,
					originalChar.current_hp,
					originalChar.ac,
					originalChar.resistances,
					originalChar.strength,
					originalChar.dexterity,
					originalChar.constitution,
					originalChar.intelligence,
					originalChar.wisdom,
					originalChar.charisma
				]
			);
			return result.rows[0];
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async getAll(userId) {
		try {
			const result = await db.query(
				`SELECT *
				FROM characters
				WHERE created_by = $1
				`,
				[ userId ]
			);
			return result.rows;
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async setMaxHP(id, maxHP) {
		try {
			const result = await db.query(
				`
			UPDATE characters
			SET max_hp = $1
			WHERE id = $2`,
				[ maxHP, id ]
			);
			return result;
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async updateCurrentHP(id, hp) {
		try {
			const result = await db.query(
				`
			UPDATE characters
			SET current_hp = $1
			WHERE id = $2`,
				[ hp, id ]
			);
			return result;
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async updateAC(id, ac) {
		try {
			const result = await db.query(
				`
			UPDATE characters
			SET ac = $1
			WHERE id = $2`,
				[ ac, id ]
			);
			return result;
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async addResistance(id, resistance) {
		let query = `UPDATE characters
		SET resistances = ARRAY_APPEND(resistances, $1)
		WHERE id = $2`;
		let result = await db.query(query, [ resistance, id ]);
		return result;
	}

	static async getRooms(id) {
		let query = `SELECT rooms.id, rooms.name
		FROM rooms
		JOIN character_room ON rooms.id = character_room.room_id
		JOIN characters ON characters.id = character_room.character_id
		WHERE characters.id = $1`;
		let result = await db.query(query, [ id ]);
		return result;
	}

	// static async addImmunity(id, resistance) {
	// 	let query = `UPDATE characters
	// 	SET resistances = ARRAY_APPEND(resistances, $1)
	// 	WHERE id = $2`;
	// 	let result = await db.query(query, [ resistance, id ]);
	// 	return result;
	// }

	// FOR DEV: use if error occurs in adding resistance. user has little need for this functionality, since resistances are relatively static in D&D combat
	// UPDATE characters SET resistances = ARRAY[]::text[] WHERE id = 40;

	static async updateAbilityScores(id, scoresObj) {
		let query = `UPDATE characters
		SET strength = $1,
		dexterity = $2,
		constitution = $3,
		intelligence = $4,
		wisdom = $5,
		charisma = $6
		WHERE id = $7`;

		let result = await db.query(query, [
			scoresObj['strength'],
			scoresObj['dexterity'],
			scoresObj['constitution'],
			scoresObj['intelligence'],
			scoresObj['wisdom'],
			scoresObj['charisma'],
			id
		]);

		return result;
	}

	static async getResistances(id) {
		// TODO: This function is repetitive, Character.get() should return the necessary data
		const result = await db.query(
			`SELECT resistances
            FROM characters
            WHERE id = $1
			`,
			[ id ]
		);

		console.log(result.rows[0]);

		return result.rows[0].resistances;
	}

	static async removeResistance(id, resistance) {
		try {
			let char = await Character.get(id);
			let currentResistances = char.resistances;
			console.log(currentResistances);

			let index = currentResistances.indexOf(resistance);
			currentResistances.splice(index, 1);
			let query = `UPDATE characters
			SET resistances = $1
			WHERE id = $2`;

			let result = await db.query(query, [ currentResistances, id ]);
		} catch (e) {
			console.log(e);
		}
	}

	static async getConditions(id) {
		const result = await db.query(
			`SELECT *
            FROM characters
            WHERE id = $1
			`,
			[ id ]
		);

		console.log(result.rows[0]);

		return result.rows[0].conditions;
	}

	static async addCondition(id, conditionId) {
		// add input validation, no empty strings
		let query = `UPDATE characters
		SET conditions = ARRAY_APPEND(conditions, $1)
		WHERE id = $2`;
		let result = await db.query(query, [ conditionId, id ]);
		return result;
	}

	static async removeCondition(id, conditionId) {
		try {
			let newConditions = [];
			let char = await Character.get(id);
			let currentConditions = char.conditions;
			console.log(currentConditions);

			let index = currentConditions.indexOf(conditionId);
			currentConditions.splice(index, 1);
			let query = `UPDATE characters
			SET conditions = $1
			WHERE id = $2`;

			let result = await db.query(query, [ currentConditions, id ]);
		} catch (e) {
			console.log(e);
		}
	}
	static async removeAllConditions(id) {
		// TODO: Bug, not always removing ALL
		// possibly from 'text' type while storing the array in db
		try {
			let query = `UPDATE characters
			SET conditions = $1
			WHERE id = $2`;
			let result = await db.query(query, [ [], id ]);
		} catch (e) {
			console.log(e);
		}
	}

	static async delete(id) {
		const result = await db.query(
			`DELETE
               FROM characters
               WHERE id = $1
               RETURNING id`,
			[ id ]
		);

		const char = result.rows[0];
		console.log(`INSIDE MODEL DELETE METHOD`);
		console.log(char);
	}
}

module.exports = Character;
