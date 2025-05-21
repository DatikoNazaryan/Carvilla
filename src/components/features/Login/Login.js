import {useCallback, useState} from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { CheckBox } from 'react-native-elements';

import Header from "../../layouts/Header/Header";
import SignUpInput from "../SignUp/SignUpInput/SignUpInput";

import image from "../../../assets/images/welcome-banner.jpg";
import storage from "../../../helpers/storage";
import { setUser } from "../../../store/slices/userSlice";

function Login() {
    const dispatch = useDispatch();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isChecked, setIsChecked ] = useState(false);
    const [ error, setError ] = useState(false);
    const allUsersModel = useSelector(state => state.users.allUsersModel);

    const handleLoginSubmit = (e) => {

        const result = allUsersModel.filter((curr) => (
            curr.email === email && curr.password === password
        ));

        if(error || !result.length) {
            setError(true);
            return;
        }

        if (isChecked) {
            storage.setString("user", JSON.stringify({
                ...result[0]
            }));
        }

        dispatch(setUser(result[0]));
    };

    const onChangeEmail = useCallback((value) => {
        setError("");
        setEmail(value);
    }, [email]);

    const onChangePassword = useCallback((value) => {
        setError("");
        setPassword(value);
    }, [password]);

    return (
        <ImageBackground source={image} resizeMode='stretch' style={styles.image}>
            <View style={styles.containerBefor}>
                <Header value="Sign Up" to="signUp" />
                <View style={styles.form}>
                    <Text style={styles.title}>Log In</Text>
                    {error && <Text style={styles.error}>Your email or password is not correct</Text>}
                    <SignUpInput
                       placeholder="Email"
                       value={email}
                       onChangeText={onChangeEmail}
                    />
                    <SignUpInput
                        placeholder="Password"
                        value={password}
                        onChangeText={onChangePassword}
                    />
                    <View style={styles.isRemembered}>
                        <CheckBox
                            title="Remember me"
                            checked={isChecked}
                            onPress={() => setIsChecked(!isChecked)}
                            iconType="material-community"
                            checkedIcon="checkbox-outline"
                            uncheckedIcon={'checkbox-blank-outline'}
                            containerStyle={{
                                backgroundColor: 'transparent',
                                borderWidth: 0,
                                padding: 0,
                                margin: 0,
                            }}
                            textStyle={{ color: '#fff' }}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
                        <Text style={styles.btnText}>Login</Text>
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

    title: {
        color: "#ffffff",
        textAlign: "center",
        fontSize: 30,
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
});

export default Login;
