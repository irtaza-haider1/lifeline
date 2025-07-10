import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const BarManuallyScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Manually</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../../assets/images/margarita.png')} style={styles.foodImage} />
        
        <View style={styles.form}>
          <Text style={styles.label}>Food Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your food name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Meal type:</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Breakfast</Text>
            <Feather name="chevron-down" size={20} color="#3EC6C9" />
          </TouchableOpacity>

          <Text style={styles.label}>Meal portion:</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Single serving</Text>
            <Feather name="chevron-down" size={20} color="#3EC6C9" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    backgroundColor: '#E8F8F8',
    borderRadius: 20,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  foodImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    marginTop: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#3EC6C9',
    paddingBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3EC6C9',
    paddingBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    backgroundColor: '#F7F8F8',
  },
  saveButton: {
    backgroundColor: '#3EC6C9',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BarManuallyScreen;
