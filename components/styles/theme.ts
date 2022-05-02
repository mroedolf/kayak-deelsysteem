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
	},
	fontSizes: {
		small: '12px',
		medium: '14px',
		large: '16px',
	},
	fontWeights: {
		light: 300,
		regular: 400,
		bold: 700,
	},
	lineHeights: {
		small: '18px',
		medium: '24px',
		large: '32px',
	},
	space: {
		small: '8px',
		medium: '16px',
		large: '24px',
	},
	sizes: {
		small: '10px',
		medium: '24px',
		large: '32px',
	},
};

export type ThemeType = typeof theme;
export default theme;
