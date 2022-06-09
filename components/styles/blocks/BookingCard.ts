import styled from 'styled-components/native';

export const Wrapper = styled.View`
	padding: ${({ theme }) => theme.space.medium}px 0
		${({ theme }) => theme.space.medium}px 0;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.sizes.small}px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ButtonWrapper = styled.View<{ horizontal?: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
	justify-content: space-between;
	align-items: center;
	margin-top: ${({ theme }) => theme.space.medium}px;
`;

export const Content = styled.View`
	width: 90%;
`;
