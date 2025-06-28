import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

const PaymentDoneScreen = () => {
  const router = useRouter();
  const { login } = useAuth();

  React.useEffect(() => {
    login(); // Set isAuthenticated to true
    const timer = setTimeout(() => {
      router.replace('/(tabs)'); // Navigate to home after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, login]);

  return (
    <LinearGradient
      colors={['#2E4E52', '#43A09A']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.successText}>Payment Successful!</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PaymentDoneScreen;
