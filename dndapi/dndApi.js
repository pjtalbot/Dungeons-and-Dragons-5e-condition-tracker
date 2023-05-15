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

const getAllMonsters = async () => {
	let monsters = await axios.get(`${BASE_URL}/monsters`);

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

const getAllDamageTypes = async () => {
	let damageType = await axios.get(`${BASE_URL}/damage-types`);
	return damageType.data;
};

const getSpellByIndex = async (index) => {
	let spell = await axios.get(`${BASE_URL}/spells/${index}`);
	return spell.data;
};

const getRuleByIndex = async (index) => {
	let rule = await axios.get(`${BASE_URL}/rule-sections/${index}`);

	return rule.data;
};

module.exports = {
	getAllConditions,
	getAllMonsters,
	getDescriptionById,
	getAllSpells,
	getAllSpellsByLevel,
	getSpellByIndex,
	getRuleByIndex,
	getAllDamageTypes
};
