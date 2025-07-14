import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const paymentMethods = [
  {
    name: 'Stripe',
    description: 'Proceed your payments with Stripe',
    logo: <FontAwesome name="cc-visa" size={24} color="#1a1f71" />,
  },
  {
    name: 'Google Pay',
    description: 'Proceed your payments with GooglePay',
    logo: <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png' }} style={{width: 48, height: 20}} resizeMode="contain" />,
  },
  {
    name: 'Apple Pay',
    description: 'Proceed your payments with Applepay',
    logo: <FontAwesome name="apple" size={24} color="#000" />,
  },
];

const SelectSubscriptionPaymentMethodScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('Stripe');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Payment Method</Text>
      </View>
      <View style={styles.container}>
        {paymentMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paymentMethod,
              selectedMethod === method.name && styles.selectedPaymentMethod,
            ]}
            onPress={() => setSelectedMethod(method.name)}
          >
            <View style={styles.logoContainer}>{method.logo}</View>
            <View style={styles.textContainer}>
              <Text style={styles.methodName}>{method.name}</Text>
              <Text style={styles.methodDescription}>{method.description}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    backgroundColor: '#e8e8e8',
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#eee',
  },
  selectedPaymentMethod: {
    borderColor: '#3EC6C9',
    backgroundColor: '#e6f8f8',
  },
  logoContainer: {
    width: 60,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15,
  },
  methodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  methodDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  confirmButton: {
    backgroundColor: '#3EC6C9',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectSubscriptionPaymentMethodScreen;
