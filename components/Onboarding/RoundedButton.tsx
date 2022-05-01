import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
	label: string;
	onPress: () => void;
};

const RoundedButton = ({ label, onPress }: Props) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
	);
};

export default RoundedButton;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontSize: 18,
		color: '#000',
	},
});
