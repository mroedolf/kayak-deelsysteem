import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { userStore } from '../stores/userStore';
import { RootTabScreenProps } from '../types';

export default function ProfileScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	const user = userStore().user;
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
