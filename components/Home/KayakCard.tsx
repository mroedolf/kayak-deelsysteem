import React from 'react';
import { FilterOptions, Kayak } from '../../types';
import * as Card from '../styles/blocks/KayakCard';
import kajakOnePerson from '../../assets/images/app/kajak-1p.png';
import kajakTwoPersons from '../../assets/images/app/kajak-2p.png';
import { ImageSourcePropType } from 'react-native';

type Props = {
	kayak: Kayak;
	onPress: () => void;
	type: string;
};

const KayakCard = ({ kayak, onPress, type }: Props) => {
	return (
		<Card.Wrapper onPress={onPress}>
			{type === FilterOptions.Eenpersoons ? (
				<Card.Image source={kajakOnePerson as ImageSourcePropType} />
			) : (
				<Card.Image source={kajakTwoPersons as ImageSourcePropType} />
			)}
			<Card.TextWrapper>
				<Card.Title>{kayak.name}</Card.Title>
				<Card.Subtitle>{kayak.description}</Card.Subtitle>
			</Card.TextWrapper>
		</Card.Wrapper>
	);
};

export default KayakCard;
