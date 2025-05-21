import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

function AskForDeleteData({deleteData, askStr, id, cancel}) {
    return (
        <View style={styles.container}>
            <Text style={styles.modalTitle}>{askStr}</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    onPress={() => (deleteData(id), cancel())}
                    style={[styles.modalButton, { backgroundColor: '#FF3B30' }]}
                >
                    <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={cancel}
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                >
                    <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 6,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AskForDeleteData;
