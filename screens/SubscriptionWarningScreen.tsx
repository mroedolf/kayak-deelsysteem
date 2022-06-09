import { View } from 'react-native';
import React from 'react';
import * as Card from '../components/styles/blocks/BookingCard';
import { Section } from '../components/styles/elements/Section';
import { RootStackScreenProps } from '../types';
import { Text } from '../components/styles/elements/Text';
import theme from '../components/styles/theme';
import { Button } from '../components/styles/elements/Button';

const SubscriptionWarningScreen = ({
	navigation,
}: RootStackScreenProps<'SubscriptionWarning'>) => {
	return (
		<View>
			<Section
				display={'flex'}
				height={'100%'}
				justifyContent={'flex-end'}
			>
				<Card.Wrapper>
					<Card.Content>
						<Text
							fontSize={theme.font.sizes['4xl']}
							fontWeight={'bold'}
							color={theme.colors.light}
						>
							Word lid van Buurtkajaks Gent
						</Text>
						<Text
							fontSize={theme.font.sizes.base}
							color={theme.colors.light}
							mt={theme.space.medium}
						>
							Per jaar betaal je 15 euro per account. Dit
							gebruiken we om het project duurzaam te houden.
						</Text>
						<Card.ButtonWrapper>
							<Button
								tertiary
								fullWidth
								onPress={() =>
									navigation.navigate(
										'PurchaseSubscriptionScreen'
									)
								}
							>
								<Text
									fontWeight={'bold'}
									fontSize={theme.font.sizes.base}
									color={theme.colors.primary}
								>
									Betaal nu
								</Text>
							</Button>
							<Button
								secondary
								fullWidth
								onPress={() => navigation.goBack()}
								mt={theme.space.small}
							>
								<Text
									fontWeight={'bold'}
									fontSize={theme.font.sizes.base}
									color={theme.colors.light}
								>
									Terug
								</Text>
							</Button>
						</Card.ButtonWrapper>
					</Card.Content>
				</Card.Wrapper>
			</Section>
		</View>
	);
};

export default SubscriptionWarningScreen;
