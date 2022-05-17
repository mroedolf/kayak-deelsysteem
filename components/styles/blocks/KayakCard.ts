import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity`
	background-color: #fff;
	padding: ${({ theme }) => theme.space.medium};
	border-radius: ${({ theme }) => theme.sizes.small};
	margin-bottom: ${({ theme }) => theme.space.large};
	box-shadow: 8px 4px 4px rgba(200, 217, 250, 0.4);
`;

export const Title = styled.Text`
	font-size: ${({ theme }) => theme.fontSizes.base};
	font-weight: ${({ theme }) => theme.fontWeights.bold};
	color: ${({ theme }) => theme.colors.primary};
`;

export const ImageWrapper = styled.View`
	width: 100%;
	margin-bottom: ${({ theme }) => theme.space.medium};
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.sizes.small};
`;

export const Image = styled.Image`
	width: 100%;
	height: 200px;
	resize-mode: contain;
`;
