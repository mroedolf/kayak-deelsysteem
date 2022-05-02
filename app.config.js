import 'dotenv/config';

export default {
	expo: {
		name: 'kajak-deelsysteem',
		slug: 'kajak-deelsysteem',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/images/icon.png',
		scheme: 'myapp',
		userInterfaceStyle: 'automatic',
		splash: {
			image: './assets/images/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'com.kajak.kajak-deelsysteem',
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/images/adaptive-icon.png',
				backgroundColor: '#ffffff',
			},
			package: 'com.kajak.deelsysteem',
		},
		web: {
			favicon: './assets/images/favicon.png',
		},
		extra: {
			firebaseApiKey: process.env.API_KEY,
			firebaseAuthDomain: process.env.AUTH_DOMAIN,
			firebaseDatabaseURL: process.env.DATABASE_URL,
			firebaseProjectId: process.env.PROJECT_ID,
			firebaseStorageBucket: process.env.STORAGE_BUCKET,
			firebaseMessagingSenderId: process.env.MESSAGING_SENDER_ID,
			firebaseAppId: process.env.APP_ID,
			firebaseMeasurementId: process.env.MEASUREMENT_ID,
		},
	},
};
