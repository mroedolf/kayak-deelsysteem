import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Button } from 'react-native';
import { Formik, useField, useFormikContext } from "formik";
import {ModalType} from "./Modal";

type Props = {
	visible: boolean;
	children?: React.ReactNode;
};

const DateInput = ({...props}) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);
	return (
		<DatePicker
			{...field}
			{...props}
			selected={(field.value && new Date(field.value)) || null}
			onChange={(val) => {
				setFieldValue(field.name, val);
			}}
		/>
	);
}

export default DateInput;
