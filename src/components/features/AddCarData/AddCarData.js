import React, { useState } from 'react';
import {
    TextInput, Text, TouchableOpacity, StyleSheet,
    ScrollView, Alert, Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import dayjs from 'dayjs';

import useImagePicker from '../../../hooks/useImagePicker'; // Hook-ը ներմուծիր ճիշտ ուղիով
import { fetchAllCardsModelAsync } from "../../../store/slices/carSlice";
import storage from "../../../helpers/storage";

const AddCarData = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const allCarsModel = useSelector(store => store.cars.allCarsModel);
    const activeUser = useSelector(store => store.users.user);

    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const {
        imageUris,
        pickImagesFromGallery,
        takePhoto,
        removeImage,
    } = useImagePicker([]);

    const handleSubmit = () => {
        if (!model.trim() || !price.trim() || !description.trim() || !phoneNumber.trim()) {
            Alert.alert("Please fill out all input fields");
            return;
        }

        if (imageUris.length === 0) {
            Alert.alert("Please take a photo or choose from gallery");
            return;
        }

        storage.setString('allCarsModel',
          JSON.stringify([
              ...allCarsModel,
              {
                  id: allCarsModel.length ? allCarsModel[allCarsModel.length - 1].id + 1 : 1,
                  model,
                  price,
                  description,
                  phoneNumber,
                  imageUris,
                  createdDate: dayjs().format('DD/MM/YYYY'),
                  sortData: Date(),
                  authorId: activeUser.id,
              }
          ])
        );

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

          <ScrollView horizontal style={{ marginVertical: 10 }}>
              {imageUris.map((uri, index) => (
                <TouchableOpacity key={index} onPress={() => removeImage(uri)}>
                    <Image source={{ uri }} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 5 }} />
                </TouchableOpacity>
              ))}
          </ScrollView>

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
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 8,
        elevation: 3,
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
