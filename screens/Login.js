import React, { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { supabase } from '../supabase';

const Login = () => {
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        navigation.navigate('Home'); // Redirect to home if user is already logged in
      }
    };
    checkSession();
  }, []);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false)


  const togglePasswordVisibility = () => {
    setSecureText(!secureText);
  };

  const validateLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return false;
    }
  };


  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Login Failed', error.message);
      return;
    }

    Alert.alert('Success', 'Login successful!');
    navigation.navigate('Home');

  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={28} color="#ffffff" />
      </TouchableOpacity> */}
      <View style={styles.loginContainer}>
        <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#bbb"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <MaterialIcons name={secureText ? 'visibility-off' : 'visibility'} size={24} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffffff',
    padding: 20,
  },
  logo: {
    width: '50%',
    maxWidth: 200,
    maxHeight: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  loginContainer: {
    width: '90%',
    padding: 25,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  profileIcon: {
    width: 90,
    height: 90,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#007acc',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007acc',
    fontSize: 16,
    marginTop: 10,
  },
  signupText: {
    color: '#333',
    fontSize: 16,
    marginTop: 20,
  },
  signupLink: {
    color: '#007acc',
    fontWeight: 'bold',
  },
});

export default Login;


    //const emailRegex = /\S+@\S+\.\S+/;
    //if (!emailRegex.test(email)) {
    //  Alert.alert('Error', 'Please enter a valid email address.');
    //  return false;
    //}
    //if (password.length < 6) {
    //  Alert.alert('Error', 'Password must be at least 6 characters long.');
    //  return false;
    //}
    //return true;
  // const handleLogin = async () => {
  //   if (!validateLogin()) return;

  //   try {
  //     // Fetch user from Supabase
  //     const { data, error } = await supabase
  //       .from('users')
  //       .select('*')
  //       .eq('email', email)
  //       .single(); // Fetch only one record

  //     if (error || !data) {
  //       Alert.alert('Login Failed', 'Invalid email or password.');
  //       return;
  //     }

  //     // Validate password (assuming plaintext password stored)
  //     if (data.password !== password) {
  //       Alert.alert('Login Failed', 'Invalid email or password.');
  //       return;
  //     }

  //     // If successful, navigate to dashboard
  //     Alert.alert('Success', 'Login successful!');
  //     navigation.navigate('Home');

  //   } catch (error) {
  //     console.error('Login Error:', error);
  //     Alert.alert('Error', 'Something went wrong. Please try again.');
  //   }
  // };
  