process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');

const Character = require('./Character.js');

let testUserToken;
let testAdminToken;
let testUser;
let newChar;

beforeEach(async function() {
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

describe('Checks addCondition method', () => {
	it('should successfully add condition', async () => {
		await Character.addCondition(newChar.id, 'prone');
		let conditions = await Character.getConditions(newChar.id);
		expect(conditions).toEqual([ 'prone' ]);
		// checking add multiple conditions
		await Character.addCondition(newChar.id, 'w');
		conditions = await Character.getConditions(newChar.id);
		expect(conditions.length).toEqual(2);
		expect(conditions[1]).toEqual('w');
	});

	describe('Checks removeCondition method', () => {
		it('should successfully remove condition', async () => {
			await Character.addCondition(newChar.id, 'prone');
			await Character.addCondition(newChar.id, 'w');
			conditions = await Character.getConditions(newChar.id);
			expect(conditions.length).toEqual(2);
			await Character.removeCondition(newChar.id, 'w');
			conditions = await Character.getConditions(newChar.id);
			expect(conditions.length).toEqual(1);
			expect(conditions[0]).toEqual('prone');
		});
	});

	describe('Checks removeAllConditions method', () => {
		it('should successfully remove all conditions', async () => {
			await Character.addCondition(newChar.id, 'prone');
			await Character.addCondition(newChar.id, 'w');
			conditions = await Character.getConditions(newChar.id);
			expect(conditions.length).toEqual(2);
			await Character.removeAllConditions(newChar.id);
			conditions = await Character.getConditions(newChar.id);
			expect(conditions.length).toEqual(0);
			expect(conditions).toEqual([]);
			expect(conditions[0]).toBe(undefined);
		});
	});

	describe('Checks addResistance method', () => {
		it('should successfully add resistance', async () => {
			await Character.addResistance(newChar.id, 'fire');
			console.log(newChar.resistances);
			let resistances = await Character.getResistances(newChar.id);
			expect(resistances.length).toEqual(1);
			expect(resistances[0]).toEqual('fire');
			await Character.addResistance(newChar.id, 'acid');
			resistances = await Character.getResistances(newChar.id);
			console.log(resistances);
			expect(resistances.length).toEqual(2);
		});
	});
	describe('Checks removeResistance method', () => {
		it('should successfully remove resistance', async () => {
			await Character.addResistance(newChar.id, 'fire');
			console.log(newChar.resistances);
			let resistances = await Character.getResistances(newChar.id);
			expect(resistances.length).toEqual(1);
			expect(resistances[0]).toEqual('fire');
			await Character.removeResistance(newChar.id, 'fire');
			resistances = await Character.getResistances(newChar.id);
			console.log(resistances);
			expect(resistances.length).toEqual(0);
		});
	});

	// These tests should test the actual route using user input, NOT just the db INSERT query
});

afterEach(async () => {
	await db.query(`DELETE FROM users`);
	await db.query(`DELETE FROM characters`);
});

afterAll(async () => {
	await db.end();
	// Closing the DB connection allows Jest to exit successfully.
});
