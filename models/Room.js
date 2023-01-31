// const Sequelize = require('sequelize');
// const sequelize = require('./index.js');

// const Room = sequelize.define('rooms', {
// 	id: {
// 		type: Sequelize.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true
// 	},
// 	name: {
// 		type: Sequelize.STRING,
// 		allowNull: false,
// 		unique: false,
// 		validate: {
// 			notNull: {
// 				msg: 'name is required'
// 			},
// 			notEmpty: {
// 				msg: 'name is required'
// 			}
// 		}
// 	}
// 	// creator: {
// 	// 	type: Sequelize.INTEGER,
// 	// 	allowNull: false,
// 	// 	unique: false,
// 	// 	validate: {
// 	// 		isEmail: {
// 	// 			msg: 'email is required'
// 	// 		},
// 	// 		notEmpty: {
// 	// 			msg: 'email is required'
// 	// 		}
// 	// 	}
// 	// }
// });

// sequelize.sync();

// module.exports = Room;
