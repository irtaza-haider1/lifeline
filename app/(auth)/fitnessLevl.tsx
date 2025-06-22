
import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import * as Progress from 'react-native-progress';

export default function FitnessLevlScreen() {
  const params = useLocalSearchParams();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + 0.1, 1);
        if (newProgress >= 1) {
          clearInterval(interval);
          setTimeout(() => {
            router.replace({ pathname: '/(auth)/graph', params });
          }, 500); // Wait half a second before navigating
        }
        return newProgress;
      });
    }, 200); // Animate over 2 seconds

    return () => clearInterval(interval);
  }, [params]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />
      <Image
        source={require('../../assets/images/running.png')}
        style={styles.logo}
      />
            <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <Text style={styles.title}>Personalizing plans for you!</Text>
        <Text style={styles.subtitle}>Please wait.....</Text>
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={200}
            progress={progress}
            showsText={true}
            formatText={() => `${Math.round(progress * 100)}%`}
            color="#00B3B3"
            unfilledColor="#E0E0E0"
            borderWidth={0}
            thickness={15}
            textStyle={styles.progressText}
          />
        </View>
        <Text style={styles.footerText}>
          This will just take a moment. Get ready to transform your fitness journey!
        </Text>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#00B3B3',
    opacity: 0.8,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -120,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#00B3B3',
    opacity: 0.8,
  },
  logo: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  blurContainer: {
    width: '90%',
    height: '80%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00B3B3',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
