const { checkAuthenticated, checkNotAuthenticated } = require('./checkAuth.js');

process.env.NODE_ENV = 'test';

const request = require('supertest');

// describe('Checks checkAuthenticated method ', () => {
// 	it('should return true if authenticated', async () => {
// 		let isAuthenticated = await checkAuthenticated();
// 		expect(description).toEqual([
// 			"- A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.",
// 			'- The creature has disadvantage on attack rolls.',
// 			'- An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.'
// 		]);
// 	});
// });
