import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const ExerciseStart = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isExercising, setIsExercising] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (!isStarted || isExercising) {
      return;
    }

    if (countdown === 0) {
      setIsExercising(true);
      return;
    }

    const timerId = setInterval(() => {
      setCountdown(c => c - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isStarted, countdown, isExercising]);

  const handleStartPress = () => {
    setIsStarted(true);
  };
  
  const handleSkipPress = () => {
    setIsExercising(true);
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/chest-workout.png')} 
      style={styles.container}
    >
      <LinearGradient
        colors={['transparent', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
        style={styles.gradient}
      >
        {isExercising ? (
          <View style={styles.contentContainer}>
            <View style={styles.exerciseBadge}>
              <Text style={styles.exerciseBadgeText}>Exercise 01</Text>
            </View>
            <Text style={styles.exerciseTitle}>Basic Warm Up</Text>
            <View style={styles.progressBarContainer}>
              <Text style={styles.progressTime}>02:45</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {width: '55%'}]} />
              </View>
              <Text style={styles.progressTime}>05:00</Text>
            </View>
            <TouchableOpacity style={styles.playButton} onPress={() => router.push('/(main)/Applause')}>
              <Ionicons name="play" size={40} color="white" style={{ marginLeft: 5 }}/>
            </TouchableOpacity>
          </View>
        ) : isStarted ? (
          <View style={styles.contentContainer}>
            <Text style={styles.readyTitle}>Ready To Go!</Text>
            <Text style={styles.readySubtitle}>Having a structured plan is crucial to fitness</Text>
            <View style={styles.countdownWrapper}>
                <AnimatedCircularProgress
                    size={150}
                    width={10}
                    fill={((3 - countdown) / 3) * 100}
                    tintColor="#3EC6C9"
                    backgroundColor="#E0F7F6"
                    rotation={0}
                    lineCap="round"
                >
                    {() => (
                        <Text style={styles.countdownText}>{countdown}</Text>
                    )}
                </AnimatedCircularProgress>
            </View>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkipPress}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Across Chest</Text>
            <Text style={styles.title}>Shoulder Stretch</Text>
            
            <View style={styles.infoContainer}>
              <View style={styles.infoBox}>
                <Ionicons name="time-outline" size={24} color="#3EC6C9" />
                <Text style={styles.infoText}>58mins</Text>
                <Text style={styles.infoLabel}>Time</Text>
              </View>
              <View style={styles.infoBox}>
                <Ionicons name="flame-outline" size={24} color="#3EC6C9" />
                <Text style={styles.infoText}>245kcal</Text>
                <Text style={styles.infoLabel}>Calories</Text>
              </View>
              <View style={styles.infoBox}>
                <Ionicons name="barbell-outline" size={24} color="#3EC6C9" />
                <Text style={styles.infoText}>3x4</Text>
                <Text style={styles.infoLabel}>Sets</Text>
              </View>
            </View>
  
            <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
              <Ionicons name="play-circle-outline" size={24} color="white" />
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    width: '100%',
    height: '60%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 30,
    marginBottom: 40,
  },
  infoBox: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3EC6C9',
    marginTop: 5,
  },
  infoLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  startButton: {
    backgroundColor: '#3EC6C9',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  readyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  readySubtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 40,
  },
  countdownWrapper: {
    marginBottom: 40,
  },
  countdownText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#3EC6C9',
  },
  skipButton: {
    backgroundColor: '#3EC6C9',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  skipButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  exerciseBadge: {
    backgroundColor: '#3EC6C9',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  exerciseBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  exerciseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 40,
  },
  progressTime: {
    color: '#777',
    fontSize: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3EC6C9',
    borderRadius: 4,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3EC6C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExerciseStart;
