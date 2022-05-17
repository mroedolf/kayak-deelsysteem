import { StyleSheet } from 'react-native';
import React from 'react';
import {
	TouchableOpacity,
	TouchableOpacityProps,
} from './styles/elements/PasswordButton';
import { Text } from './styles/elements/Text';
import theme from './styles/theme';

type Props = {
	onPress: () => void;
	label: string;
} & TouchableOpacityProps;

const TextLink = ({ onPress, label, ...props }: Props) => {
	return (
		<TouchableOpacity onPress={onPress} {...props}>
			<Text
				color={theme.colors.primary}
				fontWeight={theme.fontWeights.bold}
				mt={theme.space.small}
				fontSize={theme.fontSizes.base}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export default TextLink;
