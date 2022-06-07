import React from 'react';
import { FilterOptions } from '../../types';
import * as Card from '../styles/blocks/KayakCard';

type Props = {
	image: string;
	title: string;
	onPress: () => void;
	type: string;
};

const KayakCard = ({ image, title, onPress, type }: Props) => {
	return (
		<Card.Wrapper onPress={onPress}>
			<Card.Image source={{ uri: image }} />
			<Card.TextWrapper>
				<Card.Title>{title}</Card.Title>
				<Card.Subtitle>
					{type === FilterOptions.Eenpersoons
						? 'Kajak voor 1 persoon'
						: 'Kajak voor 2 personen'}
				</Card.Subtitle>
			</Card.TextWrapper>
		</Card.Wrapper>
	);
};

export default KayakCard;
