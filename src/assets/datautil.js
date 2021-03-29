function copy(obj1) {
	var obj2 = {};
	for (var i in obj1) {
		obj2[i] = obj1[i];
	}
	return obj2
}

export default {
	copy,
};
