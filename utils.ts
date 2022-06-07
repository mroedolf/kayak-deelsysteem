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

async function request<T>(url: string, config: RequestInit): Promise<T> {
	try {
		const response = await fetch(url, config);
		return (await response.json()) as T;
	} catch (error) {
		console.log(error);
		throw new Error('Kon geen data ophalen');
	}
}

const fetchUitpasToken = async (): Promise<{ access_token: string }> => {
	try {
		// const req = await fetch(
		// 	'https://europe-west1-kajak-deelsysteem.cloudfunctions.net/authenticate',
		// 	{
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({
		// 			data: {
		// 				test: 'test',
		// 			},
		// 		}),
		// 	}
		// );

		// const res = await req.json();

		// return res.result.access_token;

		const response = await request<{ access_token: string }>(
			'https://europe-west1-kajak-deelsysteem.cloudfunctions.net/authenticate',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						test: 'test',
					},
				}),
			}
		);

		return response;
	} catch (error) {
		console.log(error);
		throw new Error('Kon uitpas token niet ophalen');
		return { access_token: '' };
	}
};

export { handleFirebaseError, isAllowedStreetName, fetchUitpasToken };
