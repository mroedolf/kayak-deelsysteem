import {
	Animated,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import React from 'react';
import { OnboardingDataType } from '../../types';

type Props = {
	data: OnboardingDataType[];
	scrollX: Animated.Value;
	onPress: (action: string) => void;
	currentIndex: number;
};

const Paginator = ({ data, scrollX, onPress, currentIndex }: Props) => {
	const { width } = useWindowDimensions();
	return (
		<View style={styles.container}>
			<Text
				style={{
					flexBasis: 0,
					flexGrow: 1,
					fontSize: 16,
					fontWeight: 'bold',
				}}
				onPress={() => onPress('back')}
			>
				{currentIndex > 0 ? 'Back' : ''}
			</Text>
			<View
				style={{
					flexDirection: 'row',
				}}
			>
				{data.map((_, i) => {
					const inputRange = [
						(i - 1) * width,
						i * width,
						(i + 1) * width,
					];

					const dotWidth = scrollX.interpolate({
						inputRange,
						outputRange: [10, 20, 10],
						extrapolate: 'clamp',
					});

					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0.3, 1, 0.3],
						extrapolate: 'clamp',
					});

					return (
						<Animated.View
							style={[styles.dot, { width: dotWidth, opacity }]}
							key={i}
						/>
					);
				})}
			</View>
			<Text
				style={{
					flexBasis: 0,
					flexGrow: 1,
					textAlign: 'right',
					fontSize: 17,
					fontWeight: 'bold',
				}}
				onPress={() => onPress('next')}
			>
				{currentIndex < data.length - 1 ? 'Next' : 'Get Started'}
			</Text>
		</View>
	);
};

export default Paginator;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 30,
		marginBottom: 20,
		width: '100%',
		flexDirection: 'row',
		height: 64,
	},
	dot: {
		height: 10,
		borderRadius: 5,
		marginHorizontal: 4,
		backgroundColor: 'black',
	},
});
