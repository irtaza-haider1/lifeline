import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
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
  const params = useLocalSearchParams();
  const gender = params.gender;
  const [selectedGoal, setSelectedGoal] = useState<number | null>(1); // Default to first option

  const handleGoalSelect = (goalId: number) => {
    setSelectedGoal(goalId);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      // Navigate to the Nutrition screen
      router.push({ pathname: '/(auth)/Nutrition', params: { gender } });
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
              <Text style={styles.title}>Select your primary fitness goal</Text>
              
              <ScrollView 
                style={styles.goalsContainer}
                showsVerticalScrollIndicator={false}
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
                    <Image 
                      source={goal.icon}
                      style={styles.goalIcon}
                      resizeMode="contain"
                    />
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
            </View>
          </BlurView>
        </View>
        
        {/* Continue button - only visible when a goal is selected */}
        {selectedGoal && (
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
    color: '#333',
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
  goalsContainer: {
    flex: 1,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
    padding: 15,
    marginBottom: 12,
    height: 60,
  },
  selectedGoalOption: {
    backgroundColor: '#3EC6C9',
  },
  goalIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  selectedGoalText: {
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