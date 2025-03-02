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

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const donationRequests = [
  { bloodGroup: 'A+', place: 'Chennai', hospital: 'XYZ Hospital', timePosted: '10 mins ago' },
  { bloodGroup: 'B+', place: 'Mumbai', hospital: 'ABC Hospital', timePosted: '20 mins ago' },
  { bloodGroup: 'O-', place: 'Bangalore', hospital: 'DEF Hospital', timePosted: '1 hour ago' },
  { bloodGroup: 'AB+', place: 'Delhi', hospital: 'GHI Hospital', timePosted: '2 hours ago' },
];

const BloodDonationPage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const navigateToDonationDetails = () => {
    navigation.navigate('DonationDetails', { donation: selectedDonation });
    setModalVisible(false);
  };

  const handleDonateNow = (donation) => {
    setSelectedDonation(donation);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDonation(null);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>🩸 Blood Donation Requests</Text>

      {/* Scrollable Donation List */}
      <ScrollView style={styles.scrollView}>
        {donationRequests.map((request, index) => (
          <View key={index} style={styles.donationCard}>
            <View style={styles.donationInfo}>
              <Text style={styles.donationText}>🔴 Blood Group: <Text style={styles.highlight}>{request.bloodGroup}</Text></Text>
              <Text style={styles.donationText}>📍 Place: <Text style={styles.highlight}>{request.place}</Text></Text>
              <Text style={styles.donationText}>🏥 Hospital: <Text style={styles.highlight}>{request.hospital}</Text></Text>
              <Text style={styles.timeText}>🕒 {request.timePosted}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [styles.donateButton, pressed && styles.donateButtonPressed]}
              onPress={() => handleDonateNow(request)}
            >
              <Text style={styles.donateButtonText}>Donate Now</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      {/* Modal for Confirmation */}
      {selectedDonation && (
        <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Confirm Donation</Text>
              <Text style={styles.modalContent}>Are you sure you want to donate to:</Text>
              <Text style={styles.modalHighlight}>{selectedDonation.bloodGroup} Blood Group</Text>
              <Text style={styles.modalHighlight}>{selectedDonation.hospital}</Text>

              <View style={styles.modalButtons}>
                <Pressable style={styles.confirmButton} onPress={navigateToDonationDetails}>
                  <Text style={styles.confirmButtonText}>Yes, Donate</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={closeModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F8FF',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#007acc',
    marginTop: 24,
    marginBottom: 15,
    left:20,
  },
//   scrollView: {
//     marginBottom: 5,
//   },
  donationCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#007acc',
    borderRadius: 10,
    elevation: 4,
  },
  donationInfo: {
    marginBottom: 20,
  },
  donationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  highlight: {
    fontWeight: '700',
    color: '#007acc',
  },
  timeText: {
    fontSize: 14,
    color: '#888',
  },
  donateButton: {
    backgroundColor: '#007acc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
    elevation: 5,
  },
  donateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  donateButtonPressed: {
    transform: [{ scale: 0.95 }],
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
    marginBottom: 10,
    color: '#007acc',
  },
  modalContent: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  modalHighlight: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007acc',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#007acc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginRight: 10,
  },
  confirmButtonText: {
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

export default BloodDonationPage;
