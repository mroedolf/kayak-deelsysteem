import styled from 'styled-components/native';
import {
	color,
	ColorProps,
	margin,
	MarginProps,
	padding,
	PaddingProps,
	typography,
	TypographyProps,
	flexbox,
	FlexboxProps,
	flexWrap,
	FlexWrapProps
} from 'styled-system';

type TextProps = TypographyProps | ColorProps | MarginProps | PaddingProps | FlexboxProps | FlexWrapProps;

export const Text = styled.Text<TextProps>`
	${typography}
	${color}
	${margin}
	${padding}
	${flexWrap}
	${flexbox}
`;
