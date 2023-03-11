const BASE_URL = 'https://www.dnd5eapi.co/api';

const axios = require('axios');

const getAllConditions = async () => {
	let conditions = await axios.get(`${BASE_URL}/conditions`);

	console.log(conditions.data);
	return conditions.data;
};

const getAllMonsters = async () => {
	let monsters = await axios.get(`${BASE_URL}/conditions`);

	console.log(monsters.data);
	return monsters.data;
};

const searchSpells = async (query) => {
	let results = await axios.get(`${BASE_URL}/spells`);
};

module.exports = { getAllConditions, getAllMonsters };
