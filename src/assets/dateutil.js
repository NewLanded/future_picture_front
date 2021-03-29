function dateFormat(date) {
	var year = date.getFullYear();
	var month = String(date.getMonth() + 1).padStart(2, '0');
	var date = date.getDate();
	return [year, month, date].join('-')
}

function getDateRange(minDate, maxDate){
	let result = [];
	minDate = new Date(minDate);
	maxDate = new Date(maxDate);
	
	while(minDate <= maxDate){
		result.push(minDate);
		minDate = new Date(minDate.getTime() + 3600 * 1000 * 24 * 1);
	}
	
	return result
}


// function objConvertToDate(data, strKey) {
// 	for (let key in data) {
// 		if (key == strKey) {
// 			data[key] = new Date(data[key])
// 		} else {
// 			if (typeof data[key] == "object") {
// 				objConvertToDate(data[key], strKey)
// 			}

// 		}
// 	}
// }


export default {
	dateFormat,
	getDateRange
};
