import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DietPlan from '../../components/DietPlan';
import DietScheduleCard from '../../components/DietScheduleCard';

const dietPlans = [
  { category: 'Vegeterian', name: 'Diet Plan Name', image: require('../../assets/images/diet-1.png'), calories: 300, days: 28, isActive: true },
  { category: 'Non-Vegeterian', name: 'Diet Plan Name', image: require('../../assets/images/diet-2.png'), calories: 300, days: 28 },
  { category: 'Chinese', name: 'Diet Plan Name', image: require('../../assets/images/diet-3.png'), calories: 300, days: 28 },
  { category: 'Mediterranean', name: 'Diet Plan Name', image: require('../../assets/images/diet-4.png'), calories: 300, days: 28 },
];

const schedule = [
  { meal: 'Breakfast', title: 'Oatmeal with Berries', image: require('../../assets/images/diet-1.png'), calories: 300, days: 28 },
  { meal: 'Breakfast', title: 'Avocado Toast', image: require('../../assets/images/diet-2.png'), calories: 250, days: 28 },
  { meal: 'Breakfast', title: 'Fruit Smoothie', image: require('../../assets/images/diet-3.png'), calories: 200, days: 28 },
  { meal: 'Breakfast', title: 'Yogurt Parfait', image: require('../../assets/images/diet-4.png'), calories: 220, days: 28 },
  { meal: 'Lunch', title: 'Grilled Chicken Salad', image: require('../../assets/images/diet-3.png'), calories: 400, days: 28 },
  { meal: 'Lunch', title: 'Quinoa Bowl', image: require('../../assets/images/diet-4.png'), calories: 350, days: 28 },
  { meal: 'Snacks', title: 'Apple & Peanut Butter', image: require('../../assets/images/diet-1.png'), calories: 150, days: 28 },
  { meal: 'Snacks', title: 'Greek Yogurt', image: require('../../assets/images/diet-2.png'), calories: 100, days: 28 },
  { meal: 'Dinner', title: 'Salmon with Asparagus', image: require('../../assets/images/diet-3.png'), calories: 500, days: 28 },
  { meal: 'Dinner', title: 'Vegetable Stir-fry', image: require('../../assets/images/diet-4.png'), calories: 300, days: 28 },
];

const styles = StyleSheet.create({
  viewPlanContainer: { flex: 1, backgroundColor: '#fff' },
  viewPlanHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10, backgroundColor: '#fff' },
  backButton: { padding: 5 },
  viewPlanHeaderTitle: { fontSize: 20,fontWeight:"600", marginLeft: 85 },
  mainImage: { width: '100%', height: 250 },
  planDetailsContainer: { padding: 20, backgroundColor: '#48d1cc', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginTop: -20 },
  planTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  planName: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  activatedButton: { borderColor: '#fff', borderWidth: 1, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 8 },
  activatedButtonText: { color: '#fff', fontWeight: 'bold' },
  planInfoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  planInfoText: { color: '#fff', marginLeft: 5 },
  yourDietPlanTitle: { fontSize: 20, fontWeight: 'bold', padding: 20 },
  daysScroll: { paddingLeft: 20 },
  dayTab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#f0f4f8', marginRight: 10 },
  activeDayTab: { backgroundColor: '#48d1cc' },
  dayText: { color: '#888' },
  activeDayText: { color: '#fff' },
  mealTabsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  mealTab: { paddingBottom: 10, alignItems: 'center' },
  mealTabText: { fontSize: 16, color: '#aaa' },
  activeMealTabText: { color: '#48d1cc', fontWeight: 'bold' },
  activeMealUnderline: { height: 2, backgroundColor: '#48d1cc', width: '100%', marginTop: 8 },
  scheduleList: { padding: 20 },
  container: { flex: 1, backgroundColor: '#f0f4f8', paddingTop: 50, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  description: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20, paddingHorizontal: 20 },
  listContainer: { paddingBottom: 90 },
});

const ActivePlanScreen = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [activeDay, setActiveDay] = useState('Day 1');
  const [activeMeal, setActiveMeal] = useState('Breakfast');

  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
  const mealTabs = ['Breakfast', 'Lunch', 'Snacks', 'Dinner'];

  if (selectedPlan) {
    const filteredSchedule = schedule.filter(item => item.meal === activeMeal);

    return (
      <View style={styles.viewPlanContainer}>
        <View style={styles.viewPlanHeader}>
          <TouchableOpacity onPress={() => setSelectedPlan(null)} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.viewPlanHeaderTitle}>View Plan</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={selectedPlan.image} style={styles.mainImage} />
          <View style={styles.planDetailsContainer}>
            <View style={styles.planTitleRow}>
              <Text style={styles.planName}>{selectedPlan.name}</Text>
              <TouchableOpacity style={styles.activatedButton}>
                <Text style={styles.activatedButtonText}>Activated</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.planInfoRow}>
              <Feather name="zap" size={16} color="white" />
              <Text style={styles.planInfoText}>{selectedPlan.calories} Cal</Text>
              <Feather name="calendar" size={16} color="white" style={{ marginLeft: 20 }} />
              <Text style={styles.planInfoText}>{selectedPlan.days} days</Text>
            </View>
          </View>
          <Text style={styles.yourDietPlanTitle}>Your Diet Plan</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScroll}>
            {days.map(day => (
              <TouchableOpacity
                key={day}
                style={[styles.dayTab, activeDay === day && styles.activeDayTab]}
                onPress={() => setActiveDay(day)}
              >
                <Text style={[styles.dayText, activeDay === day && styles.activeDayText]}>{day}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.mealTabsContainer}>
            {mealTabs.map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveMeal(tab)} style={styles.mealTab}>
                <Text style={[styles.mealTabText, activeMeal === tab && styles.activeMealTabText]}>{tab}</Text>
                {activeMeal === tab && <View style={styles.activeMealUnderline} />}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.scheduleList}>
            {filteredSchedule.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => router.push('/(main)/MealIntake')}>
                <DietScheduleCard key={index} {...item} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Active Plan</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.description}>
        Select a diet plan to view details and track your progress.
      </Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {dietPlans.map((plan, index) => (
          <TouchableOpacity key={index} onPress={() => setSelectedPlan(plan)}>
            <DietPlan {...plan} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ActivePlanScreen;
