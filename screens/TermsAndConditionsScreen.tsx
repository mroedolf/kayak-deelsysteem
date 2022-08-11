import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import kayakImage from '../assets/images/app/kajak-water.png';
import gentPicture from '../assets/images/app/logoGent.png';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Heading } from '../components/styles/elements/Heading';
import { Section } from '../components/styles/elements/Section';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import { RootStackScreenProps } from '../types';

const TermsAndConditionsScreen = ({ navigation }: RootStackScreenProps<'TermsAndConditions'>) => {
	return (
		<View
			style={{
				backgroundColor: theme.colors.light,
			}}
		>
			<Section
				display={'flex'}
				justifyContent={'space-between'}
				flexBasis={'100%'}
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
						fontSize={theme.font.sizes['3xl']}
						mb={theme.space.medium}
					>
						Gebruiksvoorschriften
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
							De gebruiker houdt zich (in voorkomend geval - samen met de andere deelnemers) aan de volgende Gebruiksvoorschriften:
						</Text>
						<View>
							<Text
								fontWeight={theme.font.weights.bold}
								fontSize={theme.font.sizes.xl}
								color={theme.colors.primary}
								mt={theme.space.large}
							>
								1. Veiligheid
							</Text>
							<Section ml={20}>
								<Text color={theme.colors.primary}>{'\n'}1. Om een kajak te reserveren moet je 18+ zijn.</Text>
								<Text color={theme.colors.primary}>{'\n'}2. Er moet altijd minstens 1 iemand van 18+ in de kajak zitten.</Text>
								<Text color={theme.colors.primary}>{'\n'}3. Om een kajak te reserveren moet je kunnen zwemmen.</Text>
								<Text color={theme.colors.primary}>{'\n'}4. Iedereen moet ten alle tijden op het water een zwemvest dragen.</Text>
								<Text color={theme.colors.primary}>{'\n'}5. Je verbindt zich ertoe alleen op daarvoor bestemde kajakroutes te varen</Text>
								<Text color={theme.colors.primary}>{'\n'}6. Het is verboden om gebruik te maken van de vaartuigen onder invloed van alcohol en/of drugs/verdovende middelen. Het gebruik van alcoholische dranken of verdovende middelen/drugs is tevens ook verboden tijdens de tocht</Text>
								<Text color={theme.colors.primary}>{'\n'}7. Het is verboden om te zwemmen in de Gentse binnenwateren</Text>
								<Text color={theme.colors.primary}>{'\n'}8. Het is verboden om afval overboord te gooien.</Text>
								<Text color={theme.colors.primary}>{'\n'}9. Gebruiker verbindt zich ertoe om met niet meer personen dan er zitplaatsen in het vaartuig aanwezig zijn gebruik te maken van het vaartuig.</Text>
								<Text color={theme.colors.primary}>{'\n'}10. Het is niet toegestaan het vaartuig onbeheerd achter te laten.</Text>
								<Text color={theme.colors.primary}>{'\n'}11. Gebruiker geeft steeds voorrang aan gemotoriseerde vaartuigen en bij tegenliggers houdt hij steeds rechts aan op het water.</Text>
								<Text color={theme.colors.primary}>{'\n'}12. Bij stormweer kunnen de reservaties door Buurtkajaks Gent geannuleerd worden. Bij slecht weer worden de gebruikers geadviseerd hun reservaties te verplaatsen naar een andere datum.</Text>
								<Text color={theme.colors.primary}>{'\n'}13. Gebruiker dient voor afvaart te controleren of het vaartuig aanwezig, volledig toegerust en deugdelijk is. Indien dit niet het geval is, stuur een mailtje naar buurtkajaksgent@gmail.com of bel 0485927581</Text>
								<Text color={theme.colors.primary}>{'\n'}14. Buurtkajaks Gent is verzekerd inzake haar burgerlijke aansprakelijkheid tegenover deelnemers en derden. Buurtkajaks Gent is niet verzekerd voor ongevallen waarbij gebruikers en derden betrokken zijn. Het is de eigen verzekering (zoals familiale verzekering) van de gebruiker en derden die de schade bij ongevallen dekt.</Text>
							</Section>
						</View>
						<View>
							<Text
								fontWeight={theme.font.weights.bold}
								fontSize={theme.font.sizes.xl}
								color={theme.colors.primary}
								mt={theme.space.large}
							>
								2. Respect/Schade
							</Text>
							<Section ml={20}>
								<Text color={theme.colors.primary}>{'\n'}1. De opslagplaats van Buurtkajaks Gent is een gedeelde ruimte met andere organisaties. Gebruik enkel materiaal dat toebehoort aan Buurtkajaks Gent.</Text>
								<Text color={theme.colors.primary}>{'\n'}2. De opslagplaats van Buurtkajaks Gent is een gedeelde ruimte met andere organisaties. Ga enkel het gebouw binnen voor het ophalen en terugbrengen van de kajaks en toebehoren.</Text>
								<Text color={theme.colors.primary}>{'\n'}3. Heb respect voor het materiaal. Doe geen dingen die je niet met je eigen boot zou doen.</Text>
								<Text color={theme.colors.primary}>{'\n'}4. Indien het vaartuig door de gebruiker niet schoon, niet in de staat waarin het werd gehuurd of niet in de staat waarin het direct verhuurbaar is, wordt geretourneerd door gebruiker, kunnen we een bedrag van € 10,00 in rekening brengen. ‘Niet schoon’ verwijst naar, onder andere, de aanwezigheid van afval, vuil, vetvlekken, sporen van drank en voedsel enz.</Text>
								<Text color={theme.colors.primary}>{'\n'}5. Tijdens het varen ben je verantwoordelijk voor de boten en de peddels. Dit houdt in dat je met respect omgaat met de gehuurde boten. Niet botsen tegen andere boten en tegen bruggen. Bij verlies van een peddel meld je dit via mail: buurtkajaksgent@gmail.</Text>
								<Text color={theme.colors.primary}>{'\n'}6. Gebreken die uiterlijk zichtbaar zijn, dienen onmiddellijk bij in ontvangstneming schriftelijk kenbaar te worden gemaakt aan Buurtkajaks Gent. Verborgen gebreken dienen onmiddellijk na de ontdekking, schriftelijk kenbaar te worden gemaakt aan Buurtkajaks Gent. De gebruiker draagt de bewijslast dat dergelijk gebrek aanwezig was op de datum van zijn reservatie voordat hij/zij met de boot begon te varen. In ieder geval zal elke schade geacht worden te zijn veroorzaakt door de gebruiker van zodra hij/zij de gehuurde boot verder gebruikt. Meld schade via mail: buurtkajaksgent@gmail.</Text>
								<Text color={theme.colors.primary}>{'\n'}7. Bij opzettelijke schade verhalen we de kosten voor reparatie bij de gebruiker.</Text>
								<Text color={theme.colors.primary}>{'\n'}8. Bij misbruik en niet naleven van deze voorschriften kunnen we je lidmaatschap beëindigen.</Text>

							</Section>
						</View>
						<View>
							<Text
								fontWeight={theme.font.weights.bold}
								fontSize={theme.font.sizes.xl}
								color={theme.colors.primary}
								mt={theme.space.large}
							>
								3. Reservatie
							</Text>
							<Section ml={20}>
								<Text color={theme.colors.primary}>{'\n'}1. Het startpunt en eindpunt van de tocht: Buurtcentrum Gentbrugge, Emiel Hullebroeckplein 1, 9050 Gent</Text>
								<Text color={theme.colors.primary}>{'\n'}2. Gebruik enkel de boot waarvoor je een reservatie maakte.</Text>
								<Text color={theme.colors.primary}>{'\n'}3. Breng de gehuurde boot binnen het daarvoor voorziene tijdstip terug.</Text>
								<Text color={theme.colors.primary}>{'\n'}4. Indien de gebruiker meer dan 2 keer de boot laattijdig terugbrengt verliest de gebruiker het recht om kajaks te reserveren voor een bepaalde periode van 1 jaar.</Text>
							</Section>
						</View>
						<View>
							<Text
								fontWeight={theme.font.weights.bold}
								fontSize={theme.font.sizes.xl}
								color={theme.colors.primary}
								mt={theme.space.large}
							>
								4. Slotbepalingen
							</Text>
							<Section ml={20}>
								<Text color={theme.colors.primary}>{'\n'}1. Deze Gebruiksvoorschriften worden aanvaard bij de reservatie door het invullen van het reservatieformulier via de mobiele applicatie of bij verhuur ter plaatse.</Text>
								<Text color={theme.colors.primary}>{'\n'}2. Bevoegde rechtbank in geval van betwisting is de rechtbank te Gent.</Text>
								<Text color={theme.colors.primary}>{'\n'}3. Dit project is mogelijk gemaakt met steun van Wijkbudget Gent.</Text>
							</Section>
						</View>
						<Text mt={20} color={theme.colors.primary} fontWeight={theme.font.weights.bold}>We hopen dat iedereen zijn steentje bijdraagt om er een duurzaam project van te maken.</Text>
						<Image
							source={gentPicture as ImageSourcePropType}
							style={{
								width: '100%',
								resizeMode: 'contain',
							}}
						/>
					</ScrollView>
				</Section>
			</Section>
			{/*<Section flexBasis={'25%'}>*/}
			{/*	<Image*/}
			{/*		source={kayakImage as ImageSourcePropType}*/}
			{/*		style={{*/}
			{/*			width: '100%',*/}
			{/*			height: '100%',*/}
			{/*			resizeMode: 'contain',*/}
			{/*		}}*/}
			{/*	/>*/}
			{/*</Section>*/}
		</View>
	);
};

export default TermsAndConditionsScreen;
