import React from 'react';
import * as Pill from '../styles/blocks/Pill';

type Props = {
	isSelected?: boolean;
	label: string;
	onPress: () => void;
};

const FilterPill = ({ isSelected, label, onPress }: Props) => {
	console.log(isSelected);
	return (
		<Pill.Wrapper isSelected={isSelected}>
			<Pill.Text isSelected={isSelected}>{label}</Pill.Text>
		</Pill.Wrapper>
	);
};

export default FilterPill;
