import {useCallback, useState} from "react";
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";

import SignUpInput from "../SignUp/SignUpInput/SignUpInput";
import ModalPopup from "../../common/ModalPopup/ModalPopup";
import AskForDeleteData from "./AskForDeleteData/AskForDeleteData";

import image from "../../../assets/images/welcome-banner.jpg";
import storage from "../../../helpers/storage";
import { setUser, deleteUsersData, updateUsersList } from "../../../store/slices/userSlice";
import { carAutherDelete } from "../../../store/slices/carSlice";

function UpdateUserData() {
    const activeUser = useSelector(store => store.users.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [ updateName, setupdateName ] = useState(activeUser.name);
    const [ updatePassword, setupdatePassword ] = useState(activeUser.password);
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const toggleDeleteModalVisibility = useCallback(() => {
        setModalVisible(prev => !prev);
    }, [setModalVisible]);

    const handleLoginSubmit = useCallback((e) => {
        const updateValues = {
            name: updateName,
            password: updatePassword,
        };

        if (!updateName.trim()) {
            setNameError("Required");
            return;
        }

        if(updatePassword.length < 4 || !updatePassword.trim()) {
            setPasswordError("Minimum number of characters: 4");
            return;
        } else if(updatePassword.length > 40) {
            setPasswordError("Maximum number of characters: 40");
            return;
        }

        dispatch(updateUsersList({id: activeUser.id, updateValues : updateValues}));
        dispatch(setUser({...activeUser, ...updateValues}));
        storage.setString('user', JSON.stringify({...activeUser, ...updateValues}));
        navigation.navigate("feed");
    }, [updateName, updatePassword, nameError, passwordError]);

    const deleteUserData = useCallback((id) => {
        dispatch(deleteUsersData(id));
        dispatch(carAutherDelete(id));
        storage.removeItem("user");
        dispatch(setUser(null));
        setModalVisible(prevState => !prevState);
    }, []);

    const onChangeauodateName = useCallback((value) => {
        setNameError("");
        setupdateName(value);
    }, [updateName]);

    const onChangeUpdatePassword = useCallback((value) => {
        setPasswordError("");
        setupdatePassword(value);
    }, [updatePassword]);

    return (
        <ImageBackground source={image} resizeMode='stretch' style={styles.image}>
            <View style={styles.containerBefor}>
                <View style={styles.form}>
                    <Text style={styles.title}>Change name and password</Text>
                    <SignUpInput
                        placeholder="Name"
                        value={updateName}
                        onChangeText={onChangeauodateName}
                        error={nameError}
                    />
                    <SignUpInput
                        placeholder="Password"
                        value={updatePassword}
                        onChangeText={onChangeUpdatePassword}
                        error={passwordError}
                    />
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={handleLoginSubmit}>
                            <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleDeleteModalVisibility}>
                            <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {modalVisible &&
                    <ModalPopup modalVisible={modalVisible} onClose={toggleDeleteModalVisibility} >
                        <AskForDeleteData
                            askStr='Do you really want to delete your personal data?'
                            deleteData={deleteUserData}
                            id={activeUser?.id}
                            cancel={toggleDeleteModalVisibility}
                        />
                    </ModalPopup>
                }
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    containerBefor: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(42,45,84,.60)",
    },
    image: {
        flex: 1,
        objectFit: 'cover',
    },

    title: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 20,
    },
    form: {
        margin: "auto",
        width: "80%",
        display: "flex",
        gap: 30,
        alignItems: "center",
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        paddingLeft: 10,
        color: "#ffffff",
    },
    isRemembered: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    checkBox: {
        backgroundColor: null,
    },
    btnText: {
        color: "#ffffff",
    },
    error: {
        color: "#f98f8f",
        fontSize: 10,
    },
    btn: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

export default UpdateUserData;
