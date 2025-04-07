// import { StatusBar } from 'expo-status-bar';
// import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// import Home from './screens/Home';
// import { supabase } from './supabase';
// import BloodDonationPage from './screens/BloodDonationPage';
// import DonationDetailsPage from './screens/DonationDetails';
// import OTPVerification from './screens/OTPVerification';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
// import { useEffect } from 'react';

// const Stack = createStackNavigator();

// // HomeScreen Component
// const LandScreen = ({ navigation }) => {
//   const logoOpacity = useSharedValue(0);
//   const logoScale = useSharedValue(0.5);
//   const buttonTranslateY = useSharedValue(50);
//   const buttonOpacity = useSharedValue(0);

//   useEffect(() => {
//     logoOpacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
//     logoScale.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.exp) });
//     // buttonTranslateY.value = withTiming(0, { duration: 2000, delay: 1500, easing: Easing.out(Easing.exp) });
//     // buttonOpacity.value = withTiming(1, { duration: 2000, delay: 1500 });
//         const flag=0;
//         const checkSession = async () => {
//           const { data, error } = await supabase.auth.getSession();
//           if (data.session) {
//             flag=1; // Redirect to home if user is already logged in
//           }

//         };
//         checkSession();
//     setTimeout(() => {
//       if(flag===1)
//       {
//         console.log("Hello");
//         navigation.navigate('Home');
//       }
//       else{
//         navigation.navigate('Login');
//       }
      
//     }, 3000);
//   }, []);

//   const logoStyle = useAnimatedStyle(() => {
//     return {
//       opacity: logoOpacity.value,
//       transform: [{ scale: logoScale.value }],
//     };
//   });

//   // const buttonStyle = useAnimatedStyle(() => {
//   //   return {
//   //     opacity: buttonOpacity.value,
//   //     transform: [{ translateY: buttonTranslateY.value }],
//   //   };
//   // });

//   return (
//     <View style={styles.container}>
//       <Animated.Image source={require('./assets/logo.png')} style={[styles.logo, logoStyle]} />
//       {/* <Text style={styles.subtitle}>Together, we rebuild lives</Text> */}
//       {/* <Animated.View style={[styles.nextGroup, buttonStyle]}>
//         <Pressable style={styles.button} onPress={() => navigation.navigate('NextScreen')}>
//           <Text style={styles.next}>Next</Text>
//         </Pressable>
//       </Animated.View> */}
//       <StatusBar style="auto" />
//     </View>
//   );
// };

// // App Component with Stack Navigator
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Land" component={LandScreen} options={{ title: 'Home', headerShown: false }} />
//         <Stack.Screen name="Login" component={Login} options={{ title: '', headerShown: false }} />
//         <Stack.Screen name="Signup" component={Signup} options={{ title: '', headerShown: false }} />
//         <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ title: '', headerShown: false }} />
//         <Stack.Screen name="Home" component={Home} options={{ title: '', headerShown: false }} />
//         <Stack.Screen name="BloodDonation" component={BloodDonationPage} options={{ title: '', headerShown: false }} />
//         <Stack.Screen name="DonationDetails" component={DonationDetailsPage} options={{ title: '', headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f6fa',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: '80%',
//     maxWidth: 300,
//     maxHeight: 300,
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 50,
//     paddingHorizontal: 30,
//     lineHeight: 28,
//   },
//   nextGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     bottom: 50,
//   },
//   button: {
//     backgroundColor: '#007acc',
//     borderRadius: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   next: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#ffffff',
//   },
// });
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
enableScreens();
import { Image, StyleSheet, View, BackHandler, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import { supabase } from './supabase';
import BloodDonationPage from './screens/BloodDonationPage';
import DonationDetailsPage from './screens/DonationDetails';
import OTPVerification from './screens/OTPVerification';
import VoluntaryDonationPage from './screens/VoluntaryDonation';
import VoluntaryDonationDetailsPage from './screens/VoluntaryDonationDetails';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

const LandScreen = ({ navigation }) => {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.5);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    logoScale.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.exp) });

    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true); // Set the state to true if user is already logged in
      } else {
        setIsLoggedIn(false); // Set the state to false if user is not logged in
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (isLoggedIn !== null) {
      setTimeout(() => {
        if (isLoggedIn) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      }, 3000);
    }
  }, [isLoggedIn]);

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Image source={require('./assets/logo.png')} style={[styles.logo, logoStyle]} />
      <StatusBar style="auto" />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const back = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => back.remove();
  }, []);

  return <Home navigation={navigation} />;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Land" component={LandScreen} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="BloodDonation" component={BloodDonationPage} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="DonationDetails" component={DonationDetailsPage} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="VoluntaryDonation" component={VoluntaryDonationPage} options={{ title: '', headerShown: false }} />
        <Stack.Screen name="VoluntaryDonationDetails" component={VoluntaryDonationDetailsPage} options={{ title: '', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '80%',
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 30,
    lineHeight: 28,
  },
  nextGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    backgroundColor: '#007acc',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  next: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
