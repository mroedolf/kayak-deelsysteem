import React from 'react';
import * as Pill from '../styles/blocks/Pill';

type Props = {
	isSelected?: boolean;
	label: string;
	onPress: () => void;
};

const FilterPill = ({ isSelected, label, onPress }: Props) => {
	return (
		<Pill.Wrapper isSelected={isSelected} onPress={onPress}>
			<Pill.Text isSelected={isSelected}>{label}</Pill.Text>
		</Pill.Wrapper>
	);
};

export default FilterPill;
