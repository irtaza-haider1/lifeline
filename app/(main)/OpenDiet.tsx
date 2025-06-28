import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DietScheduleCard from '../../components/DietScheduleCard';

const OpenDietScreen = () => {
  const router = useRouter();
  const schedule = [
    { meal: 'Breakfast', title: 'Push-Up Challenge', image: require('../../assets/images/diet-1.png'), calories: 300, days: 28 },
    { meal: 'Snacks', title: 'Push-Up Challenge', image: require('../../assets/images/diet-2.png'), calories: 300, days: 28 },
    { meal: 'Lunch', title: 'Push-Up Challenge', image: require('../../assets/images/diet-3.png'), calories: 300, days: 28 },
    { meal: 'Dinner', title: 'Push-Up Challenge', image: require('../../assets/images/diet-4.png'), calories: 300, days: 28 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="arrow-left" size={28} color="#48d1cc" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="heart" size={28} color="#48d1cc" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Diet Plan Name</Text>
          <View style={styles.weeksTag}>
            <Text style={styles.weeksText}>07 Weeks</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Write overall description of diet plan here i.e. for what purpose it is and how long it will exists after a complete description we will show our diet schedule.
        </Text>

        <Text style={styles.scheduleTitle}>Diet Schedule</Text>

        {schedule.map((item, index) => (
          <DietScheduleCard key={index} {...item} />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.activateButton} onPress={() => router.push('/(main)/ActivePlan')}>
        <Text style={styles.activateButtonText}>Activate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100, // To make space for the activate button
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
  weeksTag: {
    borderColor: '#48d1cc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  weeksText: {
    color: '#48d1cc',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    lineHeight: 24,
  },
  scheduleTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  activateButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#48d1cc',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OpenDietScreen;
