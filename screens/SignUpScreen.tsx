import { useAuthCreateUserWithEmailAndPassword } from '@react-query-firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Formik } from 'formik';
import React from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	TextInput,
	Button,
	StyleSheet,
	Text,
} from 'react-native';
import { auth } from '../config/firebase';
import { RootStackScreenProps } from '../types';

const SignUpScreen = ({ navigation }: RootStackScreenProps<'SignUp'>) => {
	const [error, setError] = React.useState('');

	const signUpMutation = useAuthCreateUserWithEmailAndPassword(auth, {
		onError: (error: FirebaseError) => {
			setError(error.message);
		},
		onSuccess: () => {
			navigation.navigate('Profile');
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '', confirmPassword: '' }}
			onSubmit={(values) => {
				if (values.password !== values.confirmPassword) {
					return setError('Passwords do not match');
				}

				signUpMutation.mutate({
					email: values.email,
					password: values.password,
				});
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
					<Text>Confirm Password</Text>

					<TextInput
						value={values.confirmPassword}
						onChangeText={handleChange('confirmPassword')}
						onBlur={handleBlur('confirmPassword')}
						style={styles.input}
						autoCapitalize="none"
						secureTextEntry
						autoCompleteType="password"
					/>
					{!!error && <Text>{error}</Text>}
					{/** @ts-expect-error Seems to be a mistake in the typing of Formik */}
					<Button title="Sign Up" onPress={handleSubmit} />
				</KeyboardAvoidingView>
			)}
		</Formik>
	);
};

export default SignUpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		marginBottom: 10,
	},
});
