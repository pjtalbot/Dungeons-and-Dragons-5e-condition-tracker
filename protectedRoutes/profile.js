const express = require('express');
const router = new express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/checkAuth');
const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../db.js');
const yup = require('yup');

router.get('/', checkAuthenticated, (req, res) => {
	res.render('pages/index.ejs', { name: req.user.name });
});

router.get('/characters', checkAuthenticated, async (req, res) => {
	// TODO: set up schema, and use THAT to both create the form AND add user input
	// Find a good library for that
	res.render('pages/characters.ejs');
});

router.get('/rooms', checkAuthenticated, async (rec, res) => {
	// TODO: First set up seperate client for chat
	// make sure both work simultaneously before moving on
	// simple counter?
	res.render('pages/rooms.ejs');
});

module.exports = router;
