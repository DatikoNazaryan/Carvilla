import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

import MenuWithModal from "./MenuWithModal/MenuWithModal";
import FilterAndSortBy from "../../features/FilterAndSortBy/FilterAndSortBy";

function AuthHeader() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate("feed")}>
                <Text style={[styles.logoTitle,]}>CARVILLA</Text>
            </TouchableOpacity>
            <MenuWithModal />
            <FilterAndSortBy/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#2c3e50",
        flexWrap: "wrap",
    },
    logoTitle: {
        color: '#ffffff',
        fontSize: 20,
        letterSpacing: 3,
        fontWeight: 600,
        marginLeft: 20
    },
    logo: {
        marginVertical: 20
    },
});

export default AuthHeader;
