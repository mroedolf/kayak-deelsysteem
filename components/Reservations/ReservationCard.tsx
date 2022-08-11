import React from 'react';
import {CheckoutTimeOptions, Kayak, Reservation} from '../../types';
import * as Card from '../styles/blocks/ReservationCard';
import { timestampToDateEU } from '../../utils';
import kajakOnePerson from '../../assets/images/app/kajak-1p.png';
import kajakTwoPersons from '../../assets/images/app/kajak-2p.png';
import kajakImage from '../../assets/images/app/kajak-2p.png';
import { ImageSourcePropType } from 'react-native';

type Props = {
	reservation: Reservation;
	kayak: Kayak,
	expired?: boolean;
	onPress?: () => void;
};


const ReservationCard = ({ reservation, kayak, expired, onPress }: Props) => {
	return (
		<Card.Wrapper expired={expired} onPress={onPress}>
			<Card.TextWrapper>
				<Card.Title>{kayak.name}</Card.Title>
				<Card.Text>{`${timestampToDateEU(reservation.date)}\n${
					reservation.time === CheckoutTimeOptions.Voormiddag
						? '7u-13u30'
						: '14u-22u'
				}`}</Card.Text>
			</Card.TextWrapper>

			<Card.ImageWrapper>
				<Card.Image source={kajakImage as ImageSourcePropType} />
			</Card.ImageWrapper>
		</Card.Wrapper>
	);
};

export default ReservationCard;
