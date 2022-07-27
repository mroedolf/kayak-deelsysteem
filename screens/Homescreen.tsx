import { Ionicons } from '@expo/vector-icons';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query as q } from 'firebase/firestore';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterPill from '../components/Home/FilterPill';
import KayakCard from '../components/Home/KayakCard';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Heading } from '../components/styles/elements/Heading';
import { Section } from '../components/styles/elements/Section';
import theme from '../components/styles/theme';
import { firestore } from '../config/firebase';
import { useStore } from '../stores/useStore';
import { FilterOptions, Kayak, RootStackScreenProps } from '../types';

const Homescreen = ({ navigation }: RootStackScreenProps<'BookingScreen'>) => {
	const selectedFilter = useStore().selectedFilter;
	const setSelectedFilter = useStore().setSelectedFilter;
	const ref = q(collection(firestore, 'kayaks'));
	const query = useFirestoreQuery(['kayaks'], ref);
	const filteredKayaks = useStore().filterKayaks(
		(query.data?.docs.map((doc) => doc.data()) as Kayak[]) ?? []
	);

	return (
		<SafeAreaView
			style={{
				backgroundColor: theme.colors.light,
				paddingHorizontal: theme.space.medium,
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
					Vind je kajak
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
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={{
					marginBottom: theme.space.medium,
				}}
			>
				{Object.keys(FilterOptions).map((filterOption) => (
					<FilterPill
						key={filterOption}
						label={filterOption}
						onPress={() =>
							setSelectedFilter(filterOption as FilterOptions)
						}
						isSelected={selectedFilter === filterOption}
					/>
				))}
			</ScrollView>
			{query.isLoading && <ActivityIndicator />}
			{query.data && (
				<FlatList
					data={filteredKayaks}
					renderItem={({ item }: { item: Kayak }) => (
						<KayakCard
							kayak={item}
							onPress={() =>
								navigation.navigate('BookingScreen', {
									kayakId: String(item.id),
									type: item.type,
								})
							}
						/>
					)}
					keyExtractor={(item) => String(item.id)}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</SafeAreaView>
	);
};

export default Homescreen;
