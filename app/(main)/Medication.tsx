import { Ionicons } from '@expo/vector-icons'; // Assuming you use expo-icons
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const MedicationScreen = () => {
  const [pillsName, setPillsName] = useState('Probiotic');
  const [amount, setAmount] = useState('2 pills');
  const [dose, setDose] = useState('250 mg');
  const [frequency, setFrequency] = useState('Everyday');
  const [reminder, setReminder] = useState('11:00 AM');
  const [selectedAppearance, setSelectedAppearance] = useState(0);

  const router = useRouter();

  const appearanceOptions = [
    { id: 0, image: require('../../assets/images/pill.png') },
    { id: 1, image: require('../../assets/images/icon.png') },
    { id: 2, image: require('../../assets/images/jar.png') },
    { id: 3, image: require('../../assets/images/injection.png') },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Medicine</Text>
      </View>

      <View style={styles.uploadContainer}>
        <TouchableOpacity style={styles.uploadBox}>
          <Ionicons name="cloud-upload-outline" size={40} color="#A0A0A0" />
          <Text style={styles.uploadText}>Upload Image</Text>
          <Text style={styles.uploadSubText}>(You can upload only 1 image)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Pills Name</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/pill-1.png')} style={styles.inputIconImage} />
          <TextInput
            style={styles.input}
            value={pillsName}
            onChangeText={setPillsName}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.inputContainer}>
              <Image source={require('../../assets/images/pill-2.png')} style={styles.inputIconImage} />
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
              />
              <Ionicons name="chevron-down-outline" size={20} color="#A0A0A0" />
            </View>
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Dose</Text>
            <View style={styles.inputContainer}>
              <Image source={require('../../assets/images/pill-1.png')} style={styles.inputIconImage} />
              <TextInput
                style={styles.input}
                value={dose}
                onChangeText={setDose}
              />
              <Ionicons name="chevron-down-outline" size={20} color="#A0A0A0" />
            </View>
          </View>
        </View>

        <Text style={styles.label}>Frequency</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/calendar.png')} style={styles.inputIconImage} />
          <TextInput
            style={styles.input}
            value={frequency}
            onChangeText={setFrequency}
          />
          <Ionicons name="chevron-down-outline" size={20} color="#A0A0A0" />
        </View>

        <Text style={styles.label}>Reminder</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/images/alarm.png')} style={styles.inputIconImage} />
          <TextInput
            style={styles.input}
            value={reminder}
            onChangeText={setReminder}
          />
          <Ionicons name="chevron-down-outline" size={20} color="#A0A0A0" />
        </View>

        <Text style={styles.label}>Appearance</Text>
        <View style={styles.appearanceContainer}>
          {appearanceOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.appearanceOption,
                selectedAppearance === index ? styles.selectedAppearance : styles.unselectedAppearance,
              ]}
              onPress={() => setSelectedAppearance(index)}
            >
              <View><Image source={option.image} style={styles.appearanceIcon} /></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(main)/AddMedicine' as any)}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
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
    marginRight: 'auto',
  },
  uploadContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  uploadBox: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: '#42C8C1',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  uploadText: {
    marginTop: 10,
    color: '#A0A0A0',
    fontSize: 16,
  },
  uploadSubText: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#42C8C1',
    paddingBottom: 8,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputIconImage: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#3EC6C9',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
  },
  appearanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  appearanceOption: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  appearanceIcon: {
    width: 32,
    height: 32,
  },
  selectedAppearance: {
    backgroundColor: '#42C8C1',
    borderColor: '#42C8C1',
  },
  unselectedAppearance: {
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#42C8C1',
    padding: 15,
    width: '90%',
    left: 20,
    borderRadius: 10.28,
    alignItems: 'center',
    marginVertical: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MedicationScreen;
