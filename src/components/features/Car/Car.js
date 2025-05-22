import { Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from "react-redux";

import MyCarImagesCarousel from "./MyCarImagesCarousel/MyCarImagesCarousel";
import MenuWithCarUpdate from "./MenuWithCarUpdate/MenuWithCarUpdate";
import CarAuthorData from './CarAuthorData/CarAuthorData';


const Car = ({ route }) => {
    const activUser = useSelector(state => state.users.user);
    const { id } = route?.params || {};
    const allCarsModel = useSelector(state => state.cars.allCarsModel);
    const car = allCarsModel.find(car => car.id === id);
    const allUsersModel = useSelector(state => state.users.allUsersModel);
    const user = allUsersModel.find(item => item.id === car.authorId);

    return (
        <ScrollView style={styles.container}>
            {activUser.id === car.authorId && (
                <MenuWithCarUpdate car={car} />
            )}
            <MyCarImagesCarousel images={car.imageUris} />
            <Text style={styles.model}>{car.model}</Text>
            <Text style={styles.price}>${car.price}</Text>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{car.description}</Text>
            <CarAuthorData name={user.name} phoneNumper={car.phoneNumber} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    model: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginTop: 20,
        paddingHorizontal: 16,
    },
    price: {
        fontSize: 26,
        fontWeight: '500',
        color: '#10B981',
        marginTop: 10,
        paddingHorizontal: 16,
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
        marginTop: 10,
        paddingHorizontal: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: '#4B5563',
        marginTop: 12,
        paddingHorizontal: 16,
    },
});


export default Car;
