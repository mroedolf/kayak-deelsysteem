import React from 'react';
import * as Card from '../styles/blocks/KayakCard';

type Props = {
	image: string;
	title: string;
	onPress: () => void;
};

const KayakCard = ({ image, title, onPress }: Props) => {
	return (
		<Card.Wrapper onPress={onPress}>
			<>
				<Card.ImageWrapper>
					<Card.Image source={{ uri: image }} />
				</Card.ImageWrapper>
				<Card.Title>{title}</Card.Title>
			</>
		</Card.Wrapper>
	);
};

export default KayakCard;
