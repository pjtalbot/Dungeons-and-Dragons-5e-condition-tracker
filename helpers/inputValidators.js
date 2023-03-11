const validateRegister = function(req, res) {
	// TODO: No spaces / special characters
	let pw = req.body.password;
	if (pw.length < 7 || pw.length > 30) {
		console.log('Inside PW validator');
		req.flash('info', 'Password must be between 7-30');
		throw new Error();
	}
	var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
	if (!pw.match(paswd)) {
		req.flash('info', 'Password must contain at least one number and one special character');
		throw new Error();
	}
	if (pw !== req.body.confirm) {
		req.flash('info', 'Passwords do not match');
		throw new Error();
	}
};

module.exports = validateRegister;
