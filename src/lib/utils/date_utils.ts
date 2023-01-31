export function localizeDate(date: string): string {
	return new Date(date).toLocaleString();
}

export function isPassed(date: string) {
	return new Date(date).getTime() <= Date.now();
}
