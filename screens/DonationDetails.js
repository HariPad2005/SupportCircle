import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DonationDetailsPage = () => {
  const navigation = useNavigation();

  // State to manage form inputs
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  // Handle the form submission
  const handleSubmit = () => {
    if (name && contact && address && bloodGroup) {
      Alert.alert('Thank you for your donation!', 'Your details have been submitted.');
      // You can add further logic to handle the donation submission, e.g., sending data to an API.
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill in all the fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Donation Details Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contact}
        keyboardType="phone-pad"
        onChangeText={setContact}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Blood Group"
        value={bloodGroup}
        onChangeText={setBloodGroup}
      />

      {/* Donate Button */}
      <TouchableOpacity style={styles.donateButton} onPress={handleSubmit}>
        <Text style={styles.donateButtonText}>Submit Donation</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007acc',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  donateButton: {
    backgroundColor: '#007acc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  donateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DonationDetailsPage;
