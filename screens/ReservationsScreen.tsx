import React, { useMemo } from 'react';
import { RootDrawerScreenProps } from '../types';
import { Heading } from '../components/styles/elements/Heading';
import theme from '../components/styles/theme';
import { useStore } from '../stores/useStore';
import { query as q, where, collection, orderBy } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Reservation } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReservationCard from '../components/Reservations/ReservationCard';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Section } from '../components/styles/elements/Section';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FirebaseError } from 'firebase/app';
import Toast from 'react-native-toast-message';
import { handleFirebaseError } from '../utils';
import { Text } from '../components/styles/elements/Text';
import ModalComponent, { ModalType } from '../components/Modal';
import { Button } from '../components/styles/elements/Button';
import * as Card from '../components/styles/blocks/BookingCard';

// FIXME: Account for the timeslot of the reservation, currently it will show any reservation of the current day as past even though the timeslot is in the future

const ReservationsScreen = ({
	navigation,
}: RootDrawerScreenProps<'Reservations'>) => {
	const { user, modal, setModal } = useStore();
	const ref = q(
		collection(firestore, 'reservations'),
		where('userId', '==', user?.uid),
		orderBy('date', 'asc')
	);

	const query = useFirestoreQuery(['reservations'], ref, undefined, {
		onError: (error: FirebaseError) => {
			Toast.show({
				text1: 'Error tijdens het ophalen van je reservaties',
				text2: handleFirebaseError(error),
				type: 'error',
				position: 'top',
			});
		},
	});

	const reservations = query.data?.docs?.map((doc) => {
		return doc.data();
	}) as Reservation[];

	const [upcomingReservations, pastReservations] = useMemo(() => {
		if (!reservations) {
			return [[], []];
		}

		const now = new Date();
		const upcoming = reservations.filter((reservation) => {
			const date = new Date(reservation.date);
			return date > now;
		});

		const past = reservations.filter((reservation) => {
			const date = new Date(reservation.date);
			return date < now;
		});

		return [upcoming, past];
	}, [reservations]);

	return (
		<SafeAreaView
			style={{
				paddingHorizontal: theme.space.medium,
				backgroundColor: theme.colors.light,
				height: '100%',
			}}
		>
			<Section>
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
				display={'flex'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				width={'100%'}
				marginBottom={theme.space.medium}
			>
				<Heading fontSize={theme.font.sizes['4xl']} fontWeight={'bold'}>
					Mijn Reservaties
				</Heading>
				<RoundedButton
					onPress={() => navigation.navigate('Profile')}
					Icon={() => (
						<Ionicons
							name="person-outline"
							color={theme.colors.primary}
							size={32}
						/>
					)}
				/>
			</Section>
			{query.isLoading && <ActivityIndicator />}
			{query.data && (
				<ScrollView>
					<Text
						fontSize={theme.font.sizes['2xl']}
						fontWeight={theme.font.weights.bold}
						color={theme.colors.primary}
						marginBottom={theme.space.medium}
					>
						Aankomende reservaties
					</Text>
					{query.data &&
						upcomingReservations.map((reservation) => (
							<ReservationCard
								key={reservation.id}
								reservation={reservation}
								onPress={() =>
									setModal({
										visible: true,
										type: ModalType.RESERVATION_MODAL,
										data: reservation,
									})
								}
							/>
						))}
					{!upcomingReservations.length && (
						<Text
							fontSize={theme.font.sizes.lg}
							fontWeight={theme.font.weights.bold}
							color={theme.colors.primary}
							marginBottom={theme.space.medium}
						>
							Je hebt geen aankomende reservaties
						</Text>
					)}
					<Text
						fontSize={theme.font.sizes['2xl']}
						fontWeight={theme.font.weights.bold}
						color={theme.colors.primary}
						marginBottom={theme.space.medium}
					>
						Verlopen reservaties
					</Text>
					{query.data &&
						pastReservations.map((reservation) => (
							<ReservationCard
								key={reservation.id}
								reservation={reservation}
								expired={true}
							/>
						))}
					{pastReservations.length === 0 && (
						<Text
							fontSize={theme.font.sizes.lg}
							fontWeight={theme.font.weights.bold}
							color={theme.colors.primary}
							marginBottom={theme.space.medium}
						>
							Je hebt nog geen reservaties gemaakt.
						</Text>
					)}
				</ScrollView>
			)}
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
						Gereserveerde kajak
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
						{(modal.data as Reservation) &&
							(modal.data as Reservation).code}
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
						secondary
						onPress={() => {
							setModal({ visible: false });
						}}
						flexGrow={1}
						ml={theme.space.small}
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
			</ModalComponent>
		</SafeAreaView>
	);
};

export default ReservationsScreen;
