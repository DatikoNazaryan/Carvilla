import {useCallback, forwardRef} from 'react';
import {FlatList, View, Text, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";

import { CheckBox } from 'react-native-elements';
import {useDispatch, useSelector} from "react-redux";

import { updateUserisFavorite } from "../../../store/slices/userSlice";

const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48) / 2;

const CarList = forwardRef(({ handleScroll}, ref) => {
        const dispatch = useDispatch();
        const navigation = useNavigation();
        const activUser = useSelector((state) => state.users.user);
        const sortedCarsModel = useSelector(store => store.cars.sortedCars);

        const handlePress = useCallback((item) => {
            navigation.navigate('car', { id: item.id });
        }, [navigation]);

        return ( <FlatList
            ref={ref}
            data={sortedCarsModel}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={[styles.itemContainer, { width: itemWidth, backgroundColor: activUser.id === item.authorId ? "#c8f7c5" : "#fff" }]}
                    onPress={() => handlePress(item)}>
                    <View style={[styles.itemDate]}>
                        <Text style={styles.date}>{item.createdDate}</Text>
                    </View>
                    <Image source={{ uri: item.imageUris[0] }} style={styles.image} />
                    <Text style={styles.title}>{item.model}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                    <View style={styles.isFavorite}>
                        <CheckBox
                            title="Favorite"
                            checked={activUser.favoriteIds.includes(item.id)}
                            onPress={() => dispatch(updateUserisFavorite(item.id))}
                            iconType="material-community"
                            checkedIcon="checkbox-outline"
                            uncheckedIcon={'checkbox-blank-outline'}
                            containerStyle={{
                                backgroundColor: 'transparent',
                                borderWidth: 0,
                                padding: 0,
                                margin: 0,
                            }}
                            textStyle={{ color: '#000' }}
                        />
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.row}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        />)
});

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    itemContainer: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
    price: {
        color: '#007AFF',
        fontSize: 14,
        marginTop: 4,
    },
    isFavorite: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    itemDate: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
        marginBottom: 5,
    },
    date: {
        color: '#000',
        fontSize: 12,
    }
});

export default CarList;
