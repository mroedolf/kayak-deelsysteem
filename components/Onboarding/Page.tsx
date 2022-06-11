import {
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
	Image,
	ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { OnboardingDataType } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../styles/theme';

type Props = {
	item: OnboardingDataType;
	skipButton: boolean;
	skipButtonPress: () => void;
};

const Page = ({ item, skipButton, skipButtonPress }: Props) => {
	const { width } = useWindowDimensions();
	return (
		<SafeAreaView style={[styles.container, { width }]}>
			{!!skipButton && (
				<View
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
						paddingHorizontal: 20,
						paddingTop: 20,
					}}
				>
					<Text
						style={{
							fontSize: 16,
							color: theme.colors.primary,
							fontWeight: 'bold',
						}}
						onPress={skipButtonPress || (() => {})}
					>
						Skip
					</Text>
				</View>
			)}
			<Image
				source={item.picture}
				style={[styles.image, { width, resizeMode: 'cover' }]}
			/>

			<View style={styles.content}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
		</SafeAreaView>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 0.7,
		justifyContent: 'center',
	},
	content: {
		flex: 0.3,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	title: {
		fontSize: theme.font.sizes['4xl'],
		fontWeight: 'bold',
		color: theme.colors.primary,
		marginBottom: 20,
	},
	description: {
		fontSize: 16,
		color: theme.colors.secondary,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
