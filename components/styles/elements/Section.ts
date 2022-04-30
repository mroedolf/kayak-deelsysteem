import styled from 'styled-components/native';
import {
	flexbox,
	FlexboxProps,
	grid,
	GridProps,
	layout,
	LayoutProps,
	position,
	PositionProps,
	space,
	SpaceProps,
} from 'styled-system';

type SectionProps =
	| FlexboxProps
	| GridProps
	| SpaceProps
	| LayoutProps
	| PositionProps;

export const Section = styled.View<SectionProps>`
	${space}
	${layout}
    ${position}
    ${grid}
    ${flexbox}
`;
