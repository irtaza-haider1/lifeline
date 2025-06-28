import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface DietPlanProps {
  category: string;
  name: string;
  image: ImageSourcePropType;
  calories: number;
  days: number;
  isActive?: boolean;
}

const DietPlan: React.FC<DietPlanProps> = ({ category, name, image, calories, days, isActive }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      {isActive && (
        <View style={styles.activatedTag}>
          <Text style={styles.activatedText}>Activated</Text>
        </View>
      )}
      <View style={styles.favoriteIcon}>
        <Feather name="heart" size={20} color="#fff" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.planInfoRow}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.infoItem}>
            <Feather name="zap" size={16} color="#fff" />
            <Text style={styles.infoText}>{calories} Cal</Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="calendar" size={16} color="#fff" />
            <Text style={styles.infoText}>{days} days</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activatedTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#48d1cc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 1,
  },
  activatedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 5,
    borderRadius: 15,
  },
  detailsContainer: {
    backgroundColor: '#48d1cc',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  category: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  planInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  infoText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default DietPlan;
