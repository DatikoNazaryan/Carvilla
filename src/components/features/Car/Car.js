import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useSelector} from "react-redux";

import MyCarImagesCarousel from "./MyCarImagesCarousel/MyCarImagesCarousel";

import MenuWithCarUpdate from "./MenuWithCarUpdate/MenuWithCarUpdate";


const Car = ({ route }) => {
    const activUser = useSelector(state => state.users.user);
    const { item } = route.params;

    return (
        <View style={styles.container}>
            {activUser.id === item.authorId && (
                <MenuWithCarUpdate car={item} />
            )}
            <MyCarImagesCarousel images={item.imageUris} />
            <Text style={styles.model}>{item.model}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    model: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    price: {
        fontSize: 18,
        color: '#007AFF',
        marginTop: 8,
    },
    description: {
        fontSize: 16,
        marginTop: 12,
    },
});

export default Car;
