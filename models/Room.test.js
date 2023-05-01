process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');

const Character = require('./Character.js');
const Room = require('./Room.js');

let testUserToken;
let testAdminToken;
let testUser;
let testRoom;
let newChar;
let newChar2;

beforeEach(async function() {
	const result = await db.query(
		`INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW())
    RETURNING id, name, email, password, created_at`,
		[ 'w', 'w@w', 'w' ]
	);

	// create user model, and get query values from that
	//
	// we'll need tokens for future requests

	testUser = result.rows[0];
	const roomResult = await Room.create({ name: 'test room' }, testUser.id);
	testRoom = roomResult;
	newChar = await Character.create('Frodo', 'Rogue', 'Hobbit', testUser.id);
	await Room.addCharacter(testRoom.id, newChar.id);

	newChar2 = await Character.create('Gandalf', 'Wizard', 'Human', testUser.id);
	await Room.addCharacter(testRoom.id, newChar2.id);
});

describe('test Room.get(id) method', () => {
	it('should successfully get room data', async () => {
		let room = await Room.get(testRoom.id);
		let conditions = await Character.getConditions(newChar.id);
		expect(room.name).toEqual('test room');
		// checking add multiple conditions
	});

	// These tests should test the actual route using user input, NOT just the db INSERT query
});

describe('test Room.getCharacters(id) method', () => {
	it('should successfully get characters in room', async () => {
		let characters = await Room.getCharacters(testRoom.id);
		let conditions = await Character.getConditions(newChar.id);
		expect(characters.length).toEqual(2);
		// console.log(characters);
		expect(characters[0].character_id).toEqual(newChar.id);
		// checking add multiple conditions
	});

	// These tests should test the actual route using user input, NOT just the db INSERT query
});

describe('test Room.removeCharacter(roomId, characterId) method', () => {
	it('should successfully remove a character ', async () => {
		// two characters should be present in room
		// removing 1
		let result = await Room.removeCharacter(testRoom.id, newChar.id);
		console.log(result);

		let characters = await Room.getCharacters(testRoom.id);
		//
		expect(characters.length).toEqual(1);

		// newChar 2 should remain

		let remainingCharacterData = await Character.get(characters[0].character_id);

		expect(remainingCharacterData.name).toEqual('Gandalf');
		// checking add multiple conditions
	});

	// These tests should test the actual route using user input, NOT just the db INSERT query
});

describe('test Room.delete(roomId) method', () => {
	it('should successfully remove a character', async () => {
		let result = await Room.delete(testRoom.id);
		console.log(result);
		expect(result.rows[0].id).toEqual(testRoom.id);
	});
});

afterEach(async () => {
	await db.query(`DELETE FROM users`);
	await db.query(`DELETE FROM characters`);
	await db.query(`DELETE FROM rooms`);
	await db.query('DELETE FROM character_room');
});

afterAll(async () => {
	await db.end();
	// Closing the DB connection allows Jest to exit successfully.
});
