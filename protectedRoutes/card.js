const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

const Card = require('../models/Card');

router.get('/:charId', checkAuthenticated, async (req, res, next) => {
	let currentUser = req.session.passport.user;
	let charId = req.params.charId;

	let character = await Card.get(charId);

	console.log('&&&&&&&&&&&&&&');
	console.log(character);
	console.log(character.conditions);
	res.render('pages/character.ejs', { character: character, currentUser: currentUser });
});

router.post('/create/:charId', checkAuthenticated, async (req, res, next) => {
	try {
		console.log(req.params);

		let charId = req.params.charId;
		console.log(charId);

		// How to access the associated character's ID?
		let formData = await req.body;

		console.log(`Character name: ${formData.name}`);

		let data = Object.values(formData);

		console.log(...Object.values(formData));

		// attempted to pass in spread array, didn't work
		// practice spread operator

		let newCard = await Card.create(
			formData.name,
			formData.category,
			formData.type,
			formData.properties,
			formData.desc,
			formData.damage,
			formData.bonus,
			charId
		);
		console.log(newCard);

		res.redirect(`/character/${charId}`);
	} catch (e) {
		console.log(e);
		throw e;
	}
});

router.post('/delete/:charId', checkAuthenticated, async (req, res) => {
	let charId = req.params.charId;
	console.log(charId);
	let result = await Character.delete(charId);
	console.log(result);
	res.redirect('/user/characters');
});

module.exports = router;
