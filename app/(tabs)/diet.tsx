import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DietPlan from '../../components/DietPlan';

const DietScreen = () => {
  const router = useRouter();
  const dietPlans = [
    {
      category: 'Vegeterian',
      name: 'Diet Plan Name',
      image: require('../../assets/images/diet-1.png'),
      calories: 300,
      days: 28,
    },
    {
      category: 'Non-Vegeterian',
      name: 'Diet Plan Name',
      image: require('../../assets/images/diet-2.png'),
      calories: 300,
      days: 28,
    },
    {
      category: 'Chinese',
      name: 'Diet Plan Name',
      image: require('../../assets/images/diet-3.png'),
      calories: 300,
      days: 28,
    },
    {
      category: 'Mediterranean',
      name: 'Diet Plan Name',
      image: require('../../assets/images/diet-4.png'),
      calories: 300,
      days: 28,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} color="#000" />
        <Text style={styles.headerTitle}>Diet</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci
      </Text>
      <ScrollView contentContainerStyle={styles.listContainer}>
        {dietPlans.map((plan, index) => (
          <TouchableOpacity key={index} onPress={() => router.push('/(main)/OpenDiet')}>
            <DietPlan {...plan} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 90,
  },
});

export default DietScreen;
