const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
	const authenticateUser = async (email, password, done) => {
		const queryResult = await getUserByEmail(email.toLowerCase());
		const user = queryResult.rows[0];

		if (user == null) {
			return done(null, false, { message: 'No user with that email' });
		}

		try {
			if (await bcrypt.compareSync(password, user.password)) {
				// Successful comparison of hashed passwords
				return done(null, user);
			} else {
				return done(null, false, { message: 'Password incorrect' });
			}
		} catch (e) {
			return done(e);
		}
	};

	passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
	passport.serializeUser((user, done) => {
		console.log(`in passport.serialize`);
		// https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
		return done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		console.log(`in passport.deserialize`);
		// getUserById passed in app.js passportInitialize()
		return done(null, getUserById(id));
	});
}

module.exports = initialize;
