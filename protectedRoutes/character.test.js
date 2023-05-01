process.env.NODE_ENV = 'test';

const app = require('../app');
const request = require('supertest');
const db = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');
// const { SECRET_KEY } = require('../config');
const MockStrategy = require('passport-mock-strategy');
passport.use(new MockStrategy());

const Character = require('../models/Character');

// tokens for our sample users
const tokens = {};

let testUser1;
let testUser2;

let testCharacter1;
let testCharacter2;

/** before each test, insert u1, u2, and u3  [u3 is admin] */

beforeEach(async function() {
	// async function _pwd(password) {
	// 	return await bcrypt.hash(password, 1);
	// }

	let sampleUsers = [ [ 'u1', 'email1', 'pwd1' ], [ 'u2', 'email2', 'pwd2' ] ];

	for (let user of sampleUsers) {
		let result = await db.query(
			`INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)`,
			user
		);
		console.log(result);
	}

	let sampleCharacters = [ [ 'Gollum', 'Rogue', 'Hobbit' ], [ 'Samwise', 'Fighter', 'Hobbit' ] ];
	let allTestUsers = await db.query(`SELECT * FROM users`);
	console.log(allTestUsers.rows);
	let user = allTestUsers.rows[0];
	console.log(user);

	for (let character of sampleCharacters) {
		console.log(character[0]);
		let c = await Character.create(character[0], character[1], character[2], user.id);
		// let charId = await db.query(
		// 	`INSERT INTO characters (name, class, species, created_by) VALUES ($1, $2, $3, $4) RETURNING id`,
		// 	[ ...character, userId ]
		// );
		// console.log(charId);
		console.log(c);
	}
	let user1Characters = await Character.getAll(user.id);
	console.log(user1Characters);
	testCharacter1 = user1Characters[0];
});

describe('get /character/:charId', function() {
	test('should allow a user access character', async function() {
		const login = await request(app).post('/login').send({
			email: 'email1',
			password: 'pwd1'
		});
		console.log(login.statusCode);
		const response = await request(app).get(`/user/characters`);

		console.log(response);
		// expect(response.statusCode).toBe(404);
		// expect(response.body).toEqual({ token: expect.any(String) });

		// let { username, admin } = jwt.verify(response.body.token, SECRET_KEY);
		// expect(username).toBe('new_user');
		// expect(admin).toBe(false);
	});
});

afterEach(async function() {
	await db.query('DELETE FROM users');
	await db.query('DELETE FROM characters');
});

afterAll(function() {
	db.end();
});
