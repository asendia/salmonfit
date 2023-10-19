/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['Outfit', 'sans-serif']
		},
		extend: {
			colors: {
				salmon: '#e74e35'
			}
		}
	},
	plugins: []
};
