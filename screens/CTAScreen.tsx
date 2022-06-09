/* eslint-disable @typescript-eslint/no-var-requires */
import { Image } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../types';
import { Section } from '../components/styles/elements/Section';
import { Button } from '../components/styles/elements/Button';
import theme from '../components/styles/theme';
import { Text } from '../components/styles/elements/Text';
import { SafeAreaView } from 'react-native-safe-area-context';

const CTAScreen = ({ navigation }: RootStackScreenProps<'CTAScreen'>) => {
	return (
		<SafeAreaView
			style={{
				height: '100%',
				backgroundColor: theme.colors.light,
				marginHorizontal: theme.space.medium,
			}}
		>
			<Section
				justifyContent={'center'}
				alignItems={'center'}
				flex={'1 1 70%'}
			>
				<Image
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					source={require('../assets/images/icon.png')}
					style={{
						width: '100%',
						height: '100%',
						resizeMode: 'contain',
					}}
				/>
			</Section>
			<Section flex={'1 0 30%'}>
				<Button onPress={() => navigation.navigate('SignIn')}>
					<Text
						color="white"
						fontSize={theme.font.sizes.base}
						fontWeight="bold"
					>
						Log in
					</Text>
				</Button>
				<Button
					marginTop={'10px'}
					onPress={() => navigation.navigate('SignUp')}
					tertiary
				>
					<Text
						color={theme.colors.primary}
						fontSize={theme.font.sizes.base}
						fontWeight="bold"
					>
						Maak een account aan
					</Text>
				</Button>
				<Button
					marginTop={'10px'}
					onPress={() => navigation.navigate('SignUp')}
					tertiary
				>
					<Text
						color={theme.colors.primary}
						fontSize={theme.font.sizes.base}
						fontWeight="bold"
					>
						Meer informatie
					</Text>
				</Button>
			</Section>
		</SafeAreaView>
	);
};

export default CTAScreen;
