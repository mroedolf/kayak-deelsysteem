import { Modal, Text, View, StyleSheet } from 'react-native';
import React from 'react';
import theme from './styles/theme';

type Props = {
	visible: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
};

const ModalComponent = ({ visible, onClose, children }: Props) => {
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
