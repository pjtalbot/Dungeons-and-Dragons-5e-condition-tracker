const { defineConfig } = require('cypress');
const db = require('./db');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			on('task', {
				async READFROMDB({ dbConfig, sql }) {
					let result = await db.query(sql);
					return result;
					// create a client using the config arg object
					// return the results from the sql query
				}
			});
			// implement node event listeners here
			// on('file:preprocessor', (file) => {
			// 	// ...
			// });
		},
		experimentalStudio: true,
		DB: {
			user: 'pauljordantalbot',
			host: '127.0.0.1',
			database: 'roller_test',
			port: '3000'
		}
	}
});
