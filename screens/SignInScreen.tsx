import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
	Button,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
} from 'react-native';
import { auth } from '../config/firebase';
import { RootStackScreenProps } from '../types';

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
	const [error, setError] = useState('');

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			onSubmit={async (values) => {
				try {
					const result = await signInWithEmailAndPassword(
						auth,
						values.email,
						values.password
					);

					if (result.user) navigation.navigate('Root');
				} catch (e: unknown) {
					if (e instanceof FirebaseError) return setError(e.message);

					setError('Something went wrong');
				}
			}}
		>
			{({ handleChange, handleBlur, handleSubmit, values }) => (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.container}
				>
					<Text>Email</Text>
					<TextInput
						value={values.email}
						onChangeText={handleChange('email')}
						onBlur={handleBlur('email')}
						style={styles.input}
						autoCapitalize="none"
						autoCompleteType="email"
					/>
					<Text>Password</Text>

					<TextInput
						value={values.password}
						onChangeText={handleChange('password')}
						onBlur={handleBlur('password')}
						style={styles.input}
						autoCapitalize="none"
						secureTextEntry
						autoCompleteType="password"
					/>
					{/* TODO: Replace this with a Toast Popup */}
					{!!error && <Text>{error}</Text>}
					{/* @ts-expect-error Seems to be a mistake in the typing of Formik */}
					<Button title="Sign In" onPress={handleSubmit} />
				</KeyboardAvoidingView>
			)}
		</Formik>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	input: {
		borderColor: 'black',
		borderWidth: 2,
		width: '100%',
		padding: 10,
	},
	button: {
		marginTop: 20,
	},
});
