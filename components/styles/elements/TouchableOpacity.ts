import styled from 'styled-components/native';
import {
	color,
	ColorProps,
	flex,
	flexbox,
	FlexboxProps,
	FlexProps,
	layout,
	LayoutProps,
} from 'styled-system';

type TouchableOpacityProps =
	| FlexProps
	| ColorProps
	| LayoutProps
	| FlexboxProps;

export const TouchableOpacity = styled.TouchableOpacity<TouchableOpacityProps>`
	${flex}
	${color}
    ${layout}
	${flexbox}
`;
