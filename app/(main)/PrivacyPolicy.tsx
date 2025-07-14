import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Do You Agree With Our Policies?</Text>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.policyText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.policyText}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.policyText}>
            when an unknown printer took a <Text style={styles.highlight}>galley of type and scrambled</Text> it to make a type specimen book.
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.policyText}>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.policyText}>
            It was popularised in the 1960s with the release of Letraset <Text style={styles.highlight}>sheets containing Lorem</Text> Ipsum passages,
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.policyText}>and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
        </View>

        <Text style={styles.sectionTitle}>Do You Agree With Us?</Text>
        <Text style={styles.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer standard dummy text ever since the 1500s, when an unknown
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    transform: [{ translateX: -12 }], // Adjust for back button width
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    marginRight: 10,
    color: '#3EC6C9',
    lineHeight: 24,
  },
  policyText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    lineHeight: 24,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  highlight: {
    color: '#3EC6C9',
  },
});

export default PrivacyPolicyScreen;
