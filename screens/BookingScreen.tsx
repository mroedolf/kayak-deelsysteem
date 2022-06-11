import { ImageSourcePropType, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Section } from '../components/styles/elements/Section';
import * as Card from '../components/styles/blocks/BookingCard';
import DatePickerComponent from '../components/Home/DatePicker';
import { Button } from '../components/styles/elements/Button';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import { useStore } from '../stores/useStore';
import {
	CheckoutTimeOptions,
	Reservation,
	RootStackScreenProps,
} from '../types';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { collection, query, where } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import {
	useFirestoreCollectionMutation,
	useFirestoreQuery,
} from '@react-query-firebase/firestore';
import ModalComponent from '../components/Modal';
import Toast from 'react-native-toast-message';
import {
	extractDatesFromReservations,
	generateUUID,
	handleFirebaseError,
	timestampToDate,
} from '../utils';
import { FirebaseError } from 'firebase/app';
import { log } from '../config/logger';
import kajakImage from '../assets/images/app/kajak-2p.png';
import kajakVertImage from '../assets/images/app/kajak-vert.png';

// TODO:; Add an option to show the selected voormiddag/namiddag button using selectedTime
//  	  Add image assets once received

const BookingScreen = ({
	navigation,
	route,
}: RootStackScreenProps<'BookingScreen'>) => {
	const { kayakId } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	const {
		selectedDate,
		setSelectedDate,
		setSelectedTime,
		selectedTime,
		user,
		profile,
	} = useStore();

	useEffect(() => {
		return () => {
			setSelectedDate(+new Date());
		};
	}, []);

	const mutationRef = collection(firestore, 'reservations');
	const mutation = useFirestoreCollectionMutation(mutationRef, {
		onSuccess: () => {
			log.info(
				`[BookingScreen.Success] Kayak ${kayakId} reserved for ${
					user?.email as string
				}`
			);
			setModalVisible(true);
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
	const groupedReservations = extractDatesFromReservations(
		reservations as Reservation[]
	);

	const selectedDateReservedTimes =
		groupedReservations[timestampToDate(selectedDate)];

	return (
		<>
			<View>
				<Section
					position={'absolute'}
					top={80}
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
							source={kajakImage as ImageSourcePropType}
						/>
						<Card.BookingContent>
							<DatePickerComponent
								timestamp={selectedDate}
								onChange={setSelectedDate}
								groupedReservations={groupedReservations}
							/>
							<Card.ButtonWrapper horizontal>
								<Button
									tertiary
									flexGrow={1}
									onPress={() =>
										setSelectedTime(
											CheckoutTimeOptions.Voormiddag
										)
									}
								>
									<Text
										color={theme.colors.primary}
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
									tertiary
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
										color={theme.colors.primary}
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
										if (!profile?.subscription.active)
											return navigation.navigate(
												'SubscriptionWarning'
											);

										mutation.mutate({
											id: generateUUID(),
											kayakId,
											date: selectedDate,
											time: selectedTime,
											userId: user?.uid,
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
			<ModalComponent visible={modalVisible}>
				<Text
					fontWeight={'bold'}
					fontSize={theme.font.sizes['3xl']}
					color={theme.colors.primary}
				>
					Je kajak is gereserveerd!
				</Text>
				<Card.ButtonWrapper>
					<Button
						onPress={() => {
							setModalVisible(false);
							navigation.navigate('Reservations');
						}}
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
							setModalVisible(false);
						}}
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
		</>
	);
};

export default BookingScreen;
