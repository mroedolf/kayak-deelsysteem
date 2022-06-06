// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: Constants.manifest?.extra?.firebaseApiKey as string,
	authDomain: Constants.manifest?.extra?.firebaseAuthDomain as string,
	databaseURL: Constants.manifest?.extra?.firebaseDatabaseURL as string,
	projectId: Constants.manifest?.extra?.firebaseProjectId as string,
	storageBucket: Constants.manifest?.extra?.firebaseStorageBucket as string,
	messagingSenderId: Constants.manifest?.extra
		?.firebaseMessagingSenderId as string,
	appId: Constants.manifest?.extra?.firebaseAppId as string,
	measurementId: Constants.manifest?.extra?.firebaseMeasurementId as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
