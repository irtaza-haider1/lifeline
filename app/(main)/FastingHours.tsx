import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const fastingSchedules = [
  { id: '12-12', fasting: 12, eating: 12 },
  { id: '14-10', fasting: 14, eating: 10 },
  { id: '16-8', fasting: 16, eating: 8 },
  { id: '18-6', fasting: 18, eating: 6 },
  { id: '20-4', fasting: 20, eating: 4 },
];

const FastingHoursScreen = () => {
  const router = useRouter();
  const [selectedSchedule, setSelectedSchedule] = useState('16-8');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fasting schedules</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {fastingSchedules.map((schedule) => (
          <TouchableOpacity
            key={schedule.id}
            style={[styles.scheduleItem, selectedSchedule === schedule.id && styles.selectedScheduleItem]}
            onPress={() => setSelectedSchedule(schedule.id)}
          >
            <Text style={styles.scheduleRatio}>{schedule.id}</Text>
            <View style={styles.scheduleDetails}>
              <Text style={styles.scheduleText}>• {schedule.fasting} hours fasting</Text>
              <Text style={styles.scheduleText}>• {schedule.eating} hours eating period</Text>
            </View>
            <View style={[styles.checkbox, selectedSchedule === schedule.id && styles.selectedCheckbox]}>
              {selectedSchedule === schedule.id && <Feather name="check" size={18} color="#FFF" />}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.customSchedule}>
          <Ionicons name="filter-outline" size={24} color="#3EC6C9" />
          <Text style={styles.customScheduleText}>Custom Fasting Schedule</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.setButton} onPress={() => router.push('/(main)/EndFasting')}>
          <Text style={styles.setButtonText}>Set</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    backgroundColor: '#F0F8F8',
    borderRadius: 20,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F8',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedScheduleItem: {
    borderColor: '#3EC6C9',
    backgroundColor: '#F0F8F8',
  },
  scheduleRatio: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 20,
    borderRightWidth: 1,
    borderStyle: 'dashed',
    borderRightColor: '#E0E0E0',
    paddingRight: 20,
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  selectedCheckbox: {
    backgroundColor: '#3EC6C9',
    borderColor: '#3EC6C9',
  },
  customSchedule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  customScheduleText: {
    color: '#3EC6C9',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  setButton: {
    backgroundColor: '#3EC6C9',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  setButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FastingHoursScreen;
