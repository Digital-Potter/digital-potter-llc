import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			'digital-potter-bgs': '#fffdee',
			'digital-potter-body': '#331f1f',
			'digital-potter-light-gray': '#efefef',
			'digital-potter-green': '#00d85c',
			'digital-potter-dark': '#331f1f',
			'digital-potter-dark-green': '#007431',
		},

		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			dropShadow: {
				'digital-potter-text': '0 5px 15px rgba(0,0,0,0.16)',
				'digital-potter-darker': '0 3px 15px rgba(0,0,0,0.75)',
			},
			boxShadow: {
				'digital-potter-box': '0 5px 15px rgba(0,0,0,0.16)',
				'digital-potter-image': '0 0 25px rgba(0,0,0,0.75)',
			},
			borderRadius: {
				'digital-potter-sm': '1.25rem',
				'digital-potter-md': '1.875rem',
				'digital-potter-lg': '2.1875rem',
				full: '50%',
			},
		},
	},
	plugins: [],
};
export default config;
