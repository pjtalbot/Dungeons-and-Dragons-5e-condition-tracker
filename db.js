const { Client } = require('pg');

let DB_URI;

if (process.env.NODE_Env === 'test') {
	DB_URI = 'postgresql:///roller_test';
} else {
	DB_URI = 'postgresql:///roller';
}

let db = new Client({
	connectionString: DB_URI
});

db.connect();

module.exports = db;
