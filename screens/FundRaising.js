import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
const width = Dimensions.get('window').width;


const FundRaising = () => {
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

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryTile}>
          <LinearGradient
              colors={['#C197F3', '#66D2E8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.categoryTile}
              
        >
            <Text style={styles.categoryText}>Disaster Relief</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTile}>
          <LinearGradient
              colors={['#C197F3', '#66D2E8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.categoryTile}
        >
            <Text style={styles.categoryText}>Disaster Relief</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTile}>
          <LinearGradient
              colors={['#C197F3', '#66D2E8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.categoryTile}
        >
            <Text style={styles.categoryText}>Disaster Relief</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryTile}>
          <LinearGradient
              colors={['#C197F3', '#66D2E8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.categoryTile}
        >
            <Text style={styles.categoryText}>Disaster Relief</Text>
            </LinearGradient>
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
    backgroundColor: '#C197F3',
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