import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function UserEngagmentScreen() {
  const params = useLocalSearchParams();
  const gender = params.gender;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    // Navigate to the fitness level screen
    router.push({ pathname: '/(auth)/age', params: { gender } });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <Image
        source={gender === 'male' ? require('../../assets/images/user-engagment2.png') : require('../../assets/images/user-engagment.png')}
        style={styles.backgroundImage}
      />
      
      {/* Bottom gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.9)', 'white']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Thank You!</Text>
        <Text style={styles.subtitle}>Getting Ready Your Plan</Text>
        <Text style={styles.description}>
          We're Customizing Your Exercise Plan{'\n'}
          According To Your Physique.
        </Text>
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#00B3B3" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: width ,
    height: height,
    resizeMode: "cover",
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5, // Cover half of the screen with gradient
  },
  contentContainer: {
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#00B3B3',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  loader: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#00B3B3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 