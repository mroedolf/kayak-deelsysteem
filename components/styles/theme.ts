const theme = {
	colors: {
		primary: '#005ca9',
		secondary: '#0a78bf',
		warning: '#ffc107',
		danger: '#dc3545',
		success: '#28a745',
		light: '#f8f9fa',
		dark: '#343a40',
		white: '#fff',
		black: '#000',
		disabled: '#6c757d',
		input: '#e9ebf2',
	},
	fontSizes: {
		xs: 12,
		sm: 14,
		base: 16,
		lg: 18,
		xl: 20,
		'2xl': 24,
		'3xl': 30,
		'4xl': 36,
		'5xl': 48,
		'6xl': 60,
	},
	fontWeights: {
		light: 300,
		regular: 400,
		bold: 700,
	},
	lineHeights: {
		small: 2,
		medium: 2.5,
		large: 3,
	},
	space: {
		small: 10,
		medium: 20,
		large: 30,
	},
	sizes: {
		small: 20,
		medium: 40,
		large: 60,
	},
};

export type ThemeType = typeof theme;
export default theme;
