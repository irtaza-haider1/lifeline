import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, TextInput, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Slider from '@react-native-community/slider';

interface IntakeDataItem {
  type: string;
  percentage: number;
  color: string;
}

interface CircularProgressProps {
  percentage: number;
  data: IntakeDataItem[];
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, data }) => {
  const size = 250;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F0F0F0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Data Arcs */}
        {data.map((item, index) => {
          const strokeDashoffset = circumference - (circumference * item.percentage) / 100;
          const rotation = (accumulatedPercentage / 100) * 360;
          accumulatedPercentage += item.percentage;
          return (
            <Circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(${rotation - 90}, ${size / 2}, ${size / 2})`}
            />
          );
        })}
      </Svg>
      <View style={styles.progressContent}>
        <Text style={styles.progressPercentage}>{`${percentage}%`}</Text>
        <Text style={styles.progressComplete}>Complete</Text>
        <Image source={require('../assets/images/Water_drop.png')} style={styles.splashImage} />
      </View>
    </View>
  );
};

const WaterIntakeScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [addDrinkModalVisible, setAddDrinkModalVisible] = React.useState(false);
  const [selectedDrink, setSelectedDrink] = React.useState('Water');
  const [drinkAmount, setDrinkAmount] = React.useState(250);
  const [unit, setUnit] = React.useState('ml');
  const goal = 2000;
  const remaining = 500;
  const totalIntake = goal - remaining;
  const percentage = Math.round((totalIntake / goal) * 100);

  interface DateItem {
    day: string;
    date: string;
    checked?: boolean;
    crossed?: boolean;
    active?: boolean;
  }

  const dates: DateItem[] = [
    { day: 'Mon', date: '17' },
    { day: 'Tue', date: '18', checked: true },
    { day: 'Wed', date: '19', crossed: true },
    { day: 'Thu', date: '20', checked: true, active: true },
    { day: 'Fri', date: '21' },
    { day: 'Sat', date: '22' },
    { day: 'Sun', date: '23' },
    { day: 'Mon', date: '24' },
  ];

  const intakeData: IntakeDataItem[] = [
    { type: 'Water', percentage: 80, color: '#A7D7F4' },
    { type: 'Cold Drink', percentage: 5, color: '#FDB6B6' },
    { type: 'Caffeine', percentage: 5, color: '#DDB2EE' },
    { type: 'Juice', percentage: 10, color: '#FDD6A4' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Water Intake</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datePicker}>
        {dates.map((item, index) => (
          <View key={index} style={styles.dateItemContainer}>
            <View style={[styles.dateItem, item.active && styles.activeDateItem]}>
              <Text style={[styles.dateDay, item.active && styles.activeDateText]}>{item.day}</Text>
              <Text style={[styles.dateText, item.active && styles.activeDateText]}>{item.date}</Text>
            </View>
            {item.checked && <Ionicons name="checkmark-circle" size={18} color="#4DC3C3" style={styles.checkIcon} />}
            {item.crossed && <Ionicons name="close-circle" size={18} color="#E0E0E0" style={styles.checkIcon} />}
          </View>
        ))}
      </ScrollView>

      <View style={styles.fastingHelpContainer}>
        <MaterialCommunityIcons name="help-circle-outline" size={20} color="#AAA" />
        <Text style={styles.fastingHelpText}>Fasting helps you take control of your hunger and build healthier habits.</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{goal}ml <Ionicons name="pencil-outline" size={16} color="#AAA" /></Text>
          <Text style={styles.statLabel}>Goal</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{remaining}ml</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <CircularProgress percentage={percentage} data={intakeData} />
      </View>

      <View style={styles.legendContainer}>
        {intakeData.map(item => (
          <View style={styles.legendItem} key={item.type}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <View>
              <Text style={styles.legendItemType}>{item.type}</Text>
              <Text style={styles.legendItemPercentage}>{`${item.percentage}%`}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Water</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Daily Goal</Text>
            
            <View style={styles.unitSelector}>
              <Text style={styles.unitSelectorText}>Select Unit:</Text>
              <View style={styles.unitButtonsContainer}>
                <TouchableOpacity 
                  style={[styles.unitButton, unit === 'ml' && styles.unitButtonActive]} 
                  onPress={() => setUnit('ml')}>
                  <Text style={[styles.unitButtonText, unit === 'ml' && styles.unitButtonTextActive]}>ml</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.unitButton, unit === 'Lt' && styles.unitButtonActive]} 
                  onPress={() => setUnit('Lt')}>
                  <Text style={[styles.unitButtonText, unit === 'Lt' && styles.unitButtonTextActive]}>Lt</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                defaultValue="2000"
                keyboardType="numeric"
              />
              <Text style={styles.inputUnit}>{unit}</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setModalVisible(false); setAddDrinkModalVisible(true); }}>
                <Text style={[styles.modalButtonText, styles.modalButtonOk]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={addDrinkModalVisible}
        onRequestClose={() => setAddDrinkModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.addDrinkModalContainer}>
            <View style={styles.addDrinkModalHeader}>
              <Text style={styles.addDrinkModalTitle}>What did you drink?</Text>
              <TouchableOpacity onPress={() => setAddDrinkModalVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.drinkOptionsContainer}>
              {drinkOptions.map(drink => (
                <TouchableOpacity 
                  key={drink.name} 
                  style={[styles.drinkOption, selectedDrink === drink.name && styles.drinkOptionSelected]}
                  onPress={() => setSelectedDrink(drink.name)}>
                  <Image source={drink.icon} style={styles.drinkIcon} />
                  <Text style={styles.drinkName}>{drink.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.howMuchTitle}>How much did you drink?</Text>
            
            <View style={styles.drinkInputContainer}>
              <TextInput
                style={styles.drinkInput}
                value={String(drinkAmount)}
                onChangeText={text => setDrinkAmount(Number(text))}
                keyboardType="numeric"
              />
              <Text style={styles.drinkInputUnit}>ml</Text>
            </View>

            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1000}
              step={50}
              value={drinkAmount}
              onValueChange={setDrinkAmount}
              minimumTrackTintColor="#4DC3C3"
              maximumTrackTintColor="#E0E0E0"
              thumbImage={require('../assets/images/water-indicator.png')}
            />
            <View style={styles.sliderLabels}>
              <Text>0 ml</Text>
              <Text>1000 ml</Text>
            </View>

            <TouchableOpacity style={styles.addDrinkButton}>
              <Text style={styles.addDrinkButtonText}>Add Water</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  datePicker: {
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  dateItemContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  dateItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 15,
  },
  activeDateItem: {
    backgroundColor: '#4DC3C3',
  },
  dateDay: {
    fontSize: 14,
    color: '#AAA',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  activeDateText: {
    color: '#FFF',
  },
  checkIcon: {
    marginTop: 8,
  },
  fastingHelpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 12,
    marginVertical: 20,
  },
  fastingHelpText: {
    marginLeft: 10,
    color: '#AAA',
    fontSize: 13,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statItem: {},
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 5,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  progressContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    position: 'absolute',
    bottom: 40,
    width: 104.7,
    height: 91.52,
    resizeMode: 'contain',
  },
  progressPercentage: {
    fontSize: 33,
    fontWeight: 'bold',
    color: '#333',
    marginTop: -100,
  },
  progressComplete: {
    fontSize: 16,
    color: '#AAA',
    marginTop: -5,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '25%',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    marginTop: 5,
  },
  legendItemType: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  legendItemPercentage: {
    fontSize: 12,
    color: '#AAA',
  },
  addButton: {
    backgroundColor: '#4DC3C3',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    paddingVertical: 15,
  },
  unitSelectorText: {
    fontSize: 16,
    color: '#555',
  },
  unitButtonsContainer: {
    flexDirection: 'row',
    borderColor: '#4DC3C3',
    borderWidth: 1,
    borderRadius: 15,
  },
  unitButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  unitButtonActive: {
    backgroundColor: '#4DC3C3',
  },
  unitButtonText: {
    fontSize: 16,
    color: '#4DC3C3',
  },
  unitButtonTextActive: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#4DC3C3',
    marginBottom: 40,
  },
  input: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4DC3C3',
    textAlign: 'center',
    minWidth: 100,
  },
  inputUnit: {
    fontSize: 18,
    color: '#555',
    marginLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#555',
    marginHorizontal: 20,
  },
  modalButtonOk: {
    color: '#4DC3C3',
    fontWeight: 'bold',
  },
  addDrinkModalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  addDrinkModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addDrinkModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drinkOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  drinkOption: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  drinkOptionSelected: {
    backgroundColor: '#E8F8F8',
    borderColor: '#4DC3C3',
  },
  drinkIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  drinkName: {
    fontSize: 12,
  },
  howMuchTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
  },
  drinkInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#4DC3C3',
    alignSelf: 'center',
    paddingBottom: 5,
    marginBottom: 20,
  },
  drinkInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4DC3C3',
    textAlign: 'center',
  },
  drinkInputUnit: {
    fontSize: 16,
    color: '#555',
    marginLeft: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addDrinkButton: {
    backgroundColor: '#4DC3C3',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  addDrinkButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

const drinkOptions = [
  { name: 'Water', icon: require('../assets/images/water-glass.png') },
  { name: 'Cold Drink', icon: require('../assets/images/cold-drink.png') },
  { name: 'Caffeine', icon: require('../assets/images/caffeine.png') },
  { name: 'Juice', icon: require('../assets/images/juice.png') },
];

export default WaterIntakeScreen;
