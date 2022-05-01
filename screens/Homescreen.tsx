import React from 'react';
import { RootStackScreenProps } from '../types';
import { SafeAreaView } from '../components/styles/elements/SafeAreaView';
import { Heading } from '../components/styles/elements/Heading';
import FilterPill from '../components/Home/FilterPill';

const Homescreen = ({
	navigation,
	route,
}: RootStackScreenProps<'Homescreen'>) => {
	return (
		<SafeAreaView marginX={'20px'}>
			<Heading fontSize={35} fontWeight={'bold'}>
				Vind je kajak
			</Heading>
			<FilterPill isSelected={true} label={'Kajak'} onPress={() => {}} />
		</SafeAreaView>
	);
};

export default Homescreen;
