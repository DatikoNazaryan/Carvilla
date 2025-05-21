import { useEffect, useRef, useState } from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import Icon from 'react-native-vector-icons/MaterialIcons';

import ProfileHeader from "../../layouts/AuthHeader/ProfileHeader";
import CarsList from "../CarsList/CarsList";
import Loader from "../../common/Loader/Loader";

import { setSortedCars } from "../../../store/slices/carSlice";
import { sortData } from "../../../helpers/sortData";

function Feed({ route }) {
    const { userId } = route.params || {};
    const dispatch = useDispatch();
    const allCarsModel = useSelector(store => store.cars.allCarsModel);
    const loading = useSelector(store => store.cars.loading);
    const sortBy = useSelector(store => store.cars.sortBy);
    const filterBy = useSelector(store => store.cars.filterBy);
    const activUser = useSelector(store => store.users.user);
    const sortedCarsModel = useSelector(store => store.cars.sortedCars);
    const flatListRef = useRef(null);
    const [ isScrollToTop, setIsScrollToTop] = useState(false);

    useEffect(() => {
        sortCars(sortBy);
    }, [sortBy, allCarsModel, filterBy, userId]);

    const sortCars = (sort) => {
        if(filterBy === "all") {
            dispatch(setSortedCars(userId ?
                sortData(allCarsModel.filter((car) => (car.authorId === userId)), sort) :
                sortData(allCarsModel, sort)));
        } else if (filterBy === "favorite") {
            dispatch(setSortedCars(userId ?
                sortData(allCarsModel.filter((car) => (car.authorId === userId)).filter((car) => activUser.favoriteIds.includes(car.id)), sort) :
                sortData(allCarsModel.filter((car) => activUser.favoriteIds.includes(car.id)), sort)));
        }
    };

    const scrollToTop = () => {
        if(flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        };
    };

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 0) {
            setIsScrollToTop(true);
        } else {
            setIsScrollToTop(false);
        }
    };

    if(loading) return <Loader />;

    return (
        <View style={styles.container}>
            <ProfileHeader />
            {isScrollToTop && (
                <TouchableOpacity style={styles.scrollButton} onPress={scrollToTop}>
                    <Icon name="arrow-upward" size={20} color="#fff" />
                </TouchableOpacity>
            )}
            {sortedCarsModel.length ?
                <CarsList handleScroll={handleScroll} ref={flatListRef} allCarsModel={sortedCarsModel} /> :
                <View style={styles.noCarsBlock}>
                    <Text style={styles.noCars}>There are no cars in the system yet</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    noCarsBlock: {
        margin: 'auto',
    },
    noCars: {
        textAlign: 'center',
        fontSize: 24.
    },
    scrollButton: {
        backgroundColor: '#2c3e50',
        padding: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 1000,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default Feed
