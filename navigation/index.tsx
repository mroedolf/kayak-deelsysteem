import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Onboarding from '../screens/Onboarding';
import { userStore } from '../stores/userStore';

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
	const user = userStore().user;

	return (
		<Stack.Navigator>
			{!user ? (
				<Stack.Screen
					name={'Onboarding'}
					component={Onboarding}
					options={{
						headerShown: false,
					}}
				/>
			) : (
				<Stack.Screen
					name={'Profile'}
					component={ProfileScreen}
					options={{
						headerShown: false,
					}}
				/>
			)}
			<Stack.Screen
				name={'SignIn'}
				component={SignInScreen}
				options={{ title: 'SignIn' }}
			/>
			<Stack.Screen
				name={'SignUp'}
				component={SignUpScreen}
				options={{ title: 'SignUp' }}
			/>
		</Stack.Navigator>
	);
}
