// import React from 'react';
// import { View, Text, Image, StyleSheet, Animated } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { onboardingData } from '../../data/onboarding';
// import Paginator from './Paginator';
// import RoundedButton from './RoundedButton';

// type Props = {
// 	backgroundColor: string;
// 	description: string;
// 	title: string;
// 	picture: string;
// 	footer?: {
// 		leftButtonLabel?: string;
// 		leftButtonPress?: () => void;
// 		rightButtonLabel?: string;
// 		rightButtonPress?: () => void;
// 		backgroundColor: string;
// 	};
// 	skipButton?: boolean;
// 	skipButtonPress?: () => void;
// 	// scrollX: Animated.AnimatedInterpolation;
// };

// const Page = ({
// 	backgroundColor,
// 	description,
// 	title,
// 	picture,
// 	footer,
// 	skipButton,
// 	skipButtonPress,
// }: // scrollX,
// Props) => {
// 	const {
// 		leftButtonLabel,
// 		leftButtonPress,
// 		rightButtonLabel,
// 		rightButtonPress,
// 		backgroundColor: footerBackgroundColor,
// 	} = footer || {};

// 	return (
// 		<SafeAreaView style={[styles.container, { backgroundColor }]}>
// 			{!!skipButton && (
// 				<View
// 					style={{
// 						width: '100%',
// 						display: 'flex',
// 						flexDirection: 'row',
// 						justifyContent: 'flex-end',
// 						paddingHorizontal: 20,
// 						paddingTop: 20,
// 					}}
// 				>
// 					<RoundedButton
// 						label="Skip"
// 						onPress={skipButtonPress || (() => {})}
// 					/>
// 				</View>
// 			)}
// 			<View
// 				style={{
// 					flex: 1,
// 					alignItems: 'center',
// 					justifyContent: 'space-between',
// 				}}
// 			>
// 				<View style={styles.content}>
// 					<Image source={{ uri: picture }} style={styles.image} />
// 					<Text style={styles.title}>{title}</Text>
// 					<Text style={{ fontSize: 16 }}>{description}</Text>
// 				</View>

// 				{!!footer && (
// 					<View
// 						style={[
// 							styles.footerWrapper,
// 							{ backgroundColor: footerBackgroundColor },
// 						]}
// 					>
// 						<View
// 							style={[
// 								styles.innerFooter,
// 								!!leftButtonLabel && {
// 									justifyContent: 'space-between',
// 								},
// 							]}
// 						>
// 							{!!leftButtonLabel && (
// 								<RoundedButton
// 									label={leftButtonLabel}
// 									onPress={() =>
// 										leftButtonPress && leftButtonPress()
// 									}
// 								/>
// 							)}
// 							{!!rightButtonLabel && (
// 								<RoundedButton
// 									label={rightButtonLabel}
// 									onPress={() =>
// 										rightButtonPress && rightButtonPress()
// 									}
// 								/>
// 							)}
// 						</View>
// 					</View>
// 				)}
// 			</View>
// 		</SafeAreaView>
// 	);
// };

// export default Page;

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	content: {
// 		flex: 1,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		width: '100%',
// 		paddingHorizontal: 20,
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		marginBottom: 20,
// 	},
// 	image: {
// 		width: 200,
// 		height: 200,
// 		marginBottom: 40,
// 	},
// 	footerWrapper: {
// 		paddingVertical: 20,
// 		paddingHorizontal: 30,
// 		minWidth: '100%',
// 	},
// 	innerFooter: {
// 		flexDirection: 'row',
// 		justifyContent: 'flex-end',
// 		alignItems: 'center',
// 	},
// });

import {
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
	Image,
} from 'react-native';
import React from 'react';
import { OnboardingDataType } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

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
							color: 'black',
							fontWeight: 'bold',
						}}
						onPress={skipButtonPress || (() => {})}
					>
						Skip
					</Text>
				</View>
			)}
			<Image
				source={require('../../assets/images/undraw_1.png')}
				style={[styles.image, { width, resizeMode: 'contain' }]}
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
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	description: {
		fontSize: 16,
	},
});
