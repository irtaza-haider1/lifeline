import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const AGES = Array.from({ length: 83 }, (_, i) => i + 18); // Ages from 18 to 100

export default function AgeScreen() {
  const params = useLocalSearchParams();
  const gender = params.gender;
  const [selectedAge, setSelectedAge] = useState(24);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleAgeSelect = (age: number) => {
    setSelectedAge(age);
  };

  const handleContinue = () => {
    // You can add navigation to the next screen here, passing the age and gender
    // For example: router.push({ pathname: '/(auth)/nextScreen', params: { gender, age: selectedAge } });
    router.push({ pathname: '/(auth)/height', params: { gender, age: selectedAge } });
  };

  const birthYear = new Date().getFullYear() - selectedAge;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Top right corner circle */}
      <View style={styles.topCircle} />

      {/* Bottom left corner circle */}
      <View style={styles.bottomCircle} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/running.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.glassContainer}>
          <BlurView intensity={70} tint="light" style={styles.blurView}>
            <View style={styles.glassContent}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>What is your age?</Text>
                <Text style={styles.subtitle}>It will help us personalized your plans</Text>
              </View>

              <View style={styles.agePickerContainer}>
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.ageScrollView}
                  snapToInterval={60} // Width of each age item
                  decelerationRate="fast"
                >
                  {AGES.map((age) => (
                    <TouchableOpacity key={age} onPress={() => handleAgeSelect(age)}>
                      <View style={[styles.ageItem, selectedAge === age && styles.selectedAgeItem]}>
                        <Text style={[styles.ageText, selectedAge === age && styles.selectedAgeText]}>
                          {age}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <Text style={styles.birthYearText}>Your birth year is {birthYear}</Text>

              <Text style={styles.disclaimerText}>
                Minimum age limit is 18 years as our data will categorized according to different age groups.
              </Text>

              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topCircle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderBottomLeftRadius: 150,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderTopRightRadius: 150,
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 30,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  glassContainer: {
    height: '85%',
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  blurView: {
    flex: 1,
    borderRadius: 25,
  },
  glassContent: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  agePickerContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageScrollView: {
    alignItems: 'center',
    paddingHorizontal: width / 2 - 30, // Center the first and last items
  },
  ageItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedAgeItem: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
  },
  ageText: {
    fontSize: 28,
    color: '#A9A9A9',
  },
  selectedAgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  birthYearText: {
    fontSize: 16,
    color: '#00B3B3',
    fontWeight: '500',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
