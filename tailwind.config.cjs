/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Outfit', 'sans-serif']
		},
		extend: {
			colors: {
				salmon: '#e74e35',
				crispbrown: '#7c4641',
				maygray: '#2c2c2c',
				softgray: '#aaa'
			}
		}
	},
	plugins: []
};
