process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');

let testUserToken;
let testAdminToken;

beforeEach(async function() {
	const result = db.query('INSERT INTO users');
	//
	// we'll need tokens for future requests
});

describe('Get /login', () => {
	it('should return a 200 status code', async () => {
		const response = await request(app).post('/login');
	});

	it('should return a JWT token', async () => {
		const response = await request(app)
			.post('/login')
			.send({ email: 'test@example.com', password: 'testpassword' });
		expect(response.body.token).toBeDefined();
	});
});

describe('POST /login', function() {
	test('should allow a correct username/password to log in', async function() {
		const response = await request(app).get('/login');
		expect(response.statusCode).toBe(200);
		// expect(response.body).toEqual({ token: expect.any(String) });

		// let { username, admin } = jwt.verify(response.body.token, SECRET_KEY);
		// expect(username).toBe('u1');
		// expect(admin).toBe(false);
	});
	// test('should return 401 if username does not match', async function() {
	// 	const response = await request(app).post('/auth/login').send({
	// 		username: 'u1',
	// 		password: 'pwd234'
	// 	});
	// 	expect(response.statusCode).toBe(401);
	// });
});

afterAll(() => {
	// Closing the DB connection allows Jest to exit successfully.
});
