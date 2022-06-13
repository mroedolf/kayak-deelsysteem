/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Ionicons } from '@expo/vector-icons';
import { useAuthCreateUserWithEmailAndPassword } from '@react-query-firebase/auth';
import Checkbox from 'expo-checkbox';
import { FirebaseError } from 'firebase/app';
import { Field, Formik } from 'formik';
import React from 'react';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Button } from '../components/styles/elements/Button';
import { ErrorText } from '../components/styles/elements/ErrorText';
import { Heading } from '../components/styles/elements/Heading';
import { Input } from '../components/styles/elements/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Section } from '../components/styles/elements/Section';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import { auth } from '../config/firebase';
import { log } from '../config/logger';
import { RootStackScreenProps } from '../types';
import { handleFirebaseError, isAllowedStreetName } from '../utils';
import { Popover, usePopover } from 'react-native-modal-popover';
import { TouchableOpacity } from 'react-native';
import { useStore } from '../stores/useStore';

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
	const { setProfile } = useStore();
	const [popoverText, setPopoverText] = React.useState('');
	const {
		openPopover,
		closePopover,
		popoverVisible,
		touchableRef,
		popoverAnchorRect,
	} = usePopover();
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
		onSuccess: (user) => {
			log.info('SignUpScreen.onSuccess', user);
			navigation.navigate('SignIn');
		},
	});

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				confirmPassword: '',
				streetName: '',
				uitpas: false,
				uitpasNumber: '',
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

				setProfile({
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
				<KeyboardAwareScrollView
					style={{
						margin: theme.space.medium,
					}}
				>
					<Section flex="0 0 10%" mt={theme.space.large}>
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
					<Section
						flex="1 1 auto"
						justifyContent={'center'}
						mt={theme.space.large}
					>
						<Heading
							fontSize={theme.font.sizes['5xl']}
							marginBottom={30}
							fontWeight={500}
						>
							Maak een account
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
						<Section flexDirection={'row'}>
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
								flex={1}
								hasButton
							/>
							<TouchableOpacity
								onPress={() => {
									setPopoverText(
										'Omdat ons project gesubsidieerd is vanuit Wijkbudget Gent, is het enkel mogelijk om een boot te reserveren indien je in de Macharius Heirnis/Gentbrugge wijk woont.'
									);
									openPopover();
								}}
								ref={touchableRef}
								style={{
									flex: 1,
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: theme.colors.input,
									marginTop: theme.space.medium,
									paddingHorizontal: theme.space.small,
									borderTopRightRadius: theme.space.small,
									borderBottomRightRadius: theme.space.small,
									maxWidth: 50,
								}}
							>
								<Ionicons
									name="ios-information-circle-outline"
									color={theme.colors.primary}
									size={24}
								/>
							</TouchableOpacity>
						</Section>
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
									<Section
										flexDirection={'row'}
										justifyContent="center"
										alignItems={'center'}
									>
										<Text
											fontSize={theme.font.sizes.lg}
											fontWeight={theme.font.weights.bold}
											color={theme.colors.primary}
											marginLeft={theme.space.small}
										>
											UIT-Pas
										</Text>
									</Section>
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
					<Section flex="1 1 auto" mt={theme.space.medium}>
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
					<Popover
						visible={popoverVisible}
						onClose={closePopover}
						fromRect={popoverAnchorRect}
						backgroundStyle={{
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
						}}
						arrowStyle={{
							borderTopColor: theme.colors.primary,
						}}
						contentStyle={{
							padding: theme.space.small,
							backgroundColor: theme.colors.primary,
							borderRadius: theme.space.small,
							flex: 1,
							width: 300,
							flexShrink: 1,
						}}
						supportedOrientations={['portrait', 'landscape']}
						placement="bottom"
						useNativeDriver
					>
						<Text
							color={theme.colors.light}
							fontSize={theme.font.sizes.base}
						>
							{popoverText}
						</Text>
					</Popover>
				</KeyboardAwareScrollView>
			)}
		</Formik>
	);
};

export default SignUpScreen;
