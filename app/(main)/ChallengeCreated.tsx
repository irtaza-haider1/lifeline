import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ChallengeCreatedModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPayNow: () => void;
}

const ChallengeCreatedModal: React.FC<ChallengeCreatedModalProps> = ({ isVisible, onClose, onPayNow }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../../assets/images/completedChallenge.gif')}
            style={styles.gif}
          />
          <Text style={styles.title}>Challenge Created</Text>
          <Text style={styles.description}>
            We're pleased to see you doing progress, your challenge is created start it now and keep rushing!
          </Text>
          <TouchableOpacity style={styles.payButton} onPress={onPayNow}>
            <Text style={styles.payButtonText}>Pay Now 1.00$/day</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  gif: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  payButton: {
    backgroundColor: '#48D1CC',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChallengeCreatedModal;
