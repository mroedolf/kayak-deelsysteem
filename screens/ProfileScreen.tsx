import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useStore } from '../stores/useStore';
import { RootTabScreenProps } from '../types';
import { Text, View } from 'react-native';

export default function ProfileScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	const user = useStore().user;
	const removeUser = useStore().removeUser;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile Page</Text>
			{user && (
				<Text>
					{user.email}
					{'\n'}
					{user.displayName}
				</Text>
			)}
			<Button
				title="SignInScreen"
				onPress={() => navigation.navigate('SignIn')}
			/>
			<Button
				title="SignUpScreen"
				onPress={() => navigation.navigate('SignUp')}
			/>
			<Button
				title="SignOut"
				onPress={() => {
					removeUser();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
