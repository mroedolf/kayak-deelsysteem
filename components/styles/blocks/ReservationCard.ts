import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.sizes.small}px;
	margin-bottom: ${({ theme }) => theme.space.large}px;
	display: flex;
	flex-direction: row;
`;

export const Title = styled.Text`
	font-size: ${({ theme }) => theme.font.sizes['2xl']}px;
	font-weight: ${({ theme }) => theme.font.weights.bold};
	color: ${({ theme }) => theme.colors.primary};
`;

export const Text = styled.Text`
	font-size: ${({ theme }) => theme.font.sizes.base}px;
	color: ${({ theme }) => theme.colors.primary};
`;

export const TextWrapper = styled.View`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: ${({ theme }) => theme.sizes.small}px;
	margin: ${({ theme }) => theme.space.small}px;
	padding: ${({ theme }) => theme.space.small}px
		${({ theme }) => theme.space.medium}px;
`;
