import { View } from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Section } from '../styles/elements/Section';
import theme from '../styles/theme';

type Props = {
	date: Date;
	onChange: (event: Event, date: Date) => void;
};

const DatePickerComponent = ({ date, onChange }: Props) => {
	return (
		<View>
			<Section
				background={theme.colors.light}
				padding={theme.space.small}
				borderRadius={theme.sizes.small}
			>
				<DateTimePicker
					value={date}
					mode={'date'}
					is24Hour={true}
					//@ts-expect-error seems to be an issue with the library
					onChange={onChange}
					display="inline"
				/>
			</Section>
		</View>
	);
};

export default DatePickerComponent;
