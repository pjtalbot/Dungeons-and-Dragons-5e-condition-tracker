process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');

let testUserToken;
let testAdminToken;

beforeEach(async function() {
	//
	// we'll need tokens for future requests
});

describe('Get /register', () => {
	it('should return a 200 status code', async () => {
		const response = await request(app).get('/register');
		expect(response.statusCode).toBe(200);
	});
	// These tests should test the actual route using user input, NOT just the db INSERT query
});

afterAll(() => {
	// Closing the DB connection allows Jest to exit successfully.
});
