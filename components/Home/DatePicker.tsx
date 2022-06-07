import { View } from 'react-native';
import React from 'react';
import { Section } from '../styles/elements/Section';
import theme from '../styles/theme';
import { Calendar } from 'react-native-calendars';
import { timestampToDate } from '../../utils';

type Props = {
	timestamp: number;
	onChange: (timestamp: number) => void;
	disabledDates?: string[];
};

const DatePickerComponent = ({ timestamp, onChange, disabledDates }: Props) => {
	return (
		<View>
			<Section
				background={theme.colors.light}
				padding={theme.space.small}
				borderRadius={theme.sizes.small}
			>
				<Calendar
					onDayPress={(day) => {
						onChange(day.timestamp);
					}}
					theme={{
						calendarBackground: theme.colors.light,
						textSectionTitleColor: theme.colors.dark,
						selectedDayBackgroundColor: theme.colors.primary,
						selectedDayTextColor: theme.colors.light,
						todayTextColor: theme.colors.primary,
						arrowColor: theme.colors.primary,
						textInactiveColor: 'rgba(0,0,0,0.3)',
					}}
					disableAllTouchEventsForInactiveDays
					markingType="multi-dot"
					markedDates={{
						// Currently selected date by user
						[timestampToDate(timestamp)]: {
							selected: true,
							selectedColor: theme.colors.primary,
						},
						// Inactive dates, in this case dates which already have a reservation
						// FIXME: Right now this disables the date even if there's a reservation for 1 half of the day while it should only disable the half which is reserved
						// Could possibly fix this by marking the reserved date with a dot (indicating 1 half of the day is reserved) and then disabling the specific voormiddag/namiddag button
						...(disabledDates || []).reduce(
							(acc, date) => ({
								...acc,
								[date]: {
									inactive: true,
									// dots: [
									// 	{
									// 		key: 'voor',
									// 		color: theme.colors.primary,
									// 	},
									// 	{
									// 		key: 'na',
									// 		color: theme.colors.primary,
									// 	},
									// ],
								},
							}),
							{}
						),
					}}
				/>
			</Section>
		</View>
	);
};

export default DatePickerComponent;
