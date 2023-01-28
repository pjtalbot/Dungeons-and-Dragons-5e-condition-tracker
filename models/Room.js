const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define('room', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	gamemaster_id: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Room;
