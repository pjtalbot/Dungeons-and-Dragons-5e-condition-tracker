process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
const db = require('./db');
const bcrypt = require('bcrypt');
const passport = require('passport');

const Character = require('./models/Character.js');

// TODO: DB auto incrememnt still going, fix
// TODO: test still appears to be user main db not roller_test
let testUserToken;
let testAdminToken;
let testUser;
let newChar;

beforeEach(async function() {
	await db.query(`DELETE FROM characters`);
	await db.query(`DELETE FROM users`);

	const result = await db.query(
		`INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW())
    RETURNING id, name, email, password, created_at`,
		[ 'w', 'w@w', 'w' ]
	);

	// create user model, and get query values from that
	//
	// we'll need tokens for future requests
	console.log(result.rows[0]);
	testUser = result.rows[0];
	newChar = await Character.create('Frodo', 'Rogue', 'Hobbit', testUser.id);
});

describe('Checks INSERT to users table in db', () => {
	it('should successfully add user', async () => {
		expect(testUser.name).toBe('w');
		expect(testUser.email).toBe('w@w');
		console.log(testUser.created_at);
	});

	// These tests should test the actual route using user input, NOT just the db INSERT query
});

describe('Checks INSERT to Characters table in db', () => {
	it('should successfully add character', async () => {
		expect(newChar.name).toBe('Frodo');
		expect(newChar.created_by).toBe(testUser.id);
	});
});

afterEach(async () => {
	await db.query(`DELETE FROM users`);
});

afterAll(async () => {
	await db.query(`DELETE FROM users`);
	await db.query(`DELETE FROM characters`);
	await db.end();
	// Closing the DB connection allows Jest to exit successfully.
});
