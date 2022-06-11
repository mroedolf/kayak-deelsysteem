import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.sizes.medium}px;
	margin-bottom: ${({ theme }) => theme.space.large}px;
`;

export const Title = styled.Text`
	font-size: ${({ theme }) => theme.font.sizes.xl}px;
	font-weight: ${({ theme }) => theme.font.weights.bold};
	color: ${({ theme }) => theme.colors.primary};
`;

export const TextWrapper = styled.View`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: ${({ theme }) => theme.sizes.medium}px;
	border: 5px solid ${({ theme }) => theme.colors.primary};
	padding: ${({ theme }) => theme.space.small}px
		${({ theme }) => theme.space.medium}px;
`;

export const Subtitle = styled.Text`
	font-size: ${({ theme }) => theme.font.sizes.sm}px;
	font-weight: ${({ theme }) => theme.font.weights.bold};
	color: ${({ theme }) => theme.colors.secondary};
`;

export const Image = styled.Image`
	width: 100%;
	height: 100px;
	resize-mode: contain;
	margin: ${({ theme }) => theme.space.small}px 0;
`;
