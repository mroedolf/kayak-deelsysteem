import React from 'react';
import {
	TouchableOpacity,
	TouchableOpacityProps,
} from './styles/elements/PasswordButton';
import { Entypo } from '@expo/vector-icons';
import theme from './styles/theme';

type Props = {
	onPress: () => void;
	isVisible: boolean;
	ref?: React.MutableRefObject<any>;
} & TouchableOpacityProps;

const PasswordButton = React.forwardRef<any, Props>(
	({ onPress, isVisible, ...props }, ref) => {
		console.log(ref);
		return (
			<TouchableOpacity
				ref={ref}
				onPress={onPress}
				{...props}
				background={
					!isVisible ? theme.colors.input : theme.colors.primary
				}
			>
				{isVisible ? (
					<Entypo
						name="eye"
						size={24}
						color={
							isVisible ? theme.colors.white : theme.colors.dark
						}
					/>
				) : (
					<Entypo name="eye-with-line" size={24} color="black" />
				)}
			</TouchableOpacity>
		);
	}
);

export default PasswordButton;

// PasswordButton with forwardRef
