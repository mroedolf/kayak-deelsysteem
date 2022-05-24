import styled from 'styled-components/native';
import {
	fontSize,
	margin,
	TypographyProps,
	SpaceProps,
	fontWeight,
} from 'styled-system';

type HeadingProps = TypographyProps & SpaceProps;

export const Heading = styled.Text<HeadingProps>`
	${fontSize}
	${fontWeight}
	${margin}
	font-family: 'Poppins_700Bold';
	color: ${({ theme }) => theme.colors.primary};
`;
