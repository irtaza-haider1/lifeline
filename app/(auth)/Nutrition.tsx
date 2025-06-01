import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Define the diet types
const dietTypes = [
  { id: 1, title: 'Traditional', icon: require('../../assets/images/nutrition1.png') },
  { id: 2, title: 'Vegetarian', icon: require('../../assets/images/nutrition2.png') },
  { id: 3, title: 'Keto', icon: require('../../assets/images/nutrition3.png') },
  { id: 4, title: 'Pescatarian', icon: require('../../assets/images/nutrition4.png') },
  { id: 5, title: 'Vegan (Plant diet)', icon: require('../../assets/images/nutrition5.png') },
  { id: 6, title: 'Paleo', icon: require('../../assets/images/nutrition6.png') },
  { id: 7, title: 'Mediterranean', icon: require('../../assets/images/nutrition7.png') },
  { id: 8, title: 'Diabetes type 1', icon: require('../../assets/images/nutrition8.png') },
  { id: 9, title: 'Diabetes type 2', icon: require('../../assets/images/nutrition9.png') },
  { id: 10, title: 'High-Protein', icon: require('../../assets/images/nutrition10.png') },
  { id: 11, title: 'Calorie-Cutting', icon: require('../../assets/images/nutrition11.png') },
  { id: 12, title: 'High Calories', icon: require('../../assets/images/nutrition12.png') },
];

export default function NutritionScreen() {
  const [selectedDiet, setSelectedDiet] = useState<number | null>(1); // Default to first option

  const handleDietSelect = (dietId: number) => {
    setSelectedDiet(dietId);
  };

  const handleContinue = () => {
    if (selectedDiet) {
      // If Diabetes type 1 is selected, navigate to the consent screen
      if (selectedDiet === 8) { // ID 8 is for Diabetes type 1
        router.push('/diabeticConset');
      } else {
        // For other diet types, navigate to the tabs
        router.push('/(tabs)');
      }
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
      
      <View style={styles.contentWrapper}>
        {/* Glass container */}
        <View style={styles.glassContainer}>
          <BlurView intensity={70} tint="light" style={styles.blurView}>
            <View style={styles.glassContent}>
              <View style={styles.titleContainer}>
                <View style={styles.titleLine} />
                <Text style={styles.title}>Choose your diet type</Text>
              </View>
              
              <ScrollView 
                style={styles.dietsContainer}
                showsVerticalScrollIndicator={false}
              >
                {dietTypes.map((diet) => (
                  <TouchableOpacity
                    key={diet.id}
                    style={[
                      styles.dietOption,
                      selectedDiet === diet.id && styles.selectedDietOption
                    ]}
                    onPress={() => handleDietSelect(diet.id)}
                  >
                    <Image 
                      source={diet.icon}
                      style={styles.dietIcon}
                      resizeMode="contain"
                    />
                    <Text style={[
                      styles.dietTitle,
                      selectedDiet === diet.id && styles.selectedDietText
                    ]}>
                      {diet.title}
                    </Text>
                    
                    {selectedDiet === diet.id && (
                      <View style={styles.checkmarkContainer}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
                
                {/* Extra space at the bottom for better scrolling */}
                <View style={styles.scrollPadding} />
              </ScrollView>
            </View>
          </BlurView>
        </View>
        
        {/* Continue button - only visible when a diet is selected */}
        {selectedDiet && (
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
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  titleLine: {
    width: 40,
    height: 4,
    backgroundColor: '#00B3B3',
    marginBottom: 15,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  glassContainer: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  blurView: {
    flex: 1,
    borderRadius: 25,
  },
  glassContent: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dietsContainer: {
    flex: 1,
  },
  dietOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
    padding: 15,
    marginBottom: 12,
    height: 60,
  },
  selectedDietOption: {
    backgroundColor: '#3EC6C9',
  },
  dietIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 15,
  },
  dietTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  selectedDietText: {
    color: '#fff',
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#3EC6C9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollPadding: {
    height: 20,
  },
  continueButton: {
    backgroundColor: '#3EC6C9',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 