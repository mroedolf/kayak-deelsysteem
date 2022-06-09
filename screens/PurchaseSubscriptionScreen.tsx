import { ActivityIndicator, View } from 'react-native';
import React, { useEffect } from 'react';
import { Section } from '../components/styles/elements/Section';
import { Text } from '../components/styles/elements/Text';
import { Button } from '../components/styles/elements/Button';
import * as Card from '../components/styles/blocks/BookingCard';
import { Price, PriceType, RootStackScreenProps, Tariff } from '../types';
import { useStripe } from '@stripe/stripe-react-native';
import {
	fetchPaymentSheetParams,
	fetchUitpasTarrifs,
	fetchUitpasToken,
} from '../utils';
import theme from '../components/styles/theme';
import TariffCard from '../components/Checkout/TariffCard';
import { collection } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useFirestoreQueryData } from '@react-query-firebase/firestore';
import { useStore } from '../stores/useStore';

const PurchaseSubscriptionScreen = ({
	navigation,
}: RootStackScreenProps<'PurchaseSubscriptionScreen'>) => {
	const [loading, setLoading] = React.useState(false);
	const [loadingUitpasTariffs, setLoadingUitpasTariffs] =
		React.useState(false);
	const [uitpasTariff, setUitpasTariff] = React.useState<Tariff | undefined>(
		undefined
	);
	const [toggledTarif, setToggledTarif] = React.useState<Tariff | undefined>(
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
						toggledTarif ? socialTariff.id : regularPrice.id
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
		fetchData().catch((error) => console.log(error));
	}, [toggledTarif]);

	useEffect(() => {
		const fetchTarrifs = async () => {
			const accessToken = await fetchUitpasToken();
			if (!accessToken) {
				return console.log('No accessToken');
			}

			setLoadingUitpasTariffs(true);
			try {
				const response = await fetchUitpasTarrifs(
					accessToken,
					15,
					profile?.uitpasNumber ?? ''
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

	const openPaymentSheet = async () => {
		try {
			const { error } = await presentPaymentSheet();

			if (error?.code === 'Canceled') {
				return console.log('Canceled');
			}

			if (error) {
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
				justifyContent={'flex-end'}
			>
				<Card.Wrapper>
					<Card.Content>
						<Text
							color={theme.colors.light}
							fontWeight={'bold'}
							fontSize={theme.font.sizes['4xl']}
							marginBottom={theme.space.medium}
						>
							Betaal met Stripe
						</Text>
						<Text
							color={theme.colors.light}
							fontWeight={'bold'}
							fontSize={theme.font.sizes.xl}
						>
							UiTPAS-tarieven
						</Text>
						<Text
							color={theme.colors.light}
							fontWeight={'bold'}
							fontSize={theme.font.sizes.base}
							marginY={theme.space.medium}
						>
							Als je recht hebt op een kansentarief zal die hier
							staan. Als je hem selecteert zal je korting krijgen
							op je abonnement.
						</Text>
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
									Pay
								</Text>
							</Button>
						)}
					</Card.Content>
				</Card.Wrapper>
			</Section>
		</View>
	);
};

export default PurchaseSubscriptionScreen;
