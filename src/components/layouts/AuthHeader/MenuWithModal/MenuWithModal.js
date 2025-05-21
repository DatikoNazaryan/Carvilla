import { useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation, useRoute} from "@react-navigation/native";

import Icon from 'react-native-vector-icons/Feather';
import LogOutIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalPopup from "../../../common/ModalPopup/ModalPopup";
import UsersName from "../UsersName/UsersName";

import { setUser } from "../../../../store/slices/userSlice";
import storage from "../../../../helpers/storage";

const MenuWithModal = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const activUser = useSelector(state => state.users.user);
    const [visible, setVisible] = useState(false);
    const [usersModal, setUsersModal] = useState(false);
    const {params} = useRoute();

    const handleLogOut = useCallback(() => {
        storage.setString("user", null);
        dispatch(setUser(null));
        setVisible(false);
    }, []);

    const handleOnPressMyProfile = useCallback(() => {
        setVisible(false);
        navigation.navigate("updateUserData")
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon name={visible ? 'x' : 'menu'} size={30} color="#fff" />
            </TouchableOpacity>
            <ModalPopup
                modalVisible={visible}
                onClose={() => setVisible(false)}
                styleOverlay={styles.overlay}
                styleModal={styles.modal}
            >
                <Text style={styles.title}>Menu</Text>
                <TouchableOpacity
                    style={styles.optionBlock}
                    onPress={handleOnPressMyProfile}
                >
                    <Text style={styles.option}>My Profile Data</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionBlock, {backgroundColor: params?.userId === activUser.id ? "#c8f7c5" : "#fff"}]}
                    onPress={() => (navigation.navigate("feed", { userId: activUser.id}), setVisible(false))}
                >
                    <Text style={styles.option}>My Cars</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionBlock}
                    onPress={() => (setVisible(false), setUsersModal(true))}
                >
                    <Text style={styles.option}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionBlock}
                    onPress={() => (navigation.navigate("addCarData"), setVisible(false))}
                >
                    <View style={styles.optionBlock}>
                        <Icon name="plus" size={24} color="#888" />
                        <Text style={styles.option}>Add Car</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionBlock}
                    onPress={handleLogOut}
                >
                    <LogOutIcon name="logout" size={24} color="#888" />
                    <Text style={styles.option}>Log Out</Text>
                </TouchableOpacity>
            </ModalPopup>
            <ModalPopup
                modalVisible={usersModal}
                onClose={() => setUsersModal(false)}
                styleOverlay={styles.usersOverlay}
                styleModal={styles.modal}
             >
               <UsersName setUsersModal={setUsersModal} />
            </ModalPopup>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20,
        height: 40,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 70,
        paddingRight: 10,
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        minWidth: 250,
        elevation: 5,
    },
    usersOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 70,
        paddingRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    optionBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    option: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default MenuWithModal;

