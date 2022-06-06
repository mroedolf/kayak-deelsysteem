import React from 'react';
import { CheckoutTimeOptions, Reservation } from '../../types';
import * as Card from '../styles/blocks/ReservationCard';
import { timestampToDate } from '../../utils';

type Props = {
	reservation: Reservation;
};

const ReservationCard = ({ reservation }: Props) => {
	return (
		<Card.Wrapper>
			<Card.TextWrapper>
				<Card.Title>Kayak 1</Card.Title>
				<Card.Text>{`${timestampToDate(reservation.date)} - ${
					reservation.time === CheckoutTimeOptions.Voormiddag
						? 'Voormiddag'
						: 'Namiddag'
				}`}</Card.Text>
			</Card.TextWrapper>
		</Card.Wrapper>
	);
};

export default ReservationCard;
