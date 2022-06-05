import { View } from 'react-native';
import React from 'react';
import { Section } from '../components/styles/elements/Section';
import * as Card from '../components/styles/blocks/BookingCard';
import DatePickerComponent from '../components/Home/DatePicker';
import { Button } from '../components/styles/elements/Button';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import { useStore } from '../stores/useStore';
import { CheckoutTimeOptions, RootStackScreenProps } from '../types';
import { Ionicons } from '@expo/vector-icons';
import RoundedButton from '../components/Onboarding/RoundedButton';

// TODO:; Add an option to show the selected voormiddag/namiddag button using selectedTime
//		  Add the onPress for next button (navigate/popup modal confirming reservation)
//  	  Add image assets once received

const BookingScreen = ({
	navigation,
}: RootStackScreenProps<'BookingScreen'>) => {
	const selectedDate = useStore().selectedDate;
	const setSelectedDate = useStore().setSelectedDate;
	const setSelectedTime = useStore().setSelectedTime;
	const selectedTime = useStore().selectedTime;

	return (
		<View>
			<Section
				display={'flex'}
				justifyContent={'space-between'}
				height={'100%'}
			>
				<Section mt="40px">
					<RoundedButton
						onPress={() => navigation.goBack()}
						label="Terug"
						labelSize={theme.font.sizes.lg}
						labelColor={theme.colors.primary}
						Icon={() => (
							<Ionicons
								name="chevron-back-outline"
								color={theme.colors.primary}
								size={24}
							/>
						)}
					/>
				</Section>
				<Card.Wrapper>
					<Card.Content>
						<DatePickerComponent
							date={selectedDate}
							onChange={setSelectedDate}
						/>
						<Card.ButtonWrapper>
							<Button
								tertiary
								flexGrow={1}
								onPress={() =>
									setSelectedTime(
										CheckoutTimeOptions.Voormiddag
									)
								}
							>
								<Text
									color={theme.colors.primary}
									fontSize={theme.font.sizes.base}
									fontWeight={'bold'}
								>
									Voormiddag
								</Text>
							</Button>
							<Button
								tertiary
								flexGrow={1}
								onPress={() =>
									setSelectedTime(
										CheckoutTimeOptions.Namiddag
									)
								}
							>
								<Text
									color={theme.colors.primary}
									fontSize={theme.font.sizes.base}
									fontWeight={'bold'}
								>
									Namiddag
								</Text>
							</Button>
						</Card.ButtonWrapper>
						<Card.ButtonWrapper>
							<Button tertiary flexGrow={1}>
								<Text
									color={theme.colors.primary}
									fontSize={theme.font.sizes.base}
									fontWeight={'bold'}
								>
									Volgende
								</Text>
							</Button>
						</Card.ButtonWrapper>
					</Card.Content>
				</Card.Wrapper>
			</Section>
		</View>
	);
};

export default BookingScreen;
