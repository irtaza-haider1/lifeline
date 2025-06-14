import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TravellingScreen() {
  const params = useLocalSearchParams();

  const handleContinue = () => {
    console.log('Continuing from travelling screen with params:', params);
    router.push({ pathname: '/(auth)/fitnessLevl', params });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/travelling2.png')}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.8)', 'white']}
        locations={[0, 0.5, 0.8]}
        style={styles.gradient}
      >
        <SafeAreaView>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Travel-Ready Transformation</Text>
            <Text style={styles.description}>
              Embarking on your travel adventures? Let's make your weight loss journey a ticket to the destination of your dreams. Together, we'll ensure you feel energized, confident, and ready to explore the world!
            </Text>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    paddingHorizontal: 20,
    paddingTop: 190,
    paddingBottom: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
