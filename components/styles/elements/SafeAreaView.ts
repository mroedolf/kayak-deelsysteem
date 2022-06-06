import styled from 'styled-components/native';
import {
	flex,
	flexbox,
	FlexboxProps,
	FlexProps,
	layout,
	LayoutProps,
	space,
	SpaceProps,
} from 'styled-system';

type SafeAreaViewProps = FlexboxProps | FlexProps | SpaceProps | LayoutProps;

export const SafeAreaView = styled.SafeAreaView<SafeAreaViewProps>`
	${space}
	${layout}
    ${flexbox}
    ${flex}
	background-color: ${({ theme }) => theme.colors.light};
	height: 100%;
	width: 100%;
	padding: ${({ theme }) => theme.space.medium}px;
`;
