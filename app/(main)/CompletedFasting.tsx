import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dates = [
  { day: 'Mon', date: 17, checked: false, crossed: false },
  { day: 'Tue', date: 18, checked: true, crossed: false },
  { day: 'Wed', date: 19, checked: false, crossed: true },
  { day: 'Thu', date: 20, checked: true, crossed: false, active: true },
  { day: 'Fri', date: 21, checked: false, crossed: false },
  { day: 'Sat', date: 22, checked: false, crossed: false },
  { day: 'Sun', date: 23, checked: false, crossed: false },
  { day: 'Mon', date: 24, checked: false, crossed: false },
];

const CompletedFastingScreen = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(20);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Intermittent Fasting</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dateSelectorContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateSelector}>
            {dates.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.dateItem, item.active && styles.activeDateItem]} onPress={() => setSelectedDate(item.date)}>
                <Text style={[styles.dateText, item.active && styles.activeDateText]}>{item.date}</Text>
                <Text style={[styles.dayText, item.active && styles.activeDateText]}>{item.day}</Text>
                {item.checked && <Feather name="check-circle" size={16} color={item.active ? '#FFF' : '#3EC6C9'} style={styles.checkIcon} />}
                {item.crossed && <Feather name="x-circle" size={16} color="#FF8A8A" style={styles.checkIcon} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={20} color="#666" />
          <Text style={styles.infoText}>Fasting helps you take control of your hunger and build healthier habits.</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Keep Fasting</Text>
          <Ionicons name="filter-outline" size={24} color="#3EC6C9" />
        </View>

        <View style={styles.timerContainer}>
          {/* This container creates the outer border and holds all circle elements */}
          <View style={styles.circleOuter}>
            {/* This view creates the inset shadow effect */}
            <View style={styles.circleInnerShadow}>
              {/* This is the main teal fill */}
              <View style={styles.circleFill}>
                {/* This is the content inside the circle */}
                <View style={styles.timerCenterContent}>
                  <Text style={styles.timerLabel}>Elapsed Time (69%)</Text>
                  <Text style={styles.timerText}>16:00:00</Text>
                  <Text style={styles.remainingLabel}>Completed</Text>
                  <Text style={styles.remainingTime}>00:00:00</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Flame Icon */}
          <View style={styles.flameIconContainer}>
            <Text style={styles.flameIcon}>🔥</Text>
          </View>

          {/* Completed Checkmark on border */}
          <View style={styles.completedCheckContainer}>
            <Feather name="check-circle" size={32} color="#3EC6C9" />
          </View>
        </View>

        <TouchableOpacity style={styles.endButton}>
          <Text style={styles.endButtonText}>End Fasting</Text>
        </TouchableOpacity>

        <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>FASTING STARTED</Text>
                <Text style={styles.summaryTime}>Today, 4:00 PM</Text>
            </View>
            <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>FASTING COMPLETED</Text>
                <Text style={styles.summaryTime}>Today, 4:00 PM</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  backButton: { backgroundColor: '#F0F8F8', borderRadius: 20, padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  dateSelectorContainer: { paddingVertical: 10 },
  dateSelector: { paddingHorizontal: 20 },
  dateItem: { alignItems: 'center', marginHorizontal: 10, padding: 10, borderRadius: 10, minWidth: 50 },
  activeDateItem: { backgroundColor: '#3EC6C9' },
  dateText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  dayText: { fontSize: 14, color: '#999', marginTop: 4 },
  activeDateText: { color: '#FFF' },
  checkIcon: { marginTop: 5 },
  infoContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F8F8', padding: 15, borderRadius: 10, marginHorizontal: 20, marginTop: 10 },
  infoText: { marginLeft: 10, color: '#666', flex: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 10 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold' },
  timerContainer: { alignItems: 'center', justifyContent: 'center', marginVertical: 20, position: 'relative' },
  circleOuter: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#E0F7F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInnerShadow: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  circleFill: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#3EC6C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerCenterContent: { alignItems: 'center', justifyContent: 'center' },
  flameIconContainer: { position: 'absolute', top: -15, backgroundColor: '#FFF', borderRadius: 20, padding: 5, elevation: 10 },
  flameIcon: { fontSize: 24 },
  completedCheckContainer: { position: 'absolute', bottom: -15, backgroundColor: 'white', borderRadius: 20, padding: 2, elevation: 10 },
  timerLabel: { color: '#FFF', fontSize: 14, opacity: 0.8 },
  timerText: { color: '#FFF', fontSize: 40, fontWeight: 'bold', marginVertical: 5 },
  remainingLabel: { color: '#FFF', fontSize: 14, opacity: 0.8 },
  remainingTime: { color: '#FFF', fontSize: 16, fontWeight: '500', opacity: 0.8 },
  endButton: { backgroundColor: '#3EC6C9', borderRadius: 15, paddingVertical: 18, alignItems: 'center', marginHorizontal: 20, marginTop: 20 },
  endButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  summaryContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingHorizontal: 20, paddingBottom: 20 },
  summaryCard: { backgroundColor: '#F7F8F8', borderRadius: 15, padding: 20, alignItems: 'center', width: '48%' },
  summaryTitle: { color: '#999', fontSize: 12, fontWeight: 'bold' },
  summaryTime: { color: '#3EC6C9', fontSize: 16, fontWeight: 'bold', marginTop: 5 },
});

export default CompletedFastingScreen;
