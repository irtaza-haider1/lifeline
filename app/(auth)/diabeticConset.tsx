import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DiabeticConsentScreen() {
  const params = useLocalSearchParams();
  const gender = params.gender;
  const handleBack = () => {
    router.back();
  };

  const handleAgree = () => {
    // Navigate to the Exclusion screen after consent
    router.push({ pathname: '/(auth)/Exclusion', params: { gender } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#00B3B3" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diabetes</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ameit industry's standard <Text style={styles.highlightedText}>dummy text ever since the 1500s,</Text> when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and nulet typesetting industry. Lorem Ipsum has been the our industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy <Text style={styles.highlightedText}>text ever since the 1500s,</Text> typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and nulet typesetting industry. Lorem Ipsum has been the ameit industry's standard dummy text ever since the 1500s.
        </Text>
        
        <Text style={styles.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the our industry's standard dummy text ever since the 1500s, <Text style={styles.highlightedText}>when an unknown printer took a galley of type and scrambled it</Text> to make a type specimen book.Lorem is Ipsum is simply dummy text of the printing and nulet typesetting industry. Lorem Ipsum has been the ameit industry's standard dummy text ever since the 1500s.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
        <Text style={styles.agreeButtonText}>Agree</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  highlightedText: {
    color: '#00B3B3',
    textDecorationLine: 'underline',
  },
  agreeButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 50,
    padding: 16,
    margin: 20,
    alignItems: 'center',
  },
  agreeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 