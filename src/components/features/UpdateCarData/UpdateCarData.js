import React, {useCallback, useState} from 'react';
import { TextInput, Text, View, Image, Button, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { updateCar, deletePhoto } from "../../../store/slices/carSlice";
import useImagePicker from '../../../hooks/useImagePicker';

const UpdateCarData = ({route}) => {
  const {car} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [model, setModel] = useState(car.model);
  const [price, setPrice] = useState(car.price);
  const [description, setDescription] = useState(car.description);
  const [phoneNumber, setPhoneNumber] = useState(car.phoneNumber);

  const {
    imageUris,
    pickImagesFromGallery,
    takePhoto,
    removeImage,
  } = useImagePicker(car.imageUris);

  const handleSubmit = () => {
    if (!model.trim() || !price.trim() || !description.trim() || !phoneNumber.trim()) {
      Alert.alert("Please fill out all input fields");
      return;
    }

    if (imageUris.length === 0) {
      Alert.alert("Please take photo or choose from gallery");
      return;
    }

    dispatch(updateCar({ id: car.id, model, price, description, phoneNumber, imageUris }));
    navigation.navigate("car", {id: car.id});
  };

  const handleDeletePhoto = useCallback((image) => {
    removeImage(image.imageUri);
    dispatch(deletePhoto(image));
  }, [removeImage, dispatch]);

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
      <ScrollView horizontal>
        {imageUris.map((image, index) => (
          <View key={index} style={{ marginRight: 10 }}>
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
            <Button title="Delete" onPress={() => handleDeletePhoto({ id: car.id, imageUri: image })} />
          </View>
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
        <Text style={styles.buttonText}>Save</Text>
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

export default UpdateCarData;
