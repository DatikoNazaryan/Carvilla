import {
    View,
    Modal,
    Pressable,
    StyleSheet,
} from 'react-native';

function ModalPopup  ({ children, modalVisible, onClose, styleOverlay, styleModal, animationType }) {

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType={animationType ? animationType : "fade"}
                onRequestClose={onClose}
            >
                <Pressable
                    style={styleOverlay ? styleOverlay : styles.overlay}
                    onPress={onClose}
                >
                    <Pressable onPress={() => {}} style={styleModal ? styleModal : styles.modal}>
                        {children}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 100,
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 10,
        width: '80%',
        elevation: 5,
        alignItems: 'center',
    },
});

export default ModalPopup;
