const checkForId = (obj, id) => {
	if (obj.length > 0) {
		console.log('CHECKING OBJ FOR ID');
		console.log(obj);

		for (o of obj) {
			console.log(`o: ${o.id}`);
			console.log(`id: ${id}`);
			if (o.id == id) {
				return false;
			}
		}
		return true;
	}
	return true;
};

module.exports = { checkForId };
