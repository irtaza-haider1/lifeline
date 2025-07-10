import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const previousMeals = [
  {
    image: require('../../assets/images/diet-1.png'),
    category: 'Breakfast',
    title: 'Push-Up Challenge',
    calories: '300 Cal',
    date: '28 April, 2025',
  },
  {
    image: require('../../assets/images/diet-2.png'),
    category: 'Breakfast',
    title: 'Push-Up Challenge',
    calories: '300 Cal',
    date: '18 April, 2025',
  },
];

const CheatDayScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = React.useState('manual');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cheat Day</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity 
            style={selectedOption === 'manual' ? styles.manualButton : styles.scannerButton}
            onPress={() => setSelectedOption('manual')}
          >
            <View style={selectedOption === 'manual' ? styles.iconContainerManual : styles.iconContainerScanner}>
              <Image source={require('../../assets/images/fork.png')} style={styles.buttonIcon} tintColor={selectedOption === 'manual' ? '#FFF' : '#3EC6C9'} />
            </View>
            <Text style={selectedOption === 'manual' ? styles.manualButtonText : styles.scannerButtonText}>Add Manually</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={selectedOption === 'scanner' ? styles.manualButton : styles.scannerButton}
            onPress={() => setSelectedOption('scanner')}
          >
            <View style={selectedOption === 'scanner' ? styles.iconContainerManual : styles.iconContainerScanner}>
              <Image source={require('../../assets/images/scan.png')} style={styles.buttonIcon} tintColor={selectedOption === 'scanner' ? '#FFF' : '#3EC6C9'} />
            </View>
            <Text style={selectedOption === 'scanner' ? styles.manualButtonText : styles.scannerButtonText}>Meal Scanner</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Previous Cheat Meals</Text>

        {previousMeals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <Image source={meal.image} style={styles.mealImage} />
            <View style={styles.mealInfo}>
              <View style={styles.mealCategoryContainer}>
                <Text style={styles.mealCategoryText}>{meal.category}</Text>
              </View>
              <Text style={styles.mealTitle}>{meal.title}</Text>
              <View style={styles.mealStats}>
                <Feather name="zap" size={14} color="#666" />
                <Text style={styles.mealStatText}>{meal.calories}</Text>
                <Feather name="calendar" size={14} color="#666" style={{ marginLeft: 15 }} />
                <Text style={styles.mealStatText}>{meal.date}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.activateButton} 
          onPress={() => {
            if (selectedOption === 'manual') {
              router.push('/(main)/AddManually');
            } else if (selectedOption === 'scanner') {
              router.push('/(main)/BarScanner');
            }
          }}
        >
          <Text style={styles.activateButtonText}>Activate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {},
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  manualButton: {
    flex: 1,
    backgroundColor: '#3EC6C9',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  scannerButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    padding: 20,
    alignItems: 'center',
    marginLeft: 10,
  },
  iconContainerManual: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    padding: 15,
    marginBottom: 10,
  },
  iconContainerScanner: {
    backgroundColor: '#F0F4F8',
    borderRadius: 30,
    padding: 15,
    marginBottom: 10,
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  manualButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scannerButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3EC6C9',
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  mealInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  mealCategoryContainer: {
    backgroundColor: '#3EC6C9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  mealCategoryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3EC6C9',
    marginBottom: 8,
  },
  mealStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealStatText: {
    marginLeft: 5,
    color: '#666',
  },
  footer: {
    padding: 20,
    // borderTopWidth: 1,
    // borderTopColor: '#EEE',
  },
  activateButton: {
    backgroundColor: '#3EC6C9',
    borderRadius: 15,
    left: '10%',
    width: '80%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  activateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheatDayScreen;
