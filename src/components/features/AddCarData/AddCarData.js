import React, { useState } from 'react';
import { PermissionsAndroid, Platform, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';
import storage from "../../../helpers/storage";
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { fetchAllCardsModelAsync } from "../../../store/slices/carSlice";

const AddCarData = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const allCarsModel = useSelector(store => store.cars.allCarsModel);
    const activeUser = useSelector(store => store.users.user);
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [imageUris, setImageUris] = useState([]);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);

                if(!granted) {
                    console.log('error granted');
                }

                return true;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else {
            return true;
        }
    };


    const pickImagesFromGallery = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.assets && response.assets.length > 0) {
                const uris = response.assets.map((asset) => asset.uri);
                setImageUris(prevUris => [...prevUris, ...uris]);
            } else if (response.errorCode) {
                console.error('ImagePicker Error:', response.errorMessage);
            }
        });
    };

    const takePhoto = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.assets && response.assets.length > 0) {
                const newUri = response.assets[0].uri;
                setImageUris(prevUris => [...prevUris, newUri]);
            } else if (response.errorCode) {
                console.error('Camera error:', response.errorMessage);
            }
        });
    };


    const handleSubmit = () => {
        if(!model.trim() || !price.trim() || !description.trim() || !phoneNumber.trim()) {
            Alert.alert("Please fill out all input field");
            return;
        }

        if(imageUris.length === 0) {
            Alert.alert("Please take photo or choose from gallery");
            return;
        }
        storage.setString('allCarsModel',
            JSON.stringify([
                ...allCarsModel,
                {
                    id: allCarsModel.length ? allCarsModel[allCarsModel.length - 1].id + 1 : 1,
                    model: model,
                    price: price,
                    description: description,
                    phoneNumber: phoneNumber,
                    imageUris: imageUris,
                    createdDate: dayjs().format('DD/MM/YYYY'),
                    sortData: Date(),
                    authorId: activeUser.id,
                }
            ]));
        dispatch(fetchAllCardsModelAsync());
        navigation.navigate("feed");
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Write your car data</Text>
            <TextInput
                style={styles.input}
                placeholder="Model"
                value={model}
                onChangeText={setModel}
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.textArea}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Icon name="photo-camera" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImagesFromGallery}>
                <Icon name="photo-library" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'stretch',
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#aaa',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        height: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    icon: {
        marginRight: 8,
    },

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

});

export default AddCarData;
