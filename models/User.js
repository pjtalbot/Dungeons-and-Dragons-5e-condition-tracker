const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'postgres'
});

const User = sequelize.define('users', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notNull: {
				msg: 'username is required'
			},
			notEmpty: {
				msg: 'username is required'
			}
		}
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: {
				msg: 'email is required'
			},
			notEmpty: {
				msg: 'email is required'
			}
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notNull: {
				msg: 'password is required'
			},
			notEmpty: {
				msg: 'password is required'
			}
		}
	}
});

sequelize.sync();

module.exports = User;
