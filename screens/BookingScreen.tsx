import {
	ActivityIndicator,
	ImageSourcePropType,
	useWindowDimensions,
	View,
} from 'react-native';
import React, { useEffect } from 'react';
import { Section } from '../components/styles/elements/Section';
import * as Card from '../components/styles/blocks/BookingCard';
import DatePickerComponent from '../components/Home/DatePicker';
import { Button } from '../components/styles/elements/Button';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import { useStore } from '../stores/useStore';
import {
	CheckoutTimeOptions,
	FilterOptions,
	Price,
	PriceType,
	Reservation,
	RootStackScreenProps,
	Tariff,
} from '../types';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { collection, doc, query, where } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import {
	useFirestoreCollectionMutation,
	useFirestoreDocumentData,
	useFirestoreQuery,
	useFirestoreQueryData,
} from '@react-query-firebase/firestore';
import ModalComponent, { ModalType } from '../components/Modal';
import Toast from 'react-native-toast-message';
import {
	calculateIndexByDate,
	cancelUitpasTicketSale,
	extractDatesFromReservations,
	fetchProductPaymentSheetParams,
	fetchUitpasTarrifs,
	fetchUitpasToken,
	generateUUID,
	handleFirebaseError,
	registerUitpasTicketSale,
	timestampToDate,
} from '../utils';
import { FirebaseError } from 'firebase/app';
import { log } from '../config/logger';
import kajak1pImage from '../assets/images/app/kajak-1p.png';
import kajak2pImage from '../assets/images/app/kajak-2p.png';
import kajakVertImage from '../assets/images/app/kajak-vert.png';
import { useStripe } from '@stripe/stripe-react-native';
import { TariffComponent } from './SubscriptionWarningScreen';

const BookingScreen = ({
	navigation,
	route,
}: RootStackScreenProps<'BookingScreen'>) => {
	const { kayakId, type } = route.params;
	const {
		selectedDate,
		setSelectedDate,
		setSelectedTime,
		selectedTime,
		user,
		profile,
		modal,
		setModal,
	} = useStore();

	const windowHeight = useWindowDimensions().height;

	useEffect(() => {
		return () => {
			setSelectedDate(+new Date());
			setModal({
				type: 'none',
				visible: false,
			});
		};
	}, [setSelectedDate, setModal]);

	const mutationRef = collection(firestore, 'reservations');
	const mutation = useFirestoreCollectionMutation(mutationRef, {
		onSuccess: () => {
			log.info(
				`[BookingScreen.Success] Kayak ${kayakId} reserved for ${
					user?.email as string
				}`
			);
		},
		onError: (error: FirebaseError) => {
			log.error(
				`[BookingScreen.Error] checkout error | ${error.message}`
			);
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: handleFirebaseError(error),
			});
		},
	});

	const queryRef = query(
		collection(firestore, 'reservations'),
		where('kayakId', '==', kayakId)
	);

	const reservationsQuery = useFirestoreQuery(['reservations'], queryRef);
	const reservations = reservationsQuery.data?.docs?.map((doc) => doc.data());
	const userHasReservation = !!reservations?.find(
		(reservation) => reservation.userId === user?.uid
	);

	const groupedReservations = extractDatesFromReservations(
		reservations as Reservation[]
	);

	const selectedDateReservedTimes =
		groupedReservations[timestampToDate(selectedDate)];

	const codeRef = doc(firestore, 'code', 'list');
	const codeQuery = useFirestoreDocumentData(['code'], codeRef);
	const codes = codeQuery.data?.codes as string[];
	const code = codes && codes[calculateIndexByDate(selectedDate)];

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

	const pricesRef = query(
		collection(firestore, 'prices'),
		where('for', '==', 'product')
	);

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
					await fetchProductPaymentSheetParams(
						toggledTariff ? socialTariff.value : regularPrice.value,
						profile?.email as string,
						user?.uid as string
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
	}, [
		toggledTariff,
		socialTariff,
		regularPrice,
		profile?.email,
		user?.uid,
		initPaymentSheet,
	]);

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
					profile.uitpasNumber
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
	}, [profile?.uitpasNumber]);

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
			profile.uitpasNumber,
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

			setModal({
				visible: false,
			});

			mutation.mutate({
				id: generateUUID(),
				kayakId,
				date: selectedDate,
				time: selectedTime,
				userId: user?.uid,
				code,
			});

			setTimeout(() => {
				setModal({
					visible: true,
					type: ModalType.RESERVATION_MODAL,
				});
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<View>
				<Section
					position={'absolute'}
					top={windowHeight * 0.05}
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
				<Section
					display={'flex'}
					justifyContent={'space-between'}
					height={'100%'}
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
					<Card.Wrapper>
						<Card.Image
							source={
								type === FilterOptions.Eenpersoons
									? (kajak1pImage as ImageSourcePropType)
									: (kajak2pImage as ImageSourcePropType)
							}
						/>
						<Card.BookingContent>
							<DatePickerComponent
								timestamp={selectedDate}
								onChange={setSelectedDate}
								groupedReservations={groupedReservations}
							/>
							<Card.ButtonWrapper horizontal>
								<Button
									disabled={selectedDateReservedTimes?.time.some(
										(time) =>
											time[
												CheckoutTimeOptions.Voormiddag
											] === true
									)}
									tertiary={
										selectedTime ===
										CheckoutTimeOptions.Voormiddag
									}
									secondary={
										selectedTime !==
										CheckoutTimeOptions.Voormiddag
									}
									flexGrow={1}
									onPress={() =>
										setSelectedTime(
											CheckoutTimeOptions.Voormiddag
										)
									}
								>
									<Text
										color={
											selectedTime ===
											CheckoutTimeOptions.Voormiddag
												? theme.colors.primary
												: theme.colors.light
										}
										fontSize={theme.font.sizes.base}
										fontWeight={'bold'}
									>
										Voormiddag
									</Text>
								</Button>
								<Button
									disabled={selectedDateReservedTimes?.time.some(
										(time) =>
											time[
												CheckoutTimeOptions.Namiddag
											] === true
									)}
									tertiary={
										selectedTime ===
										CheckoutTimeOptions.Namiddag
									}
									secondary={
										selectedTime !==
										CheckoutTimeOptions.Namiddag
									}
									flexGrow={1}
									onPress={() =>
										setSelectedTime(
											CheckoutTimeOptions.Namiddag
										)
									}
								>
									<Text
										fontSize={theme.font.sizes.base}
										fontWeight={'bold'}
										color={
											selectedTime ===
											CheckoutTimeOptions.Namiddag
												? theme.colors.primary
												: theme.colors.light
										}
									>
										Namiddag
									</Text>
								</Button>
							</Card.ButtonWrapper>
							<Card.ButtonWrapper horizontal>
								<Button
									tertiary
									flexGrow={1}
									onPress={() => {
										if (profile?.subscription.active)
											return navigation.navigate(
												'SubscriptionWarning'
											);

										// if (userHasReservation)
										// 	return Toast.show({
										// 		text1: 'Je hebt al een reservering',
										// 		text2: 'Je kan maar 1 kajak gereserveerd tegelijkertijd hebben',
										// 		type: 'error',
										// 		position: 'top',
										// 	});

										setModal({
											visible: true,
											type: ModalType.PURCHASE_MODAL,
										});
									}}
								>
									<Text
										color={theme.colors.primary}
										fontSize={theme.font.sizes.base}
										fontWeight={'bold'}
									>
										Bevestigen
									</Text>
								</Button>
							</Card.ButtonWrapper>
						</Card.BookingContent>
					</Card.Wrapper>
				</Section>
			</View>
			<ModalComponent
				visible={modal.visible}
				type={ModalType.RESERVATION_MODAL}
			>
				<>
					<Text
						fontWeight={'bold'}
						fontSize={theme.font.sizes['3xl']}
						color={theme.colors.primary}
					>
						Je kajak is gereserveerd!
					</Text>
					<Text
						fontSize={theme.font.sizes.base}
						color={theme.colors.secondary}
						my={theme.space.medium}
						textAlign={'center'}
					>
						Toegangscode sleutelkluisje aan de ingang van Buurthuis
						Gentbrugge naast de grote poort. Gebruik deze code om
						binnen te gaan. Je kan je kajak met dezelfde code
						losmaken van het rek
					</Text>
					<Text
						fontSize={theme.font.sizes['6xl']}
						color={theme.colors.primary}
						fontWeight={'bold'}
						my={theme.space.small}
					>
						{code}
					</Text>
				</>
				<Card.ButtonWrapper horizontal>
					<Button
						onPress={() => {
							setModal({ visible: false });
							navigation.navigate('Reservations');
						}}
						flexGrow={1}
						mr={theme.space.small}
					>
						<Text
							fontWeight={'bold'}
							fontSize={theme.font.sizes.base}
							color={theme.colors.light}
						>
							Je reservaties
						</Text>
					</Button>
					<Button
						onPress={() => {
							setModal({ visible: false });
						}}
						flexGrow={1}
						ml={theme.space.small}
					>
						<Text
							fontWeight={'bold'}
							fontSize={theme.font.sizes.base}
							color={theme.colors.light}
						>
							Mijn account
						</Text>
					</Button>
				</Card.ButtonWrapper>
			</ModalComponent>
			<ModalComponent
				visible={modal.visible}
				type={ModalType.PURCHASE_MODAL}
			>
				<>
					<Text
						fontWeight={'bold'}
						fontSize={theme.font.sizes['3xl']}
						color={theme.colors.primary}
						mb={theme.space.large}
					>
						Betaal je kajak met Stripe
					</Text>
					{uitpasTariff && (
						<TariffComponent
							uitpasTariff={uitpasTariff}
							loadingUitpasTariffs={loadingUitpasTariffs}
							setToggledTariff={setToggledTariff}
							toggledTariff={toggledTariff}
							secondary
						/>
					)}
					{loading ? (
						<ActivityIndicator
							style={{
								marginVertical: theme.space.medium,
							}}
						/>
					) : (
						<Card.ButtonWrapper horizontal>
							<Button
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onPress={openPaymentSheet}
								marginTop={theme.space.medium}
							>
								<Text
									fontWeight={'bold'}
									fontSize={theme.font.sizes.base}
									color={theme.colors.light}
								>
									Betaal met Stripe
								</Text>
							</Button>
							<Button
								onPress={navigation.goBack}
								marginTop={theme.space.medium}
								ml={theme.space.medium}
								flexGrow={1}
								secondary
							>
								<Text
									fontWeight={'bold'}
									fontSize={theme.font.sizes.base}
									color={theme.colors.primary}
								>
									Terug
								</Text>
							</Button>
						</Card.ButtonWrapper>
					)}
				</>
			</ModalComponent>
		</>
	);
};

export default BookingScreen;
