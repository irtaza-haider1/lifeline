import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
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

const motivationOptions = [
  { id: 'birthday', label: 'Birthday', image: require('../../assets/images/birthday.png') },
  { id: 'wedding', label: 'Wedding', image: require('../../assets/images/wedding.png') },
  { id: 'engagement', label: 'Engagment', image: require('../../assets/images/engagment.png') },
  { id: 'travelling', label: 'Travelling', image: require('../../assets/images/travelling.png') },
  { id: 'other', label: 'Other', image: require('../../assets/images/other.png') },
];

export default function FitnessGoalScreen() {
  const params = useLocalSearchParams();
  const [selectedGoal, setSelectedGoal] = useState<string | null>('birthday');

  const handleContinue = () => {
    const allParams = { ...params, fitnessGoal: selectedGoal };
    if (selectedGoal === 'wedding') {
      router.push({ pathname: '/(auth)/wedding', params: allParams });
    } else if (selectedGoal === 'engagement') {
      router.push({ pathname: '/(auth)/engagment', params: allParams });
    } else if (selectedGoal === 'birthday') {
      router.push({ pathname: '/(auth)/birthday', params: allParams });
    } else if (selectedGoal === 'travelling') {
            router.push({ pathname: '/(auth)/travelling' as any, params: allParams });
    } else {
      router.push({ pathname: '/(auth)/fitnessLevl' as any, params: allParams });
    } 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/running.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.glassContainer}>
          <BlurView intensity={70} tint="light" style={styles.blurView}>
            <View style={styles.glassContent}>
              <Text style={styles.title}>Tell us your motivation to get fit?</Text>
              <View style={styles.optionsContainer}>
                {motivationOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      selectedGoal === option.id && styles.selectedOptionButton,
                    ]}
                    onPress={() => setSelectedGoal(option.id)}
                  >
                    <Image source={option.image} style={styles.optionIcon} />
                    <Text
                      style={[
                        styles.optionText,
                        selectedGoal === option.id && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {selectedGoal === option.id && (
                      <View style={styles.checkmarkCircle}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
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
  container: { flex: 1, backgroundColor: '#fff' },
  topCircle: { position: 'absolute', top: 0, right: 0, width: 150, height: 150, backgroundColor: '#00B3B3', borderBottomLeftRadius: 150 },
  bottomCircle: { position: 'absolute', bottom: 0, left: 0, width: 150, height: 150, backgroundColor: '#00B3B3', borderTopRightRadius: 150 },
  logoContainer: { position: 'absolute', top: 60, left: 20, zIndex: 1 },
  logo: { width: 80, height: 30 },
  contentWrapper: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  glassContainer: { height: '85%', borderRadius: 25, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)' },
  blurView: { flex: 1, borderRadius: 25 },
  glassContent: { flex: 1, padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginTop: 20 },
  optionsContainer: { width: '100%', paddingHorizontal: 20 },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  selectedOptionButton: {
    backgroundColor: '#00B3B3',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    color: '#fff',
  },
  checkmarkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#00B3B3',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
