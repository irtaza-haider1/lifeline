import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TimePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onDone: (time: string) => void;
}

const TimePickerModal: React.FC<TimePickerModalProps> = ({ isVisible, onClose, onDone }) => {
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState('AM');

  const handleDone = () => {
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    onDone(`${formattedHour}:${formattedMinute} ${period}`);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.digitalClockContainer}>
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>{hour.toString().padStart(2, '0')}</Text>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeBox}>
              <Text style={styles.timeText}>{minute.toString().padStart(2, '0')}</Text>
            </View>
            <View style={styles.periodContainer}>
              <TouchableOpacity
                style={[styles.periodBox, period === 'AM' && styles.activePeriod]}
                onPress={() => setPeriod('AM')}
              >
                <Text style={[styles.periodText, period === 'AM' && styles.activePeriodText]}>AM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.periodBox, period === 'PM' && styles.activePeriod]}
                onPress={() => setPeriod('PM')}
              >
                <Text style={[styles.periodText, period === 'PM' && styles.activePeriodText]}>PM</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.analogClockContainer}>
            <View style={styles.clockFace}>
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i + 1) * 30;
                const radius = 85;
                const x = radius * Math.sin((angle * Math.PI) / 180);
                const y = -radius * Math.cos((angle * Math.PI) / 180);
                const isSelected = (i + 1) === hour || (hour === 0 && i + 1 === 12) || (hour > 12 && (hour % 12) === (i + 1));

                return (
                  <View
                    key={i}
                    style={[
                      styles.numberContainer,
                      { transform: [{ translateX: x }, { translateY: y }] },
                      isSelected && styles.selectedNumberContainer,
                    ]}
                  >
                    <Text style={[styles.numberText, isSelected && styles.selectedNumberText]}>
                      {i + 1}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={[styles.hand, { transform: [{ rotate: `${(hour % 12) * 30 + minute * 0.5}deg` }] }]} />
            <View style={[styles.hand, styles.minuteHand, { transform: [{ rotate: `${minute * 6}deg` }] }]} />
            <View style={styles.clockCenter} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.doneButton]} onPress={handleDone}>
              <Text style={[styles.buttonText, styles.doneButtonText]}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  digitalClockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  timeBox: {
    backgroundColor: '#E0F5F5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#42C8C1',
  },
  timeSeparator: {
    fontSize: 40,
    marginHorizontal: 5,
  },
  periodContainer: {
    marginLeft: 15,
  },
  periodBox: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 5,
  },
  activePeriod: {
    backgroundColor: '#42C8C1',
    borderColor: '#42C8C1',
  },
  periodText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  activePeriodText: {
    color: 'white',
  },
  analogClockContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  clockFace: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hand: {
    position: 'absolute',
    width: 2,
    height: '35%',
    backgroundColor: 'black',
    top: '15%',
    left: '50%',
    marginLeft: -1,
    transformOrigin: 'bottom center',
  },
  minuteHand: {
    height: '45%',
    top: '5%',
  },
  clockCenter: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#42C8C1',
  },
  numberContainer: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedNumberContainer: {
    backgroundColor: '#42C8C1',
  },
  numberText: {
    fontSize: 16,
    color: 'black',
  },
  selectedNumberText: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  doneButton: {
    backgroundColor: '#42C8C1',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A0A0A0',
  },
  doneButtonText: {
    color: 'white',
  },
});

export default TimePickerModal;
