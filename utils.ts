import { FirebaseError } from 'firebase/app';
import allowedStreets from './data/streetnames';
import {
	Kayak,
	Reservation,
	StripeResponse,
	StripeResult,
	Tariff,
	TarrifResponse,
	TicketResponse,
	TicketResult,
} from './types';
import {useStore} from "./stores/useStore";

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

async function request<T>(url: string, config: RequestInit): Promise<T> {
	try {
		const response = await fetch(url, config);
		return (await response.json()) as T;
	} catch (error) {
		console.log(error);
		throw new Error('Kon geen data ophalen');
	}
}

const fetchUitpasToken = async (): Promise<string> => {
	try {
		const response = await request<{ result: { access_token: string } }>(
			'https://europe-west1-kayak-deelsysteem-ab8f0.cloudfunctions.net/authenticate',
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

		return response.result.access_token;
	} catch (error) {
		console.log(error);
		return '';
	}
};

const fetchUitpasTarrifs = async (
	accessToken: string,
	regularPrice: number,
	uitpasNumber: string
): Promise<Tariff | undefined> => {
	try {
		const response = await request<TarrifResponse>(
			'https://europe-west1-kayak-deelsysteem-ab8f0.cloudfunctions.net/fetchUitpasTarrifs',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						accessToken,
						regularPrice,
						uitpasNumber,
					},
				}),
			}
		);

		if (
			response.result?.available?.length &&
			response.result.status !== 400
		) {
			return response.result.available.filter((tariff) => {
				return tariff.type === 'SOCIALTARIFF';
			})[0];
		}

		return undefined;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};

const registerUitpasTicketSale = async (
	accessToken: string,
	uitpasNumber: string,
	tariffId: string,
	regularPrice: number
): Promise<TicketResult[] | undefined> => {
	try {
		console.log(
			'registerUitpasTicketSale',
			accessToken,
			uitpasNumber,
			tariffId,
			regularPrice
		);
		const response = await request<TicketResponse>(
			'https://europe-west1-kayak-deelsysteem-ab8f0.cloudfunctions.net/registerTicketSale',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						accessToken,
						uitpasNumber,
						tariffId,
						regularPrice,
					},
				}),
			}
		);

		console.log('registerUitpasTicketSale', response);

		return response.result;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};

const cancelUitpasTicketSale = async (
	accessToken: string,
	ticketSaleId: string
): Promise<boolean> => {
	try {
		const response = await request<TicketResponse>(
			'https://europe-west1-kayak-deelsysteem-ab8f0.cloudfunctions.net/cancelTicketSale',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						accessToken,
						ticketSaleId,
					},
				}),
			}
		);
		//FIXME: once the backend of this function is fixed, this should be changed to return the result of the response
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
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

const timestampToDateEU = (timestamp: number): string => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${
		day < 10 ? `0${day}` : day
	}/${month < 10 ? `0${month}` : month}/${year}` ;
};

export type GroupedReservations = Record<
	string,
	{
		timestamp: number;
		time: [
			{
				[key: number]: boolean;
			}
		];
	}
>;

/**
 * Convert an array of reservations and extracts all timestamps and converts them to dates
 * @param reservations array of reservations
 * @returns GroupedReservations grouped reservations
 */
const extractDatesFromReservations = (reservations: Reservation[]) => {
	if (!reservations) return {};

	const groupedReservations = reservations.reduce<GroupedReservations>(
		(acc, reservation) => {
			const timestamp = timestampToDate(reservation.date);
			if (!acc[timestamp]) {
				acc[timestamp] = {
					timestamp: reservation.date,
					time: [{ [reservation.time]: true }],
				};
			} else {
				acc[timestamp].time.push({ [reservation.time]: true });
			}
			return acc;
		},
		{}
	);

	return groupedReservations;
};

const generateUUID = (): string => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

const generateRandomEmail = (): string => {
	return `${generateUUID()}@test.com`;
};

const fetchPaymentSheetParams = async (
	price: string,
	email: string,
	userId: string
): Promise<StripeResult> => {
	try {
		const response = await request<StripeResponse>(
			'https://europe-west1-kayak-deelsysteem-ab8f0.cloudfunctions.net/fetchSubscriptionPaymentSheet',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						price,
						email,
						userId,
					},
				}),
			}
		);
		return response.result;
	} catch (error) {
		console.log(error);
		throw new Error('Kon betalingsschema niet ophalen');
	}
};

const fetchProductPaymentSheetParams = async (
	price: number,
	email: string,
	userId: string
): Promise<StripeResult> => {
	try {
		const response = await request<StripeResponse>(
			'https://europe-west1-kayak-deelsysteem-ab8f0.cloudfunctions.net/fetchProductPaymentSheet',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						price: price * 100,
						email,
						userId,
					},
				}),
			}
		);

		return response.result;
	} catch (error) {
		console.log(error);
		throw new Error('Kon betalingsschema niet ophalen');
	}
};

// Calculate array index by selected date corresponding to weeks of a month
const calculateIndexByDate = (timestamp: number): number => {
	const date = new Date(timestamp);
	const day = date.getDate();

	return Math.floor((day - 1) / 7);
};

export {
	handleFirebaseError,
	isAllowedStreetName,
	timestampToDate,
	timestampToDateEU,
	extractDatesFromReservations,
	generateUUID,
	fetchUitpasToken,
	generateRandomEmail,
	fetchPaymentSheetParams,
	fetchUitpasTarrifs,
	registerUitpasTicketSale,
	cancelUitpasTicketSale,
	calculateIndexByDate,
	fetchProductPaymentSheetParams,
};
