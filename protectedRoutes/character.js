const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

const Character = require('../models/Character');
const Card = require('../models/Card');

router.get('/:charId', checkAuthenticated, async (req, res, next) => {
	let currentUser = req.session.passport.user;
	let charId = req.params.charId;

	let character = await Character.get(charId);

	let cards = await Card.getAllByCharacter(charId);
	// let cards = [ { name: 'spell' }, { name: 'spell2' } ];

	console.log(`THESE ARE THE CARDS FOR THIS CHARACTER`);
	console.log(cards);

	console.log('&&&&&&&&&&&&&&');
	console.log(character);
	res.render('pages/character.ejs', { character: character, currentUser: currentUser, cards: cards });
});

router.post('/create/:charId', checkAuthenticated, async (req, res) => {
	let formData = await req.body;

	res.redirect(`room/${formData.name}`);
});

router.post('/delete/:charId', checkAuthenticated, async (req, res) => {
	let charId = req.params.charId;
	console.log(charId);
	let result = await Character.delete(charId);
	console.log(result);
	res.redirect('/user/characters');
});

module.exports = router;
