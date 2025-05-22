import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const useImagePicker = (initialImages = []) => {
  const [imageUris, setImageUris] = useState(initialImages);

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
    console.log('pickImagesFromGallery called');
    const hasPermission = await requestPermissions();
    console.log('Permission granted:', hasPermission);
    if (!hasPermission) return;

    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      console.log('Gallery response:', response);
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        const uris = response.assets.map(asset => asset.uri);
        setImageUris(prev => [...prev, ...uris]);
      }
    });
  };


  const takePhoto = async () => {
    console.log('takePhoto called');
    const hasPermission = await requestPermissions();
    console.log('Permission granted:', hasPermission);
    if (!hasPermission) return;

    launchCamera({ mediaType: 'photo' }, (response) => {
      console.log('Camera response:', response);
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUris(prev => [...prev, uri]);
      }
    });
  };


  const removeImage = (uriToRemove) => {
    setImageUris(prev => prev.filter(uri => uri !== uriToRemove));
  };

  return {
    imageUris,
    pickImagesFromGallery,
    takePhoto,
    removeImage,
    setImageUris,
  };
};

export default useImagePicker;
