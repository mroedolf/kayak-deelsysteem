import { View } from 'react-native';
import React from 'react';
import { Section } from '../styles/elements/Section';
import theme from '../styles/theme';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
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
					}}
					disableAllTouchEventsForInactiveDays
					markedDates={{
						[timestampToDate(timestamp)]: {
							selected: true,
							selectedColor: theme.colors.primary,
						},
						...(disabledDates || []).reduce(
							(acc, date) => ({
								...acc,
								[date]: {
									inactive: true,
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
