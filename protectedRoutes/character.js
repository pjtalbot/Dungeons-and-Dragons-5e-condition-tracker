const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

const { getAllConditions } = require('../dndapi/dndApi');

const Character = require('../models/Character');
const Card = require('../models/Card');

router.get('/:charId', checkAuthenticated, async (req, res, next) => {
	let currentUser = req.session.passport.user;
	let charId = req.params.charId;

	let character = await Character.get(charId);

	let cards = await Card.getAllByCharacter(charId);
	// let cards = [ { name: 'spell' }, { name: 'spell2' } ];

	res.render('pages/character.ejs', { character: character, currentUser: currentUser, cards: cards });
});

router.post('/create/:charId', checkAuthenticated, async (req, res) => {
	// TODO: What was I doing here?
	// Is this route even used?
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

router.post('/:charId/update/hp', checkAuthenticated, async (req, res) => {
	let charId = req.params.charId;
	let maxHP = req.body.max_hp;
	let result = await Character.setMaxHP(charId, maxHP);

	res.redirect(`/character/${charId}`);
});

router.post('/:charId/update/conditions', checkAuthenticated, async (req, res) => {
	let conditionId = req.body.condition;
	let charId = req.params.charId;
	let result = await Character.addCondition(charId, conditionId);
	res.redirect(`/character/${charId}`);
});

router.post('/:charId/add/resistance', checkAuthenticated, async (req, res) => {
	let resistances = req.body.resistances;
	let charId = req.params.charId;
	let result = await Character.addResistances(charId, resistances);
	res.redirect(`/character/${charId}`);
});

router.post('/:charId/remove/:condition', checkAuthenticated, async (req, res) => {
	try {
		// TODO: remove conditions broken
		let conditionId = req.params.condition;
		let charId = req.params.charId;
		console.log('******REMOVE CONDITIONS*****');
		// let conditionsArr = await Character
		let result = await Character.removeCondition(charId, conditionId);
		res.redirect(`/character/${charId}`);
	} catch (e) {
		console.log(e);
	}
});

// Removes all conditions
router.post('/:charId/removeAll/conditions', checkAuthenticated, async (req, res) => {
	try {
		// TODO: remove conditions broken
		let conditionId = req.body.condition;
		let charId = req.params.charId;
		console.log('******REMOVE CONDITIONS*****');
		// let conditionsArr = await Character
		let result = await Character.removeAllConditions(charId);
		res.redirect(`/character/${charId}`);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
