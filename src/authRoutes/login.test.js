process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');

let testUserToken;
let testAdminToken;

let userData = { name: 'PJ', email: 'pj@pj', password: 'asdf' };

beforeEach(async function() {
	const query = `INSERT INTO users (name, email, password, created_at)
			VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`;
	let values = [ userData.name, userData.email, userData.password ];
	const result = await db.query(query, values);
	//
	// we'll need tokens for future requests
});

describe('Get /login', () => {
	it('should return a 200 status code', async () => {
		const response = await request(app).post('/login');
	});
});

describe('POST /login', function() {
	test('should allow a correct username/password to log in', async function() {
		const response = await request(app).get('/login');
		expect(response.statusCode).toBe(200);
	});
});

afterEach(async () => {
	await db.query(`DELETE FROM users`);
});

afterAll(async () => {
	await db.end();
	// Closing the DB connection allows Jest to exit successfully.
});
