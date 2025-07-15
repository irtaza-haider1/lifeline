import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MoreScreen = () => {
  const router = useRouter();
  const quickAccessItems = [
    { name: 'Challenge', image: require('../../assets/images/challenge.png'), special: true },
    { name: 'Connected Devices', image: require('../../assets/images/Devices.png') },
    { name: 'Food Scanner', image: require('../../assets/images/scanner.png') },
    { name: 'Medication', image: require('../../assets/images/medication.png') },
    { name: 'Water Intake', image: require('../../assets/images/waterdrop.png') },
    { name: 'Sleep', image: require('../../assets/images/sleeping.png') },
    { name: 'Meditation', image: require('../../assets/images/meditating.png') },
    { name: 'Fasting', image: require('../../assets/images/fasting.png') },
    { name: 'Fitness band', image: require('../../assets/images/fitnessband.png') },
    { name: 'Cheat Day', image: require('../../assets/images/meditating.png') }, // Assuming routine1.png is for Cheat Day
  ];

  const helpItems = [
    { name: 'Setting', icon: 'settings-outline' },
    { name: 'About', icon: 'information-circle-outline' },
  ];

  const renderGridItem = ({ name, image, special = false }: { name: string; image: any; special?: boolean }) => (
    <View style={styles.gridItem} key={name}>
      <TouchableOpacity 
        style={[styles.iconButton, special && styles.specialButton]} 
        onPress={() => {
          if (name === 'Fasting') {
            router.push('/(main)/Fasting');
          } else if (name === 'Cheat Day') {
            router.push({ pathname: '/(main)/ActivePlan', params: { from: 'cheatDay' } });
          } else if (name === 'Sleep') {
            router.push('/(main)/sleep');
          } else if (name === 'Medication') {
            router.push('/(main)/Medication');
          } else if (name === 'Connected Devices') {
            router.push('/(main)/ConnectedDevice');
          } else if (name === 'Water Intake') {
            router.push('/waterIntake');
          }
        }}
      >
        <Image source={image} style={styles.gridImage} />
      </TouchableOpacity>
      <Text style={styles.gridItemText}>{name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/images/emerson.png')}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Emerson Dias</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.gridContainer}>
            {quickAccessItems.map(renderGridItem)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help</Text>
          <View style={[styles.gridContainer, { justifyContent: 'center' }]}>
            {helpItems.map(({ name, icon }) => (
              <View style={styles.gridItem} key={name}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => {
                    if (name === 'Setting') {
                      router.push('/(main)/settings');
                    }
                  }}
                >
                  <Ionicons name={icon as any} size={32} color="#666" />
                </TouchableOpacity>
                <Text style={styles.gridItemText}>{name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#52C4C3',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#52C4C3',
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#52C4C3',
  },
  section: {
    width: '90%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  gridItem: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialButton: {
    backgroundColor: 'rgba(82, 196, 195, 0.1)',
  },
  gridItemText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  gridImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default MoreScreen;
