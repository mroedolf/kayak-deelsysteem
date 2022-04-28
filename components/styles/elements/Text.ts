import styled from 'styled-components/native';
import { color, ColorProps, typography, TypographyProps } from 'styled-system';

type TextProps = TypographyProps & ColorProps;

export const Text = styled.Text<TextProps>`
	${typography}
	${color}
`;
