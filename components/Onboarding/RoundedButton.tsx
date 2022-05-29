import React, { ComponentType } from 'react';
import { TouchableOpacity } from '../styles/elements/TouchableOpacity';
import { Text } from '../styles/elements/Text';
import theme from '../styles/theme';

interface IconTypeProps {
	name: string;
	size: number;
	color: string;
}

type Props = {
	label: string;
	labelSize?: number;
	labelColor?: string;
	onPress: () => void;
	Icon?: ComponentType<IconTypeProps>;
};

const RoundedButton = ({
	label,
	onPress,
	Icon,
	labelSize,
	labelColor,
}: Props) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			flex={'1 1 auto'}
			flexDirection={'row'}
			alignItems={'center'}
		>
			{/* FIXME: Horrible typing here */}
			{Icon && (
				<Icon
					name={Icon.propTypes?.name as unknown as string}
					size={Icon.propTypes?.size as unknown as number}
					color={Icon.propTypes?.color as unknown as string}
				/>
			)}
			<Text
				fontSize={labelSize}
				color={labelColor}
				fontWeight={theme.font.weights.bold}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export default RoundedButton;
