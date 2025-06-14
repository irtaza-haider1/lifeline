import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Focus area options
const focusAreas = [
  { id: 1, title: 'Full Body' },
  { id: 2, title: 'Shoulders' },
  { id: 3, title: 'Chest' },
  { id: 4, title: 'Arms' },
  { id: 5, title: 'Back' },
  { id: 6, title: 'Belly' },
  { id: 7, title: 'Legs' },
];

export default function FocusAreaScreen() {
  const params = useLocalSearchParams();
  const [gender, setGender] = useState<string>('female'); // Default to female
  const [selectedArea, setSelectedArea] = useState<number | null>(1); // Default to Full Body

  useEffect(() => {
    // Get gender from params or use default
    if (params.gender) {
      setGender(params.gender as string);
    }
  }, [params]);

  const handleAreaSelect = (areaId: number) => {
    setSelectedArea(areaId);
  };

  const handleContinue = () => {
    // Navigate to the main tabs
    router.push({ pathname: '/(auth)/userEngagment', params: { gender } });
  };

  // Function to get the appropriate line style based on area ID
  const getLineStyle = (areaId: number) => {
    switch(areaId) {
      case 2: return styles.lineShoulders;
      case 3: return styles.lineChest;
      case 4: return styles.lineArms;
      case 5: return styles.lineBack;
      case 6: return styles.lineBelly;
      case 7: return styles.lineLegs;
      default: return {};
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
        <View style={styles.titleContainer}>
          <View style={styles.titleLine} />
          <Text style={styles.title}>Choose Your Focus Area</Text>
          <Text style={styles.subtitle}>Tell us which part of your body you'd like to{'\n'}focus on during your workouts</Text>
        </View>
        
        {/* Glass container */}
        <View style={styles.glassContainer}>
          <BlurView intensity={70} tint="light" style={styles.blurView}>
            <View style={styles.glassContent}>
              <View style={styles.bodyContainer}>
                {/* Focus Areas */}
                <View style={styles.areasContainer}>
                  {focusAreas.map((area) => (
                    <TouchableOpacity
                      key={area.id}
                      style={[
                        styles.areaButton,
                        selectedArea === area.id && styles.selectedAreaButton
                      ]}
                      onPress={() => handleAreaSelect(area.id)}
                    >
                      <Text style={styles.areaButtonText}>{area.title}</Text>
                      
                      {/* Show line for all options except Full Body */}
                      {area.id !== 1 && (
                        <View style={[
                          styles.connectionLine,
                          getLineStyle(area.id),
                          selectedArea === area.id && styles.selectedLine
                        ]} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
                
                {/* Body Image */}
                <View style={styles.bodyImageContainer}>
                  <Image
                    source={
                      gender === 'female' 
                        ? require('../../assets/images/focus-female.png')
                        : require('../../assets/images/focus-male.png')
                    }
                    style={styles.bodyImage}
                    resizeMode="contain"
                  />
                </View>
              </View>
              
              {/* Continue button */}
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
    marginBottom: 30,
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
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
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  areasContainer: {
    width: '45%',
    position: 'relative',
    zIndex: 2,
  },
  areaButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    position: 'relative',
  },
  selectedAreaButton: {
    borderColor: '#00B3B3',
    borderWidth: 2,
  },
  areaButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  bodyImageContainer: {
    width: '55%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyImage: {
    width: '100%',
    height: '90%',
  },
  connectionLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#00B3B3',
    right: -50,
    zIndex: 10,
  },
  selectedLine: {
    height: 3,
  },
  lineShoulders: {
    width: 50,
    top: '20%',
    right: -50,
  },
  lineChest: {
    width: 50,
    top: '30%',
    right: -50,
  },
  lineArms: {
    width: 50,
    top: '40%',
    right: -50,
  },
  lineBack: {
    width: 50,
    top: '50%',
    right: -50,
  },
  lineBelly: {
    width: 50,
    top: '60%',
    right: -50,
  },
  lineLegs: {
    width: 50,
    top: '80%',
    right: -50,
  },
  continueButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
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