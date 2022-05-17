import styled from 'styled-components/native';
import { flex, FlexProps, space, SpaceProps } from 'styled-system';

type InputProps = SpaceProps | FlexProps;

export const Input = styled.TextInput<
	{
		hasError: boolean;
		hasButton?: boolean;
	} & InputProps
>`
	${space}
	${flex}
	background-color: ${({ theme }) => theme.colors.input};
	${({ hasButton }) =>
		hasButton &&
		`
			border-top-right-radius: 0
			border-bottom-right-radius: 0
		`}
	border-radius: ${({ theme }) => theme.space.small};
	padding: 15px;
	font-size: 16px;
	color: #30343e;
	width: 100%;
	${(props) =>
		props.hasError &&
		`
		border: 2px solid #ff4136;
	`}

	${(props) =>
		props.hasError &&
		`
		color: #ff4136;
	`}
	margin-top: ${({ theme }) => theme.space.medium};
`;
