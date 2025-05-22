import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {useDispatch} from 'react-redux';

import useDebounce from './debounce';

import { setSearchedCarsModel } from '../../../store/slices/carSlice';

function SearchCar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceVal, setDebounceVal] = useState("");
  const debounceValue = useDebounce(searchTerm, 1000);

  useEffect(() => {
    setDebounceVal(searchTerm);
    dispatch(setSearchedCarsModel(debounceVal));
  }, [debounceValue, debounceVal]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    width: 180,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 25,
    color: '#fff',
  },
});

export default SearchCar;
