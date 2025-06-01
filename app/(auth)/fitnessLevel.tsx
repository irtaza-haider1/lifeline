import Slider from '@react-native-community/slider';
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

// Fitness level labels
const fitnessLevels = [
  "Beginner",
  "Novice",
  "Somewhat Athletic",
  "Athletic",
  "Very Athletic"
];

export default function FitnessLevelScreen() {
  const [fitnessLevel, setFitnessLevel] = useState(3); // Default to middle value (Somewhat Athletic)

  const handleSliderChange = (value: number) => {
    setFitnessLevel(Math.round(value));
  };

  const handleContinue = () => {
    // Navigate to the Routine screen
    router.push('/Routine');
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
                <Text style={styles.title}>How would you rate your{'\n'}fitness level?</Text>
              </View>
              
              <View style={styles.sliderContainer}>
                <Text style={styles.dragText}>□ Drag to adjust</Text>
                
                <View style={styles.levelIndicator}>
                  <Text style={styles.levelText}>{fitnessLevels[fitnessLevel-1]}</Text>
                </View>
                
                {/* Custom slider with ticks */}
                <View style={styles.customSliderContainer}>
                  {/* Track background */}
                  <View style={styles.sliderTrack}>
                    {/* Active track */}
                    <View style={[styles.sliderActiveTrack, { width: `${(fitnessLevel-1) * 25}%` }]} />
                  </View>
                  
                  {/* Tick marks */}
                  <View style={styles.ticksContainer}>
                    <View style={styles.tick} />
                    <View style={styles.tick} />
                    <View style={styles.tick} />
                    <View style={styles.tick} />
                    <View style={styles.tick} />
                  </View>
                  
                  {/* Thumb */}
                  <View style={[styles.sliderThumb, { left: `${(fitnessLevel-1) * 25}%` }]} />
                  
                  {/* Invisible slider for interaction */}
                  <Slider
                    style={styles.interactiveSlider}
                    minimumValue={1}
                    maximumValue={5}
                    step={1}
                    value={fitnessLevel}
                    onValueChange={handleSliderChange}
                    minimumTrackTintColor="transparent"
                    maximumTrackTintColor="transparent"
                    thumbTintColor="transparent"
                  />
                </View>
                
                <View style={styles.sliderLabelsContainer}>
                  <Text style={styles.sliderLabel}>1</Text>
                  <Text style={styles.sliderLabel}>2</Text>
                  <Text style={styles.sliderLabel}>3</Text>
                  <Text style={styles.sliderLabel}>4</Text>
                  <Text style={styles.sliderLabel}>5</Text>
                </View>
              </View>
              
              {/* Continue button - now inside the glass container */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
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
    marginBottom: 50,
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
    fontSize: 22,
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
    justifyContent: 'space-between',
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dragText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  levelIndicator: {
    backgroundColor: '#00B3B3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 30,
  },
  levelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  customSliderContainer: {
    width: '100%',
    height: 40,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#DDDDDD',
    borderRadius: 2,
    position: 'absolute',
  },
  sliderActiveTrack: {
    height: '100%',
    backgroundColor: '#00B3B3',
    borderRadius: 2,
  },
  ticksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
  },
  tick: {
    width: 2,
    height: 15,
    backgroundColor: '#AAAAAA',
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00B3B3',
    position: 'absolute',
    top: '50%',
    marginTop: -10,
    marginLeft: -10,
  },
  interactiveSlider: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 