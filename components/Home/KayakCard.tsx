import React from 'react';
import { FilterOptions } from '../../types';
import * as Card from '../styles/blocks/KayakCard';
import kajakOnePerson from '../../assets/images/app/kajak-1p.png';
import kajakTwoPersons from '../../assets/images/app/kajak-2p.png';

type Props = {
	title: string;
	onPress: () => void;
	type: string;
};

const KayakCard = ({ title, onPress, type }: Props) => {
	return (
		<Card.Wrapper onPress={onPress}>
			{type === FilterOptions.Eenpersoons ? (
				<Card.Image source={kajakOnePerson} />
			) : (
				<Card.Image source={kajakTwoPersons} />
			)}
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
