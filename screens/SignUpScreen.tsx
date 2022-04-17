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
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebase';
import { log } from '../config/logger';
import { RootStackScreenProps } from '../types';
import { handleFirebaseError, isAllowedStreetName } from '../utils';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Incorrect email').required('Required'),
	password: Yup.string()
		.min(6, 'Wachtwoord moet minstens 6 karakters lang zijn')
		.required('Required'),
});

const SignUpScreen = ({ navigation }: RootStackScreenProps<'SignUp'>) => {
	const signUpMutation = useAuthCreateUserWithEmailAndPassword(auth, {
		onMutate: (values) => {
			log.info('SignUpScreen.onMutate', values);
		},
		onError: (error: FirebaseError) => {
			log.error(
				`[SignUpScreen.onError] sign up error | ${error.message}`
			);
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
			initialValues={{
				email: '',
				password: '',
				confirmPassword: '',
				streetName: '',
			}}
			onSubmit={(values) => {
				if (values.password !== values.confirmPassword) {
					return Toast.show({
						type: 'error',
						text1: 'Error',
						text2: 'De wachtwoorden komen niet overeen',
					});
				}

				if (!isAllowedStreetName(values.streetName)) {
					return Toast.show({
						type: 'error',
						text1: 'Error',
						text2: 'Deze straat behoort niet tot de lijst van toegelaten straten.',
					});
				}

				signUpMutation.mutate({
					email: values.email,
					password: values.password,
				});
			}}
			validationSchema={validationSchema}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				errors,
				touched,
			}) => (
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
					{errors.email && touched.email && (
						<Text style={styles.errorText}>{errors.email}</Text>
					)}

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
					{errors.password && touched.password && (
						<Text style={styles.errorText}>{errors.password}</Text>
					)}

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

					<Text>Straatnaam</Text>
					<TextInput
						value={values.streetName}
						onChangeText={handleChange('streetName')}
						onBlur={handleBlur('streetName')}
						style={styles.input}
						autoCapitalize="none"
					/>
					{errors.streetName && touched.streetName && (
						<Text style={styles.errorText}>
							{errors.streetName}
						</Text>
					)}

					<Button
						title="Sign Up"
						onPress={handleSubmit as () => void}
						disabled={signUpMutation.isLoading}
					/>
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
	errorText: {
		color: 'red',
		fontWeight: 'bold',
		marginVertical: 10,
	},
});
