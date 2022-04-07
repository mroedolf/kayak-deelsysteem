import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Formik } from 'formik';
import React from 'react';
import {
	Button,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebase';
import { RootStackScreenProps } from '../types';
import { handleFirebaseError } from '../utils';

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
	const signInMutation = useAuthSignInWithEmailAndPassword(auth, {
		onError: (error: FirebaseError) => {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: handleFirebaseError(error),
			});
		},
		onSuccess: () => {
			navigation.navigate('Profile');
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			onSubmit={(values) => {
				signInMutation.mutate(values);
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
