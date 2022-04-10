import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import Page from '../components/Onboarding/Page';
import { onboardingData } from '../data/onboarding';
import { RootStackScreenProps } from '../types';

const Onboarding = ({ navigation }: RootStackScreenProps<'Onboarding'>) => {
	const pagerRef = useRef<PagerView>(null);

	const handlePageChange = (pageNumber: number) => {
		console.log(pageNumber);
		if (!pagerRef.current) {
			return;
		}

		pagerRef.current.setPage(pageNumber);
	};

	return (
		<View style={{ flex: 1 }}>
			<PagerView style={styles.viewPager} initialPage={0} ref={pagerRef}>
				{onboardingData.map((item, index) => (
					<View key={index} style={styles.page}>
						<Page
							footer={{
								rightButtonLabel:
									index === onboardingData.length - 1
										? 'Get Started'
										: 'Next',
								rightButtonPress: () => {
									if (index === onboardingData.length - 1) {
										navigation.navigate('SignIn');
									} else {
										handlePageChange(index + 1);
									}
								},
								leftButtonLabel:
									index != 0 ? 'Back' : undefined,
								leftButtonPress: () => {
									if (index === 0) {
										handlePageChange(index - 1);
									} else {
										handlePageChange(index - 1);
									}
								},
								backgroundColor: item.backgroundColor,
							}}
							picture={item.picture}
							title={item.title}
							description={item.description}
							backgroundColor={item.backgroundColor}
							skipButton={item.skipButton}
							skipButtonPress={() =>
								navigation.navigate('SignIn')
							}
						/>
					</View>
				))}
			</PagerView>
		</View>
	);
};

const styles = StyleSheet.create({
	viewPager: {
		flex: 1,
	},
	page: {
		flex: 1,
	},
});

export default Onboarding;
