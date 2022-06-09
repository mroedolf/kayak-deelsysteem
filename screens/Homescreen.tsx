import React from 'react';
import { FilterOptions, Kayak, RootStackScreenProps } from '../types';
import { Heading } from '../components/styles/elements/Heading';
import FilterPill from '../components/Home/FilterPill';
import { useStore } from '../stores/useStore';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../components/styles/theme';
import KayakCard from '../components/Home/KayakCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Section } from '../components/styles/elements/Section';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Ionicons } from '@expo/vector-icons';
import { collection, query as q } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

const Homescreen = ({ navigation }: RootStackScreenProps<'BookingScreen'>) => {
	const selectedFilter = useStore().selectedFilter;
	const setSelectedFilter = useStore().setSelectedFilter;
	const ref = q(collection(firestore, 'kajaks'));
	const query = useFirestoreQuery(['kajaks'], ref);
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
			<FlatList
				data={filteredKayaks}
				renderItem={({ item }: { item: Kayak }) => (
					<KayakCard
						image={item.image}
						title={item.name}
						type={item.type}
						onPress={() =>
							navigation.navigate('BookingScreen', {
								kayakId: String(item.id),
							})
						}
					/>
				)}
				keyExtractor={(item) => String(item.id)}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default Homescreen;
