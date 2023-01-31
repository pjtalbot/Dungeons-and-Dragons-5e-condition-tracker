const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

router.get('/:roomId', checkAuthenticated, (req, res, next) => {
	res.render('pages/room.ejs', { roomId: 1 });
});

router.post('/create', checkAuthenticated, async (req, res) => {
	let formData = await req.body;

	res.redirect(`room/${formData.name}`);
});

module.exports = router;
