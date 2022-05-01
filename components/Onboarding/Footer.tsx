import React from 'react';
import { useWindowDimensions, StyleSheet, View } from 'react-native';
import RoundedButton from './RoundedButton';

type Props = {
	backgroundColor: string;
	rightButtonLabel: boolean;
	leftButtonLabel: boolean;
};

const Footer = ({ backgroundColor }: Props) => {
	const windowWidth = useWindowDimensions().width;
	const HEIGHT = windowWidth * 0.21;
	const FOOTER_PADDING = windowWidth * 0.1;

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor,
					height: HEIGHT,
					paddingHorizontal: FOOTER_PADDING,
				},
			]}
		>
			<RoundedButton
				label={'Test'}
				onPress={() => {
					console.log('Test');
				}}
			/>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	button: {
		backgroundColor: '#fff',
		borderRadius: 50,
		padding: 10,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
