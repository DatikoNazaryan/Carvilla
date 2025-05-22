import { useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from "react-native-vector-icons/Feather";
import LogOutIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalPopup from "../../../common/ModalPopup/ModalPopup";

import { setUser } from "../../../../store/slices/userSlice";
import { deleteCar } from "../../../../store/slices/carSlice";
import storage from "../../../../helpers/storage";
import AskForDeleteData from "../../UpdateUserData/AskForDeleteData/AskForDeleteData";

const MenuWithCarUpdate = ({car}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const activUser = useSelector(state => state.users.user);
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleDeleteModalVisibility = useCallback(() => {
        setModalVisible(prev => !prev);
        setVisible(false);
    }, [setModalVisible]);


    const handleLogOut = useCallback(() => {
        storage.setString("user", null);
        dispatch(setUser(null));
        setVisible(false);
    }, []);

    const deleteCarData = useCallback((id) => {
            setVisible(false);
            dispatch(deleteCar(id));
            navigation.navigate('feed');
    },[]);

     const editCarData = useCallback(() => {
         setVisible(false);
         navigation.navigate("updateCarData", {car: car});
     },[]);

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
                    onPress={editCarData}
                >
                    <MaterialIcons name="edit" size={24} color="#4CAF50" />
                    <Text style={styles.option}>Edit Car</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionBlock}
                    onPress={toggleDeleteModalVisibility}
                >
                    <View style={styles.optionBlock}>
                        <MaterialIcons name="delete" size={24} color="#F44336" />
                        <Text style={styles.option}>Delete Car</Text>
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
            {modalVisible &&
                <ModalPopup modalVisible={modalVisible} onClose={toggleDeleteModalVisibility} >
                    <AskForDeleteData
                        askStr='Do you really want to delete your car data?'
                        deleteData={deleteCarData}
                        id={car?.id}
                        cancel={toggleDeleteModalVisibility}
                        setVisible={setVisible}
                    />
                </ModalPopup>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1,

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

export default MenuWithCarUpdate;

