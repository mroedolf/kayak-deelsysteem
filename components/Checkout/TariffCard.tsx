import React from 'react';
import { Tariff } from '../../types';
import * as Card from '../styles/blocks/TariffCard';

type Props = {
	onPress: () => void;
	tariff: Tariff;
	toggled: boolean;
	secondary?: boolean;
};

const TariffCard = ({ onPress, tariff, toggled, secondary }: Props) => {
	return (
		<Card.Wrapper toggled={toggled} onPress={onPress} secondary={secondary}>
			<Card.Title secondary={secondary} toggled={toggled}>
				{tariff.name}
			</Card.Title>
		</Card.Wrapper>
	);
};

export default TariffCard;
