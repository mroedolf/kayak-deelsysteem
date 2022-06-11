import { View, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../types';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Heading } from '../components/styles/elements/Heading';
import { Section } from '../components/styles/elements/Section';
import theme from '../components/styles/theme';
import kayakImage from '../assets/images/app/kajak-water.png';
import { Text } from '../components/styles/elements/Text';
import { ScrollView } from 'react-native-gesture-handler';
import locationPicture from '../assets/images/app/location.png';

const MoreInfoScreen = ({ navigation }: RootStackScreenProps<'MoreInfo'>) => {
	return (
		<View
			style={{
				backgroundColor: theme.colors.light,
			}}
		>
			<Section
				display={'flex'}
				justifyContent={'space-between'}
				flexBasis={'80%'}
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
						Meer informatie
					</Heading>
					<ScrollView
						style={{
							flex: 1,
						}}
					>
						<Text
							fontSize={theme.font.sizes.base}
							color={theme.colors.primary}
							fontWeight={theme.font.weights.bold}
						>
							Welkom bij Buurtkajaks Gent, het kajakdeelsysteem
							binnen de wijk Macharius-Heirnis en Gentbrugge. Wil
							je ook graag in Gent rond peddelen?
						</Text>
						<Text
							fontSize={theme.font.sizes.base}
							color={theme.colors.primary}
							mt={theme.space.small}
						>
							<Text
								fontWeight={theme.font.weights.bold}
								fontSize={theme.font.sizes.lg}
							>
								Zo werkt het:
							</Text>
							{'\n'}
							{'\n'}1. Word lid van Buurtkajaks Gent.
							{'\n'}
							{'\n'}2. Reserveer een kajak. Je kan kiezen voor een
							single kajak of een kajak voor 2 personen.
							Reservatie is mogelijk binnen het tijdsblok 7u-13u30
							of 14u-22u.
							{'\n'}
							{'\n'}3. Aan het einde van je reservatie ontvang je
							een code van 4 cijfers. Met deze code open je het
							sleutelkluisje aan de ingang van de grote poort van
							Buurthuis Gentbrugge. Neem de sleutel en ga binnen.
							{'\n'}
							{'\n'}4. Neem je boot + peddel + zwemvest. De boten
							hangen met dezelfde code vast aan een ketting.
							{'\n'}
							{'\n'}5. Sluit de deur met de sleutel. Laat de
							sleutel achter in het sleutelkluisje. {'\n'}
							{'\n'}
							<Text
								fontWeight={theme.font.weights.bold}
								fontSize={theme.font.sizes.lg}
							>
								Wat kost dat?
							</Text>
							{'\n'}
							{'\n'}Per jaar betaal je €15 per lidmaatschap of €3
							indien je een UITPAS met kansentarief hebt. Per
							reservatie betaal je €5 per boot voor een halve dag
							of €1 indien je een UITPAS met kansentarief hebt.
							{'\n'}
							{'\n'}Wil je graag vuilnis uit het water halen
							tijdens het peddelen? Je kan gratis een vuilruilm
							kano reserveren. {'\n'}
							{'\n'}Werk je in een sociale organisatie binnen de
							wijk Macharius-Heirnis of Gentbruggel? Elke
							donderdag stellen wij onze kajaks gratis ter
							beschikking. Contacteer ons via
							buurtkajaksgent@gmail.com {'\n'}
							{'\n'}Dit project is in samenwerking met Buurthuis
							Gentbrugge, Buurthuis Macharius Heirnis en vzw
							Dokano. Mogelijk gemaakt via Wijkbudget Gent.
						</Text>
						<Text
							fontWeight={theme.font.weights.bold}
							fontSize={theme.font.sizes.xl}
							color={theme.colors.primary}
							mt={theme.space.large}
						>
							Locatie
						</Text>
						<Text
							mt={theme.space.small}
							color={theme.colors.primary}
							mb={-theme.space.large}
						>
							Buurthuis Gentbrugge
							{'\n'}Emiel Hullebroeckplein 1 {'\n'}9050 Gent
						</Text>
						<Image
							source={locationPicture as ImageSourcePropType}
							style={{
								width: '100%',
								resizeMode: 'contain',
							}}
						/>
					</ScrollView>
				</Section>
			</Section>
			<Section flexBasis={'25%'}>
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

export default MoreInfoScreen;
