import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import kayakImage from '../assets/images/app/kajak-water.png';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Image } from '../components/styles/blocks/KayakCard';
import { Heading } from '../components/styles/elements/Heading';
import { Section } from '../components/styles/elements/Section';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import { RootStackScreenProps } from '../types';

const ContactScreen = ({ navigation }: RootStackScreenProps<'Contact'>) => {
	return (
		<View
			style={{
				backgroundColor: theme.colors.light,
			}}
		>
			<Section
				display={'flex'}
				justifyContent={'space-between'}
				flexBasis={'70%'}
				marginX={theme.space.medium}
			>
				<Section mt="40px">
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
				<Section flex={1}>
					<Heading
						fontSize={theme.font.sizes['4xl']}
						mb={theme.space.medium}
					>
						Contact
					</Heading>
					<Text
						fontSize={theme.font.sizes.base}
						color={theme.colors.primary}
					>
						Anouk Vermout
						{'\n'}Mart Vandeweyer
						{'\n'}
						{'\n'}Mail: buurtkajaksgent@gmail.com
						{'\n'}Gsm: 0498154590 (Anouk)
						{'\n'}
						{'\n'}Adres kajaks: Buurthuis Kaffie is Kaffie
						{'\n'}Emiel Hullebroeckplein 1,
						{'\n'}9050 Gent
						{'\n'}
						{'\n'}Heb je een vraag, opmerking of wil je schade
						melden, laat het ons weten.
					</Text>
				</Section>
			</Section>
			<Section flexBasis={'40%'}>
				<Image
					source={kayakImage as ImageSourcePropType}
					style={{
						width: '100%',
						height: '100%',
						resizeMode: 'contain',
					}}
				/>
			</Section>
		</View>
	);
};

export default ContactScreen;
