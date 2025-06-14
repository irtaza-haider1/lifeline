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

// Routine options
const routineOptions = [
  { id: 1, title: 'At Office', icon: require('../../assets/images/routine1.png') },
  { id: 2, title: 'Walking Daily', icon: require('../../assets/images/routine2.png') },
  { id: 3, title: 'Working Physically', icon: require('../../assets/images/routine3.png') },
  { id: 4, title: 'Mostly at Home', icon: require('../../assets/images/routine4.png') },
  { id: 5, title: 'At Park', icon: require('../../assets/images/routine5.png') },
];

export default function RoutineScreen() {
  const params = useLocalSearchParams();
  const gender = params.gender;
  const [selectedRoutine, setSelectedRoutine] = useState<number | null>(1); // Default to first option

  const handleRoutineSelect = (routineId: number) => {
    setSelectedRoutine(routineId);
  };

  const handleContinue = () => {
    // Navigate to the Limitation screen
    router.push({ pathname: '/(auth)/Limitation', params: { gender } });
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
                <Text style={styles.title}>What does your typical{'\n'}day look like?</Text>
              </View>
              
              <View style={styles.optionsContainer}>
                {routineOptions.map((routine) => (
                  <TouchableOpacity
                    key={routine.id}
                    style={[
                      styles.routineOption,
                      selectedRoutine === routine.id && styles.selectedRoutineOption
                    ]}
                    onPress={() => handleRoutineSelect(routine.id)}
                  >
                    <Image 
                      source={routine.icon}
                      style={styles.routineIcon}
                      resizeMode="cover"
                    />
                    <Text style={[
                      styles.routineTitle,
                      selectedRoutine === routine.id && styles.selectedRoutineText
                    ]}>
                      {routine.title}
                    </Text>
                    
                    {selectedRoutine === routine.id && (
                      <View style={styles.checkmarkContainer}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Continue button - inside the glass container */}
              {selectedRoutine && (
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleContinue}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              )}
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
  optionsContainer: {
    flex: 1,
  },
  routineOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
    padding: 12,
    marginBottom: 12,
    height: 60,
  },
  selectedRoutineOption: {
    backgroundColor: '#00B3B3',
  },
  routineIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 15,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  selectedRoutineText: {
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
    color: '#00B3B3',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 