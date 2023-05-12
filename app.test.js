process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
const db = require('./db');

describe('Get /login loads', () => {
	it('should return a 200 status code', async () => {
		const response = await request(app).get('/login');
		expect(response.statusCode).toBe(200);
	});
});

afterEach(async () => {
	await db.end();
});
