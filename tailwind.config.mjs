/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				heading: ['system-ui', '-apple-system', 'sans-serif'],
				paragraph: ['system-ui', '-apple-system', 'sans-serif'],
			},
			colors: {
				background: 'rgb(var(--background) / <alpha-value>)',
				foreground: 'rgb(var(--foreground) / <alpha-value>)',
				primary: 'rgb(var(--primary) / <alpha-value>)',
				border: 'rgb(var(--border) / <alpha-value>)',
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
};