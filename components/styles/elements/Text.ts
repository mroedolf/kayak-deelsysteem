import styled from 'styled-components/native';
import {
	color,
	ColorProps,
	margin,
	MarginProps,
	typography,
	TypographyProps,
} from 'styled-system';

type TextProps = TypographyProps | ColorProps | MarginProps;

export const Text = styled.Text<TextProps>`
	${typography}
	${color}
	${margin}
`;
