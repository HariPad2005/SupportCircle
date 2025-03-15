import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Login from './Login';
import OTPVerification from './OTPVerification';
import { supabase } from '../supabase';

const Signup = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [panCard, setPanCard] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setSecureText(!secureText);
  };

  const validateSignup = () => {
    if (!username || !email || !aadharCard || !contactNumber || !password || !confirmPassword || !panCard) {
      Alert.alert('Error', 'Please fill in all fields.');
      return false;
    }

    // Email Validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    // Aadhar Card Validation (12-digit number)
    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(aadharCard)) {
      Alert.alert('Error', 'Aadhar Card number must be 12 digits.');
      return false;
    }

    // Contact Number Validation (10-digit number)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contactNumber)) {
      Alert.alert('Error', 'Contact number must be 10 digits.');
      return false;
    }

    // Password Validation
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return false;
    }

    // Confirm Password Check
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return false;
    }

    // PAN Card Validation (Format: ABCDE1234F)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panCard)) {
      Alert.alert('Error', 'Please enter a valid PAN card number.');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;
  
    try {
      let { data: existingUser, error: userError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      Alert.alert('Signup Failed', 'Email is already registered.');
      return;
    }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        username, 
        options: {
          data: {
            username,
            aadhaar: aadharCard,
            pan: panCard,
            dob: dateOfBirth.toISOString().split('T')[0],
          },
        },
      });
  
      if (error) {
        Alert.alert('Signup Failed', error.message);
        return;
      }
  
      if (data.user) {
        Alert.alert('Success', 'Check your email for verification.');
        navigation.navigate('OTPVerification', { email: email }); // Navigate to OTP screen
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  // const handleSignup = async () => {
  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email: email,
  //       password: password,
  //     });
  
  //     if (error) {
  //       Alert.alert('Signup Failed', error.message);
  //       return;
  //     }
  
  //     Alert.alert('Success', 'Check your email for verification.');
  //     navigation.navigate('OTPVerification', { email: email });
  //   } catch (err) {
  //     Alert.alert('Error', 'Something went wrong. Try again.');
  //   }
  // };
  
  
  return (
    <ScrollView> 
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.signupContainer}>
          <Image source={require('../assets/profile.png')} style={styles.profileIcon} />
          <Text style={styles.title}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#bbb"
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Aadhaar Card"
            placeholderTextColor="#bbb"
            value={aadharCard}
            onChangeText={setAadharCard}
            keyboardType="numeric"
            maxLength={12}
          />

          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            placeholderTextColor="#bbb"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TextInput
            style={styles.input}
            placeholder="PAN Card"
            placeholderTextColor="#bbb"
            value={panCard}
            onChangeText={setPanCard}
            autoCapitalize="characters"
            maxLength={10}
          />

          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={{ color: dateOfBirth ? '#000' : '#bbb' }}>
              {dateOfBirth.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDateOfBirth(selectedDate);
              }}
            />
          )}

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

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#bbb"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Login</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '50%',
    maxWidth: 200,
    maxHeight: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
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
    justifyContent: 'center',
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
  loginText: {
    color: '#333',
    fontSize: 16,
    marginTop: 20,
  },
  loginLink: {
    color: '#007acc',
    fontWeight: 'bold',
  },
  eyeIcon: {
    padding: 10,
  },
});

export default Signup;

//contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled"