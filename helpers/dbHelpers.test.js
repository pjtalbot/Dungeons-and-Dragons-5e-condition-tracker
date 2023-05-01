process.env.NODE_ENV = 'test';

const {
	checkRowExists,
	getPlayersInRoom,
	getCharactersInRoom,
	checkEmailIsAvailable,
	checkUsernameIsAvailable
} = require('./dbHelpers.js');

const app = require('../app');
const db = require('../db');

const request = require('supertest');

const Room = require('../models/Room.js');
const Character = require('../models/Character.js');
const { check } = require('express-validator');

let testUser;
let newRoom;
let roomData = { name: "w's room" };

beforeEach(async function() {
	await db.query('DELETE FROM users');
	await db.query('DELETE FROM rooms');
	await db.query('DELETE FROM user_room');
	await db.query('DELETE FROM character_room');
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

	newRoom = await Room.create(roomData, testUser.id);

	console.log(testUser.id);
});

describe('Checks checkRowExists method', () => {
	it('should return true if row exists', async () => {
		expect(testUser.name).toEqual('w');
		console.log(await checkRowExists(testUser.id, 'users'));
		const rowExists = await checkRowExists(testUser.id, 'users');
		expect(rowExists).toEqual(true);
	});
});

// describe('Checks getCharacterInRoom', () => {
// 	it('should return the user in Room', async () => {
// 		let room = await Room.get(newRoom.id);
// 		let character = await Character.create('Gollum', null, null, testUser.id);
// 		console.log(character);

// 		let result = await db.query(
// 			`INSERT INTO character_room
//         (character_id, room_id) VALUES ($1, $2)`,
// 			[ character.id, room.id ]
// 		);

// 		console.log(result);

// 		console.log(room.id);

// 		let charactersInRoom = await Room.getCharacters(room.id);
// 		console.log(charactersInRoom);

// 		expect(charactersInRoom.length).toEqual(1);
// 		expect(charactersInRoom[0].character_id).toEqual(character.id);

// 	});
// });

describe('Checks getCharacterInRoom', () => {
	it('should return the user in Room', async () => {
		let room = await Room.get(newRoom.id);
		let character = await Character.create('Gollum', null, null, testUser.id);
		console.log(character);

		let result = await db.query(
			`INSERT INTO character_room
        (character_id, room_id) VALUES ($1, $2)`,
			[ character.id, room.id ]
		);

		console.log(result);

		console.log(room.id);

		let charactersInRoom = await Room.getCharacters(room.id);
		console.log(charactersInRoom);

		expect(charactersInRoom.length).toEqual(1);
		expect(charactersInRoom[0].character_id).toEqual(character.id);
		let charactersInRoom2 = await getCharactersInRoom(room.id);
		console.log(charactersInRoom2.rows);
		expect(charactersInRoom2.rows.length).toEqual(1);
	});
});

describe('Checks checkEmailIsAvailable', () => {
	it('should return false if the email is not available', async () => {
		let result = await checkEmailIsAvailable('w@w');
		expect(result).toEqual(false);
		let result2 = await checkEmailIsAvailable('f@f');
		expect(result2).toEqual(true);
	});
});

describe('Checks checkUserNameIsAvailable functions', () => {
	it('should return false if the email is not available', async () => {
		let result = await checkUsernameIsAvailable('w');
		expect(result).toEqual(false);
		let result2 = await checkUsernameIsAvailable('f');
		expect(result2).toEqual(true);
	});
});

afterAll(async function() {
	await db.query('DELETE FROM characters');

	db.end();
});
