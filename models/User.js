/** User class for message.ly */

const db = require('../db');
const bcrypt = require('bcrypt');
const ExpressError = require('express');

// const { BCRYPT_WORK_FACTOR } = require('../config');

/** User of the site. */

class Room {
	/** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */ constructor(
		name,
		Class,
		species,
		createdBy
	) {
		this.name = name;
		this.class = Class;
		this.species = species;
		this.createdBy = createdBy;
	}

	static async create(name, Class, species, createdBy) {
		try {
			console.log('@@@@@@#####@@@@@');
			console.log(this.createdBy);
			console.log(this.name);
			console.log(this.class);
			console.log(this.species);
			console.log(species);
			const result = await db.query(
				`INSERT INTO characters (
              name,
              class,
              species,
              created_by)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, created_by`,
				[ name, Class, species, createdBy ]
			);
			return result.rows[0];
		} catch (e) {
			throw new ExpressError(e);
		}
	}

	/** Authenticate: is this username/password valid? Returns boolean. */

	/** Update last_login_at for user */

	static async updateLoginTimestamp(username) {
		const result = await db.query(
			`UPDATE users
           SET last_login_at = current_timestamp
           WHERE username = $1
           RETURNING username`,
			[ username ]
		);

		if (!result.rows[0]) {
			throw new ExpressError(`No such user: ${username}`, 404);
		}
	}

	/** All: basic info on all users:
   * [{username, first_name, last_name}, ...] */

	static async get(id) {
		try {
			console.log('%%%%%%%');
			const result = await db.query(
				`SELECT *
            FROM characters
            WHERE id = $1`,
				[ id ]
			);
			console.log('**********');
			console.log(result);

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
            FROM users
            WHERE user_id = $1`,
			[ userId ]
		);

		if (!result.rows[0]) {
			throw new ExpressError(`Cannot find any Characters for user-id: ${userId}`, 404);
		}

		return result.rows[0];
	}
}

module.exports = Room;
