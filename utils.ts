import { FirebaseError } from 'firebase/app';
import allowedStreets from './data/streetnames';
import { Reservation } from './types';

/**
 * Handle the translation of the given Firebase error
 * @param error FirebaseError object
 * @returns string error message
 */
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

	if (error.code === 'auth/invalid-api-key') {
		return 'Ongeldige API key';
	}

	if (error.code === 'auth/app-deleted') {
		return 'App is verwijderd';
	}

	if (error.code === 'auth/invalid-user-token') {
		return 'Ongeldige gebruikerstoken';
	}

	if (error.code === 'auth/invalid-credential') {
		return 'Ongeldige credentie';
	}

	if (error.code === 'auth/invalid-verification-code') {
		return 'Ongeldige verificatiecode';
	}

	if (error.code === 'auth/invalid-verification-id') {
		return 'Ongeldige verificatie ID';
	}

	if (error.code === 'auth/missing-verification-code') {
		return 'Verificatiecode ontbreekt';
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

/**
 * Convert a timestamp to a date object using YYYY-MM-DD format
 * @param timestamp number timestamp
 * @returns string date in YYYY-MM-DD format
 */
const timestampToDate = (timestamp: number): string => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${year}-${month < 10 ? `0${month}` : month}-${
		day < 10 ? `0${day}` : day
	}`;
};

/**
 * Convert an array of reservations and extracts all timestamps and converts them to dates
 * @param reservations array of reservations
 * @returns array of dates
 */
const extractDatesFromReservations = (
	reservations: Reservation[]
): string[] => {
	if (!reservations) return [];

	const dates: string[] = [];

	reservations.forEach((reservation) => {
		dates.push(timestampToDate(reservation.date));
	});

	return dates;
};

export {
	handleFirebaseError,
	isAllowedStreetName,
	timestampToDate,
	extractDatesFromReservations,
};
