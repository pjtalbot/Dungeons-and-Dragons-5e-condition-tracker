const Sequelize = require('sequelize');
const pkg = require('../package.json');

const dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '_test' : '');

const sequelize = new Sequelize(process.env.DATABASE_URL || `postgres://localhost:6789/${dbName}`, {
	logging: true
});
