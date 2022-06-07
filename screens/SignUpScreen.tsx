/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAuthCreateUserWithEmailAndPassword } from '@react-query-firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Field, Formik } from 'formik';
import React from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { auth, firestore } from '../config/firebase';
import { log } from '../config/logger';
import { RootStackScreenProps } from '../types';
import { handleFirebaseError, isAllowedStreetName } from '../utils';
import * as Yup from 'yup';
import { KeyboardAvoidingView } from '../components/styles/elements/KeyboardAvoidingView';
import { Heading } from '../components/styles/elements/Heading';
import { Input } from '../components/styles/elements/Input';
import { ErrorText } from '../components/styles/elements/ErrorText';
import { Section } from '../components/styles/elements/Section';
import { Button } from '../components/styles/elements/Button';
import { Text } from '../components/styles/elements/Text';
import RoundedButton from '../components/Onboarding/RoundedButton';
import theme from '../components/styles/theme';
import Checkbox from 'expo-checkbox';
import { collection } from 'firebase/firestore';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Incorrect email').required('Required'),
	password: Yup.string()
		.min(6, 'Wachtwoord moet minstens 6 karakters lang zijn')
		.required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Wachtwoorden komen niet overeen')
		.required('Required'),
	streetName: Yup.string()
		.min(3, 'Straatnaam moet minstens 3 karakters lang zijn')
		.max(50, 'Straatnaam mag maximaal 50 karakters lang zijn')
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
	});

	const usersRef = collection(firestore, 'users');
	const usersMutation = useFirestoreCollectionMutation(usersRef, {
		onMutate: (values) => {
			log.info('[SignUpScreen.onMutate]', values);
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
				email: 'test@test.com',
				password: 'testing123',
				confirmPassword: 'testing123',
				streetName: 'Kreeftstraat',
				uitpas: true,
				uitpasNumber: '123',
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

				usersMutation.mutate({
					email: values.email,
					streetName: values.streetName,
					...(values.uitpas && {
						uitpasNumber: values.uitpasNumber,
					}),
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
				setFieldValue,
			}) => (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					minHeight={'100%'}
				>
					<Section flex="0 0 5%" mt="30px">
						<RoundedButton
							onPress={() => navigation.goBack()}
							label="Terug"
							labelSize={theme.font.sizes.lg}
							labelColor={theme.colors.primary}
							Icon={() => (
								<Ionicons
									name="chevron-back-outline"
									color={theme.colors.primary}
									size={24}
								/>
							)}
						/>
					</Section>
					<Section flex="1 1 auto" justifyContent={'center'}>
						<Heading
							fontSize={theme.font.sizes['5xl']}
							marginBottom={30}
							fontWeight={500}
						>
							Registreer een account
						</Heading>
						<Input
							value={values.email}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							autoCapitalize="none"
							autoCompleteType="email"
							placeholder="E-mailadres"
							hasError={!!(errors.email && touched.email)}
						/>
						{errors.email && touched.email && (
							<ErrorText mb={'20px'} mt={'5px'}>
								{errors.email}
							</ErrorText>
						)}
						<Input
							value={values.password}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							autoCapitalize="none"
							secureTextEntry
							autoCompleteType="password"
							placeholder="Wachtwoord"
							hasError={!!(errors.password && touched.password)}
						/>
						{errors.password && touched.password && (
							<ErrorText mb={'20px'} mt={'5px'}>
								{errors.password}
							</ErrorText>
						)}
						<Input
							value={values.confirmPassword}
							onChangeText={handleChange('confirmPassword')}
							onBlur={handleBlur('confirmPassword')}
							autoCapitalize="none"
							secureTextEntry
							autoCompleteType="password"
							placeholder="Bevestig wachtwoord"
							hasError={
								!!(
									errors.confirmPassword &&
									touched.confirmPassword
								)
							}
						/>
						{errors.confirmPassword && touched.confirmPassword && (
							<ErrorText mb={'20px'} mt={'5px'}>
								{errors.confirmPassword}
							</ErrorText>
						)}
						<Input
							value={values.streetName}
							onChangeText={handleChange('streetName')}
							onBlur={handleBlur('streetName')}
							autoCapitalize="none"
							autoCompleteType="street-address"
							placeholder="Straatnaam"
							hasError={
								!!(errors.streetName && touched.streetName)
							}
						/>
						{errors.streetName && touched.streetName && (
							<ErrorText mb={'20px'} mt={'5px'}>
								{errors.streetName}
							</ErrorText>
						)}
						<Field name="uitpas">
							{/* @ts-ignore - issue in Formik - https://github.com/jaredpalmer/formik/issues/2086 */}
							{({ field }) => (
								<Section
									flexDirection={'row'}
									alignItems={'center'}
									mt={theme.space.medium}
								>
									<Checkbox
										value={field.value}
										onValueChange={() => {
											setFieldValue(
												'uitpas',
												!field.value
											);
										}}
										style={{
											borderRadius: theme.space.small,
										}}
										color={theme.colors.primary}
									/>
									<Text
										fontSize={theme.font.sizes.lg}
										fontWeight={theme.font.weights.bold}
										color={theme.colors.primary}
										marginLeft={theme.space.small}
									>
										UIT-Pas
									</Text>
								</Section>
							)}
						</Field>
						{values.uitpas && (
							<Input
								value={values.uitpasNumber}
								onChangeText={handleChange('uitpasNumber')}
								onBlur={handleBlur('uitpasNumber')}
								autoCapitalize="none"
								placeholder="Uitpasnummer"
								hasError={
									!!(
										errors.uitpasNumber &&
										touched.uitpasNumber
									)
								}
							/>
						)}
					</Section>
					<Section flex="0 0 auto" height="80px">
						<Button
							onPress={handleSubmit as () => void}
							disabled={signUpMutation.isLoading}
						>
							<Text
								color="white"
								fontSize={15}
								fontWeight={'bold'}
							>
								Registreer
							</Text>
						</Button>
					</Section>
				</KeyboardAvoidingView>
			)}
		</Formik>
	);
};

export default SignUpScreen;
