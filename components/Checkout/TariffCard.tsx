import React from 'react';
import { Tariff } from '../../types';
import * as Card from '../styles/blocks/TariffCard';

type Props = {
	onPress: () => void;
	tariff: Tariff;
	toggled: boolean;
};

const TariffCard = ({ onPress, tariff, toggled }: Props) => {
	return (
		<Card.Wrapper toggled={toggled} onPress={onPress}>
			<Card.Title toggled={toggled}>{tariff.name}</Card.Title>
		</Card.Wrapper>
	);
};

export default TariffCard;
