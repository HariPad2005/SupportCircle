// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

// export default function Home() {
//   const navigation = useNavigation();

//   const navigateToProfile = () => {
//     navigation.navigate('profile');
//   };
//   const navigateToRequest = () => {
//     navigation.navigate('requesthelppage');
//   };

//   const navigateToDonationPage = (donationType) => {
//     if (donationType === 'donate1') {
//       navigation.navigate('blooddonationpage');
//     } else if (donationType === 'donate4') {
//       navigation.navigate('fundingrequests');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Background Logo */}
//       <Image source={require('../assets/logo.png')} style={styles.backgroundLogo} />

//       {/* Profile Icon */}
//       <TouchableOpacity style={styles.profileIcon} onPress={navigateToProfile}>
//         <MaterialIcons name="account-circle" size={40} color="#fff" />
//       </TouchableOpacity>

//       {/* Title */}
//       <Text style={styles.title}>SupportCircle</Text>

//       {/* Featured Helps (Sliding from Right to Left) */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredHelps}>
//         <View style={styles.featuredItem}><Text style={styles.featuredText}>Blood Needed: A+</Text></View>
//         <View style={styles.featuredItem}><Text style={styles.featuredText}>Urgent Medical Funds</Text></View>
//         <View style={styles.featuredItem}><Text style={styles.featuredText}>Support for Homeless</Text></View>
//       </ScrollView>

//       {/* Grid Container */}
//       <View style={styles.gridContainer}>
//         <TouchableOpacity style={styles.gridItem} onPress={() => navigateToDonationPage('donate1')}>
//           <Text style={styles.gridText}>Blood Donation {'>'}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.gridItem} onPress={() => navigateToDonationPage('donate4')}>
//           <Text style={styles.gridText}>Fund Raising {'>'}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Redirective Text as Button */}
//       <TouchableOpacity style={styles.requestButton} onPress={navigateToRequest}>
//         <Text style={styles.requestButtonText}>Need help? Post your request here!</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f4f4f4',
//     position: 'relative',
//   },
//   backgroundLogo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//     opacity: 0.1,
//   },
//   profileIcon: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     backgroundColor: '#007acc',
//     padding: 8,
//     borderRadius: 50,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 6,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#333',
//     marginTop: 100,
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   },
//   featuredHelps: {
//     marginTop: 20,
//     flexDirection: 'row',
//   },
//   featuredItem: {
//     backgroundColor: '#ffeb3b',
//     padding: 10,
//     marginRight: 10,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   featuredText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   gridContainer: {
//     marginTop: 30,
//     width: '100%',
//   },
//   gridItem: {
//     width: '100%',
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'linear-gradient(to right, #ff6f61, #de425b)',
//     marginBottom: 15,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 8,
//   },
//   gridText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   requestButton: {
//     backgroundColor: '#4caf50',
//     padding: 15,
//     borderRadius: 6,
//     marginTop: 20,
//     width: '90%',
//     alignItems: 'center',
//   },
//   requestButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const navigation = useNavigation();
  const translateX = new Animated.Value(500);

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -500,
        duration: 5000,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    ).start();
  }, []);

  const navigateToProfile = () => {
    navigation.navigate('profile');
  };
  const navigateToRequest = () => {
    navigation.navigate('requesthelppage');
  };

  const navigateToDonationPage = (donationType) => {
    if (donationType === 'donate1') {
      navigation.navigate('blooddonationpage');
    } else if (donationType === 'donate4') {
      navigation.navigate('fundingrequests');
    }
  };

  const navigateToHelpList = () => {
    navigation.navigate('helplist');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background Logo */}
      <Image source={require('../assets/logo.png')} style={styles.backgroundLogo} />

      {/* Profile Icon */}
      <TouchableOpacity style={styles.profileIcon} onPress={navigateToProfile}>
        <MaterialIcons name="account-circle" size={40} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>SupportCircle</Text>

      {/* Featured Helps (Sliding from Right to Left) */}
      <View style={styles.featuredWrapper}>
        <Animated.View style={[styles.featuredHelps, { transform: [{ translateX }] }]}>
          <TouchableOpacity onPress={navigateToHelpList} style={styles.featuredItem}>
            <Image source={require('../assets/donate1.png')} style={styles.featuredImage} />
            <Text style={styles.featuredText}>Blood Needed: A+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToHelpList} style={styles.featuredItem}>
            <Image source={require('../assets/donate4.png')} style={styles.featuredImage} />
            <Text style={styles.featuredText}>Urgent Medical Funds</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToHelpList} style={styles.featuredItem}>
            <Text style={styles.featuredText}>Support for Homeless</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Grid Container */}
      <View style={styles.gridContainer}>
        <TouchableOpacity onPress={() => navigateToDonationPage('donate1')}>
          <LinearGradient colors={['#ff6f61', '#de425b']} style={styles.gridItem}>
            <Image source={require('../assets/donate1.png')} style={styles.gridImage} />
            <Text style={styles.gridText}>Blood Donation</Text>
            <MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToDonationPage('donate4')}>
          <LinearGradient colors={['#4caf50', '#388e3c']} style={styles.gridItem}>
            <Image source={require('../assets/donate4.png')} style={styles.gridImage} />
            <Text style={styles.gridText}>Fund Raising</Text>
            <MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
          </LinearGradient>
        </TouchableOpacity>
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
    position: 'relative',
  },
  backgroundLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.15,
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
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'cursive',
    marginTop: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  featuredWrapper: {
    overflow: 'hidden',
    width: '100%',
    marginTop: 20,
  },
  featuredHelps: {
    flexDirection: 'row',
    width: '300%',
  },
  featuredItem: {
    backgroundColor: '#fffff1',
    padding: 15,
    marginRight: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  featuredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  gridContainer: {
    marginTop: 30,
    width: '100%',
  },
  gridItem: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  gridImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  gridText:{
    color: "#ffffff",
    fontSize: 20,
  },
  arrowIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

    gridText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
