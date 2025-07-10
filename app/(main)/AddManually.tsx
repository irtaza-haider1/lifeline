import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddManuallyScreen = () => {
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
        <TouchableOpacity style={styles.uploadContainer}>
          <Feather name="upload" size={24} color="#999" />
          <Text style={styles.uploadText}>Upload Image</Text>
          <Text style={styles.uploadSubtext}>(You can upload only 1 image)</Text>
        </TouchableOpacity>

        <View style={styles.form}>
          <Text style={styles.label}>Recipe name</Text>
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
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push({ pathname: '/(main)/MealIntake', params: { from: 'addManually' } })}
        >
          <Text style={styles.addButtonText}>Add</Text>
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
    padding: 20,
    flexGrow: 1,
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: '#3EC6C9',
    borderStyle: 'dashed',
    borderRadius: 15,
    padding: 30,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  uploadText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
  uploadSubtext: {
    color: '#AAA',
    fontSize: 12,
    marginTop: 5,
  },
  form: {
    // No styles needed here anymore
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#3EC6C9',
    paddingBottom: 10,
    marginBottom: 25,
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
    marginBottom: 25,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
  },
  addButton: {
    backgroundColor: '#3EC6C9',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddManuallyScreen;
