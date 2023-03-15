const BASE_URL = 'https://www.dnd5eapi.co/api';

const axios = require('axios');
const ExpressError = require('../expressError');

const getAllConditions = async () => {
	let conditions = await axios.get(`${BASE_URL}/conditions`);

	console.log(conditions.data);
	return conditions.data;
};

const getDescriptionById = async (id) => {
	let description = await axios.get(`${BASE_URL}/conditions/${id}`);

	return description.data.desc;
};

// async function getActiveConditionsDesc(char) {
// 	for (let condition in char.conditions) {
// 		let result = await axios.get(`${BASE_URL}/conditions`)
// 	}
// }

const getAllMonsters = async () => {
	let monsters = await axios.get(`${BASE_URL}/conditions`);

	console.log(monsters.data);
	return monsters.data;
};

const getAllSpells = async () => {
	let spells = await axios.get(`${BASE_URL}/spells`);
	return spells.data;
};

const getAllSpellsByLevel = async (level) => {
	let spells = await axios.get(`${BASE_URL}/spells?level=${level}`);
	return spells.data;
};

const getSpellByIndex = async (index) => {
	let spell = await axios.get(`${BASE_URL}/spells/${index}`);
	return spell.data;
};

const getRuleByIndex = async (index) => {
	let rule = await axios.get(`${BASE_URL}/rule-sections/${index}`);

	return rule.data;
};

const searchSpells = async (query) => {
	let results = await axios.get(`${BASE_URL}/spells`);
};

module.exports = {
	getAllConditions,
	getAllMonsters,
	getDescriptionById,
	getAllSpells,
	getAllSpellsByLevel,
	getSpellByIndex,
	getRuleByIndex
};
