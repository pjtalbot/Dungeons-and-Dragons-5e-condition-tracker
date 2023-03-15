const {
	getDescriptionById,
	getAllSpells,
	getAllSpellsByLevel,
	getSpellByIndex,
	getRuleByIndex
} = require('./dndApi.js');

process.env.NODE_ENV = 'test';

const request = require('supertest');

describe('Checks getDescriptionById method for conditions', () => {
	it('should successfully get description of condition', async () => {
		let description = await getDescriptionById('prone');
		expect(description).toEqual([
			"- A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition.",
			'- The creature has disadvantage on attack rolls.',
			'- An attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the attack roll has disadvantage.'
		]);
	});
});

describe('Checks getAllSpells() method', () => {
	it('should successfully get get all spells from external api', async () => {
		let spells = await getAllSpells();
		console.log(spells);
		expect(spells.count).toEqual(319);
	});
});

describe('Checks getSpellsByLevel method', () => {
	it('should successfully get get all spells from external api', async () => {
		let spells = await getAllSpellsByLevel(1);
		console.log(spells);
		expect(spells.count).toEqual(49);
	});
});

describe('checks getSpellByIndex() method', () => {
	it('should successfully get spell by "index"', async () => {
		let spell = await getSpellByIndex('unseen-servant');
		console.log(spell);
		expect(spell.range).toEqual('60 feet');
	});
});

describe('checks getRuleByIndex() method', () => {
	it('should successfully get rule from api', async () => {
		let rule = await getRuleByIndex('the-order-of-combat');
		console.log(rule);
		expect(rule.desc).toContain('flurry of weapon swings');
	});
});
