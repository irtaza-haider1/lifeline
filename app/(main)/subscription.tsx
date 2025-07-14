import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SubscriptionScreen = () => {
  const plans = [
    {
      type: 'BASIC',
      oldPrice: '$9.99',
      price: '$60',
      period: '/ Yearly',
      description: 'Enjoy limitless use with interactive export options',
      features: [
        'Personalized Plans for Your Goals',
        'Custom emoji anywhere',
        'HD video streaming',
      ],
    },
    {
      type: 'PREMIUM',
      oldPrice: '$19.99',
      price: '$120',
      period: '/ Yearly',
      description: 'Unlock all features and get exclusive content',
      features: [
        'Everything in BASIC',
        'Advanced analytics',
        'Priority support',
        'Export in 4K',
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Plan</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Subscription Plan</Text>
          <Text style={styles.subtitle}>
            Start running, keep going, and conquer your goals with every stride!
          </Text>
          <Text style={styles.description}>
            Unlock our library of meditations, sleep sounds, and more. We’ll send you a reminder that your trial is ending soon. You’ll be charged on March 28, cancel anytime before.
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plansContainer}>
          {plans.map((plan, index) => (
            <View key={index} style={styles.planCard}>
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.oldPrice}>{plan.oldPrice}</Text>
                  <Text style={styles.price}>{plan.price}<Text style={styles.period}>{plan.period}</Text></Text>
                </View>
                <View style={styles.planTypeContainer}>
                  <Text style={styles.planType}>{plan.type}</Text>
                </View>
              </View>
              <Text style={styles.planDescription}>{plan.description}</Text>
              <View style={styles.features}>
                {plan.features.map((feature, i) => (
                  <View key={i} style={styles.featureItem}>
                    <Ionicons name="checkmark-circle" size={20} color="#fff" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.selectButton} onPress={() => router.push('/(main)/subscriptionConfirmation')}>
                <Text style={styles.selectButtonText}>Select</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    transform: [{ translateX: -24 }],
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3EC6C9',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
    lineHeight: 20,
    marginBottom: 30,
  },
  plansContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  planCard: {
    backgroundColor: '#3EC6C9',
    borderRadius: 20,
    padding: 25,
    width: 300,
    marginRight: 15,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  oldPrice: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  period: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  planTypeContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  planType: {
    color: '#3EC6C9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  planDescription: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 25,
  },
  features: {
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  selectButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#3EC6C9',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
