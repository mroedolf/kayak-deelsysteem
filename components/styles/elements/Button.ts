import styled from 'styled-components/native';
import {
	flex,
	flexbox,
	FlexboxProps,
	FlexProps,
	layout,
	LayoutProps,
	margin,
	position,
	PositionProps,
	SpaceProps,
} from 'styled-system';

type ButtonProps =
	| SpaceProps
	| FlexProps
	| FlexboxProps
	| LayoutProps
	| PositionProps;

export const Button = styled.TouchableOpacity<ButtonProps>`
	${flex}
	${flexbox}
    ${layout}
    ${margin}
    ${position}
	justify-content: center;
	align-items: center;
	background: #005ca9;
	color: white;
	border-radius: 10px;
	padding: 20px;
	${margin}
`;
