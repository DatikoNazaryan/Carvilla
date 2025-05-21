import {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import Icon from "react-native-vector-icons/Feather";

function SignUpInput({ onChangeText, value, placeholder, error }) {
    const [secure, setSecure] = useState(true);

    return (
        <View>
            {error && <Text style={styles.error}>{error}</Text>}
            <View style={styles.signUpInput}>
                <TextInput
                    style={[styles.input, error && styles.errorInput]}
                    onChangeText={(value) => onChangeText(value)}
                    placeholder={placeholder}
                    value={value}
                    secureTextEntry={placeholder === "Password" ? secure : false}
                    autoCapitalize={placeholder === 'Name' ? 'words' : 'none'}
                />
                {(placeholder === "Password") &&
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => setSecure(!secure)}
                    >
                        <Icon
                            name={secure ? 'eye-off' : 'eye'}
                            size={20}
                            color="#888"
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    errorInput: {
        backgroundColor: '#f98f8f',
        borderColor: '#f98f8f',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    errorText: {
        color: '#f98f8f',
        fontSize: 12,
        marginBottom: 15,
    },
    error: {
        color: '#f98f8f',
        fontSize: 12,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        paddingLeft: 10,
        color: "#ffffff",
    },
    icon: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    signUpInput: {
        position: "relative",
        width: 300,
        height: 40,
    }
});

export default SignUpInput;
