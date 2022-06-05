import styled from 'styled-components/native';
import {
	background,
	BackgroundProps,
	border,
	BorderProps,
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
	| PositionProps
	| BorderProps
	| BackgroundProps;

export const Section = styled.View<SectionProps>`
	${space}
	${layout}
    ${position}
    ${grid}
    ${flexbox}
	${border}
	${background}
	overflow: scroll;
`;
