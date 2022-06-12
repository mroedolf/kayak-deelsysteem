import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import theme from '../components/styles/theme';
import BookingScreen from '../screens/BookingScreen';
import ContactScreen from '../screens/ContactScreen';
import CTAScreen from '../screens/CTAScreen';
import Homescreen from '../screens/Homescreen';
import MoreInfoScreen from '../screens/MoreInfoScreen';
import Onboarding from '../screens/Onboarding';
import ProfileScreen from '../screens/ProfileScreen';
import PurchaseSubscriptionScreen from '../screens/PurchaseSubscriptionScreen';
import ReservationsScreen from '../screens/ReservationsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SubscriptionWarningScreen from '../screens/SubscriptionWarningScreen';
import { useStore } from '../stores/useStore';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	const user = useStore().user;
	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: { backgroundColor: theme.colors.light },
			}}
		>
			{user && Object.keys(user).length ? (
				<>
					<Stack.Screen
						name={'Homescreen'}
						component={Homescreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={'Profile'}
						component={ProfileScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={'BookingScreen'}
						component={BookingScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={'Reservations'}
						component={ReservationsScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={'SubscriptionWarning'}
						component={SubscriptionWarningScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={'PurchaseSubscriptionScreen'}
						component={PurchaseSubscriptionScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={'Contact'}
						component={ContactScreen}
						options={{
							headerShown: false,
						}}
					/>
				</>
			) : (
				<>
					<Stack.Screen
						name={'Onboarding'}
						component={Onboarding}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name={'SignIn'}
						component={SignInScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={'SignUp'}
						component={SignUpScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name={'CTAScreen'}
						component={CTAScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
			<Stack.Screen
				name={'MoreInfo'}
				component={MoreInfoScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
