import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import Swiper from 'react-native-swiper';

export default function GenderScreen() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  const [currentAge, setCurrentAge] = useState(25);
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
  
  // Generate age range from 18 to 80
  const ages = Array.from({ length: 63 }, (_, i) => i + 18);
  
  useEffect(() => {
    // Set up event listener for screen dimension changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions(window);
    });
    
    // Clean up the subscription on unmount
    return () => subscription.remove();
  }, []);

  // Calculate responsive sizes based on screen width
  const containerWidth = Math.min(screenDimensions.width * 0.9, 400); // 90% of screen width, max 400
  const paddingHorizontal = screenDimensions.width < 380 ? 16 : 24;

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
      <Image source={require('../../assets/images/Ellipse1.png')} style={styles.topCircle} />
      
      {/* Bottom left corner circle */}
      <Image source={require('../../assets/images/Ellipse2.png')} style={styles.bottomCircle} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/running.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Shadow
          distance={1}
          offset={[0, 0]}
        >
          <View style={[styles.glassContainer, { width: containerWidth }]}>
            <BlurView intensity={-100} tint="light" style={StyleSheet.absoluteFill} />
            <View style={[styles.glassContent, { padding: paddingHorizontal }]}>
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
          </View>
        </Shadow>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FEFD', // Light teal background like login screen
    paddingTop: 20,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  topCircle: {
    position: 'absolute',
    top: -105,
    right: -50,
    opacity: 0.77,
    zIndex: 1,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -150,
    left: -140,
    opacity: 0.73,
    zIndex: 2,
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10, // Higher z-index to ensure it's above everything
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add background for visibility
    padding: 8,
    borderRadius: 8,
  },
  logo: {
    width: 100,
    height: 40,
  },
  glassContainer: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#54c5d1',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 38,
    elevation: 0,
    alignSelf: 'center',
    zIndex: 3,
  },
  glassContent: {
    paddingTop: 14,
    paddingBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  genderOptionsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 20,
    marginBottom: 20,
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
    bottom: 80,
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
    width: '100%',
    backgroundColor: '#00B3B3',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 