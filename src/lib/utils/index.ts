export function isEmpty(obj: Record<string | number, unknown>) {
	for (const prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			return false;
		}
	}
	return true;
}

export function ruid() {
	return Math.random().toString(16);
}
