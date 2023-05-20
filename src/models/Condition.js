const db = require('../db');
const { getDescriptionById } = require('../dndapi/dndApi.js');

class Condition {
	constructor(name, index, desc) {
		this.name = name;
		this.index = index;
		this.desc = desc;
	}

	static create(index) {
		let newCondition = getDescriptionById(index);
		return newCondition;
	}
}

module.exports = Condition;
