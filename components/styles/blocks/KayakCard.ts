import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.sizes.medium};
	margin-bottom: ${({ theme }) => theme.space.large};
`;

export const Title = styled.Text`
	font-size: ${({ theme }) => theme.font.sizes.xl}px;
	font-weight: ${({ theme }) => theme.font.weights.bold};
	color: ${({ theme }) => theme.colors.primary};
`;

export const TextWrapper = styled.View`
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: ${({ theme }) => theme.sizes.medium};
	margin: ${({ theme }) => theme.space.small}px;
	padding: ${({ theme }) => theme.space.small}px
		${({ theme }) => theme.space.medium}px;
`;

export const Subtitle = styled.Text`
	font-size: ${({ theme }) => theme.font.sizes.sm};
	font-weight: ${({ theme }) => theme.font.weights.bold};
	color: ${({ theme }) => theme.colors.darkGrey};
`;

export const Image = styled.Image`
	width: 100%;
	height: 100px;
	resize-mode: contain;
`;
