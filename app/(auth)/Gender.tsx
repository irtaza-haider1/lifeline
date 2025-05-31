import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Swiper from 'react-native-swiper';

export default function GenderScreen() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [currentAge, setCurrentAge] = useState(25);
  
  // Generate age range from 18 to 80
  const ages = Array.from({ length: 63 }, (_, i) => i + 18);

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    if (selectedGender === 'male') {
      // Navigate to the Male screen
      router.push('/(auth)/Male');
    } else if (selectedGender === 'female') {
      // Navigate to the Female screen
      router.push('/(auth)/Female');
    }
  };

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
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>How would you describe your gender?</Text>
        
        <Text style={styles.subtitle}>
          Swipe left or right to enter your current age.
        </Text>
        
        <View style={styles.genderOptionsContainer}>
          <TouchableOpacity 
            style={[
              styles.genderOption, 
              selectedGender === 'male' && styles.selectedGenderOption
            ]}
            onPress={() => handleGenderSelect('male')}
          >
            <Image
              source={require('../../assets/images/male.png')}
              style={styles.genderImage}
              resizeMode="cover"
            />
            {selectedGender === 'male' && (
              <View style={styles.checkmarkContainer}>
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.genderOption, 
              selectedGender === 'female' && styles.selectedGenderOption
            ]}
            onPress={() => handleGenderSelect('female')}
          >
            <Image
              source={require('../../assets/images/female.png')}
              style={styles.genderImage}
              resizeMode="cover"
            />
            {selectedGender === 'female' && (
              <View style={styles.checkmarkContainer}>
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Age Swiper - Hidden but functional */}
        <View style={styles.hiddenSwiper}>
          <Swiper
            showsPagination={false}
            loop={false}
            onIndexChanged={(index) => setCurrentAge(ages[index])}
            index={ages.indexOf(25)} // Default to age 25
          >
            {ages.map((age) => (
              <View key={age} style={styles.ageSlide}>
                <Text style={styles.ageText}>{age}</Text>
              </View>
            ))}
          </Swiper>
        </View>
        
        {/* Continue button */}
        {selectedGender && (
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
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
    borderBottomLeftRadius: 100,
    zIndex: -1,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderTopRightRadius: 100,
    zIndex: -1,
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  genderOptionsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  genderOption: {
    width: 160,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  selectedGenderOption: {
    borderWidth: 2,
    borderColor: '#00B3B3',
  },
  genderImage: {
    width: '100%',
    height: '100%',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00B3B3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hiddenSwiper: {
    position: 'absolute',
    width: '100%',
    height: 50,
    bottom: 100,
    opacity: 0, // Hidden but functional
  },
  ageSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  continueButton: {
    position: 'absolute',
    bottom: 40,
    width: 220,
    height: 46,
    backgroundColor: '#00B3B3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 