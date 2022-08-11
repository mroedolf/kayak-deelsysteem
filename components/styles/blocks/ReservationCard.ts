import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity<{ expired?: boolean }>`
	background-color: ${({ theme, expired }) =>
		expired ? 'rgba(10, 120, 191, 0.99)' : theme.colors.primary};
	border-radius: ${({ theme }) => theme.sizes.medium}px;
	margin-bottom: ${({ theme }) => theme.space.large}px;
	
	display: flex;
	flex-direction: column-reverse;
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
	border-radius: ${({ theme }) => theme.sizes.medium}px;
	border: 5px solid ${({ theme }) => theme.colors.primary};
	margin: ${({ theme }) => theme.space.small}px;
	padding: ${({ theme }) => theme.space.medium}px
		${({ theme }) => theme.space.medium}px;
	flex-basis: 60%;
`;

export const ImageWrapper = styled.View`
	border-radius: ${({ theme }) => theme.sizes.small}px;
`;

export const Image = styled.Image`
	width: 100%;
	height: 100px;
	resize-mode: contain;
	margin: ${({ theme }) => theme.space.small}px 0;
`;
