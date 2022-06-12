import styled from 'styled-components/native';
import {
	background,
	BackgroundProps,
	margin,
	MarginProps,
	padding,
	PaddingProps,
} from 'styled-system';

export const Wrapper = styled.View`
	padding: ${({ theme }) => theme.space.medium}px 0;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: ${({ theme }) => theme.sizes.small}px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

type ButtonWrapperProps = BackgroundProps & MarginProps & PaddingProps;

export const ButtonWrapper = styled.View<
	{ horizontal?: boolean } & ButtonWrapperProps
>`
	width: 100%;
	display: flex;
	flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
	justify-content: space-between;
	align-items: center;
	margin-top: ${({ theme }) => theme.space.medium}px;
	${background}
	${margin}
	${padding}
	border-radius: ${({ theme }) => theme.sizes.small}px;
`;

export const SubscriptionContent = styled.View`
	width: 90%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;

export const BookingContent = styled.View`
	width: 90%;
`;

export const Image = styled.Image`
	width: 100%;
	height: 100px;
	resize-mode: contain;
	margin: 0 0 ${({ theme }) => theme.space.medium}px;
`;
