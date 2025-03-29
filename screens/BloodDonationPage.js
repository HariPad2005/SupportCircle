// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

// const donationRequests = [
//   {
//     bloodGroup: 'A+',
//     place: 'Chennai',
//     hospital: 'XYZ Hospital',
//     timePosted: 'Posted 10 mins ago',
//   },
//   {
//     bloodGroup: 'B+',
//     place: 'Mumbai',
//     hospital: 'ABC Hospital',
//     timePosted: 'Posted 20 mins ago',
//   },
//   {
//     bloodGroup: 'O-',
//     place: 'Bangalore',
//     hospital: 'DEF Hospital',
//     timePosted: 'Posted 1 hour ago',
//   },
//   {
//     bloodGroup: 'AB+',
//     place: 'Delhi',
//     hospital: 'GHI Hospital',
//     timePosted: 'Posted 2 hours ago',
//   },
// ];

// const BloodDonationPage = () => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDonation, setSelectedDonation] = useState(null);

//   const navigateToDonationDetails = () => {
//     navigation.navigate('donationdetails', { donation: selectedDonation });
//     setModalVisible(false);
//   };

//   const handleDonateNow = (donation) => {
//     setSelectedDonation(donation);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedDonation(null);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <MaterialIcons name="arrow-back" size={24} color="#fff" />
//       </TouchableOpacity>

//       {/* Heading with padding */}
//       <Text style={styles.heading}>Current Blood Requests</Text>

//       {/* Scrollable Content */}
//       <ScrollView style={styles.scrollView}>
//         {donationRequests.map((request, index) => (
//           <View key={index} style={styles.donationCard}>
//             <View style={styles.donationInfo}>
//               <Text style={styles.donationText}>Blood Group: {request.bloodGroup}</Text>
//               <Text style={styles.donationText}>Place: {request.place}</Text>
//               <Text style={styles.donationText}>Hospital: {request.hospital}</Text>
//               <Text style={styles.donationText}>Time: {request.timePosted}</Text>
//             </View>
            
//             <TouchableOpacity
//               style={styles.donateButton}
//               onPress={() => handleDonateNow(request)}
//             >
//               <Text style={styles.donateButtonText}>Donate Now!</Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Modal for Donation Confirmation */}
//       {selectedDonation && (
//         <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={closeModal}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>Confirm Donation</Text>
//               <Text style={styles.modalContent}>Are you sure you want to donate to the following request?</Text>
//               <Text style={styles.modalContent}>Blood Group: {selectedDonation.bloodGroup}</Text>
//               <Text style={styles.modalContent}>Hospital: {selectedDonation.hospital}</Text>
//               <Button title="Yes, Donate" onPress={navigateToDonationDetails} />
//               <Button title="Cancel" onPress={closeModal} />
//             </View>
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e0f7fa',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#007acc',
//     letterSpacing: 1.5,
//     marginTop: 60,  // Added marginTop to give space between back button and heading
//     marginBottom: 20, // Padding for spacing between heading and content
//   },
//   scrollView: {
//     marginBottom: 20,
//   },
//   donationCard: {
//     backgroundColor: '#ffffff',
//     padding: 20,
//     marginBottom: 15,
//     borderRadius: 12,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     position: 'relative',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     padding: 12,
//     backgroundColor: '#007acc',
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   donationInfo: {
//     marginBottom: 20,
//   },
//   donationText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 5,
//     letterSpacing: 0.5,
//   },
//   donateButton: {
//     position: 'absolute',
//     right: 15,
//     bottom: 15,
//     backgroundColor: '#007acc',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   donateButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: '#fff',
//     padding: 25,
//     borderRadius: 15,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#007acc',
//   },
//   modalContent: {
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
// });

// export default BloodDonationPage;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button, Pressable } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

// const donationRequests = [
//   { bloodGroup: 'A+', place: 'Chennai', hospital: 'XYZ Hospital', timePosted: '10 mins ago' },
//   { bloodGroup: 'B+', place: 'Mumbai', hospital: 'ABC Hospital', timePosted: '20 mins ago' },
//   { bloodGroup: 'O-', place: 'Bangalore', hospital: 'DEF Hospital', timePosted: '1 hour ago' },
//   { bloodGroup: 'AB+', place: 'Delhi', hospital: 'GHI Hospital', timePosted: '2 hours ago' },
// ];

// const BloodDonationPage = () => {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedDonation, setSelectedDonation] = useState(null);

//   const navigateToDonationDetails = () => {
//     navigation.navigate('DonationDetails', { donation: selectedDonation });
//     setModalVisible(false);
//   };

//   const handleDonateNow = (donation) => {
//     setSelectedDonation(donation);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedDonation(null);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <MaterialIcons name="arrow-back" size={20} color="#fff" />
//       </TouchableOpacity>

//       {/* Heading */}
//       <Text style={styles.heading}>🩸 Blood Donation Requests</Text>

//       {/* Scrollable Donation List */}
//       <ScrollView style={styles.scrollView}>
//         {donationRequests.map((request, index) => (
//           <View key={index} style={styles.donationCard}>
//             <View style={styles.donationInfo}>
//               <Text style={styles.donationText}>🔴 Blood Group: <Text style={styles.highlight}>{request.bloodGroup}</Text></Text>
//               <Text style={styles.donationText}>📍 Place: <Text style={styles.highlight}>{request.place}</Text></Text>
//               <Text style={styles.donationText}>🏥 Hospital: <Text style={styles.highlight}>{request.hospital}</Text></Text>
//               <Text style={styles.timeText}>🕒 {request.timePosted}</Text>
//             </View>

//             <Pressable
//               style={({ pressed }) => [styles.donateButton, pressed && styles.donateButtonPressed]}
//               onPress={() => handleDonateNow(request)}
//             >
//               <Text style={styles.donateButtonText}>Donate Now</Text>
//             </Pressable>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Modal for Confirmation */}
//       {selectedDonation && (
//         <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={closeModal}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>Confirm Donation</Text>
//               <Text style={styles.modalContent}>Are you sure you want to donate to:</Text>
//               <Text style={styles.modalHighlight}>{selectedDonation.bloodGroup} Blood Group</Text>
//               <Text style={styles.modalHighlight}>{selectedDonation.hospital}</Text>

//               <View style={styles.modalButtons}>
//                 <Pressable style={styles.confirmButton} onPress={navigateToDonationDetails}>
//                   <Text style={styles.confirmButtonText}>Yes, Donate</Text>
//                 </Pressable>
//                 <Pressable style={styles.cancelButton} onPress={closeModal}>
//                   <Text style={styles.cancelButtonText}>Cancel</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2F8FF',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: '700',
//     textAlign: 'center',
//     color: '#007acc',
//     marginTop: 24,
//     marginBottom: 15,
//     left:20,
//   },
// //   scrollView: {
// //     marginBottom: 5,
// //   },
//   donationCard: {
//     backgroundColor: '#fff',
//     padding: 20,
//     marginBottom: 15,
//     borderRadius: 15,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     padding: 10,
//     backgroundColor: '#007acc',
//     borderRadius: 10,
//     elevation: 4,
//   },
//   donationInfo: {
//     marginBottom: 20,
//   },
//   donationText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 5,
//   },
//   highlight: {
//     fontWeight: '700',
//     color: '#007acc',
//   },
//   timeText: {
//     fontSize: 14,
//     color: '#888',
//   },
//   donateButton: {
//     backgroundColor: '#007acc',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     alignSelf: 'center',
//     elevation: 5,
//   },
//   donateButtonText: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#fff',
//   },
//   donateButtonPressed: {
//     transform: [{ scale: 0.95 }],
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: '#fff',
//     padding: 25,
//     borderRadius: 15,
//     alignItems: 'center',
//     elevation: 10,
//   },
//   modalTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 10,
//     color: '#007acc',
//   },
//   modalContent: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#555',
//     marginBottom: 10,
//   },
//   modalHighlight: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#007acc',
//     textAlign: 'center',
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   confirmButton: {
//     backgroundColor: '#007acc',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     marginRight: 10,
//   },
//   confirmButtonText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#fff',
//   },
//   cancelButton: {
//     backgroundColor: '#ddd',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#333',
//   },
// });

// export default BloodDonationPage;
// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Button } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useNavigation } from '@react-navigation/native';
// import { createClient } from '@supabase/supabase-js';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { supabase } from '../supabase';

// const Tab = createMaterialTopTabNavigator();


// const OngoingCampaigns = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   // const [usercampaigns, setUserCampaigns] = useState([]);

//   useEffect(() => {
//     fetchOngoingCampaigns();

//     // Subscribe to real-time updates
//     const subscription = supabase
//       .channel('ongoing_campaigns') // Give a unique channel name
//       .on(
//         'postgres_changes', 
//         { event: '*', schema: 'public', table: 'blood_campaigns' }, 
//         (payload) => {
//           console.log('Realtime update received:', payload);
//           fetchOngoingCampaigns(); // Fetch latest data when a change occurs
//         }
//       )
//       .subscribe();
  
//     return () => {
//       supabase.removeChannel(subscription); // Cleanup on unmount
//     };
//   }, []);

//   const fetchOngoingCampaigns = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('blood_campaigns')
//         .select('*')
//         .eq('flag', 1);

//       if (error) throw error;
//       setCampaigns(data);
//     } catch (error) {
//       console.error('Error fetching campaigns:', error);
//     }
//   };

//   return (
//     <FlatList
//       data={campaigns}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => (
//         <View style={styles.campaignCard}>
//           <Text style={styles.campaignTitle}>{item.name}</Text>
//           <Text>{item.description}</Text>
//           <Text>Venue: {item.venue}</Text>
//           <Text>Date: {item.date}</Text>
//           <Text>Time: {item.start_time} - {item.end_time}</Text>
//         </View>
//       )}
//     />
//   );
// };

// const YourCampaigns = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [form, setForm] = useState({ name: '', description: '', venue: '', date: new Date(), start_time: '', end_time: '' });
//   const [showDatePicker, setShowDatePicker] = useState(false);
  

//   useEffect(() => {
//     fetchUserCampaigns();

//     // Subscribe to real-time updates
//     const subscription = supabase
//       .channel('realtime_campaigns') // Give a unique channel name
//       .on(
//         'postgres_changes', 
//         { event: '*', schema: 'public', table: 'blood_campaigns' }, 
//         (payload) => {
//           console.log('Realtime update:', payload);
//           fetchUserCampaigns(); // Fetch latest data when a change occurs
//         }
//       )
//       .subscribe();
  
//     return () => {
//       supabase.removeChannel(subscription); // Cleanup on unmount
//     };
//   }, []);

// const fetchUserCampaigns = async () => {
//   try {
//     const { data: userData, error: userError } = await supabase.auth.getUser();
//     if (userError) throw userError;
//     const userId = userData?.user?.id; // Ensure user ID is available
//     if (!userId) throw new Error('User not authenticated');

//     const { data, error } = await supabase
//       .from('blood_campaigns')
//       .select('*')
//       .eq('user_id', userId); // Fetch campaigns where user_id matches the logged-in user

//     if (error) throw error;

//     setCampaigns(data);
//   } catch (error) {
//     console.error('Error fetching user campaigns:', error);
//   }
// };

  
  
//   const addCampaign = async () => {

//     try {

//       const { data: userData, error: userError } = await supabase.auth.getUser();
//       if (userError) {
//         console.error('Error fetching user:', userError);
//         return;
//       }
    
//       console.log('User data:', userData.user?.id);

//       const formattedDate = form.date.toISOString().split('T')[0];
//       const { data, error } = await supabase
//         .from('blood_campaigns')
//         .insert([{ ...form, user_id: userData.user?.id, date: formattedDate, flag: 0 }]);

//       if (error) throw error;
//       setCampaigns([...campaigns]);
//       setModalVisible(false);
//       setForm({ name: '', description: '', venue: '', date: new Date(),start_time: '', end_time: '' });
//     } catch (error) {
//       console.error('Error adding campaign:', error);
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
//         <Text style={styles.addButtonText}>+ Add Campaign</Text>
//       </TouchableOpacity>
//       <FlatList
//         data={campaigns}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[styles.campaignCard, item.flag === 1 ? styles.activeCampaign : {}]}
//             disabled={item.flag !== 1}
//             onPress={() => navigation.navigate('DonationDetails', { campaignId: item.id })}
//           >
//             <Text style={styles.campaignTitle}>{item.name}</Text>
//             <Text>{item.description}</Text>
//             <Text>Venue: {item.venue}</Text>
//             <Text>Date: {item.date}</Text>
//             <Text>Time: {item.start_time} - {item.end_time}</Text>
//             <Text>Status: {item.flag === 0 ? 'Pending Approval' : 'Accepted'}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <TextInput placeholder="Campaign Name" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} style={styles.input} />
//           <TextInput placeholder="Description" value={form.description} onChangeText={(text) => setForm({ ...form, description: text })} style={styles.input} />
//           <TextInput placeholder="Venue" value={form.venue} onChangeText={(text) => setForm({ ...form, venue: text })} style={styles.input} />
//           <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//             <Text style={styles.input}>{form.date.toDateString()}</Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={form.date}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) setForm({ ...form, date: selectedDate });
//               }}
//             />
//           )}
//           <TextInput placeholder="Start Time (HH:MM)" value={form.start_time} onChangeText={(text) => setForm({ ...form, start_time: text })} style={styles.input} />
//           <TextInput placeholder="End Time (HH:MM)" value={form.end_time} onChangeText={(text) => setForm({ ...form, end_time: text })} style={styles.input} />
//           <Button title="Submit" onPress={addCampaign} />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default function BloodDonationPage() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Ongoing Campaigns" component={OngoingCampaigns} />
//       <Tab.Screen name="Your Campaigns" component={YourCampaigns} />
//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   campaignCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     margin: 10,
//     borderRadius: 8,
//     elevation: 3,
//   },
//   campaignTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   activeCampaign: {
//     backgroundColor: '#d1f5d3', // Highlight active campaigns
//   },
//   addButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
// });

// const checkUser = async () => {
//   const { data: sessionData, error } = await supabase.auth.getSession();
//   if (error) {
//     console.error('Error fetching session:', error);
//     return;
//   }
  
//   console.log('Session data:', sessionData);
//   if (!sessionData || !sessionData.session) {
//     console.error('No active session. User not logged in.');
//     return;
//   }

//   const { data: userData, error: userError } = await supabase.auth.getUser();
//   if (userError) {
//     console.error('Error fetching user:', userError);
//     return;
//   }

//   console.log('User data:', userData.user?.id);
// };

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Button, ScrollView } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { supabase } from '../supabase';

// const Tab = createMaterialTopTabNavigator();

// const OngoingCampaigns = () => {
//   const [campaigns, setCampaigns] = useState([]);

//   useEffect(() => {
//     fetchOngoingCampaigns();

//     // Subscribe to real-time updates
//     const subscription = supabase
//       .channel('ongoing_campaigns') // Give a unique channel name
//       .on(
//         'postgres_changes', 
//         { event: '*', schema: 'public', table: 'blood_campaigns' }, 
//         (payload) => {
//           console.log('Realtime update received:', payload);
//           fetchOngoingCampaigns(); // Fetch latest data when a change occurs
//         }
//       )
//       .subscribe();
  
//     return () => {
//       supabase.removeChannel(subscription); // Cleanup on unmount
//     };
//   }, []);

//   const fetchOngoingCampaigns = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('blood_campaigns')
//         .select('*')
//         .eq('flag', 1);

//       if (error) throw error;
//       setCampaigns(data);
//     } catch (error) {
//       console.error('Error fetching campaigns:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollView}>
//       {campaigns.map((item) => (
//         <View key={item.id} style={styles.campaignCard}>
//           <Text style={styles.campaignTitle}>{item.name}</Text>
//           <Text>{item.description}</Text>
//           <Text>Venue: {item.venue}</Text>
//           <Text>Date: {item.date}</Text>
//           <Text>Time: {item.start_time} - {item.end_time}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const YourCampaigns = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [form, setForm] = useState({ name: '', description: '', venue: '', date: new Date(), start_time: '', end_time: '' });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchUserCampaigns();

//     // Subscribe to real-time updates
//     const subscription = supabase
//       .channel('realtime_campaigns') // Give a unique channel name
//       .on(
//         'postgres_changes', 
//         { event: '*', schema: 'public', table: 'blood_campaigns' }, 
//         (payload) => {
//           console.log('Realtime update:', payload);
//           fetchUserCampaigns(); // Fetch latest data when a change occurs
//         }
//       )
//       .subscribe();
  
//     return () => {
//       supabase.removeChannel(subscription); // Cleanup on unmount
//     };
//   }, []);

//   const fetchUserCampaigns = async () => {
//     try {
//       const { data: userData, error: userError } = await supabase.auth.getUser();
//       if (userError) throw userError;
//       const userId = userData?.user?.id; // Ensure user ID is available
//       if (!userId) throw new Error('User not authenticated');

//       const { data, error } = await supabase
//         .from('blood_campaigns')
//         .select('*')
//         .eq('user_id', userId); // Fetch campaigns where user_id matches the logged-in user

//       if (error) throw error;

//       setCampaigns(data);
//     } catch (error) {
//       console.error('Error fetching user campaigns:', error);
//     }
//   };

//   const addCampaign = async () => {
//     try {
//       const { data: userData, error: userError } = await supabase.auth.getUser();
//       if (userError) {
//         console.error('Error fetching user:', userError);
//         return;
//       }

//       const formattedDate = form.date.toISOString().split('T')[0];
//       const { data, error } = await supabase
//         .from('blood_campaigns')
//         .insert([{ ...form, user_id: userData.user?.id, date: formattedDate, flag: 0 }]);

//       if (error) throw error;
//       setCampaigns([...campaigns]);
//       setModalVisible(false);
//       setForm({ name: '', description: '', venue: '', date: new Date(), start_time: '', end_time: '' });
//     } catch (error) {
//       console.error('Error adding campaign:', error);
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
//         <Text style={styles.addButtonText}>+ Add Campaign</Text>
//       </TouchableOpacity>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         {campaigns.map((item) => (
//           <TouchableOpacity
//             key={item.id}
//             style={[styles.campaignCard, item.flag === 1 ? styles.activeCampaign : {}]}
//             disabled={item.flag !== 1}
//             onPress={() => navigation.navigate('DonationDetails', { campaignId: item.id })}
//           >
//             <Text style={styles.campaignTitle}>{item.name}</Text>
//             <Text>{item.description}</Text>
//             <Text>Venue: {item.venue}</Text>
//             <Text>Date: {item.date}</Text>
//             <Text>Time: {item.start_time} - {item.end_time}</Text>
//             <Text>Status: {item.flag === 0 ? 'Pending Approval' : 'Accepted'}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <TextInput placeholder="Campaign Name" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} style={styles.input} />
//           <TextInput placeholder="Description" value={form.description} onChangeText={(text) => setForm({ ...form, description: text })} style={styles.input} />
//           <TextInput placeholder="Venue" value={form.venue} onChangeText={(text) => setForm({ ...form, venue: text })} style={styles.input} />
//           <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//             <Text style={styles.input}>{form.date.toDateString()}</Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={form.date}
//               mode="date"
//               display="default"
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) setForm({ ...form, date: selectedDate });
//               }}
//             />
//           )}
//           <TextInput placeholder="Start Time (HH:MM)" value={form.start_time} onChangeText={(text) => setForm({ ...form, start_time: text })} style={styles.input} />
//           <TextInput placeholder="End Time (HH:MM)" value={form.end_time} onChangeText={(text) => setForm({ ...form, end_time: text })} style={styles.input} />
//           <Button title="Submit" onPress={addCampaign} />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default function BloodDonationPage() {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Blood Donation Campaigns</Text>
//       </View>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarStyle: { marginTop: 10 },
//           tabBarIndicatorStyle: { backgroundColor: '#007bff' },
//           tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
//         }}
//       >
//         <Tab.Screen name="Ongoing Campaigns" component={OngoingCampaigns} />
//         <Tab.Screen name="Your Campaigns" component={YourCampaigns} />
//       </Tab.Navigator>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007bff',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     elevation: 4,
//   },
//   backButton: {
//     top: 10,
//     padding: 10,
//     backgroundColor: '#0056b4',
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   headerTitle: {
//     top: 10,
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   scrollView: {
//     paddingHorizontal: 10,
//     paddingBottom: 80,
//   },
//   campaignCard: {
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
//   campaignTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   activeCampaign: {
//     backgroundColor: '#d1f5d3', // Highlight active campaigns
//   },
//   addButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     margin: 10,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
// });

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Button, ScrollView, Animated, Alert, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../supabase';

const Tab = createBottomTabNavigator();

function OngoingCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchOngoingCampaigns();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('ongoing_campaigns') // Give a unique channel name
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'blood_campaigns' }, 
        (payload) => {
          console.log('Realtime update received:', payload);
          fetchOngoingCampaigns(); // Fetch latest data when a change occurs
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(subscription); // Cleanup on unmount
    };
  }, []);

  const fetchOngoingCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('blood_campaigns')
        .select('*')
        .eq('flag', 1);

      if (error) throw error;
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {campaigns.map((item) => (
        <View key={item.id} style={styles.campaignCard}>
          <Text style={styles.campaignTitle}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>Venue: {item.venue}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Time: {item.start_time} - {item.end_time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

function YourCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', venue: '', date: new Date(), start_time: '', end_time: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigation = useNavigation();
  const modalOpacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchUserCampaigns();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('realtime_campaigns') // Give a unique channel name
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'blood_campaigns' }, 
        (payload) => {
          console.log('Realtime update:', payload);
          fetchUserCampaigns(); // Fetch latest data when a change occurs
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(subscription); // Cleanup on unmount
    };
  }, []);

  const fetchUserCampaigns = async () => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const userId = userData?.user?.id; // Ensure user ID is available
      if (!userId) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('blood_campaigns')
        .select('*')
        .eq('user_id', userId); // Fetch campaigns where user_id matches the logged-in user

      if (error) throw error;

      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching user campaigns:', error);
    }
  };
  const validateForm = () => {
    const { name, description, venue, start_time, end_time } = form;
    if (!name || !description || !venue || !start_time || !end_time) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return false;
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(start_time) || !timeRegex.test(end_time)) {
      Alert.alert('Error', 'Time must be in HH:MM format.');
      return false;
    }
    
    return true;
  };

  const addCampaign = async () => {
    if (!validateForm()) return;
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }

      const formattedDate = form.date.toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('blood_campaigns')
        .insert([{ ...form, user_id: userData.user?.id, date: formattedDate, flag: 0 }]);

      if (error) throw error;
      setCampaigns([...campaigns]);
      setModalVisible(false);
      setForm({ name: '', description: '', venue: '', date: new Date(), start_time: '', end_time: '' });
    } catch (error) {
      console.error('Error adding campaign:', error);
    }
  };

  const updateCampaign = async () => {
    if (!validateForm()) return;
    try {
      const formattedDate = form.date.toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('blood_campaigns')
        .update({
          name: form.name,
          description: form.description,
          venue: form.venue,
          date: formattedDate,
          start_time: form.start_time,
          end_time: form.end_time,
        })
        .eq('id', form.id);

      if (error) throw error;
      fetchUserCampaigns();
      setModalVisible(false);
      setForm({ name: '', description: '', venue: '', date: new Date(), start_time: '', end_time: '' });
      setEditMode(false);

      Alert.alert('Success', 'Campaign details are updated successfully.');
      

    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  const deleteCampaign = async (campaignId) => {
    try {
      console.log(campaignId);
      const { error } = await supabase
        .from('blood_campaigns')
        .delete()
        .eq('id', campaignId);

      if (error) throw error;
      fetchUserCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const confirmDelete = (campaignId) => {
    Alert.alert(
      'Delete Campaign',
      'Are you sure you want to delete this campaign?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteCampaign(campaignId) },
      ],
      { cancelable: true }
    );
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
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
    setForm({ name: '', description: '', venue: '', date: new Date(), start_time: '', end_time: '' });

  };

  const openEditModal = (campaign) => {
    setForm({
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      venue: campaign.venue,
      date: new Date(campaign.date),
      start_time: campaign.start_time,
      end_time: campaign.end_time,
    });
    setEditMode(true);
    openModal();
  };

  const handleSubmit = () => {
    if (editMode) {
      updateCampaign();
    } else {
      addCampaign();
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+ Add Campaign</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {campaigns.map((item) => (
          <View key={item.id} style={[styles.campaignCard, item.flag === 1 ? styles.activeCampaign : {}]}>
            <TouchableOpacity
              style={styles.campaignContent}
              disabled={item.flag !== 1}
              onPress={() => navigation.navigate('DonationDetails', { campaignId: item.id })}
            >
              <Text style={styles.campaignTitle}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Venue: {item.venue}</Text>
              <Text>Date: {item.date}</Text>
              <Text>Time: {item.start_time} - {item.end_time}</Text>
              <Text>Status: {item.flag === 0 ? 'Pending Approval' : 'Accepted'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => openEditModal(item)}>
              <MaterialIcons name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
              <MaterialIcons name="delete" size={24} color="#ff0000" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal visible={modalVisible} transparent animationType="none">
        <Animated.View style={[styles.modalOverlay, { opacity: modalOpacity }]}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{editMode ? 'Edit Campaign' : 'Add New Campaign'}</Text>
            <TextInput placeholder="Campaign Name" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} style={styles.input} />
            <TextInput placeholder="Description" value={form.description} onChangeText={(text) => setForm({ ...form, description: text })} style={styles.input} />
            <TextInput placeholder="Venue" value={form.venue} onChangeText={(text) => setForm({ ...form, venue: text })} style={styles.input} />
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>{form.date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
            <DateTimePicker
                value={form.date || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                  if (selectedDate) setForm({ ...form, date: selectedDate });
                }}
              />
            )}

            <TextInput placeholder="Start Time (HH:MM)" value={form.start_time} onChangeText={(text) => setForm({ ...form, start_time: text })} style={styles.input} />
            <TextInput placeholder="End Time (HH:MM)" value={form.end_time} onChangeText={(text) => setForm({ ...form, end_time: text })} style={styles.input} />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>{editMode ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default function BloodDonationPage() {
  return (
    
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { marginTop: 10 },
        tabBarIndicatorStyle: { backgroundColor: '#007bff' },
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="Ongoing Campaigns" component={OngoingCampaigns} />
      <Tab.Screen name="Your Campaigns" component={YourCampaigns} />
    </Tab.Navigator>
  );
};

// function BloodDonationPage() {
//   const navigation = useNavigation();
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Blood Donation Campaigns</Text>
//       </View>
//       {/* <OngoingCampaigns/> */}
//     </View>


  
//   );
// }

// export default BloodDonationPage;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 4,
  },
  backButton: {
    top: 10,
    padding: 10,
    backgroundColor: '#0056b4',
    borderRadius: 10,
    marginRight: 10,
  },
  headerTitle: {
    top: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
  campaignCard: {
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
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activeCampaign: {
    backgroundColor: '#d1f5d3', // Highlight active campaigns
  },
  addButton: {
    backgroundColor: '#007bff',
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
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
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
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    // backgroundColor: '#fff',
    borderRadius: 5,
    // elevation: 3,
  },
});