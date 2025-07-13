import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { GestureHandlerRootView, ScrollView, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import TimePickerModal from './TimePickerModal';

const days = [
  { date: 17, day: 'Mon' },
  { date: 18, day: 'Tue', status: 'checked' },
  { date: 19, day: 'Wed', status: 'missed' },
  { date: 20, day: 'Thu', status: 'checked', active: true },
  { date: 21, day: 'Fri' },
  { date: 22, day: 'Sat' },
  { date: 23, day: 'Sun' },
  { date: 24, day: 'Mon' },
];

const medications = [
  {
    name: 'Oxycodene',
    dosage: '1 Capsule',
    time1: '10:00 AM',
    time2: '10:00 AM',
    frequency: 'Everday',
    icon: require('../../assets/images/Capsule.png'),
  },
  {
    name: 'Oxycodene',
    dosage: '1 Capsule',
    time1: '10:00 AM',
    time2: '10:00 AM',
    frequency: 'Everday',
    icon: require('../../assets/images/Capsule.png'),
  },
  {
    name: 'Oxycodene',
    dosage: '1 Capsule',
    time1: '10:00 AM',
    time2: '10:00 AM',
    frequency: 'Everday',
    icon: require('../../assets/images/Capsule.png'),
  },
];

const AddMedicineScreen = () => {
  const router = useRouter();
  const [meds, setMeds] = useState(medications);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedMedIndex, setSelectedMedIndex] = useState<number | null>(null);

  const handleEditTime = (index: number) => {
    setSelectedMedIndex(index);
    setTimePickerVisible(true);
  };

  const handleTimeChange = (newTime: string) => {
    if (selectedMedIndex === null) return;

    const updatedMeds = [...meds];
    updatedMeds[selectedMedIndex].time1 = newTime;
    setMeds(updatedMeds);
    setTimePickerVisible(false);
    setSelectedMedIndex(null);
  };

  const renderLeftActions = (index: number) => (
    <TouchableOpacity style={styles.editButton} onPress={() => handleEditTime(index)}>
      <Ionicons name="create-outline" size={30} color="white" />
    </TouchableOpacity>
  );

  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton}>
      <Ionicons name="trash-outline" size={30} color="white" />
    </TouchableOpacity>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medications</Text>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarContainer}>
          {days.map((day, index) => (
            <View key={index} style={[styles.dayContainer, day.active && styles.activeDay]}>
              <Text style={[styles.dayDate, day.active && styles.activeText]}>{day.date}</Text>
              <Text style={[styles.dayName, day.active && styles.activeText]}>{day.day}</Text>
              {day.status === 'checked' && <Ionicons name="checkmark-circle" size={16} color={day.active ? "white" : "#42C8C1"} style={styles.statusIcon} />}
              {day.status === 'missed' && <Ionicons name="close-circle" size={16} color="#FF8A8A" style={styles.statusIcon} />}
            </View>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.medicationList}>
        {meds.map((med, index) => (
          <Swipeable
            key={index}
            renderLeftActions={() => renderLeftActions(index)}
            renderRightActions={renderRightActions}
          >
            <View style={styles.medicationItem}>
              <View style={styles.medIconContainer}>
                <Image source={med.icon} style={styles.medIcon} />
              </View>
              <View style={styles.medDetails}>
                <Text style={styles.medName}>{med.name} <Text style={styles.medDosage}>({med.dosage})</Text></Text>
                <Text style={styles.medTime}>{med.time1}  {med.time2}</Text>
                <Text style={styles.medFrequency}>{med.frequency}</Text>
              </View>
            </View>
          </Swipeable>
        ))}
      </ScrollView>

      <TimePickerModal
        isVisible={isTimePickerVisible}
        onClose={() => setTimePickerVisible(false)}
        onDone={handleTimeChange}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(main)/Medication' as any)}>
        <Ionicons name="add" size={32} color="white" />
        <Text style={styles.addButtonText}>Add Medicine</Text>
      </TouchableOpacity>
    </SafeAreaView>
  </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    backgroundColor: '#E0F5F5',
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: '25%',
  },
  calendarContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  activeDay: {
    backgroundColor: '#42C8C1',
  },
  dayDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayName: {
    fontSize: 14,
    color: '#888',
  },
  activeText: {
    color: '#fff',
  },
  statusIcon: {
    marginTop: 5,
  },
  medicationList: {
    marginTop: 20,
  },
  medicationItem: {
    flexDirection: 'row',
    backgroundColor: '#E0F5F5',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#42C8C1',
    borderWidth: 1,
  },
  medIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  medIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  medDetails: {
    flex: 1,
  },
  medName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medDosage: {
    fontWeight: 'normal',
    color: '#555',
  },
  medTime: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  medFrequency: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    marginLeft: -85,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#42C8C1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#34D399',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%',
    borderRadius: 10,
    marginLeft: 20,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%',
    borderRadius: 10,
    marginRight: 20,
  },
});

export default AddMedicineScreen;
