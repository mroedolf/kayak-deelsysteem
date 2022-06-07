const theme = {
	colors: {
		primary: '#005ca9',
		secondary: '#0a78bf',
		warning: '#ffc107',
		danger: '#dc3545',
		success: '#28a745',
		light: '#EFF0E2',
		dark: '#343a40',
		white: '#fff',
		black: '#000',
		disabled: '#6c757d',
		input: '#DAE1DD',
		lightGrey: '#F5F5F5',
		grey: '#D8D8D8',
		darkGrey: '#6C757D',
	},
	font: {
		sizes: {
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
		weights: {
			light: 300,
			regular: 400,
			bold: 700,
		},
		families: {
			poppins: 'Poppins_400Regular',
			poppinsBold: 'Poppins_700Bold',
		},
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
