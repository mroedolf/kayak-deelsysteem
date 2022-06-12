import { View } from 'react-native';
import React from 'react';
import { Section } from '../styles/elements/Section';
import theme from '../styles/theme';
import { Calendar } from 'react-native-calendars';
import { GroupedReservations, timestampToDate } from '../../utils';

type Props = {
	timestamp: number;
	onChange: (timestamp: number) => void;
	groupedReservations: GroupedReservations;
};

type InactiveDates = Record<
	string,
	{
		inactive: boolean;
		dots: {
			key: string;
			color: string;
		}[];
	}
>;

const DatePickerComponent = ({
	timestamp,
	onChange,
	groupedReservations,
}: Props) => {
	// Date which is 4 weeks in the future from the current date
	const maxDate = timestampToDate(timestamp + 4 * 7 * 24 * 60 * 60 * 1000);

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
					maxDate={maxDate}
					minDate={timestampToDate(+new Date())}
					markedDates={{
						...Object.keys(groupedReservations).reduce(
							(acc, date) => {
								acc[date] = {
									inactive:
										groupedReservations[date].time.length >=
										2,
									dots: groupedReservations[date].time.map(
										(_, i) => {
											return {
												key: String(i),
												color: theme.colors.secondary,
											};
										}
									),
								};
								return acc;
							},
							{} as InactiveDates
						),
						[timestampToDate(timestamp)]: {
							selected: true,
							selectedColor: theme.colors.primary,
						},
					}}
				/>
			</Section>
		</View>
	);
};

export default DatePickerComponent;
