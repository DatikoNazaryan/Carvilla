import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import image from '../../../assets/images/welcome-banner.jpg';

function Welcome() {
    const navigation = useNavigation();

    return(
         <ImageBackground source={image} resizeMode='stretch' style={styles.image}>
             <View style={styles.containerBefor}>
                 <View style={styles.header}>
                     <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate("welcome")}>
                         <Text style={styles.logoTitle}>CARVILLA</Text>
                     </TouchableOpacity>
                     <View style={styles.linkBlock}>
                         <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("login")}>
                             <Text style={styles.title}>Login</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("signUp")}>
                             <Text style={styles.title}>Sign Up</Text>
                         </TouchableOpacity>
                     </View>
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
    header: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    logoTitle: {
        color: '#ffffff',
        fontSize: 20,
        letterSpacing: 3,
        fontWeight: 700,
    },
    logo: {
        marginVertical: 20
    },
    linkBlock: {
        display: 'flex',
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        objectFit: 'cover',
    },
    link: {
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 7,
        margin: 10,
    },
    title: {
        margin: "auto",
        color: "#ffffff",
    },
});

export default Welcome;
