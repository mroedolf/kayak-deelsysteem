/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import {
	CompositeScreenProps,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Timestamp } from 'firebase/firestore';
import { ImageSourcePropType } from 'react-native';

declare global {
	namespace ReactNavigation {
		// @ts-expect-error expect duplicate
		type RootParamList = RootStackParamList;
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	Modal: undefined;
	NotFound: undefined;
	Profile: undefined;
	SignIn: undefined;
	SignUp: undefined;
	Onboarding: undefined;
	Homescreen: undefined;
	CTAScreen: undefined;
	BookingScreen: { kayakId: string; type: string };
	Reservations: undefined;
	SubscriptionWarning: undefined;
	PurchaseSubscriptionScreen: undefined;
	MoreInfo: undefined;
	Contact: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type RootDrawerParamList = {
	Home: undefined;
	Settings: undefined;
	Profile: undefined;
	Reservations: undefined;
};

export type RootDrawerScreenProps<Screen extends keyof RootDrawerParamList> =
	CompositeScreenProps<
		DrawerScreenProps<RootDrawerParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;

export type RootTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;

export type OnboardingDataType = {
	id: number;
	title: string;
	description: string;
	picture: ImageSourcePropType;
	backgroundColor: string;
};

export enum FilterOptions {
	Alles = 'Alles',
	Eenpersoons = 'Eenpersoons',
	Tweepersoons = 'Tweepersoons',
}

export enum CheckoutTimeOptions {
	Voormiddag = 0,
	Namiddag = 1,
}

export type Reservation = {
	date: number;
	kayakId: number;
	time: CheckoutTimeOptions;
	userId: string;
	id: string;
	code: string;
};

export type Kayak = {
	id: number;
	name: string;
	description: string;
	type: string;
	image: string;
};

export type Subscription = {
	active: boolean;
	startDate?: Timestamp;
	stripe_customer_id?: string;
	stripe_subscription_id?: string;
};

export type Profile = {
	userId: string;
	email: string;
	streetName: string;
	subscription: Subscription;
	uitpasNumber?: string;
};

export type StripeResult = {
	paymentIntent: string;
	ephemeralKey: string;
};
export type StripeResponse = {
	result: StripeResult;
};

export type Tariff = {
	id: string;
	name: string;
	price: number;
	type: string;
	remaining: number;
};

export type TarrifResponse = {
	result: {
		available: Tariff[];
		status: number;
	};
};

export type Price = {
	id: string;
	type: string;
	value: number;
};

export enum PriceType {
	socialTariff = 'socialTariff',
	regularPrice = 'regularPrice',
}

export interface TicketResponse {
	result: TicketResult[];
}

export interface TicketResult {
	id: string;
	tariff: Tariff;
	eventId: string;
	uitpasNumber: string;
}
