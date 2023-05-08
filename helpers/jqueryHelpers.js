const db = require('../db');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM('').window;
global.document = document;

var $ = (jQuery = require('jquery')(window));

const clickHandlerHP = (char) => {
	// get element clicked by ID
	// get character ID
	// update parent
};
