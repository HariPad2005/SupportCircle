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

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Image, ScrollView, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const width = Dimensions.get('window').width;

// export default function Home() {
//   const navigation = useNavigation();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const featuredData = [
//     { id: '1', image: require('../assets/donate1.png'), text: 'Blood Needed: A+', description: 'Urgent need for A+ blood donors.' },
//     { id: '2', image: require('../assets/donate4.png'), text: 'Urgent Medical Funds', description: 'Support people in need of emergency medical funds.' },
//     { id: '3', image: require('../assets/donate2.png'), text: 'Support for Homeless', description: 'Providing food and shelter for the homeless.' }
//   ];

//   const flatListRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(prevIndex => {
//         const nextIndex = (prevIndex + 1) % featuredData.length;
//         if (flatListRef.current) {
//           flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//         }
//         return nextIndex;
//       });
//     }, 5000); // Change interval to 5000ms (5 seconds)
//     return () => clearInterval(interval);
//   }, []);

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

//   const navigateToHelpList = () => {
//     navigation.navigate('helplist');
//   };

//   return (
//     <ImageBackground source={require('../assets/logo.png')} style={styles.backgroundImage}>

//      {/* <Div style={{backgroundImage: "url('../assets/logo.png')"}}> */}
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Background Logo */}
//       <Image source={require('../assets/logo.png')} style={styles.backgroundLogo} />

//       {/* Profile Icon */}
//       <TouchableOpacity style={styles.profileIcon} onPress={navigateToProfile}>
//         <MaterialIcons name="account-circle" size={40} color="#fff" />
//       </TouchableOpacity>

//       <View style={styles.titleContainer}>
//         <Image source={require('../assets/logo.png')} style={styles.smallLogo} />
//         <Text style={styles.title}>SupportCircle</Text>
//       </View>

//       {/* Featured Helps (Sliding from Right to Left) */}
//       <View style={styles.featuredWrapper}>
//         <FlatList
//           ref={flatListRef}
//           horizontal
//           pagingEnabled
//           data={featuredData}
//           keyExtractor={item => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.featuredItem}>
//               <Image source={item.image} style={styles.featuredImage} />
//               <Text style={styles.featuredText}>{item.text}</Text>
//               <Text style={styles.featuredDescription}>{item.description}</Text>
//             </View>
//           )}
//           showsHorizontalScrollIndicator={false}
//           onMomentumScrollEnd={event => {
//             const index = Math.round(event.nativeEvent.contentOffset.x / width);
//             setCurrentIndex(index);
//           }}
//         />
//         <View style={styles.dotsContainer}>
//           {featuredData.map((_, index) => (
//             <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
//           ))}
//         </View>
//       </View>

//       {/* Grid Container */}
//       <View style={styles.gridContainer}>
//         <TouchableOpacity onPress={() => navigateToDonationPage('donate1')}>
//           <LinearGradient colors={['#ff6f61', '#de425b']} style={styles.gridItem}>
//             <Image source={require('../assets/donate1.png')} style={styles.gridImage} />
//             <Text style={styles.gridText}>Blood Donation</Text>
//             <MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigateToDonationPage('donate4')}>
//           <LinearGradient colors={['#4caf50', '#388e3c']} style={styles.gridItem}>
//             <Image source={require('../assets/donate4.png')} style={styles.gridImage} />
//             <Text style={styles.gridText}>Fund Raising</Text>
//             <MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>

//       {/* Redirective Text as Button */}
//       <TouchableOpacity style={styles.requestButton} onPress={navigateToRequest}>
//         <Text style={styles.requestButtonText}>Need help? Post your request here!</Text>
//       </TouchableOpacity>
//     </ScrollView>
//     </ImageBackground>

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
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'cover',
//     width: '100%',
//     height: '100%',
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
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'left',
//     marginTop: 30,
//   },
//   smallLogo: {
//     width: 40,
//     height: 40,
  
//   },
//   title: {
//     fontSize: 34,
//     fontWeight: 'bold',
//     color: '#333',
//     fontFamily: 'cursive',
//     marginTop: 30,
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   },
//   featuredWrapper: {
//     marginTop: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   featuredItem: {
//     width: width * 0.9,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     padding: 20,
//     alignItems: 'center',
//   },
//   featuredImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     resizeMode: 'cover',
//   },
//   featuredText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: '#333',
//   },
//   featuredDescription: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginTop: 5,
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#ccc',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: '#007acc',
//   },
//   gridContainer: {
//     marginTop: 30,
//     width: '100%',
//   },
//   gridItem: {
//     width: '100%',
//     height: 160,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 8,
//   },
//   gridImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//   },
//   gridText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   arrowIcon: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
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

// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, FlatList, ImageBackground } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const width = Dimensions.get('window').width;

// export default function Home() {
//   const navigation = useNavigation();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const featuredData = [
//     { id: '1', image: require('../assets/donate1.png'), text: 'Blood Needed: A+', description: 'Urgent need for A+ blood donors.' },
//     { id: '2', image: require('../assets/donate4.png'), text: 'Urgent Medical Funds', description: 'Support people in need of emergency medical funds.' },
//     { id: '3', image: require('../assets/donate2.png'), text: 'Support for Homeless', description: 'Providing food and shelter for the homeless.' }
//   ];

//   const flatListRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(prevIndex => {
//         const nextIndex = (prevIndex + 1) % featuredData.length;
//         if (flatListRef.current) {
//           flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
//         }
//         return nextIndex;
//       });
//     }, 5000); // Change interval to 5000ms (5 seconds)
//     return () => clearInterval(interval);
//   }, []);

//   const navigateToProfile = () => {
//     navigation.navigate('profile');
//   };
//   const navigateToRequest = () => {
//     navigation.navigate('requesthelppage');
//   };

//   const navigateToDonationPage = (donationType) => {
//     if (donationType === 'donate1') {
//       navigation.navigate('BloodDonation');
//     } else if (donationType === 'donate4') {
//       navigation.navigate('fundingrequests');
//     }
//   };

//   const navigateToHelpList = () => {
//     navigation.navigate('helplist');
//   };

//   return (
//     <ImageBackground source={require('../assets/logo.png')} style={styles.backgroundImage}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Profile Icon */}
//         <TouchableOpacity style={styles.profileIcon} onPress={navigateToProfile}>
//           <MaterialIcons name="account-circle" size={40} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.titleContainer}>
//           <Image source={require('../assets/logo.png')} style={styles.smallLogo} />
//           <Text style={styles.title}>SupportCircle</Text>
//         </View>

//         {/* Featured Helps (Sliding from Right to Left) */}
//         <View style={styles.featuredWrapper}>
//           <FlatList
//             ref={flatListRef}
//             horizontal
//             pagingEnabled
//             data={featuredData}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.featuredItem}>
//                 <Image source={item.image} style={styles.featuredImage} />
//                 <Text style={styles.featuredText}>{item.text}</Text>
//                 <Text style={styles.featuredDescription}>{item.description}</Text>
//               </View>
//             )}
//             showsHorizontalScrollIndicator={false}
//             onMomentumScrollEnd={event => {
//               const index = Math.round(event.nativeEvent.contentOffset.x / width);
//               setCurrentIndex(index);
//             }}
//           />
//           <View style={styles.dotsContainer}>
//             {featuredData.map((_, index) => (
//               <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
//             ))}
//           </View>
//         </View>

//         {/* Grid Container */}
//         <View style={styles.gridContainer}>
//           <TouchableOpacity onPress={() => navigateToDonationPage('donate1')}>
//             <LinearGradient colors={['#ff6f61', '#de425b']} style={styles.gridItem}>
//               <Image source={require('../assets/donate1.png')} style={styles.gridImage} />
//               <Text style={styles.gridText}>Blood Donation</Text>
//               <MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
//             </LinearGradient>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => navigateToDonationPage('donate4')}>
//             <LinearGradient colors={['#4caf50', '#388e3c']} style={styles.gridItem}>
//               <Image source={require('../assets/donate4.png')} style={styles.gridImage} />
//               <Text style={styles.gridText}>Fund Raising</Text>
//               <MaterialIcons name="arrow-forward" size={24} color="#fff" style={styles.arrowIcon} />
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>

//         {/* Redirective Text as Button */}
//         <TouchableOpacity style={styles.requestButton} onPress={navigateToRequest}>
//           <Text style={styles.requestButtonText}>Need help? Post your request here!</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'rgba(244, 244, 244, 0.8)', // Add a slight background color with transparency
//     position: 'relative',
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: 'contain',
//     width: '100%',
//     height: '100%',
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
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     right:70,

//   },
//   smallLogo: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//     top:7,
//   },
//   title: {
//     fontSize: 35,
//     fontWeight: 'bold',
//     color: '#333',
//     fontFamily: 'cursive',
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   },
//   featuredWrapper: {
//     marginTop: 20,
//     width: '100%',
//     alignItems: 'center',
//   },
//   featuredItem: {
//     width: width * 0.9,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     padding: 20,
//     alignItems: 'center',
//   },
//   featuredImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     resizeMode: 'cover',
//   },
//   featuredText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: '#333',
//   },
//   featuredDescription: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginTop: 5,
//   },
//   dotsContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#ccc',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: '#007acc',
//   },
//   gridContainer: {
//     marginTop: 30,
//     width: '100%',
//   },
//   gridItem: {
//     width: '100%',
//     height: 160,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 8,
//   },
//   gridImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 10,
//   },
//   gridText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   arrowIcon: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
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

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';

const width = Dimensions.get('window').width;

export default function Home() {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredData = [
    { id: '1', image: require('../assets/donate1.png'), text: 'Blood Needed: A+', description: 'Urgent need for A+ blood donors.' },
    { id: '2', image: require('../assets/donate4.png'), text: 'Urgent Medical Funds', description: 'Support people in need of emergency medical funds.' },
    { id: '3', image: require('../assets/donate2.png'), text: 'Support for Homeless', description: 'Providing food and shelter for the homeless.' }
  ];

  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % featuredData.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        return nextIndex;
      });
    }, 5000); // Change interval to 5000ms (5 seconds)
    return () => clearInterval(interval);
  }, []);

  const navigateToProfile = () => {
    navigation.navigate('profile');
  };
  const navigateToRequest = () => {
    navigation.navigate('requesthelppage');
  };

  const navigateToDonationPage = (donationType) => {
    if (donationType === 'donate1') {
      navigation.navigate('BloodDonation');
    } else if (donationType === 'donate4') {
      navigation.navigate('fundingrequests');
    }
  };

  const navigateToHelpList = () => {
    navigation.navigate('helplist');
  };

  return (
    <ImageBackground source={require('../assets/logo.png')} style={styles.backgroundImage}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.smallLogo} />
        <Text style={styles.title}>SupportCircle</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={navigateToProfile}>
          <MaterialIcons name="account-circle" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Featured Helps (Sliding from Right to Left) */}
        <View style={styles.featuredWrapper}>
          <FlatList
            ref={flatListRef}
            horizontal
            pagingEnabled
            data={featuredData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.featuredItem}>
                <Image source={item.image} style={styles.featuredImage} />
                <Text style={styles.featuredText}>{item.text}</Text>
                <Text style={styles.featuredDescription}>{item.description}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentIndex(index);
            }}
          />
          <View style={styles.dotsContainer}>
            {featuredData.map((_, index) => (
              <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
            ))}
          </View>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(244, 244, 244, 0.8)', // Add a slight background color with transparency
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#fffffa',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  profileIcon: {
    backgroundColor: '#007acc',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  smallLogo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'cursive',
    right: 60,
  },
  featuredWrapper: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  featuredItem: {
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  featuredText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  featuredDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007acc',
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
  gridText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  arrowIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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