import { BlurView } from 'expo-blur';
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

// Define the allergen options
const allergenOptions = [
  { id: 1, title: 'Dairy', icon: require('../../assets/images/Dairy.png') },
  { id: 2, title: 'Gluten', icon: require('../../assets/images/Gluten.png') },
  { id: 3, title: 'Eggs', icon: require('../../assets/images/Eggs.png') },
  { id: 4, title: 'Fish', icon: require('../../assets/images/Fish.png') },
  { id: 5, title: 'I eat everything', icon: require('../../assets/images/all.png') },
];

export default function ExclusionScreen() {
  const [selectedAllergen, setSelectedAllergen] = useState<number | null>(1); // Default to first option

  const handleAllergenSelect = (allergenId: number) => {
    setSelectedAllergen(allergenId);
  };

  const handleContinue = () => {
    if (selectedAllergen) {
      // Navigate to the userEngagement screen
      router.push('/userEngagement');
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
                <Text style={styles.title}>Do you have any allergen food?</Text>
              </View>
              
              <View style={styles.allergensContainer}>
                {allergenOptions.map((allergen) => (
                  <TouchableOpacity
                    key={allergen.id}
                    style={[
                      styles.allergenOption,
                      selectedAllergen === allergen.id && styles.selectedAllergenOption
                    ]}
                    onPress={() => handleAllergenSelect(allergen.id)}
                  >
                    <Image 
                      source={allergen.icon}
                      style={styles.allergenIcon}
                      resizeMode="contain"
                    />
                    <Text style={[
                      styles.allergenTitle,
                      selectedAllergen === allergen.id && styles.selectedAllergenText
                    ]}>
                      {allergen.title}
                    </Text>
                    
                    {selectedAllergen === allergen.id && (
                      <View style={styles.checkmarkContainer}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </BlurView>
        </View>
        
        {/* Continue button - only visible when an allergen is selected */}
        {selectedAllergen && (
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
  allergensContainer: {
    flex: 1,
  },
  allergenOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
    padding: 15,
    marginBottom: 12,
    height: 60,
  },
  selectedAllergenOption: {
    backgroundColor: '#3EC6C9',
  },
  allergenIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 15,
  },
  allergenTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  selectedAllergenText: {
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