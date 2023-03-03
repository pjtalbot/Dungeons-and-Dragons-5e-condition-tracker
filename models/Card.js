// A Card will represent anything a Player can "Do", "Have" or can just be customized as a easy rule reference

const db = require('../db');
const bcrypt = require('bcrypt');
const ExpressError = require('express');

class Card {
	constructor(name, category, type, properties, desc, damage, bonus) {
		this.name = name;
		this.category = category;
		this.type = type;
		this.properties = properties;
		this.desc = desc;
		this.damage = damage;
		this.bonus = bonus;
	}

	static async create(name, category, type, properties, desc, damage, bonus, characterId) {
		try {
			let result = await db.query(
				`INSERT INTO cards (
              name,
              category,
              type,
              properties,
              description,
              damage,
              bonus,
              character_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `,
				[ name, category, type, properties, desc, damage, bonus, characterId ]
			);
			console.log(result.rows[0]);
			return result.rows[0];
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async getAllByCharacter(characterId) {
		const result = await db.query(
			`SELECT * FROM cards
		WHERE character_id = $1`,
			[ characterId ]
		);

		return result.rows;
	}

	static async get(id) {
		try {
			console.log('%%%%%%%');
			const result = await db.query(
				`SELECT *
            FROM cards
            WHERE id = $1`,
				[ id ]
			);
			console.log('**********');
			console.log(result);

			if (!result.rows[0]) {
				console.log('EEEEE');
				throw new ExpressError(`No such Card: ${id}`, 404);
			}

			return result.rows[0];
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	static async getAll(userId) {
		// TODO: add "created_by" to table
		const result = await db.query(
			`SELECT *
            FROM cards
            WHERE created_by = $1`,
			[ userId ]
		);

		// if (!result.rows[0]) {
		// 	throw new ExpressError(`Cannot find any Characters for user-id: ${userId}`, 404);
		// }

		return result.rows;
	}

	static async delete(id) {
		const result = await db.query(
			`DELETE
               FROM cards
               WHERE id = $1
               RETURNING id`,
			[ id ]
		);
		const card = result.rows[0];
		console.log(`INSIDE Card MODEL DELETE METHOD`);
		console.log(card);
	}

	// static async remove(id) {
	// 	const result = await db.query(
	// 		`DELETE
	//        FROM charcters
	//        WHERE id = $1
	//        RETURNING id`,
	// 		[ id ]
	// 	);
	// 	const job = result.rows[0];

	// 	if (!job) throw new NotFoundError(`No job: ${id}`);
	// }
}

module.exports = Card;
