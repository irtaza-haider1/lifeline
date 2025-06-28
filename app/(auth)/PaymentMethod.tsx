import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const paymentOptions = [
  { id: 0, title: 'Stripe', description: 'Proceed your payments with Stripe', logo: require('../../assets/images/visa-logo.png') },
  { id: 1, title: 'Google Pay', description: 'Proceed your payments with GooglePay', logo: require('../../assets/images/GooglePay.png') },
  { id: 2, title: 'Apple Pay', description: 'Proceed your payments with Applepay', logo: require('../../assets/images/apple.png') },
];

const PaymentMethodScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showCardForm, setShowCardForm] = useState(false);

  const handleConfirmSelection = () => {
    if (selectedOption === 0) { // Only show form for Stripe
      setShowCardForm(true);
    } else if (selectedOption !== null) {
      alert('This payment method is not yet implemented.');
    } else {
      alert('Please select a payment method.');
    }
  };

  if (showCardForm) {
    return (
      <LinearGradient colors={['#2E4E52', '#43A09A']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setShowCardForm(false)} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Select Payment Method</Text>
            <View style={{ width: 34 }} />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Name on Card</Text>
            <TextInput
              style={styles.input}
              placeholder="youremail@gmail.com"
              placeholderTextColor="rgba(255,255,255,0.7)"
            />
            
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="000 000000 000 0"
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="****"
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="numeric"
              secureTextEntry
            />

            <Text style={styles.inputLabel}>Card Expiry</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="02/8/2025"
                placeholderTextColor="rgba(255,255,255,0.7)"
              />
              <Ionicons name="calendar-outline" size={24} color="white" />
            </View>
          </View>
        </ScrollView>
        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/(auth)/PaymentDone')}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

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
          <Text style={styles.headerTitle}>Select Payment Method</Text>
          <View style={{ width: 34 }} />
        </View>

        <View style={styles.optionsContainer}>
          {paymentOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.option, isSelected && styles.selectedOption]}
                onPress={() => setSelectedOption(option.id)}
              >
                <Image source={option.logo} style={styles.logo} />
                <View>
                  <Text style={[styles.optionTitle, isSelected && styles.selectedText]}>{option.title}</Text>
                  <Text style={[styles.optionDescription, isSelected && styles.selectedText]}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSelection}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingTop: 50,
    paddingBottom: 100,
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
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: 'white',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 20,
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
  },
  selectedText: {
    color: 'white',
  },
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 0,
    padding: 20,
    width: '80%',
    backgroundColor: 'transparent',
  },
  confirmButton: {
    backgroundColor: 'white',
    borderRadius: 10.28,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#3EC6C9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    color: 'white',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 10,
    marginBottom: 25,
  },

  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    paddingBottom: 10,
    marginBottom: 25,
  },
  dateInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
});

export default PaymentMethodScreen;
