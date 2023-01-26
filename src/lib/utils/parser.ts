export default async function _parse(json: string, dates: string[] | never[] = []) {
	if (dates) {
		return await parseWithDates(json, dates);
	} else {
		return await parseJson(json);
	}
}

async function parseWithDates(json: string, dates: string[]) {
	return JSON.parse(json, function (key, value) {
		if (dates.includes(key)) {
			return new Date(value);
		} else {
			return value;
		}
	});
}

async function parseJson(json: string) {
	return JSON.parse(json);
}
