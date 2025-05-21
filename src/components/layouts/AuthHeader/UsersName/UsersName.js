import {useCallback, useEffect, useState} from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {useNavigation, useRoute} from "@react-navigation/native";

function UsersName({setUsersModal}) {
    const {params} = useRoute();
    const allUsersModel = useSelector(store => store.users.allUsersModel);
    const activeUser = useSelector(store => store.users.user);
    const navigation = useNavigation();
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const usersListWithoutCurrent = allUsersModel.filter((curr) => curr.id !== activeUser.id);
        setUsers(usersListWithoutCurrent);
    }, [allUsersModel, activeUser.id]);

    const onPressUser = useCallback((id) => {
        navigation.navigate("feed", { userId: id });
        setUsersModal(false);
    },[])

    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
                <TouchableOpacity style={[styles.item, {backgroundColor: params?.userId === item.id ? "#c8f7c5" : "#f0f0f0"}]} onPress={() => onPressUser(item.id)}>
                <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>}
            contentContainerStyle={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        padding: 16,
    },
    item: {
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        color: '#333',
    },
});

export default UsersName;
