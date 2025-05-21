import {useCallback, useState} from "react";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";

import SignUpInput from "./SignUpInput/SignUpInput";
import Header from "../../layouts/Header/Header";

import image from "../../../assets/images/welcome-banner.jpg";
import storage from "../../../helpers/storage";
import { fetchAllUsersModelAsync } from "../../../store/slices/userSlice";

function SignUp() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const allUsersModel = useSelector(state => state.users.allUsersModel);

    console.log('redux',allUsersModel);

    const handleSubmit = useCallback(() => {
        const checkEmail = allUsersModel.find(user => user.email === email);

        if (!name.trim()) {
            setNameError("Required");
            return;
        }

        if(!email.trim().match(/^[a-zA-Z0-9]+-?[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/) || !email.trim()) {
            setEmailError("Your email not correct");
            return;
        }

        if(password.length < 4 || !password.trim()) {
            setPasswordError("Minimum number of characters: 4");
            return;
        } else if(password.length > 40) {
            setPasswordError("Maximum number of characters: 40");
            return;
        }

        if(nameError && emailError && passwordError) {
            return;
        }

        if(checkEmail){
            setEmailError( 'This email already exist');
        } else {
            storage.setString('allUsersModel',
                JSON.stringify([
                    ...allUsersModel,
                    {
                        id: allUsersModel.length ? allUsersModel[allUsersModel.length - 1].id + 1 : 1,
                        email: email,
                        name: name,
                        password: password,
                        favoriteIds: [],
                    }
                ]));
            dispatch(fetchAllUsersModelAsync());
            setName('');
            setEmail('');
            setPassword('');
            navigation.navigate('login');
        }
    }, [name, email, password, nameError, emailError, passwordError]);

    const onChangeName = useCallback((value) => {
        setNameError("");
        setName(value);
    }, [name]);

    const onChangeEmail = useCallback((value) => {
        setEmailError("");
        setEmail(value);
    }, [email]);

    const onChangePassword = useCallback((value) => {
        setPasswordError("");
        setPassword(value);
    }, [password]);

    return (
        <ImageBackground source={image} resizeMode='stretch' style={styles.image}>
            <View style={styles.containerBefor}>
                <Header value="Login" to="login" />
                <View style={styles.form}>
                    <Text style={styles.title}>Sign Up</Text>
                    <SignUpInput
                        placeholder="Name"
                        value={name}
                        onChangeText={onChangeName}
                        error={nameError}
                    />
                    <SignUpInput
                        placeholder="Email"
                        value={email}
                        onChangeText={onChangeEmail}
                        error={emailError}
                    />
                    <SignUpInput
                        placeholder="Password"
                        value={password}
                        onChangeText={onChangePassword}
                        error={passwordError}
                    />
                    <TouchableOpacity styles={styles.signUpBtn} onPress={handleSubmit}>
                        <Text style={styles.button}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
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
    form: {
        margin: "auto",
        width: "80%",
        display: "flex",
        gap: 30,
        alignItems: "center",
    },
    title: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 30,
    },
    button: {
        color: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    signUpBtn: {
      width: 10,
    },
});

export default SignUp;
