import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, Button, ScrollView, Animated, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../supabase';

const Tab = createMaterialTopTabNavigator();

const OngoingCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchOngoingCampaigns();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('ongoing_campaigns_2') // Give a unique channel name
      .on(
        'postgres_changes', 
        { event: '*', schema: 'public', table: 'voluntary_campaigns' }, 
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
        .from('voluntary_campaigns')
        .select('*')
        .eq('status', 1);

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
          <Text>Start Date: {item.start_date}</Text>
          <Text>End Date: {item.end_date}</Text>
          <Text>Time: {item.start_time} - {item.end_time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const YourCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', venue: '', start_date: new Date(), end_date: new Date(), start_time: '', end_time: '', status: 'pending' });
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
        { event: '*', schema: 'public', table: 'voluntary_campaigns' }, 
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
        .from('voluntary_campaigns')
        .select('*')
        .eq('user_id', userId); // Fetch campaigns where user_id matches the logged-in user

      if (error) throw error;

      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching user campaigns:', error);
    }
  };

  const validateForm = () => {
    const { name, description, venue, start_time, end_time, start_date, end_date } = form;
    if (!name || !description || !venue || !start_time || !end_time || !start_date || !end_date) {
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

      const formattedStartDate = form.start_date.toISOString().split('T')[0];
      const formattedEndDate = form.end_date.toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('voluntary_campaigns')
        .insert([{ ...form, user_id: userData.user?.id, start_date: formattedStartDate, end_date: formattedEndDate, created_timestamp: new Date().toISOString(), status: 0 }]);

      if (error) throw error;
      setCampaigns([...campaigns]);
      setModalVisible(false);
      setForm({ name: '', description: '', venue: '', start_date: new Date(), end_date: new Date(), start_time: '', end_time: '', status: 0 });
    } catch (error) {
      console.error('Error adding campaign:', error);
    }
  };

  const updateCampaign = async () => {
    if (!validateForm()) return;
    try {
      const formattedStartDate = form.start_date.toISOString().split('T')[0];
      const formattedEndDate = form.end_date.toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('voluntary_campaigns')
        .update({
          name: form.name,
          description: form.description,
          venue: form.venue,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
          start_time: form.start_time,
          end_time: form.end_time,
          status: form.status,
        })
        .eq('id', form.id);

      if (error) throw error;
      fetchUserCampaigns();
      setModalVisible(false);
      setForm({ name: '', description: '', venue: '', start_date: new Date(), end_date: new Date(), start_time: '', end_time: '', status: 'pending' });
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
        .from('voluntary_campaigns')
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
    setForm({ name: '', description: '', venue: '', start_date: new Date(), end_date: new Date(), start_time: '', end_time: '', status: 'pending' });
    setEditMode(false);
  };

  const openEditModal = (campaign) => {
    setForm({
      id: campaign.id,
      name: campaign.name,
      description: campaign.description,
      venue: campaign.venue,
      start_date: new Date(campaign.start_date),
      end_date: new Date(campaign.end_date),
      start_time: campaign.start_time,
      end_time: campaign.end_time,
      status: campaign.status,
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
          <View key={item.id} style={[styles.campaignCard, item.status === 1 ? styles.activeCampaign : {}]}>
            <TouchableOpacity
              style={styles.campaignContent}
              disabled={item.status !== 1}
              onPress={() => navigation.navigate('VoluntaryDonationDetails', { campaignId: item.id })}
            >
              <Text style={styles.campaignTitle}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Venue: {item.venue}</Text>
              <Text>Start Date: {item.start_date}</Text>
              <Text>End Date: {item.end_date}</Text>
              <Text>Time: {item.start_time} - {item.end_time}</Text>
              <Text>Status: {item.status === 0 ? 'Pending Approval' : 'Accepted'}</Text>
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
              <Text style={styles.input}>{form.start_date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
            <DateTimePicker
              value={form.start_date || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setForm({ ...form, start_date: selectedDate });
              }}
            />
          )}

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>{form.end_date.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={form.end_date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setForm({ ...form, end_date: selectedDate });
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

export default function VoluntaryDonationPage() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voluntary Donation Campaigns</Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff8c00',
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 4,
  },
  backButton: {
    top: 10,
    padding: 10,
    backgroundColor: '#ff8c00',
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
    backgroundColor: '#ff8c00',
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
    borderRadius: 5,
  },
});