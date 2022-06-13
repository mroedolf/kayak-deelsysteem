import { Ionicons } from '@expo/vector-icons';
import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { collection } from 'firebase/firestore';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';
import RoundedButton from '../components/Onboarding/RoundedButton';
import PasswordButton from '../components/PasswordButton';
import { Button } from '../components/styles/elements/Button';
import { ErrorText } from '../components/styles/elements/ErrorText';
import { Heading } from '../components/styles/elements/Heading';
import { Input } from '../components/styles/elements/Input';
import { KeyboardAvoidingView } from '../components/styles/elements/KeyboardAvoidingView';
import { Section } from '../components/styles/elements/Section';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import TextLink from '../components/TextLink';
import { auth, firestore } from '../config/firebase';
import { log } from '../config/logger';
import { useStore } from '../stores/useStore';
import { RootStackScreenProps } from '../types';
import { handleFirebaseError } from '../utils';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Ongeldig e-mail').required('Required'),
	password: Yup.string().required('Vereist'),
});

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
	const { setUser, profile, setProfile } = useStore();
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const toggleSecureTextEntry = () => setSecureTextEntry(!secureTextEntry);
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
			navigation.navigate('Homescreen');
		},
	});

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
			setProfile({
				...profile,
				userId: result.user.uid,
				email: result.user.email as string,
				subscription: {
					active: false,
				},
			});

			usersMutation.mutate({
				userId: result.user.uid,
				email: result.user.email as string,
				streetName: '',
				subscription: {
					active: false,
				},
			});
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			onSubmit={(values) => {
				signInMutation.mutate(values);
			}}
			validationSchema={validationSchema}
		>
			{({
				handleChange,
				handleBlur,
				isValid,
				handleSubmit,
				values,
				touched,
				errors,
			}) => (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					justifyContent={'center'}
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
							marginBottom={theme.space.large}
							fontWeight={theme.font.weights.bold}
						>
							Meld je aan
						</Heading>
						<Input
							value={values.email}
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							autoCapitalize="none"
							autoCompleteType="email"
							placeholder="Email"
							hasError={!!(errors.email && touched.email)}
						/>
						{errors.email && touched.email && (
							<ErrorText>{errors.email}</ErrorText>
						)}
						<Section flexDirection={'row'}>
							<Input
								value={values.password}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								autoCapitalize="none"
								secureTextEntry={secureTextEntry}
								autoCompleteType="password"
								placeholder="Password"
								hasError={
									!!(errors.password && touched.password)
								}
								flex={'1'}
								hasButton
							/>
							<PasswordButton
								onPress={toggleSecureTextEntry}
								isVisible={!secureTextEntry}
								backgroundColor={theme.colors.input}
								flex={'0 0 auto'}
								alignItems={'center'}
								justifyContent={'center'}
								paddingX={theme.space.small}
								borderTopRightRadius={theme.space.small}
								borderBottomRightRadius={theme.space.small}
								marginTop={theme.space.medium}
							/>
						</Section>
						{errors.password && touched.password && (
							<ErrorText>{errors.password}</ErrorText>
						)}
						<TextLink
							alignSelf={'flex-end'}
							onPress={() => navigation.navigate('SignUp')}
							label="Nog geen account?"
						/>
					</Section>
					<Section></Section>
					<Section flex="0 0 auto" height="80px">
						<Button
							disabled={signInMutation.isLoading || !isValid}
							onPress={handleSubmit as () => void}
						>
							<Text
								color="white"
								fontSize={theme.font.sizes.base}
								fontWeight="bold"
							>
								Log in
							</Text>
						</Button>
					</Section>
				</KeyboardAvoidingView>
			)}
		</Formik>
	);
};

export default SignInScreen;
