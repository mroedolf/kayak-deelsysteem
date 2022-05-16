import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
	TouchableOpacity,
	TouchableOpacityProps,
} from './styles/elements/PasswordButton';
import { Entypo } from '@expo/vector-icons';

type Props = {
	onPress: () => void;
	isVisible: boolean;
} & TouchableOpacityProps;

const PasswordButton = ({ onPress, isVisible, ...props }: Props) => {
	return (
		<TouchableOpacity onPress={onPress} {...props}>
			{isVisible ? (
				<Entypo name="eye" size={24} color="black" />
			) : (
				<Entypo name="eye-with-line" size={24} color="black" />
			)}
		</TouchableOpacity>
	);
};

export default PasswordButton;

const styles = StyleSheet.create({});
