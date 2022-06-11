import theme from '../components/styles/theme';
import onboardingReserve from '../assets/images/app/onboarding/booking.png';
import onboardingKayaks from '../assets/images/app/onboarding/kajak.png';
import onboardingWelcome from '../assets/images/app/onboarding/welcome.png';
import onboardingSignIn from '../assets/images/app/onboarding/signin.png';
import onboardingPrice from '../assets/images/app/onboarding/price.png';
import { ImageSourcePropType } from 'react-native';

const onboardingData = [
	{
		id: 1,
		backgroundColor: theme.colors.light,
		title: 'Ahoi buurtbewoner!',
		description:
			'Fijn dat je de weg naar de buurtkajaks vond. Via deze app zal je een kajak kunnen reserveren. Volg volgende stappen en vaar er op uit.',
		picture: onboardingWelcome as ImageSourcePropType,
	},
	{
		id: 2,
		backgroundColor: theme.colors.light,
		title: 'Maak een account aan',
		description:
			'Per account kan je telkens 1 kajak tegelijkertijd reserveren.',
		picture: onboardingSignIn as ImageSourcePropType,
	},
	{
		id: 3,
		backgroundColor: theme.colors.light,
		title: 'Prijs',
		description:
			'Per jaar betaal je 15 euro per account. Per kajak betaal je telkens 5 euro per halve dag.',
		picture: onboardingPrice as ImageSourcePropType,
	},
	{
		id: 4,
		backgroundColor: theme.colors.light,
		title: 'Reserveer een kajak',
		description:
			'Liever voormiddag of namdidag? Liever een kajak voor 2 of voor jou alleen? Dat kies jij zelf.',
		picture: onboardingReserve as ImageSourcePropType,
	},
	{
		id: 5,
		backgroundColor: theme.colors.light,
		title: 'Trek er op uit',
		description:
			'Kijk op de kajaks en reserveer een kajak. Het is niet moeilijk!',
		picture: onboardingKayaks as ImageSourcePropType,
	},
];

export { onboardingData };
