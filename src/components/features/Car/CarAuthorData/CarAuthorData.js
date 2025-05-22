import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function CarAuthorData({ name, phoneNumper }) {
  const handleCall = () => {
    const phoneUrl = `tel:${phoneNumper}`;
    Linking.openURL(phoneUrl).catch(err => {
      Alert.alert('Error', 'Cannot make a call');
    });
  };

  const handleMessage = () => {
    const smsUrl = `sms:${phoneNumper}`;
    Linking.openURL(smsUrl).catch(err => {
      Alert.alert('Error', 'Cannot open messaging app');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Author Information</Text>
      <Text style={styles.userName}>{name}</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={handleCall} style={styles.iconButton}>
          <Icon name="phone" size={20} color="#10B981" />
          <Text style={styles.iconText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleMessage} style={styles.iconButton}>
          <Icon name="comment" size={20} color="#3B82F6" />
          <Text style={styles.iconText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginTop: 30,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconText: {
    fontSize: 16,
    color: '#374151',
  },
});

export default CarAuthorData;
