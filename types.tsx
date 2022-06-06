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
	BookingScreen: { kayakId: string };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type RootDrawerParamList = {
	Home: undefined;
	Settings: undefined;
	Profile: undefined;
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
	picture: string;
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
	userUid: string;
};
