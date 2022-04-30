import styled from 'styled-components/native';
import { space, SpaceProps } from 'styled-system';

export const Input = styled.TextInput<
	{
		hasError: boolean;
	} & SpaceProps
>`
	${space}
	background-color: #e9ebf2;
	border-radius: 10px;
	padding: 15px;
	font-size: 16px;
	color: #30343e;
	width: 100%;
	${(props) =>
		props.hasError &&
		`
		border: 2px solid #ff4136;
	`}
	${(props) => !props.hasError && 'margin-bottom: 20px;'}
`;
