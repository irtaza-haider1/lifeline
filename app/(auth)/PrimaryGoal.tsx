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
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

// Define the fitness goals
const fitnessGoals = [
  { id: 1, title: 'Lose weight', icon: require('../../assets/images/fitness1.png') },
  { id: 2, title: 'Gain Weight', icon: require('../../assets/images/fitness2.png') },
  { id: 3, title: 'Build Muscle', icon: require('../../assets/images/fitness3.png') },
  { id: 4, title: 'Modify your Diet', icon: require('../../assets/images/fitness4.png') },
  { id: 5, title: 'Manage Stress', icon: require('../../assets/images/fitness5.png') },
  { id: 6, title: 'Intermittent Fasting', icon: require('../../assets/images/fitness1.png') },
];

export default function PrimaryGoalScreen() {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null); // No default selection
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
  
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

  const handleGoalSelect = (goalId: number) => {
    setSelectedGoal(goalId);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      // Navigate to the next screen
      router.push('/(tabs)');
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
              <Text style={styles.title}>Select your primary fitness goal</Text>
              
              <ScrollView 
                style={styles.goalsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContentContainer}
              >
                {fitnessGoals.map((goal) => (
                  <TouchableOpacity
                    key={goal.id}
                    style={[
                      styles.goalOption,
                      selectedGoal === goal.id && styles.selectedGoalOption
                    ]}
                    onPress={() => handleGoalSelect(goal.id)}
                  >
                    <View style={styles.goalIconContainer}>
                      <Image 
                        source={goal.icon}
                        style={styles.goalIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={[
                      styles.goalTitle,
                      selectedGoal === goal.id && styles.selectedGoalText
                    ]}>
                      {goal.title}
                    </Text>
                    
                    {selectedGoal === goal.id && (
                      <View style={styles.checkmarkContainer}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              {/* Continue button - only shows when user selects a goal */}
              {selectedGoal && (
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
    paddingTop: 24,
    paddingBottom: 24,
    maxHeight: 600, // Limit height for scrolling
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  goalsContainer: {
    maxHeight: 400, // Limit scroll container height
  },
  scrollContentContainer: {
    paddingBottom: 10,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    minHeight: 70,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.08,
    // shadowRadius: 4,
    elevation: 2,
  },
  selectedGoalOption: {
    backgroundColor: 'rgba(0, 179, 179, 0.9)',
    borderColor: 'rgba(0, 179, 179, 0.5)',
    shadowColor: '#00B3B3',
    shadowOpacity: 0.25,
  },
  goalIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  goalIcon: {
    width: 28,
    height: 28,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  selectedGoalText: {
    color: '#fff',
    fontWeight: '600',
  },
  checkmarkContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmark: {
    color: '#00B3B3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#00B3B3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#00B3B3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 