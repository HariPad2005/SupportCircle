import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const FundRaising = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const featuredData = [
    {
      id: '1',
      image: require('../assets/donate1.png'),
      text: 'Blood Needed: A+',
      description: 'Urgent need for A+ blood donors.',
    },
    {
      id: '2',
      image: require('../assets/donate4.png'),
      text: 'Urgent Medical Funds',
      description: 'Support people in need of emergency medical funds.',
    },
    {
      id: '3',
      image: require('../assets/donate2.png'),
      text: 'Support for Homeless',
      description: 'Providing food and shelter for the homeless.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % featuredData.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
        return nextIndex;
      });
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % featuredData.length;
    flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex =
      currentIndex === 0 ? featuredData.length - 1 : currentIndex - 1;
    flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
    setCurrentIndex(prevIndex);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fundraising</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Slideshow */}
        <View style={styles.slideshowContainer}>
          <TouchableOpacity onPress={handlePrevious} style={styles.arrowButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
          </TouchableOpacity>
          <FlatList
            ref={flatListRef}
            data={featuredData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image source={item.image} style={styles.slideImage} />
                <Text style={styles.slideText}>{item.text}</Text>
                <Text style={styles.slideDescription}>{item.description}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryTile}>
            <Text style={styles.categoryText}>Disaster Relief</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTile}>
            <Text style={styles.categoryText}>Personal Causes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTile}>
            <Text style={styles.categoryText}>Education</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTile}>
            <Text style={styles.categoryText}>Medical</Text>
          </TouchableOpacity>
        </View>

        {/* Your Fundraiser Section */}
        <Text style={styles.sectionTitle}>Your Fundraisers</Text>
        <FlatList
          data={featuredData}
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.fundraiserCard}>
              <Image source={item.image} style={styles.fundraiserImage} />
              <Text style={styles.fundraiserTitle}>{item.text}</Text>
            </View>
          )}
        />
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => alert('Start your fundraiser!')}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.floatingButtonText}>Start your Fundraiser</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  scrollView: {
    padding: 15,
  },
  slideshowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  arrowButton: {
    padding: 10,
  },
  slide: {
    width: 300,
    alignItems: 'center',
  },
  slideImage: {
    width: 300,
    height: 150,
    borderRadius: 10,
  },
  slideText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  slideDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryTile: {
    width: '48%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  fundraiserCard: {
    width: 150,
    marginRight: 10,
  },
  fundraiserImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  fundraiserTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default FundRaising;