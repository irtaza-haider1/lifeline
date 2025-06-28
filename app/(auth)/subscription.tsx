import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const subscriptionOptions = [
  { id: 0, title: '1 MONTH', description: 'Lorem ipsum is a dummy data nuiet ameti ipsum' },
  { id: 1, title: '1 MONTH', description: 'Lorem ipsum is a dummy data nuiet ameti ipsum' },
  { id: 2, title: '1 MONTH', description: 'Lorem ipsum is a dummy data nuiet ameti ipsum' },
];

const SubscriptionScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <LinearGradient
      colors={['#2E4E52', '#43A09A']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Upgrade to VIP</Text>
          <View style={{ width: 34 }} />
        </View>

        <View style={styles.optionsContainer}>
          {subscriptionOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => router.push('/(auth)/PaymentMethod')}
              >
                <View>
                  <Text style={[styles.optionTitle, isSelected && styles.selectedText]}>{option.title}</Text>
                  <Text style={[styles.optionDescription, isSelected && styles.selectedText]}>{option.description}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={[styles.price, isSelected ? { color: '#3EC6C9' } : {color: 'white'}, styles.strikethroughPrice]}>$9.99</Text>
                  <Text style={[styles.priceInterval, isSelected && { color: '#3EC6C9' }]}>Monthly</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>VIP Specific Features</Text>
          <View style={styles.featureItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.featureText}>Steps Counter is our main feature to track by band.</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.featureText}>Heart Rate Monitor by our premium fitness band.</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.featureText}>Calorie Counter on daily basis.</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.featureText}>Progress Tracking weekly and monthly as well.</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.featureText}>Water Intake by your every intake.</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 40,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  selectedOption: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  optionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionDescription: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginTop: 5,
    width: 180,
  },
  selectedText: {
    color: '#2d6a6e',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  strikethroughPrice: {
    textDecorationLine: 'line-through',
  },
  priceInterval: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  featuresContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
    paddingBottom: 40,
  },
  featuresTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    lineHeight: 22,
  },
  featureText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
});

export default SubscriptionScreen;
