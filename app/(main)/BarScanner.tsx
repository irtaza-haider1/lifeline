import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BarScannerScreen = () => {
  const router = useRouter();

  return (
    <ImageBackground source={require('../../assets/images/bar-scanner.png')} style={styles.imageBackground}>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)', 'white']}
        locations={[0, 0.6, 0.75]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.title}>Barcode food Scanner</Text>
              <Text style={styles.subtitle}>
                Understand your food intake, manage your diet, and reach your goals!
              </Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(main)/BarManually')}>
              <Text style={styles.addButtonText}>Add to Meal</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#3EC6C9',
    width:'80%',
    left:30,
    borderRadius: 15,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BarScannerScreen;
