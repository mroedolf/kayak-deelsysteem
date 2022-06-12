import styled from 'styled-components/native';

export const Wrapper = styled.TouchableOpacity<{
	toggled: boolean;
	secondary?: boolean;
}>`
	width: 100%;
	border: 2px solid ${({ theme }) => theme.colors.light};
	border-radius: ${({ theme }) => theme.sizes.small}px;
	padding: ${({ theme }) => theme.sizes.small}px;
	background-color: ${({ theme, toggled, secondary }) =>
		toggled
			? theme.colors.primary
			: secondary
			? theme.colors.light
			: 'transparent'};
`;

export const Title = styled.Text<{ toggled: boolean; secondary?: boolean }>`
	font-size: ${({ theme }) => theme.font.sizes.xl};
	font-weight: ${({ theme }) => theme.font.weights.bold};
	color: ${({ theme, toggled, secondary }) =>
		toggled
			? theme.colors.light
			: secondary
			? theme.colors.primary
			: theme.colors.primary};
`;
