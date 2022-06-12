import React from 'react';
import { CheckoutTimeOptions, Reservation } from '../../types';
import * as Card from '../styles/blocks/ReservationCard';
import { timestampToDate } from '../../utils';
import kajakImage from '../../assets/images/app/kajak-2p.png';
import { ImageSourcePropType } from 'react-native';

type Props = {
	reservation: Reservation;
	expired?: boolean;
	onPress?: () => void;
};

const ReservationCard = ({ reservation, expired, onPress }: Props) => {
	return (
		<Card.Wrapper expired={expired} onPress={onPress}>
			<Card.TextWrapper>
				<Card.Title>Kayak 1</Card.Title>
				<Card.Text>{`${timestampToDate(reservation.date)}\n${
					reservation.time === CheckoutTimeOptions.Voormiddag
						? 'Voormiddag'
						: 'Namiddag'
				}`}</Card.Text>
			</Card.TextWrapper>
			<Card.ImageWrapper>
				<Card.Image source={kajakImage as ImageSourcePropType} />
			</Card.ImageWrapper>
		</Card.Wrapper>
	);
};

export default ReservationCard;
