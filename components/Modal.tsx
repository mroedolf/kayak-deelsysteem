import { Modal, View, StyleSheet } from 'react-native';
import React from 'react';
import theme from './styles/theme';
import { useStore } from '../stores/useStore';

export enum ModalType {
	PURCHASE_MODAL = 'PURCHASE_MODAL',
	SUBSCRIPTION_MODAL = 'SUBSCRIPTION_MODAL',
	RESERVATION_MODAL = 'RESERVATION_MODAL',
}

type Props = {
	visible: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
	type?: ModalType;
};

const ModalComponent = ({ visible, children, type }: Props) => {
	const { modal } = useStore();

	if (modal.type !== type) return null;

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent
				visible={visible}
				statusBarTranslucent
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>{children}</View>
				</View>
			</Modal>
		</View>
	);
};

export default ModalComponent;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.8)',
	},
	modalView: {
		width: '95%',
		backgroundColor: 'white',
		borderRadius: theme.sizes.small,
		padding: theme.space.medium,
		alignItems: 'center',
	},
});
