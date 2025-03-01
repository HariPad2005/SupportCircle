import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Home() {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('profile');
  };
  const navigateToRequest = () => {
    navigation.navigate('requesthelppage');
  };

//   const navigateToDonationPage = (donationType: string) => {
//     if (donationType === 'donate1') {
//       navigation.navigate('blooddonationpage');
//     } else if (donationType === 'donate4') {
//       navigation.navigate('fundingrequests');
//     }
//   };

  const emergencyHelpItems = [
    { id: 1, title: 'Urgent: Blood Group O+', description: 'Needed at City Hospital' },
    { id: 2, title: 'Food for Flood Victims', description: 'Drop at Shelter Zone 5' },
    { id: 3, title: 'Emergency Funds', description: 'Support family in medical crisis' },
    { id: 4, title: 'Winter Clothing', description: 'Help homeless stay warm' },
  ];

//   const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

//   const toggleDetails = (id: number) => {
//     setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Icon */}
      <TouchableOpacity style={styles.profileIcon} onPress={navigateToProfile}>
        <MaterialIcons name="account-circle" size={40} color="#fff" />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>Offer Help</Text>
      <Text style={styles.subHeading}>Make a Difference Today</Text>

      {/* Grid Container */}
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.gridItem} onPress={() => navigateToDonationPage('donate1')}>
          <Image source={require('../assets/donate1.png')} style={styles.gridImage} />
          <Text style={styles.gridText}>Blood Donation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} onPress={() => navigateToDonationPage('donate2')}>
          <Image source={require('../assets/donate2.png')} style={styles.gridImage} />
          <Text style={styles.gridText}>Food Supply</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} onPress={() => navigateToDonationPage('donate3')}>
          <Image source={require('../assets/donate3.png')} style={styles.gridImage} />
          <Text style={styles.gridText}>Clothing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem} onPress={() => navigateToDonationPage('donate4')}>
          <Image source={require('../assets/donate4.png')} style={styles.gridImage} />
          <Text style={styles.gridText}>Fund Raising</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Helps Section */}
      <Text style={styles.emergencyHeading}>Emergency Helps Needed</Text>
      <View style={styles.emergencyList}>
        {/* {emergencyHelpItems.map((item) => (
          <View key={item.id} style={styles.emergencyItem}>
            <Text style={styles.emergencyTitle}>{item.title}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleDetails(item.id)}
            >
              <Text style={styles.buttonText}>
                {expandedItems[item.id] ? 'Hide Details' : 'View Details'}
              </Text>
            </TouchableOpacity>
            {expandedItems[item.id] && (
              <Text style={styles.emergencyDescription}>{item.description}</Text>
            )}
          </View>
        ))} */}
      </View>

      {/* Redirective Text as Button */}
      <TouchableOpacity style={styles.requestButton} onPress={navigateToRequest}>
        <Text style={styles.requestButtonText}>Need help? Post your request here!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  profileIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#007acc',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
    marginTop: 100,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  gridItem: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },
  gridImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 10,
  },
  gridText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007acc',
  },
  emergencyHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e53935',
    marginTop: 30,
    textAlign: 'center',
  },
  emergencyList: {
    marginTop: 15,
    width: '100%',
  },
  emergencyItem: {
    backgroundColor: '#ffebee',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b71c1c',
  },
  button: {
    backgroundColor: '#007acc',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  requestButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 6,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
