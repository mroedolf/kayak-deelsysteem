import styled from 'styled-components/native';
import {
	background,
	BackgroundProps,
	border,
	BorderProps,
	borderRadius,
	BorderRadiusProps,
	color,
	ColorProps,
	flex,
	flexbox,
	FlexboxProps,
	FlexProps,
	fontSize,
	FontSizeProps,
	space,
	SpaceProps,
} from 'styled-system';

export type TouchableOpacityProps =
	| SpaceProps
	| FlexProps
	| FlexboxProps
	| BorderProps
	| BorderRadiusProps
	| ColorProps
	| BackgroundProps
	| FontSizeProps;

export const TouchableOpacity = styled.TouchableOpacity<TouchableOpacityProps>`
	${space}
	${flex}
    ${flexbox}
    ${border}
    ${borderRadius}
    ${color}
    ${background}
	${fontSize}
`;
