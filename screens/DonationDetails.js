// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const DonationDetailsPage = () => {
//   const navigation = useNavigation();

//   // State to manage form inputs
//   const [name, setName] = useState('');
//   const [contact, setContact] = useState('');
//   const [address, setAddress] = useState('');
//   const [bloodGroup, setBloodGroup] = useState('');

//   // Handle the form submission
//   const handleSubmit = () => {
//     if (name && contact && address && bloodGroup) {
//       Alert.alert('Thank you for your donation!', 'Your details have been submitted.');
//       // You can add further logic to handle the donation submission, e.g., sending data to an API.
//       navigation.goBack();
//     } else {
//       Alert.alert('Error', 'Please fill in all the fields.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Donation Details Form</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Your Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Contact Number"
//         value={contact}
//         keyboardType="phone-pad"
//         onChangeText={setContact}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={address}
//         onChangeText={setAddress}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Blood Group"
//         value={bloodGroup}
//         onChangeText={setBloodGroup}
//       />

//       {/* Donate Button */}
//       <TouchableOpacity style={styles.donateButton} onPress={handleSubmit}>
//         <Text style={styles.donateButtonText}>Submit Donation</Text>
//       </TouchableOpacity>

//       {/* Back Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Text style={styles.backButtonText}>Go Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#007acc',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   donateButton: {
//     backgroundColor: '#007acc',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 5,
//   },
//   donateButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   backButton: {
//     backgroundColor: '#6200ea',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     alignItems: 'center',
//     elevation: 5,
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
// });

// export default DonationDetailsPage;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, Button } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { supabase } from '../supabase';
// // import { useRoute } from '@react-navigation/native';


// const Tab = createMaterialTopTabNavigator();

// const DonationDetails = ({route}) => {
//   const [volunteers, setVolunteers] = useState([]);
//   const [name, setName] = useState('');
//   const [contact, setContact] = useState('');
//   const [address, setAddress] = useState('');
//   const [bloodGroup, setBloodGroup] = useState('');
//   const [department, setDepartment] = useState('');
//   const [regNo, setRegNo] = useState('');
//   const [year, setYear] = useState('');
//   const [isStudent, setIsStudent] = useState(false);
//   const [isFaculty, setIsFaculty] = useState(false);
//   // const route = useRoute();
//   const { campaignId } = route.params || {}; 
//   console.log("campaign id ",campaignId);  

//   useEffect(() => {
//     fetchVolunteers();
//   }, []);

//   const fetchVolunteers = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('donors')
//         .select('*')
//         .eq('campaign_id', campaignId);

//       if (error) throw error;
//       setVolunteers(data);
//     } catch (error) {
//       console.error('Error fetching volunteers:', error);
//     }
//   };

//   const addVolunteer = async () => {
//     if (name && contact && address && bloodGroup && department && (isStudent || isFaculty)) {
//       try {
//         const volunteerData = {
//           name,
//           contact,
//           // address,
//           blood_group: bloodGroup,
//           department,
//           campaign_id: campaignId,
//           student: isStudent ? 1 : 0,
//           faculty: isFaculty ? 1 : 0,
//           reg_no: isStudent ? regNo : null,
//           year: isStudent ? year : null,
//           donated: 0,
//         };

//         const { data, error } = await supabase
//           .from('donors')
//           .insert([volunteerData]);

//         if (error) throw error;
//         Alert.alert('Thank you for volunteering!', 'Your details have been submitted.');
//         fetchVolunteers();
//         setName('');
//         setContact('');
//         // setAddress('');
//         setBloodGroup('');
//         setDepartment('');
//         setRegNo('');
//         setYear('');
//         setIsStudent(false);
//         setIsFaculty(false);
//       } catch (error) {
//         console.error('Error adding volunteer:', error);
//       }
//     } else {
//       Alert.alert('Error', 'Please fill in all the fields.');
//     }
//   };

//   const deleteVolunteer = async (volunteerId) => {
//     try {
//       const { error } = await supabase
//         .from('donors')
//         .delete()
//         .eq('id', volunteerId);

//       if (error) throw error;
//       fetchVolunteers();
//     } catch (error) {
//       console.error('Error deleting volunteer:', error);
//     }
//   };

//   const confirmDelete = (volunteerId) => {
//     Alert.alert(
//       'Delete Volunteer',
//       'Are you sure you want to delete this volunteer?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Delete', style: 'destructive', onPress: () => deleteVolunteer(volunteerId) },
//       ],
//       { cancelable: true }
//     );
//   };

//   const markAsDonated = async (volunteerId) => {
//     try {
//       const { error } = await supabase
//         .from('donors')
//         .update({ donated: 1 })
//         .eq('id', volunteerId);

//       if (error) throw error;
//       fetchVolunteers();
//     } catch (error) {
//       console.error('Error marking as donated:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Volunteer Details Form</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Contact Number"
//         value={contact}
//         keyboardType="phone-pad"
//         onChangeText={setContact}
//       />

//       {/* <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={address}
//         onChangeText={setAddress}
//       /> */}
//       <TextInput
//         style={styles.input}
//         placeholder="Department"
//         value={department}
//         onChangeText={setDepartment}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Blood Group"
//         value={bloodGroup}
//         onChangeText={setBloodGroup}
//       />



//       <View style={styles.radioContainer}>
//         <TouchableOpacity onPress={() => { setIsStudent(true); setIsFaculty(false); }}>
//           <Text style={isStudent ? styles.radioSelected : styles.radio}>Student</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => { setIsStudent(false); setIsFaculty(true); }}>
//           <Text style={isFaculty ? styles.radioSelected : styles.radio}>Faculty</Text>
//         </TouchableOpacity>
//       </View>

//       {isStudent && (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="Year"
//             value={year}
//             onChangeText={setYear}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Registration Number"
//             value={regNo}
//             onChangeText={setRegNo}
//           />
//         </>
//       )}

//       <TouchableOpacity style={styles.donateButton} onPress={addVolunteer}>
//         <Text style={styles.donateButtonText}>Submit Volunteer</Text>
//       </TouchableOpacity>

//       <Text style={styles.heading}>Volunteers List</Text>
//       <FlatList
//         data={volunteers}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.volunteerCard}>
//             <Text style={styles.volunteerText}>Name: {item.name}</Text>
//             <Text style={styles.volunteerText}>Contact: {item.contact}</Text>
//             <Text style={styles.volunteerText}>Address: {item.address}</Text>
//             <Text style={styles.volunteerText}>Blood Group: {item.blood_group}</Text>
//             <Text style={styles.volunteerText}>Department: {item.department}</Text>
//             {item.student ? (
//               <>
//                 <Text style={styles.volunteerText}>Year: {item.year}</Text>
//                 <Text style={styles.volunteerText}>Registration Number: {item.reg_no}</Text>
//               </>
//             ) : (
//               <Text style={styles.volunteerText}>Faculty</Text>
//             )}
//             <View style={styles.volunteerActions}>
//               <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
//                 <MaterialIcons name="delete" size={24} color="#ff0000" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.donateButton} onPress={() => markAsDonated(item.id)}>
//                 <Text style={styles.donateButtonText}>Mark as Donated</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </ScrollView>
//   );
// };

// const Donors = () => {
//   const [donors, setDonors] = useState([]);

//   useEffect(() => {
//     fetchDonors();
//   }, []);

//   const fetchDonors = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('donors')
//         .select('*');

//       if (error) throw error;
//       setDonors(data);
//     } catch (error) {
//       console.error('Error fetching donors:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.heading}>Donors List</Text>
//       <FlatList
//         data={donors}
//         keyExtractor={(item) => item.reg_no.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.donorCard}>
//             <Text style={styles.donorText}>Name: {item.name}</Text>
//             <Text style={styles.donorText}>Phone: {item.phone}</Text>
//             <Text style={styles.donorText}>Blood Group: {item.blood_group}</Text>
//             <Text style={styles.donorText}>Department: {item.department}</Text>
//             <Text style={styles.donorText}>Year: {item.year}</Text>
//             <Text style={styles.donorText}>Student: {item.student ? 'Yes' : 'No'}</Text>
//             <Text style={styles.donorText}>Faculty: {item.faculty ? 'Yes' : 'No'}</Text>
//           </View>
//         )}
//       />
//     </ScrollView>
//   );
// };

// const DonationDetailsPage = ({route}) => {
//   const { campaignId } = route.params || {}; 
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: { marginTop: 10 },
//         tabBarIndicatorStyle: { backgroundColor: '#007bff' },
//         tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//       }}
//     >
//       <Tab.Screen name="Volunteers" component={DonationDetails} initialParams={{ campaignId }}/>
//       <Tab.Screen name="Donors" component={Donors} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#f9f9f9',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#007acc',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   donateButton: {
//     backgroundColor: '#007acc',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 5,
//   },
//   donateButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   volunteerCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   volunteerText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   volunteerActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   deleteButton: {
//     marginLeft: 10,
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 15,
//   },
//   radio: {
//     fontSize: 16,
//     color: '#333',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
//   radioSelected: {
//     fontSize: 16,
//     color: '#fff',
//     padding: 10,
//     backgroundColor: '#007acc',
//     borderWidth: 1,
//     borderColor: '#007acc',
//     borderRadius: 8,
//   },
//   donorCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   donorText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default DonationDetailsPage;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { supabase } from '../supabase';

// const Tab = createMaterialTopTabNavigator();

// const Volunteers = ({ route }) => {
//   const [volunteers, setVolunteers] = useState([]);
//   const [name, setName] = useState('');
//   const [phone, setContact] = useState('');
//   const [bloodGroup, setBloodGroup] = useState('');
//   const [department, setDepartment] = useState('');
//   const [regNo, setRegNo] = useState('');
//   const [year, setYear] = useState('');
//   const [isStudent, setIsStudent] = useState(false);
//   const [isFaculty, setIsFaculty] = useState(false);
//   const campaignId = route.params.campaignId;

//   useEffect(() => {
//     fetchVolunteers();
//   }, []);

//   const fetchVolunteers = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('donors')
//         .select('*')
//         .eq('campaign_id', campaignId);

//       if (error) throw error;
//       setVolunteers(data);
//     } catch (error) {
//       console.error('Error fetching volunteers:', error);
//     }
//   };

//   const addVolunteer = async () => {
//     if (name && phone && bloodGroup && department && (isStudent || isFaculty)) {
//       try {
//         const volunteerData = {
//           name,
//           phone,
//           blood_group: bloodGroup,
//           department,
//           campaign_id: campaignId,
//           student: isStudent ? 1 : 0,
//           faculty: isFaculty ? 1 : 0,
//           reg_no: isStudent ? regNo : null,
//           year: isStudent ? year : null,
//           donated: 0,
//         };

//         const { data, error } = await supabase
//           .from('donors')
//           .insert([volunteerData]);

//         if (error) throw error;
//         Alert.alert('Thank you for volunteering!', 'Your details have been submitted.');
//         fetchVolunteers();
//         setName('');
//         setContact('');
//         setBloodGroup('');
//         setDepartment('');
//         setRegNo('');
//         setYear('');
//         setIsStudent(false);
//         setIsFaculty(false);
//       } catch (error) {
//         console.error('Error adding volunteer:', error);
//       }
//     } else {
//       Alert.alert('Error', 'Please fill in all the fields.');
//     }
//   };

//   const deleteVolunteer = async (volunteerId) => {
//     try {
//       const { error } = await supabase
//         .from('donors')
//         .delete()
//         .eq('id', volunteerId);

//       if (error) throw error;
//       fetchVolunteers();
//     } catch (error) {
//       console.error('Error deleting volunteer:', error);
//     }
//   };

//   const confirmDelete = (volunteerId) => {
//     Alert.alert(
//       'Delete Volunteer',
//       'Are you sure you want to delete this volunteer?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Delete', style: 'destructive', onPress: () => deleteVolunteer(volunteerId) },
//       ],
//       { cancelable: true }
//     );
//   };

//   const markAsDonated = async (volunteerId) => {
//     try {
//       const { error } = await supabase
//         .from('donors')
//         .update({ donated: 1 })
//         .eq('id', volunteerId);

//       if (error) throw error;
//       fetchVolunteers();
//     } catch (error) {
//       console.error('Error marking as donated:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Volunteer Details Form</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Your Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Contact Number"
//         value={phone}
//         keyboardType="phone-pad"
//         onChangeText={setContact}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Blood Group"
//         value={bloodGroup}
//         onChangeText={setBloodGroup}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Department"
//         value={department}
//         onChangeText={setDepartment}
//       />

//       <View style={styles.radioContainer}>
//         <TouchableOpacity onPress={() => { setIsStudent(true); setIsFaculty(false); }}>
//           <Text style={isStudent ? styles.radioSelected : styles.radio}>Student</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => { setIsStudent(false); setIsFaculty(true); }}>
//           <Text style={isFaculty ? styles.radioSelected : styles.radio}>Faculty</Text>
//         </TouchableOpacity>
//       </View>

//       {isStudent && (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="Year"
//             value={year}
//             onChangeText={setYear}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Registration Number"
//             value={regNo}
//             onChangeText={setRegNo}
//           />
//         </>
//       )}

//       <TouchableOpacity style={styles.donateButton} onPress={addVolunteer}>
//         <Text style={styles.donateButtonText}>Submit Volunteer</Text>
//       </TouchableOpacity>

//       <Text style={styles.heading}>Volunteers List</Text>
//       <FlatList
//         data={volunteers}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.volunteerCard}>
//             <Text style={styles.volunteerText}>Name: {item.name}</Text>
//             <Text style={styles.volunteerText}>Contact: {item.contact}</Text>
//             <Text style={styles.volunteerText}>Blood Group: {item.blood_group}</Text>
//             <Text style={styles.volunteerText}>Department: {item.department}</Text>
//             {item.student ? (
//               <>
//                 <Text style={styles.volunteerText}>Year: {item.year}</Text>
//                 <Text style={styles.volunteerText}>Registration Number: {item.reg_no}</Text>
//               </>
//             ) : (
//               <Text style={styles.volunteerText}>Faculty</Text>
//             )}
//             <View style={styles.volunteerActions}>
//               <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
//                 <MaterialIcons name="delete" size={24} color="#ff0000" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.donateButton} onPress={() => markAsDonated(item.id)}>
//                 <Text style={styles.donateButtonText}>Mark as Donated</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const Donors = () => {
//   const [donors, setDonors] = useState([]);

//   useEffect(() => {
//     fetchDonors();
//   }, []);

//   const fetchDonors = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('donors')
//         .select('*');

//       if (error) throw error;
//       setDonors(data);
//     } catch (error) {
//       console.error('Error fetching donors:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Donors List</Text>
//       <FlatList
//         data={donors}
//         keyExtractor={(item) => item.reg_no.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.donorCard}>
//             <Text style={styles.donorText}>Name: {item.name}</Text>
//             <Text style={styles.donorText}>Phone: {item.phone}</Text>
//             <Text style={styles.donorText}>Blood Group: {item.blood_group}</Text>
//             <Text style={styles.donorText}>Department: {item.department}</Text>
//             <Text style={styles.donorText}>Year: {item.year}</Text>
//             <Text style={styles.donorText}>Student: {item.student ? 'Yes' : 'No'}</Text>
//             <Text style={styles.donorText}>Faculty: {item.faculty ? 'Yes' : 'No'}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const DonationDetailsPage = ({ route }) => {
//   const { campaignId } = route.params || {};
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: { marginTop: 10 },
//         tabBarIndicatorStyle: { backgroundColor: '#007bff' },
//         tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//       }}
//     >
//       <Tab.Screen name="Volunteers" component={Volunteers} initialParams={{ campaignId }} />
//       <Tab.Screen name="Donors" component={Donors} />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#007acc',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   donateButton: {
//     backgroundColor: '#007acc',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 5,
//   },
//   donateButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   volunteerCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   volunteerText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   volunteerActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   deleteButton: {
//     marginLeft: 10,
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 15,
//   },
//   radio: {
//     fontSize: 16,
//     color: '#333',
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//   },
//   radioSelected: {
//     fontSize: 16,
//     color: '#fff',
//     padding: 10,
//     backgroundColor: '#007acc',
//     borderWidth: 1,
//     borderColor: '#007acc',
//     borderRadius: 8,
//   },
//   donorCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   donorText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default DonationDetailsPage;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput,ScrollView, TouchableOpacity, Alert, FlatList, Animated } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { supabase } from '../supabase';

// const Tab = createMaterialTopTabNavigator();

// const Volunteers = ({ route }) => {
//   const [volunteers, setVolunteers] = useState([]);
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [bloodGroup, setBloodGroup] = useState('');
//   const [department, setDepartment] = useState('');
//   const [regNo, setRegNo] = useState('');
//   const [year, setYear] = useState('');
//   const [isStudent, setIsStudent] = useState(false);
//   const [isFaculty, setIsFaculty] = useState(false);
//   const campaignId = route.params.campaignId;
//   const [formVisible, setFormVisible] = useState(false);
//   const formOpacity = useState(new Animated.Value(0))[0];

//   useEffect(() => {
//     fetchVolunteers();
//   }, []);

//   const fetchVolunteers = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('donors')
//         .select('*')
//         .eq('campaign_id', campaignId);

//       if (error) throw error;
//       setVolunteers(data);
//     } catch (error) {
//       console.error('Error fetching volunteers:', error);
//     }
//   };

//   const addVolunteer = async () => {
//     if(!name || !phone || !bloodGroup || !department || (!isStudent && !isFaculty)) {
//       Alert.alert('Error', 'Please fill in all the fields.');
//       return;
//     }
//     if (phone.length !== 10) {
//       Alert.alert('Error', 'Phone number must be 10 digits.');
//       return;
//     }
//     if (!['2', '3', '4'].includes(year)) {
//       Alert.alert('Error', 'Year must be a single digit (2, 3, or 4).');
//       return;
//     }
//     if (regNo.length !== 12) {
//       Alert.alert('Error', 'Registration number must be 12 digits.');
//       return;
//     }

//     if (name && phone && bloodGroup && department && (isStudent || isFaculty)) {
//       try {
//         const volunteerData = {
//           name,
//           phone,
//           blood_group: bloodGroup,
//           department,
//           campaign_id: campaignId,
//           student: isStudent ? 1 : 0,
//           faculty: isFaculty ? 1 : 0,
//           reg_no: isStudent ? regNo : null,
//           year: isStudent ? year : null,
//           donated: 0,
//         };

//         const { data, error } = await supabase
//           .from('donors')
//           .insert([volunteerData]);

//         if (error) throw error;
//         Alert.alert('Thank you for volunteering!', 'Your details have been submitted.');
//         fetchVolunteers();
//         setName('');
//         setPhone('');
//         setBloodGroup('');
//         setDepartment('');
//         setRegNo('');
//         setYear('');
//         setIsStudent(false);
//         setIsFaculty(false);
//         closeForm();
//       } catch (error) {
//         console.error('Error adding volunteer:', error);
//       }
//     } else {
//       Alert.alert('Error', 'Please fill in all the fields.');
//     }
//   };

//   const deleteVolunteer = async (volunteerId) => {
//     try {
//       const { error } = await supabase
//         .from('donors')
//         .delete()
//         .eq('id', volunteerId);

//       if (error) throw error;
//       fetchVolunteers();
//     } catch (error) {
//       console.error('Error deleting volunteer:', error);
//     }
//   };

//   const confirmDelete = (volunteerId) => {
//     Alert.alert(
//       'Delete Volunteer',
//       'Are you sure you want to delete this volunteer?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Delete', style: 'destructive', onPress: () => deleteVolunteer(volunteerId) },
//       ],
//       { cancelable: true }
//     );
//   };

//   const markAsDonated = async (volunteerId) => {
//     try {
//       const { error } = await supabase
//         .from('donors')
//         .update({ donated: 1 })
//         .eq('id', volunteerId);

//       if (error) throw error;
//       fetchVolunteers();
//     } catch (error) {
//       console.error('Error marking as donated:', error);
//     }
//   };

//   const openForm = () => {
//     setFormVisible(true);
//     Animated.timing(formOpacity, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeForm = () => {
//     Animated.timing(formOpacity, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setFormVisible(false));
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.addButton} onPress={openForm}>
//         <Text style={styles.addButtonText}>+ Add Volunteer</Text>
//       </TouchableOpacity>

//       {formVisible && (
//         <Animated.View style={[styles.formContainer, { opacity: formOpacity }]}>
//           <Text style={styles.heading}>Volunteer Details Form</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Your Name"
//             value={name}
//             onChangeText={setName}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Contact Number"
//             value={phone}
//             keyboardType="phone-pad"
//             onChangeText={setPhone}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Blood Group"
//             value={bloodGroup}
//             onChangeText={setBloodGroup}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Department"
//             value={department}
//             onChangeText={setDepartment}
//           />

//           <View style={styles.radioContainer}>
//             <TouchableOpacity onPress={() => { setIsStudent(true); setIsFaculty(false); }}>
//               <Text style={isStudent ? styles.radioSelected : styles.radio}>Student</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => { setIsStudent(false); setIsFaculty(true); }}>
//               <Text style={isFaculty ? styles.radioSelected : styles.radio}>Faculty</Text>
//             </TouchableOpacity>
//           </View>

//           {isStudent && (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Year"
//                 value={year}
//                 onChangeText={setYear}
//                 keyboardType="numeric"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Registration Number"
//                 value={regNo}
//                 onChangeText={setRegNo}
//                 keyboardType="numeric"
//               />
//             </>
//           )}

//           <View style={styles.formButtons}>
//             <TouchableOpacity style={styles.submitButton} onPress={addVolunteer}>
//               <Text style={styles.submitButtonText}>Submit Volunteer</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.cancelButton} onPress={closeForm}>
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       )}
//       <ScrollView contentContainerStyle={styles.scrollView}>

//       <Text style={styles.heading}>Volunteers List</Text>
//       <FlatList
//         data={volunteers}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.volunteerCard}>
//             <Text style={styles.volunteerText}>Name: {item.name}</Text>
//             <Text style={styles.volunteerText}>Contact: {item.phone}</Text>
//             <Text style={styles.volunteerText}>Blood Group: {item.blood_group}</Text>
//             <Text style={styles.volunteerText}>Department: {item.department}</Text>
//             {item.student ? (
//               <>
//                 <Text style={styles.volunteerText}>Year: {item.year}</Text>
//                 <Text style={styles.volunteerText}>Registration Number: {item.reg_no}</Text>
//               </>
//             ) : (
//               <Text style={styles.volunteerText}>Faculty</Text>
//             )}
//             <View style={styles.volunteerActions}>
//               <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
//                 <MaterialIcons name="delete" size={24} color="#ff0000" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.donateButton} onPress={() => markAsDonated(item.id)}>
//                 <Text style={styles.donateButtonText}>Mark as Donated</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </ScrollView>
//     </View>
//   );
// };

// const Donors = () => {
//   const [donors, setDonors] = useState([]);

//   useEffect(() => {
//     fetchDonors();
//   }, []);

//   const fetchDonors = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('donors')
//         .select('*');

//       if (error) throw error;
//       setDonors(data);
//     } catch (error) {
//       console.error('Error fetching donors:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Donors List</Text>
//       <FlatList
//         data={donors}
//         keyExtractor={(item) => item.reg_no.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.donorCard}>
//             <Text style={styles.donorText}>Name: {item.name}</Text>
//             <Text style={styles.donorText}>Phone: {item.phone}</Text>
//             <Text style={styles.donorText}>Blood Group: {item.blood_group}</Text>
//             <Text style={styles.donorText}>Department: {item.department}</Text>
//             <Text style={styles.donorText}>Year: {item.year}</Text>
//             <Text style={styles.donorText}>Student: {item.student ? 'Yes' : 'No'}</Text>
//             <Text style={styles.donorText}>Faculty: {item.faculty ? 'Yes' : 'No'}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const DonationDetailsPage = ({ route }) => {
//   const { campaignId } = route.params || {};
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Donation Details</Text>
//       </View>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarStyle: { marginTop: 10 },
//           tabBarIndicatorStyle: { backgroundColor: '#007bff' },
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//         }}
//       >
//         <Tab.Screen name="Volunteers" component={Volunteers} initialParams={{ campaignId }} />
//         <Tab.Screen name="Donors" component={Donors} />
//       </Tab.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007bff',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     elevation: 4,
//     marginTop: 20, // Added marginTop to move the header slightly down from the top
//   },
//   backButton: {
//     padding: 10,
//     backgroundColor: '#0056b4',
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#007acc',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 15,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   donateButton: {
//     backgroundColor: '#007acc',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginBottom: 20,
//     elevation: 5,
//   },
//   donateButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   volunteerCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   volunteerText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   volunteerActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   deleteButton: {
//     marginLeft: 10,
//   },
  // radioContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   marginBottom: 15,
  // },
  // radio: {
  //   fontSize: 16,
  //   color: '#333',
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  // },
  // radioSelected: {
  //   fontSize: 16,
  //   color: '#fff',
  //   padding: 10,
  //   backgroundColor: '#007acc',
  //   borderWidth: 1,
  //   borderColor: '#007acc',
  //   borderRadius: 8,
  // },
//   donorCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   donorText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   addButton: {
//     backgroundColor: '#007acc',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//     marginBottom: 20,
//   },
//   formButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   submitButton: {
//     backgroundColor: '#007acc',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     alignItems: 'center',
//     elevation: 5,
//   },
//   submitButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   cancelButton: {
//     backgroundColor: '#ddd',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     alignItems: 'center',
//     elevation: 5,
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });


// export default DonationDetailsPage;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, Modal, Animated } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabase';

const Tab = createMaterialTopTabNavigator();

const Volunteers = ({ route }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [department, setDepartment] = useState('');
  const [regNo, setRegNo] = useState('');
  const [year, setYear] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [isFaculty, setIsFaculty] = useState(false);
  const campaignId = route.params.campaignId;
  const [modalVisible, setModalVisible] = useState(false);
  const modalOpacity = useState(new Animated.Value(0))[0
  ];

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .eq('donated', 0);

      if (error) throw error;
      setVolunteers(data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const addVolunteer = async () => {
    if (!name || !phone || !bloodGroup || !department || (!isStudent && !isFaculty)) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }
    if (phone.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }
    if (!['2', '3', '4'].includes(year)) {
      Alert.alert('Error', 'Year must be a single digit (2, 3, or 4).');
      return;
    }
    if (regNo.length !== 12) {
      Alert.alert('Error', 'Registration number must be 12 digits.');
      return;
    }

    try {
      const volunteerData = {
        name,
        phone,
        blood_group: bloodGroup,
        department,
        campaign_id: campaignId,
        student: isStudent ? 1 : 0,
        faculty: isFaculty ? 1 : 0,
        reg_no: isStudent ? regNo : null,
        year: isStudent ? year : null,
        donated: 0,
      };

      const { data, error } = await supabase
        .from('donors')
        .insert([volunteerData]);

      if (error) throw error;
      Alert.alert('Thank you for volunteering!', 'Your details have been submitted.');
      fetchVolunteers();
      setName('');
      setPhone('');
      setBloodGroup('');
      setDepartment('');
      setRegNo('');
      setYear('');
      setIsStudent(false);
      setIsFaculty(false);
      closeModal();
    } catch (error) {
      console.error('Error adding volunteer:', error);
    }
  };

  const deleteVolunteer = async (volunteerId) => {
    try {
      const { error } = await supabase
        .from('donors')
        .delete()
        .eq('id', volunteerId);

      if (error) throw error;
      fetchVolunteers();
    } catch (error) {
      console.error('Error deleting volunteer:', error);
    }
  };

  const confirmDelete = (volunteerId) => {
    Alert.alert(
      'Delete Volunteer',
      'Are you sure you want to delete this volunteer?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteVolunteer(volunteerId) },
      ],
      { cancelable: true }
    );
  };

  const markAsDonated = async (volunteerId) => {
    try {
      const { error } = await supabase
        .from('donors')
        .update({ donated: 1 })
        .eq('id', volunteerId);
      console.log("Volunteer id",volunteerId);
      if (error) throw error;
      fetchVolunteers();
    } catch (error) {
      console.error('Error marking as donated:', error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+ Add Volunteer</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="none">
        <Animated.View style={[styles.modalOverlay, { opacity: modalOpacity }]}>
          <View style={styles.modalContainer}>
            <Text style={styles.heading}>Volunteer Details Form</Text>

            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={phone}
              keyboardType="phone-pad"
              onChangeText={setPhone}
            />

            <TextInput
              style={styles.input}
              placeholder="Blood Group"
              value={bloodGroup}
              onChangeText={setBloodGroup}
            />

            <TextInput
              style={styles.input}
              placeholder="Department"
              value={department}
              onChangeText={setDepartment}
            />

            <View style={styles.radioContainer}>
              <TouchableOpacity onPress={() => { setIsStudent(true); setIsFaculty(false); }}>
                <Text style={isStudent ? styles.radioSelected : styles.radio}>Student</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setIsStudent(false); setIsFaculty(true); }}>
                <Text style={isFaculty ? styles.radioSelected : styles.radio}>Faculty</Text>
              </TouchableOpacity>
            </View>

            {isStudent && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Year"
                  value={year}
                  onChangeText={setYear}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Registration Number"
                  value={regNo}
                  onChangeText={setRegNo}
                  keyboardType="numeric"
                />
              </>
            )}

            <View style={styles.formButtons}>
              <TouchableOpacity style={styles.submitButton} onPress={addVolunteer}>
                <Text style={styles.submitButtonText}>Submit Volunteer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>

      <Text style={styles.heading}>Volunteers List</Text>
      <FlatList
        data={volunteers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.volunteerCard}>
            <Text style={styles.volunteerText}>Name: {item.name}</Text>
            <Text style={styles.volunteerText}>Contact: {item.phone}</Text>
            <Text style={styles.volunteerText}>Blood Group: {item.blood_group}</Text>
            <Text style={styles.volunteerText}>Department: {item.department}</Text>
            {item.student ? (
              <>
                <Text style={styles.volunteerText}>Year: {item.year}</Text>
                <Text style={styles.volunteerText}>Registration Number: {item.reg_no}</Text>
              </>
            ) : (
              <Text style={styles.volunteerText}>Faculty</Text>
            )}
            <View style={styles.volunteerActions}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                <MaterialIcons name="delete" size={24} color="#ff0000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.donateButton} onPress={() => markAsDonated(item.id)}>
                <Text style={styles.donateButtonText}>Mark as Donated</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const Donors = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
      const subscription2 = supabase
      .channel('realtime_donors') // Give a unique channel name
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'donors' }, 
        (payload) => {
          console.log('Realtime update:', payload);
          fetchDonors(); // Fetch latest data when a change occurs
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(subscription2); // Cleanup on unmount
    };
  }, []);

  const fetchDonors = async () => {
    try {
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .eq('donated',1);
      console.log(data);

      if (error) throw error;
      setDonors(data);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Donors List</Text>
      <FlatList
        data={donors}
        keyExtractor={(item) => item.reg_no.toString()}
        renderItem={({ item }) => (
          <View style={styles.donorCard}>
            <Text style={styles.donorText}>Name: {item.name}</Text>
            <Text style={styles.donorText}>Phone: {item.phone}</Text>
            <Text style={styles.donorText}>Blood Group: {item.blood_group}</Text>
            <Text style={styles.donorText}>Department: {item.department}</Text>
            <Text style={styles.donorText}>Year: {item.year}</Text>
            <Text style={styles.donorText}>Student: {item.student ? 'Yes' : 'No'}</Text>
            <Text style={styles.donorText}>Faculty: {item.faculty ? 'Yes' : 'No'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const DonationDetailsPage = ({ route }) => {
  const { campaignId } = route.params || {};
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donation Details</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { marginTop: 10 },
          tabBarIndicatorStyle: { backgroundColor: '#007bff' },
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        }}
      >
        <Tab.Screen name="Volunteers" component={Volunteers} initialParams={{ campaignId }} />
        <Tab.Screen name="Donors" component={Donors} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 4,
    marginTop: 20, // Added marginTop to move the header slightly down from the top
  },
  backButton: {
    padding: 10,
    backgroundColor: '#0056b4',
    borderRadius: 10,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
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
  volunteerCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  volunteerText: {
    fontSize: 16,
    color: '#333',
  },
  volunteerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
  radio: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    
  },
  radioSelected: {
    fontSize: 16,
    color: '#fff',
    padding: 10,
    backgroundColor: '#007acc',
    borderWidth: 1,
    borderColor: '#007acc',
    borderRadius: 8,
  },
  donorCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  donorText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007acc',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#007bff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
});

export default DonationDetailsPage;