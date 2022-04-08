import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import Page from '../components/Onboarding/Page';
import { RootStackScreenProps } from '../types';

const Onboarding = ({ navigation }: RootStackScreenProps<'Onboarding'>) => {
	const pagerRef = useRef<PagerView>(null);

	const handlePageChange = (pageNumber: number) => {
		if (!pagerRef.current) {
			return;
		}

		pagerRef.current.setPage(pageNumber);
	};

	return (
		<View style={{ flex: 1 }}>
			<PagerView style={styles.viewPager} initialPage={0} ref={pagerRef}>
				<View style={styles.page} key="1">
					<Page
						backgroundColor="white"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
						title="Lorem ipsum dolor sit amet"
						picture="https://picsum.photos/200/200"
						footer={{
							rightButtonLabel: 'Next',
							rightButtonPress: () => handlePageChange(1),
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
						}}
					/>
				</View>
				<View style={styles.page} key="2">
					<Page
						backgroundColor="white"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
						title="Lorem ipsum dolor sit amet"
						picture="https://picsum.photos/200/200"
						footer={{
							leftButtonLabel: 'Back',
							leftButtonPress: () => handlePageChange(0),
							rightButtonLabel: 'Next',
							rightButtonPress: () => handlePageChange(2),
							backgroundColor: 'rgba(255, 255, 255, 0.5)',
						}}
					/>
				</View>
				<Page
					backgroundColor="purple"
					description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
					title="Lorem ipsum dolor sit amet"
					picture="https://picsum.photos/200/200"
					footer={{
						leftButtonLabel: 'Back',
						leftButtonPress: () => handlePageChange(1),
						rightButtonLabel: 'Get Started',
						rightButtonPress: () => navigation.navigate('SignIn'),
						backgroundColor: 'rgba(255, 255, 255, 0.5)',
					}}
				/>
			</PagerView>
		</View>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	viewPager: {
		flex: 1,
	},
	page: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
