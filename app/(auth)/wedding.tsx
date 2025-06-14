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

export default function WeddingScreen() {
  const params = useLocalSearchParams();

  const handleContinue = () => {
    console.log('Continuing from wedding screen with params:', params);
    router.push({ pathname: '/(auth)/fitnessLevl', params });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/wedding2.png')}
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
            <Text style={styles.title}>Wedding-Ready Weight Loss</Text>
            <Text style={styles.description}>
              Congratulations on your upcoming wedding! Let's achieve your weight loss goals together and make sure you feel confident and amazing on your special day. Start now and let the transformation begin!
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
    paddingTop: 250,
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
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 80,
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
