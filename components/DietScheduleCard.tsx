import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface DietScheduleCardProps {
  meal: string;
  title: string;
  image: ImageSourcePropType;
  calories: number;
  days: number;
}

const DietScheduleCard: React.FC<DietScheduleCardProps> = ({ meal, title, image, calories, days }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.mealTag}>
          <Text style={styles.mealText}>{meal}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Feather name="zap" size={14} color="#888" />
            <Text style={styles.infoText}>{calories} Cal</Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="calendar" size={14} color="#888" />
            <Text style={styles.infoText}>{days} days</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    borderColor: '#3EC6C9',
    borderWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  mealTag: {
    backgroundColor: '#48d1cc',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  mealText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  infoText: {
    color: '#888',
    marginLeft: 5,
    fontSize: 12,
  },
});

export default DietScheduleCard;
