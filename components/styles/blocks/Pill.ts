import styled from '../../../styled-components';

export const Wrapper = styled.TouchableOpacity<{ isSelected?: boolean }>`
	align-self: flex-start;
	border-radius: 10px;
	border: 1px solid
		${({ theme, isSelected }) =>
			isSelected ? theme.colors.primary : theme.colors.disabled};
	background-color: ${({ theme, isSelected }) =>
		isSelected ? theme.colors.primary : 'transparent'};
	margin-right: ${({ theme }) => theme.space.small}px;
`;

export const Text = styled.Text<{ isSelected?: boolean }>`
    fontSize: 18px
    color: ${({ theme, isSelected }) =>
		isSelected ? theme.colors.white : theme.colors.disabled};
	padding: ${({ theme }) => theme.space.small}px;
`;
