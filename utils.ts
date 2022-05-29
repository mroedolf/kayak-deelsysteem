import { FirebaseError } from 'firebase/app';
import allowedStreets from './data/streetnames';

/**
 *
 * @param error FirebaseError object
 * @returns string error message
 */

// Translate error code message to Dutch
const handleFirebaseError = (error: FirebaseError) => {
	if (error.code === 'auth/email-already-in-use') {
		return 'Dit emailadres is al in gebruik';
	}

	if (error.code === 'auth/invalid-email') {
		return 'Dit emailadres is niet geldig';
	}

	if (error.code === 'auth/weak-password') {
		return 'Wachtwoord is te zwak';
	}

	if (error.code === 'auth/wrong-password') {
		return 'Wachtwoord is niet correct';
	}

	if (error.code === 'auth/user-not-found') {
		return 'Gebruiker niet gevonden';
	}

	if (error.code === 'auth/user-disabled') {
		return 'Gebruiker is uitgeschakeld';
	}

	if (error.code === 'auth/too-many-requests') {
		return 'Te veel verzoeken. Probeer het later opnieuw, of neem contact op met de beheerder';
	}

	if (error.code === 'auth/network-request-failed') {
		return 'Netwerkfout. Probeer het later opnieuw';
	}

	if (error.code === 'auth/popup-closed-by-user') {
		return 'Popup gesloten door gebruiker';
	}

	if (error.code === 'auth/popup-blocked') {
		return 'Popup geblokkeerd';
	}

	if (error.code === 'auth/operation-not-allowed') {
		return 'Operatie niet toegestaan';
	}

	return error.message;
};

/**
 * Checks if the given streetname is in the list of allowed streets
 * @param streetName string street name
 * @returns boolean true if street name is allowed
 */
const isAllowedStreetName = (streetName: string): boolean => {
	return allowedStreets.includes(streetName);
};

export { handleFirebaseError, isAllowedStreetName };
