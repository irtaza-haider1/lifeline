import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SubscriptionConfirmationScreen = () => {
  // Hardcoded plan details to match the screenshot
  const plan = {
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.planCard}>
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
        </View>

        <Text style={styles.confirmationText}>
          Your <Text style={styles.highlight}>7-day</Text> free trial for the <Text style={styles.highlight}>Exercise</Text> is now active! After the trial, it will auto-renew at (<Text style={styles.highlight}>$39.99/month</Text>).
        </Text>

        <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/(main)/selectSubscriptionPaymentMethod')}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
  planCard: {
    backgroundColor: '#3EC6C9',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
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
    borderRadius: 15,
    paddingVertical: 12,
    left:40,
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
    marginBottom: 10, // Reduced margin to fit content
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
  confirmationText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  highlight: {
    color: '#3EC6C9',
  },
  confirmButton: {
    backgroundColor: '#3EC6C9',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    width: '100%',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubscriptionConfirmationScreen;
