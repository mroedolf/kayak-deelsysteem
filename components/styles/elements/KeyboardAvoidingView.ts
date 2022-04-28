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

type KeyboardAvoidingViewProps =
	| FlexboxProps
	| FlexProps
	| SpaceProps
	| LayoutProps;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView<KeyboardAvoidingViewProps>`
	${flexbox}
	${flex}
    ${space}
    ${layout}
	background-color: #fdfdfd;
	padding: 20px;
`;
