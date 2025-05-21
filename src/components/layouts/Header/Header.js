import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { useNavigation } from "@react-navigation/native";

function Header ({value, to}) {
    const navigation = useNavigation();

   return(
       <View style={styles.header}>
           <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate("welcome")}>
               <Text style={styles.logoTitle}>CARVILLA</Text>
           </TouchableOpacity>
           <View style={styles.linkBlock}>
               <TouchableOpacity style={styles.link} onPress={() => navigation.navigate(to)}>
                   <Text style={styles.title}>{value}</Text>
               </TouchableOpacity>
           </View>
       </View>
   );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
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
    }
});

export default Header;
