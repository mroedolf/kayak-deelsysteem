/* eslint-disable no-mixed-spaces-and-tabs */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, ImageSourcePropType, View } from 'react-native';
import kayakImage from '../assets/images/app/kajak-water.png';
import RoundedButton from '../components/Onboarding/RoundedButton';
import { Heading } from '../components/styles/elements/Heading';
import { Section } from '../components/styles/elements/Section';
import theme from '../components/styles/theme';
import TextLink from '../components/TextLink';
import { accountLinks, AccountLink } from '../data/accountLinks';
import { Kayak, RootTabScreenProps } from '../types';

export default function ProfileScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	return (
		<View
			style={{
				backgroundColor: theme.colors.light,
			}}
		>
			<Section
				display={'flex'}
				justifyContent={'space-between'}
				flexBasis={'50%'}
				marginX={theme.space.medium}
			>
				<Section mt="40px">
					<RoundedButton
						onPress={() => navigation.goBack()}
						label="Terug"
						labelSize={theme.font.sizes.lg}
						labelColor={theme.colors.primary}
						Icon={() => (
							<Ionicons
								name="chevron-back-outline"
								color={theme.colors.primary}
								size={24}
							/>
						)}
					/>
				</Section>
				<Section flexBasis={'100%'}>
					<Heading fontSize={theme.font.sizes['4xl']}>
						Mijn Accounts
					</Heading>
					<FlatList
						data={accountLinks}
						renderItem={({ item }: { item: AccountLink }) => (
							<TextLink
								key={item.label}
								onPress={() =>
									item.onPress
										? item.onPress()
										: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
										  // @ts-ignore
										  navigation.navigate(item.screen)
								}
								label={item.label}
							/>
						)}
					></FlatList>
				</Section>
			</Section>
			<Section flexBasis={'100%'}>
				<Image
					source={kayakImage as ImageSourcePropType}
					style={{
						width: '100%',
						height: '100%',
						resizeMode: 'contain',
					}}
				/>
			</Section>
		</View>
	);
}
