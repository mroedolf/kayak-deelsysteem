import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { auth } from '../config/firebase';
import { log } from '../config/logger';
import { userStore } from '../stores/userStore';
import { RootStackScreenProps } from '../types';
import { handleFirebaseError } from '../utils';
import * as Yup from 'yup';
import { Input } from '../components/styles/elements/Input';
import { KeyboardAvoidingView } from '../components/styles/elements/KeyboardAvoidingView';
import { Heading } from '../components/styles/elements/Heading';
import { Button } from '../components/styles/elements/Button';
import { Text } from '../components/styles/elements/Text';
import { Section } from '../components/styles/elements/Section';
import { ErrorText } from '../components/styles/elements/ErrorText';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Ongeldig e-mail').required('Required'),
	password: Yup.string().required('Vereist'),
});

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
	const setUser = userStore().setUser;
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const toggleSecureTextEntry = () => setSecureTextEntry(!secureTextEntry);

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
					<Section flex="1 1 auto" justifyContent={'center'}>
						<Heading
							fontSize={6}
							marginBottom={30}
							fontWeight={500}
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
							<ErrorText mb={'20px'} mt={'5px'}>
								{errors.email}
							</ErrorText>
						)}
						<Input
							value={values.password}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							autoCapitalize="none"
							secureTextEntry={secureTextEntry}
							autoCompleteType="password"
							placeholder="Password"
							hasError={!!(errors.password && touched.password)}
						/>
						{errors.password && touched.password && (
							<ErrorText mb={'20px'} mt={'5px'}>
								{errors.password}
							</ErrorText>
						)}
					</Section>
					<Section flex="0 0 auto" height="80px">
						<Button
							disabled={signInMutation.isLoading || !isValid}
							onPress={handleSubmit as () => void}
						>
							<Text color="white" fontSize={15} fontWeight="bold">
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
