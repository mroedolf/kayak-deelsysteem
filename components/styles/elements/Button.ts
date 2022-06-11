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
	{
		disabled?: boolean;
		secondary?: boolean;
		tertiary?: boolean;
		fullWidth?: boolean;
	} & ButtonProps
>`
	${flex}
	${flexbox}
    ${layout}
    ${margin}
    ${position}
	${margin}
	justify-content: center;
	align-items: center;
	background-color: ${({ theme, secondary, tertiary, disabled }) => {
		if (disabled) {
			return theme.colors.disabled;
		}
		if (secondary) {
			return 'transparent';
		}
		if (tertiary) {
			return theme.colors.light;
		}
		return theme.colors.primary;
	}};
	border: 3px solid
		${({ theme, secondary }) => {
			if (secondary) {
				return theme.colors.light;
			}
			return theme.colors.primary;
		}};
	border-radius: ${({ theme }) => theme.sizes.small}px;
	padding: 20px;
	width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;
