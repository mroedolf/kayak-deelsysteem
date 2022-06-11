import { ActivityIndicator, ImageSourcePropType, View } from 'react-native';
import React, { useEffect } from 'react';
import * as Card from '../components/styles/blocks/BookingCard';
import { Section } from '../components/styles/elements/Section';
import { Price, PriceType, RootStackScreenProps, Tariff } from '../types';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import { Button } from '../components/styles/elements/Button';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { useStripe } from '@stripe/stripe-react-native';
import { collection } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useStore } from '../stores/useStore';
import {
	fetchPaymentSheetParams,
	fetchUitpasToken,
	fetchUitpasTarrifs,
	registerUitpasTicketSale,
	cancelUitpasTicketSale,
} from '../utils';
import TariffCard from '../components/Checkout/TariffCard';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/Onboarding/RoundedButton';
import kajakVertImage from '../assets/images/app/kajak-vert.png';

const TariffComponent = ({
	uitpasTariff,
	loadingUitpasTariffs,
	setToggledTarif,
	toggledTarif,
}: {
	uitpasTariff: Tariff | undefined;
	loadingUitpasTariffs: boolean;
	setToggledTarif: (tariff: Tariff | undefined) => void;
	toggledTarif: Tariff | undefined;
}) => {
	return (
		<>
			{loadingUitpasTariffs && <ActivityIndicator />}
			{uitpasTariff && (
				<TariffCard
					tariff={uitpasTariff}
					onPress={() => {
						// Toggle the selected tariff
						setToggledTarif(
							toggledTarif === uitpasTariff
								? undefined
								: uitpasTariff
						);
					}}
					toggled={toggledTarif === uitpasTariff}
				/>
			)}
			{!loadingUitpasTariffs && !uitpasTariff && (
				<Text
					color={theme.colors.light}
					fontWeight={'bold'}
					fontSize={theme.font.sizes.xl}
					marginBottom={theme.space.medium}
				>
					Geen toepasselijke tarieven gevonden
				</Text>
			)}
		</>
	);
};

const SubscriptionWarningScreen = ({
	navigation,
}: RootStackScreenProps<'SubscriptionWarning'>) => {
	const [loading, setLoading] = React.useState(false);
	const [loadingUitpasTariffs, setLoadingUitpasTariffs] =
		React.useState(false);
	const [uitpasTariff, setUitpasTariff] = React.useState<Tariff | undefined>(
		undefined
	);
	const [toggledTariff, setToggledTariff] = React.useState<
		Tariff | undefined
	>(undefined);
	const [accessToken, setAccessToken] = React.useState<string | undefined>(
		undefined
	);
	const [prices, setPrices] = React.useState<Price[] | undefined>(undefined);
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const { profile } = useStore();

	const pricesRef = collection(firestore, 'prices');
	useFirestoreQueryData(['prices'], pricesRef, undefined, {
		onSuccess: (data) => {
			setPrices(data as Price[]);
		},
		onError: (error) => {
			console.log('error', error);
		},
	});

	const [regularPrice, socialTariff] = React.useMemo(() => {
		if (prices) {
			const regularPrice = prices.find(
				(price) => price.type === PriceType.regularPrice
			);
			const socialTariff = prices.find(
				(price) => price.type === PriceType.socialTariff
			);
			return [regularPrice, socialTariff];
		}
		return [undefined, undefined];
	}, [prices]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				if (!socialTariff || !regularPrice) return;

				const { paymentIntent, ephemeralKey } =
					await fetchPaymentSheetParams(
						toggledTariff ? socialTariff.id : regularPrice.id
					);

				if (!paymentIntent || !ephemeralKey) {
					return console.log('No paymentIntent or ephemeralKey');
				}

				const { error } = await initPaymentSheet({
					customerEphemeralKeySecret: ephemeralKey,
					paymentIntentClientSecret: paymentIntent,
					merchantDisplayName: 'Kajak Deelsysteem',
					merchantCountryCode: 'BE',
					testEnv: __DEV__,
				});

				if (error) {
					console.log(error);
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (socialTariff || regularPrice)
			fetchData().catch((error) => console.log(error));
	}, [toggledTariff, socialTariff, regularPrice]);

	useEffect(() => {
		if (!profile?.uitpasNumber) return;

		const fetchTarrifs = async () => {
			const accessToken = await fetchUitpasToken();
			if (!accessToken) {
				return console.log('No accessToken');
			}

			setAccessToken(accessToken);

			if (!profile?.uitpasNumber) return console.log('No uitpasNumber');

			setLoadingUitpasTariffs(true);
			try {
				const response = await fetchUitpasTarrifs(
					accessToken,
					15,
					'0900000067513'
				);

				if (!response) {
					setUitpasTariff(undefined);
					setLoadingUitpasTariffs(false);
					return console.log('No response');
				}

				setUitpasTariff(response);
				setLoadingUitpasTariffs(false);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTarrifs().catch((error) => console.log(error));
	}, []);

	const registerTicketSale = async () => {
		if (
			!profile?.uitpasNumber ||
			!toggledTariff ||
			!regularPrice ||
			!accessToken
		)
			return;

		const result = await registerUitpasTicketSale(
			accessToken,
			'0900000067513',
			toggledTariff?.id,
			regularPrice?.value
		);

		if (!result) {
			return console.log('No result');
		}

		return result[0].id;
	};

	const cancelTicketSale = async (ticketSaleId: string) => {
		if (!accessToken) return;

		const result = await cancelUitpasTicketSale(accessToken, ticketSaleId);

		if (!result) {
			return console.log('No result');
		}
	};

	const openPaymentSheet = async () => {
		try {
			const ticketSaleId = await registerTicketSale();
			const { error } = await presentPaymentSheet();

			if (error?.code === 'Canceled') {
				await cancelTicketSale(ticketSaleId as string);
				return console.log('Canceled');
			}

			if (error) {
				await cancelTicketSale(ticketSaleId as string);
				throw error as unknown as Error;
			}

			navigation.navigate('Homescreen');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<View>
			<Section
				display={'flex'}
				height={'100%'}
				justifyContent={'space-between'}
			>
				<Section mt="40px" ml="10px">
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
					position={'absolute'}
					top={300}
					left={0}
					right={0}
					bottom={0}
					alignItems={'center'}
				>
					<Card.Image
						source={kajakVertImage as ImageSourcePropType}
						style={{
							width: '50%',
							height: '50%',
						}}
					/>
				</Section>
				<Card.Wrapper>
					<Card.SubscriptionContent>
						<Text
							fontSize={theme.font.sizes['4xl']}
							fontWeight={'bold'}
							color={theme.colors.light}
						>
							Word lid van Buurtkajaks Gent
						</Text>
						<Text
							fontSize={theme.font.sizes.base}
							color={theme.colors.light}
							mt={theme.space.medium}
						>
							Per jaar betaal je €15 per lidmaatschap of €3 indien
							je een UITPAS met kansentarief hebt. Per reservatie
							betaal je €5 per boot voor een halve dag of €1
							indien je een UITPAS met kansentarief hebt.
						</Text>
						<Section>
							<Text
								color={theme.colors.light}
								fontWeight={'bold'}
								fontSize={theme.font.sizes['2xl']}
								marginY={theme.space.medium}
							>
								Betaal met Stripe
							</Text>
							{uitpasTariff && (
								<TariffComponent
									uitpasTariff={uitpasTariff}
									loadingUitpasTariffs={loadingUitpasTariffs}
									setToggledTarif={setToggledTariff}
									toggledTarif={toggledTariff}
								/>
							)}
							{loading ? (
								<ActivityIndicator
									style={{
										marginVertical: theme.space.medium,
									}}
								/>
							) : (
								<Button
									tertiary
									// eslint-disable-next-line @typescript-eslint/no-misused-promises
									onPress={openPaymentSheet}
									marginTop={theme.space.medium}
								>
									<Text
										color={theme.colors.primary}
										fontWeight={'bold'}
										fontSize={theme.font.sizes.base}
									>
										Betaal nu
									</Text>
								</Button>
							)}
						</Section>
					</Card.SubscriptionContent>
				</Card.Wrapper>
			</Section>
		</View>
	);
};

export default SubscriptionWarningScreen;
