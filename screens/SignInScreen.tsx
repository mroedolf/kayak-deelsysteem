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
import { log } from '../config/logger';
import { userStore } from '../stores/userStore';
import { RootStackScreenProps } from '../types';
import { handleFirebaseError } from '../utils';

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
	const setUser = userStore().setUser;
	const signInMutation = useAuthSignInWithEmailAndPassword(auth, {
		onMutate: (values) => {
			log.info(`[SignInScreen.onMutate] login attempt | ${values.email}`);
		},
		onError: (error: FirebaseError) => {
			log.error(`[SignInScreen.onError] login error | ${error.message}`);
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: handleFirebaseError(error),
			});
		},
		onSuccess: (result) => {
			log.info(
				`[SignInScreen.onSuccess] login success | ${
					result.user.email as string
				}`
			);
			setUser(result.user);

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
