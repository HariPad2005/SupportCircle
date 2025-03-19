import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, FlatList, Modal, Animated, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../supabase';
import Checkbox from 'expo-checkbox';

const Tab = createMaterialTopTabNavigator();

const Volunteers = ({ route }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [isStudentFilter, setIsStudentFilter] = useState(false);
  const [isFacultyFilter, setIsFacultyFilter] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [regNo, setRegNo] = useState('');
  const [year, setYear] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [isFaculty, setIsFaculty] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVolunteerId, setCurrentVolunteerId] = useState(null);
  const campaignId = route.params.campaignId;
  const [modalVisible, setModalVisible] = useState(false);
  const modalOpacity = useState(new Animated.Value(0))[0];
  const [items, setItems] = useState({
    "Rice & Pulses": { selected: false, quantity: '' },
    "Atta & Cooking Oil": { selected: false, quantity: '' },
    "Sanitary Pads & Diapers": { selected: false, quantity: '' },
    "Toiletries": { selected: false, quantity: '' },
    "Clothing": { selected: false, quantity: '' },
    "Blankets & Towels": { selected: false, quantity: '' },
    "First-Aid Kit & Basic Medicines": { selected: false, quantity: '' },
    "Milk Powder & Biscuits": { selected: false, quantity: '' },
    "Stationery for Children": { selected: false, quantity: '' },
    "Walking Sticks & Slippers": { selected: false, quantity: '' },
    "Other": { selected: false, quantity: '' },
  });
  const [otherItem, setOtherItem] = useState('');

  useEffect(() => {
    fetchVolunteers();
    const subscription3 = supabase
      .channel('realtime_volunteers') // Give a unique channel name
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'voluntary_donors' },
        (payload) => {
          console.log('Realtime update:', payload);
          fetchVolunteers(); // Fetch latest data when a change occurs
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription3); // Cleanup on unmount
    };
  }, []);

  const fetchVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('voluntary_donors')
        .select('*')
        .eq('campaign_id', campaignId);

      if (error) throw error;
      setVolunteers(data);
      setFilteredVolunteers(data);
      setVolunteerCount(data.length);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = volunteers;

    if (nameFilter) {
      filtered = filtered.filter((volunteer) =>
        volunteer.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (departmentFilter) {
      filtered = filtered.filter((volunteer) =>
        volunteer.department.toLowerCase().includes(departmentFilter.toLowerCase())
      );
    }

    if (yearFilter) {
      filtered = filtered.filter((volunteer) => volunteer.year === yearFilter);
    }

    if (isStudentFilter !== false) {
      filtered = filtered.filter((volunteer) => volunteer.student === isStudentFilter);
    }

    if (isFacultyFilter !== false) {
      filtered = filtered.filter((volunteer) => volunteer.faculty === isFacultyFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter((volunteer) =>
        volunteer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredVolunteers(filtered);
    setVolunteerCount(filtered.length);
  };

  useEffect(() => {
    applyFiltersAndSearch();
  }, [nameFilter, departmentFilter, yearFilter, isStudentFilter, isFacultyFilter, searchQuery]);

  const clearFilters = () => {
    setIsStudentFilter(null);
    setIsFacultyFilter(null);
    setSearchQuery('');
    setYearFilter('');
    setDepartmentFilter('');
    setNameFilter('');
    setFilteredVolunteers(volunteers);
    fetchVolunteers();
  };

  const addVolunteer = async () => {
    if (!name || !phone || !department || (!isStudent && !isFaculty)) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }
    if (phone.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }
    if (!['1', '2', '3', '4'].includes(year) && isStudent) {
      Alert.alert('Error', 'Year must be a single digit (1, 2, 3, or 4).');
      return;
    }
    if (regNo.length !== 12 && isStudent) {
      Alert.alert('Error', 'Registration number must be 12 digits.');
      return;
    }

    const selectedItems = {};
    Object.keys(items).forEach((item) => {
      if (items[item].selected) {
        selectedItems[item] = items[item].quantity;
      }
    });

    try {
      const volunteerData = {
        name,
        phone,
        department,
        campaign_id: campaignId,
        student: isStudent ? 1 : 0,
        faculty: isFaculty ? 1 : 0,
        reg_no: isStudent ? regNo : null,
        year: isStudent ? year : null,
        items: selectedItems,
        created_timestamp: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('voluntary_donors')
        .insert([volunteerData]);

      if (error) throw error;
      Alert.alert('Thank you for volunteering!', 'Your details have been submitted.');
      fetchVolunteers();
      closeModal();
    } catch (error) {
      console.error('Error adding volunteer:', error);
    }
  };

  const updateVolunteer = async () => {
    if (!name || !phone || !department || (!isStudent && !isFaculty)) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }
    if (phone.length !== 10) {
      Alert.alert('Error', 'Phone number must be 10 digits.');
      return;
    }
    if (!['1', '2', '3', '4'].includes(year) && isStudent) {
      Alert.alert('Error', 'Year must be a single digit (1, 2, 3, or 4).');
      return;
    }
    if (regNo.length !== 12 && isStudent) {
      Alert.alert('Error', 'Registration number must be 12 digits.');
      return;
    }

      const selectedItems = {};
    Object.keys(items).forEach((item) => {
      if (items[item].selected) {
        selectedItems[item] = items[item].quantity;
      }
    });

    try {
      const volunteerData = {
        name,
        phone,
        department,
        campaign_id: campaignId,
        student: isStudent ? 1 : 0,
        faculty: isFaculty ? 1 : 0,
        reg_no: isStudent ? regNo : null,
        year: isStudent ? year : null,
        items: selectedItems,
      };

      const { data, error } = await supabase
        .from('voluntary_donors')
        .update(volunteerData)
        .eq('id', currentVolunteerId);

      if (error) throw error;
      Alert.alert('Volunteer updated successfully!', 'Your details have been updated.');
      fetchVolunteers();
      resetForm();
      closeModal();
    } catch (error) {
      console.error('Error updating volunteer:', error);
    }
  };

  const deleteVolunteer = async (volunteerId) => {
    try {
      const { error } = await supabase
        .from('voluntary_donors')
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
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setDepartment('');
    setRegNo('');
    setYear('');
    setIsStudent(false);
    setIsFaculty(false);
    setEditMode(false);
    setCurrentVolunteerId(null);
    setItems({
      "Rice & Pulses": false,
      "Atta & Cooking Oil": false,
      "Sanitary Pads & Diapers": false,
      "Toiletries": false,
      "Clothing": false,
      "Blankets & Towels": false,
      "First-Aid Kit & Basic Medicines": false,
      "Milk Powder & Biscuits": false,
      "Stationery for Children": false,
      "Walking Sticks & Slippers": false,
      "Other": false,
    });
    setOtherItem('');
  };

  const editVolunteer = (volunteer) => {
    setName(volunteer.name);
    setPhone(volunteer.phone);
    setDepartment(volunteer.department);
    setRegNo(volunteer.reg_no);
    setYear(volunteer.year);
    setIsStudent(volunteer.student === 1);
    setIsFaculty(volunteer.faculty === 1);
    setCurrentVolunteerId(volunteer.id);
    setItems(volunteer.items);
    setOtherItem(volunteer.items.Other || '');
    setEditMode(true);
    openModal();
    console.log("Hello");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setFiltersVisible(!filtersVisible)}>
          <MaterialIcons name="filter-list" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {filtersVisible && (
        <View style={styles.filtersContainer}>
          <TextInput
            style={styles.input}
            placeholder="Filter by Name"
            value={nameFilter}
            onChangeText={setNameFilter}
          />
          <TextInput
            style={styles.input}
            placeholder="Filter by Department"
            value={departmentFilter}
            onChangeText={setDepartmentFilter}
          />
          <TextInput
            style={styles.input}
            placeholder="Filter by Year"
            value={yearFilter}
            onChangeText={setYearFilter}
            keyboardType="numeric"
          />
          <View style={styles.radioContainer}>
            <TouchableOpacity onPress={() => setIsStudentFilter(true)}>
              <Text style={isStudentFilter ? styles.radioSelected : styles.radio}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsFacultyFilter(true)}>
              <Text style={isFacultyFilter ? styles.radioSelected : styles.radio}>Faculty</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Text style={styles.addButtonText}>+ Add Volunteer</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="none">
        <Animated.View style={[styles.modalOverlay, { opacity: modalOpacity }]}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.scrollView}>
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

              <Text style={styles.heading}>Select Items</Text>
              {Object.keys(items).map((item) => (
                <View key={item} style={styles.checkboxContainer}>
                  <Checkbox
                    value={items[item].selected}
                    onValueChange={(newValue) => setItems({ ...items, [item]: { ...items[item], selected: newValue } })}
                  />
                  <Text style={styles.checkboxLabel}>{item}</Text>
                  {items[item].selected && (
                    <TextInput
                      style={styles.input}
                      placeholder="Quantity"
                      value={items[item].quantity}
                      onChangeText={(quantity) => setItems({ ...items, [item]: { ...items[item], quantity } })}
                      keyboardType="numeric"
                    />
                  )}
                </View>
              ))}
              {items.Other.selected && (
                <TextInput
                  style={styles.input}
                  placeholder="Other Item"
                  value={otherItem}
                  onChangeText={setOtherItem}
                />
              )}

              <View style={styles.formButtons}>
                <TouchableOpacity style={styles.submitButton} onPress={editMode ? updateVolunteer : addVolunteer}>
                  <Text style={styles.submitButtonText}>{editMode ? 'Update Volunteer' : 'Submit Volunteer'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      </Modal>
      <Text style={styles.heading}>Volunteers List ({volunteerCount})</Text>
      <FlatList
        data={filteredVolunteers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.volunteerCard}>
            {item.name && <Text style={styles.volunteerText}>Name: {item.name}</Text>}
            {item.phone && <Text style={styles.volunteerText}>Contact: {item.phone}</Text>}
            {item.department && <Text style={styles.volunteerText}>Department: {item.department}</Text>}
            {item.student ? (
              <>
                {item.year && <Text style={styles.volunteerText}>Year: {item.year}</Text>}
                {item.reg_no && <Text style={styles.volunteerText}>Registration Number: {item.reg_no}</Text>}
              </>
            ) : (
              <Text style={styles.volunteerText}>Faculty</Text>
            )}
            <View style={styles.volunteerActions}>
              <TouchableOpacity style={styles.editButton} onPress={() => editVolunteer(item)}>
                <MaterialIcons name="edit" size={28} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
                <MaterialIcons name="delete" size={28} color="#ff0000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const VoluntaryDonationDetailsPage = ({ route }) => {
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
    backgroundColor: '#fff',
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
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  volunteerText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  volunteerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    // marginLeft: 10,
    top: 10,
  },
    editButton: {
      top: 10,
    // marginRight: 5,
  },
  deleteButton2: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    // backgroundColor: '#fff',
    borderRadius: 5,
    // elevation: 3,
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
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  donorText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  clearButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#333',
    fontSize: 16,
  },
    scrollView: {
    paddingHorizontal: 10,
    paddingBottom: 80,
  },
});

export default VoluntaryDonationDetailsPage;