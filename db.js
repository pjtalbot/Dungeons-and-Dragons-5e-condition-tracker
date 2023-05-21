const { Client } = require('pg');

let DB_URI;

if (process.env.NODE_ENV === 'test') {
	DB_URI = 'postgresql:///roller_test';
}
if (process.env.NODE_ENV === 'production') {
	DB_URI = process.env.DATABASE_URL;
} else {
	DB_URI = 'postgresql:///roller';
}

let db = new Client({
	connectionString: DB_URI
});

db.connect();

module.exports = db;
