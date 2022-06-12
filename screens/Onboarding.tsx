import React, { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, View, ViewToken } from 'react-native';
import Page from '../components/Onboarding/Page';
import Paginator from '../components/Onboarding/Paginator';
import { onboardingData } from '../data/onboarding';
import { OnboardingDataType, RootStackScreenProps } from '../types';

const Onboarding = ({ navigation }: RootStackScreenProps<'Onboarding'>) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef<FlatList>(null);

	const viewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			if (viewableItems.length > 0) {
				setCurrentIndex(viewableItems[0].index as number);
			}
		}
	).current;

	const scrollTo = (action: string) => {
		if (slidesRef.current) {
			if (currentIndex < onboardingData.length - 1 || action === 'back') {
				if (action === 'next') {
					slidesRef.current.scrollToIndex({
						index: currentIndex + 1,
						animated: true,
					});
				} else {
					slidesRef.current.scrollToIndex({
						index: currentIndex - 1 < 0 ? 0 : currentIndex - 1,
						animated: true,
					});
				}
			} else if (action !== 'back') {
				navigation.navigate('CTAScreen');
			}
		}
	};

	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	return (
		<View style={styles.container}>
			<View style={{ flex: 3 }}>
				<FlatList
					data={onboardingData}
					renderItem={({ item }: { item: OnboardingDataType }) => (
						<Page
							item={item}
							skipButton
							skipButtonPress={() =>
								navigation.navigate('CTAScreen')
							}
						/>
					)}
					horizontal
					keyExtractor={(item) => String(item.id)}
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: { x: scrollX },
								},
							},
						],
						{ useNativeDriver: false }
					)}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					scrollEventThrottle={16}
					ref={slidesRef}
				/>
			</View>
			<Paginator
				onPress={scrollTo}
				data={onboardingData}
				scrollX={scrollX}
				currentIndex={currentIndex}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	viewPager: {
		flex: 1,
	},
	contentSlider: {
		flex: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	dots: {
		flex: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 310,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		margin: 5,
	},
});

export default Onboarding;
