import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import RoundedButton from './RoundedButton';

type Props = {
	backgroundColor: string;
	description: string;
	title: string;
	picture: string;
	footer?: {
		leftButtonLabel?: string;
		leftButtonPress?: () => void;
		rightButtonLabel?: string;
		rightButtonPress?: () => void;
		backgroundColor: string;
	};
};

const Page = ({
	backgroundColor,
	description,
	title,
	picture,
	footer,
}: Props) => {
	const {
		leftButtonLabel,
		leftButtonPress,
		rightButtonLabel,
		rightButtonPress,
		backgroundColor: footerBackgroundColor,
	} = footer || {};

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<View style={styles.content}>
					<Image source={{ uri: picture }} style={styles.image} />
					<Text style={styles.title}>{title}</Text>
					<Text style={{ fontSize: 16 }}>{description}</Text>
				</View>
				{!!footer && (
					<View
						style={[
							styles.footerWrapper,
							{ backgroundColor: footerBackgroundColor },
						]}
					>
						<View
							style={[
								styles.innerFooter,
								!!leftButtonLabel && {
									justifyContent: 'space-between',
								},
							]}
						>
							{!!leftButtonLabel && (
								<RoundedButton
									label={leftButtonLabel}
									onPress={() =>
										leftButtonPress && leftButtonPress()
									}
								/>
							)}
							{!!rightButtonLabel && (
								<RoundedButton
									label={rightButtonLabel}
									onPress={() =>
										rightButtonPress && rightButtonPress()
									}
								/>
							)}
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	image: {
		width: 200,
		height: 200,
		marginBottom: 40,
	},
	footerWrapper: {
		paddingVertical: 20,
		paddingHorizontal: 30,
		minWidth: '100%',
	},
	innerFooter: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
});
