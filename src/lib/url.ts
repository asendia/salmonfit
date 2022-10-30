export function urlHashFromName(text: string) {
	return text.toLowerCase().replace(/ /g, '-');
}
