const softColors = [
	'#FAD02E', // Soft yellow
	'#F28D35', // Soft orange
	'#D83367', // Soft pink
	'#635DFF', // Soft purple
	'#508BF9', // Soft blue
	'#2EC5CE', // Soft cyan
	'#2CAEAB', // Soft teal
	'#61DEA4', // Soft green
	'#6B4226', // Soft brown
	'#D9D9D9', // Soft grey
	'#E0BBE4', // Soft lavender
	'#FFDFD3', // Soft peach
	'#FFC8A2', // Soft coral
	'#FFEBE7', // Soft rose
	'#D3FCE7', // Soft mint
	'#E4E4E4' // Soft silver
];

export function stringToColor(str: string) {
	// Hash function to get an integer from the string
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 3) - hash);
	}

	// Use the hash to pick a color from the Material-UI color palette
	const index = Math.abs(hash) % softColors.length;
	return softColors[index];
}

// Generate complementary foreground color from background color
export function getForegroundColor(backgroundColor: string) {
	// Extract R, G, B values from the color
	const r = parseInt(backgroundColor.slice(1, 3), 16) / 255;
	const g = parseInt(backgroundColor.slice(3, 5), 16) / 255;
	const b = parseInt(backgroundColor.slice(5, 7), 16) / 255;

	// Calculate the luminance
	const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

	// Return either white or black based on the luminance
	return luminance > 0.6 ? '#000000' : '#FFFFFF';
} // Expected output: #FFFFFF (white)
