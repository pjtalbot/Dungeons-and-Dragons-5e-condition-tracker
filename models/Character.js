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
				console.log('EEEEE');
				throw new ExpressError(`No such Character: ${id}`, 404);
			}

			return result.rows[0];
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async getAll(userId) {
		const result = await db.query(
			`SELECT *
            FROM characters
            WHERE created_by = $1
			`,
			[ userId ]
		);
		return result.rows;
	}

	static async setMaxHP(id, maxHP) {
		const result = await db.query(
			`
		UPDATE characters
		SET max_hp = $1
		WHERE id = $2`,
			[ maxHP, id ]
		);
		return result;
	}

	static async updateCurrentHP(id, hp) {
		const result = await db.query(
			`
		UPDATE characters
		SET current_hp = $1
		WHERE id = $2`,
			[ hp, id ]
		);
		return result;
	}

	static async addResistance(id, resistance) {
		let query = `UPDATE characters
		SET resistances = ARRAY_APPEND(resistances, $1)
		WHERE id = $2`;
		let result = await db.query(query, [ resistance, id ]);
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
