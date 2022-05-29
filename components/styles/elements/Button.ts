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

export const Button = styled.TouchableOpacity<
	{ secondary?: boolean } & ButtonProps
>`
	${flex}
	${flexbox}
    ${layout}
    ${margin}
    ${position}
	justify-content: center;
	align-items: center;
	background-color: ${({ theme, secondary }) =>
		secondary ? 'transparent' : theme.colors.primary};
	border: 3px solid ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.sizes.small};
	padding: 20px;
	${margin}
`;
