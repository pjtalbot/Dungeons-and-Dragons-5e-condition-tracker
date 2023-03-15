// const Card = require('./Card.js');
// const Character = require('./Character.js');

// const db = require('../db');

// let newChar;
// let testUser;

// beforeEach(async function() {
// 	const result = await db.query(
// 		`INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW())
//     RETURNING id, name, email, password, created_at`,
// 		[ 'w', 'w@w', 'w' ]
// 	);

// 	// create user model, and get query values from that
// 	//
// 	// we'll need tokens for future requests
// 	console.log(result.rows[0]);
// 	testUser = result.rows[0];
// 	newChar = await Character.create('Frodo', 'Rogue', 'Hobbit', testUser.id);
// });

// describe('Checks addCondition method', () => {
// 	it('should successfully add condition', async () => {
// 		await Card.addSpellCardFromAPI(newChar.id, 'unseen-servant');
// 		let newCard = await Character.getConditions(newChar.id);
// 		expect(conditions).toEqual([ 'prone' ]);
// 		// checking add multiple conditions
// 		await Character.addCondition(newChar.id, 'w');
// 		conditions = await Character.getConditions(newChar.id);
// 		expect(conditions.length).toEqual(2);
// 		expect(conditions[1]).toEqual('w');
// 	});
// });
