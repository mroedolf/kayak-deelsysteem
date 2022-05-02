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

type FlatlistProps = SpaceProps | LayoutProps | FlexProps | FlexboxProps;

export const Flatlist = styled.FlatList<FlatlistProps>`
	${space}
	${layout}
    ${flex}
    ${flexbox}
`;
