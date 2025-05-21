import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { setSortBy, setFilterBy } from "../../../store/slices/carSlice";

const FilterAndSortBy = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector(store => store.cars.sortBy);
    const filterBy = useSelector(store => store.cars.filterBy);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!modalVisible);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleModal} style={{display: "flex", flexDirection: "row"}} >
                <Text style={styles.sortAndFilter}>Sort & Filter</Text>
                <Icon name="filter-list" size={28} color="#fff" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Sort & Filter</Text>
                        <Text style={styles.sectionTitle}>Sort By:</Text>
                        <View style={styles.buttonRow}>
                            <Pressable
                                style={[
                                    styles.optionButton,
                                    sortBy === 'asc' && styles.activeButton,
                                ]}
                                onPress={() => dispatch(setSortBy('asc'))}
                            >
                                <Text style={styles.buttonText}>Asc</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.optionButton,
                                    sortBy === 'desc' && styles.activeButton,
                                ]}
                                onPress={() => dispatch(setSortBy('desc'))}
                            >
                                <Text style={styles.buttonText}>Desc</Text>
                            </Pressable>
                        </View>
                        <Text style={styles.sectionTitle}>Filter:</Text>
                        <View style={styles.buttonRow}>
                            <Pressable
                                style={[
                                    styles.optionButton,
                                    filterBy === 'all' && styles.activeButton,
                                ]}
                                onPress={() => dispatch(setFilterBy('all'))}
                            >
                                <Text style={styles.buttonText}>All</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.optionButton,
                                    filterBy === 'favorite' && styles.activeButton,
                                ]}
                                onPress={() => dispatch(setFilterBy('favorite'))}
                            >
                                <Text style={styles.buttonText}>Favorites</Text>
                            </Pressable>
                        </View>
                        <Pressable style={styles.closeButton} onPress={toggleModal}>
                            <Text style={styles.closeButtonText}>Done</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default FilterAndSortBy;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 30,
    },
    sortAndFilter: {
      color: '#fff',
       marginRight: 10
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 24,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    sectionTitle: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    optionButton: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#ecf0f1',
    },
    activeButton: {
        backgroundColor: '#3498db',
    },
    buttonText: {
        color: '#2c3e50',
    },
    closeButton: {
        marginTop: 24,
        backgroundColor: '#2ecc71',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
