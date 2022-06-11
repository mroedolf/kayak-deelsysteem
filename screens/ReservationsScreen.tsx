import React from 'react';
import { RootDrawerScreenProps } from '../types';
import { Heading } from '../components/styles/elements/Heading';
import theme from '../components/styles/theme';
import { useStore } from '../stores/useStore';
import { query as q, where, collection } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Reservation } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReservationCard from '../components/Reservations/ReservationCard';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Section } from '../components/styles/elements/Section';
import { ActivityIndicator } from 'react-native';

const ReservationsScreen = ({
	navigation,
}: RootDrawerScreenProps<'Reservations'>) => {
	const { user } = useStore();
	const ref = q(
		collection(firestore, 'reservations'),
		where('userId', '==', user?.uid)
	);

	const query = useFirestoreQuery(['reservations'], ref);

	const reservations = query.data?.docs?.map((doc) => {
		return doc.data();
	});

	return (
		<SafeAreaView
			style={{
				paddingHorizontal: theme.space.medium,
				backgroundColor: theme.colors.light,
				height: '100%',
			}}
		>
			<Section
				display={'flex'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				width={'100%'}
				marginBottom={theme.space.medium}
			>
				<Heading fontSize={35} fontWeight={'bold'}>
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
			{(reservations as Reservation[])?.map((reservation) => {
				return (
					<ReservationCard
						key={reservation.id}
						reservation={reservation}
					/>
				);
			})}
		</SafeAreaView>
	);
};

export default ReservationsScreen;
