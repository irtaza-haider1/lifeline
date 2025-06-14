import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useMemo } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const { width } = Dimensions.get('window');

type WeightUnit = 'kg' | 'lbs';

interface RulerProps {
  value: number;
  onValueChange: (value: number) => void;
  unit: WeightUnit;
}

const Ruler = ({ value, onValueChange, unit }: RulerProps) => {
  const isKg = unit === 'kg';
  const min = isKg ? 30 : 66; // 30kg or 66lbs
  const max = isKg ? 150 : 330; // 150kg or 330lbs
  const tickWidth = 12;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = event.nativeEvent.contentOffset.x;
    const selectedIndex = Math.round(position / tickWidth);
    const selectedValue = min + selectedIndex;
    if (selectedValue >= min && selectedValue <= max) {
      onValueChange(selectedValue);
    }
  };

  const initialScrollPosition = (value - min) * tickWidth;

  return (
    <View style={styles.rulerContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: width / 2 - tickWidth / 2 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={tickWidth}
        decelerationRate="fast"
        contentOffset={{ x: initialScrollPosition, y: 0 }}
      >
        {Array.from({ length: max - min + 1 }).map((_, i) => {
          const val = min + i;
          const isTen = val % 10 === 0;
          const isFive = val % 5 === 0;
          return (
            <View key={i} style={{ width: tickWidth, alignItems: 'center' }}>
              <View
                style={[
                  styles.tick,
                  isTen ? styles.largeTick : isFive ? styles.mediumTick : styles.smallTick,
                ]}
              />
              {isTen && <Text style={styles.tickLabel}>{val}</Text>}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.centerLine} />
    </View>
  );
};

export default function CurrentWeightScreen() {
  const params = useLocalSearchParams();
  const { gender, age, height, unit: heightUnit } = params;

  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');
  const [weight, setWeight] = useState(70);

  const handleUnitChange = (newUnit: WeightUnit) => {
    if (weightUnit === newUnit) return;
    setWeightUnit(newUnit);
    if (newUnit === 'lbs') {
      // kg to lbs
      setWeight(Math.round(weight * 2.20462));
    } else {
      // lbs to kg
      setWeight(Math.round(weight / 2.20462));
    }
  };

  const { bmi, category } = useMemo(() => {
    const heightInMeters = heightUnit === 'cm'
      ? Number(height) / 100
      : Number(height) * 0.0254; // inches to meters

    const weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;

    if (heightInMeters > 0) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      let bmiCategory = '';
      if (bmiValue < 18.5) bmiCategory = 'Underweight';
      else if (bmiValue < 25) bmiCategory = 'Normal weight';
      else if (bmiValue < 30) bmiCategory = 'Overweight';
      else bmiCategory = 'Obesity';
      return { bmi: bmiValue.toFixed(1), category: bmiCategory };
    }
    return { bmi: 'N/A', category: '' };
  }, [height, heightUnit, weight, weightUnit]);

  const handleContinue = () => {
    // You can add navigation to the next screen here
    router.push({ pathname: '/(auth)/goalWeight', params: { gender, age, height, heightUnit, weight, weightUnit } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/running.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.contentWrapper}>
        <View style={styles.glassContainer}>
          <BlurView intensity={70} tint="light" style={styles.blurView}>
            <View style={styles.glassContent}>
              <Text style={styles.title}>What is your current weight?</Text>
              <View style={styles.unitSelector}>
                <TouchableOpacity
                  style={[styles.unitButton, weightUnit === 'kg' && styles.selectedUnitButton]}
                  onPress={() => handleUnitChange('kg')}
                >
                  <Text style={[styles.unitButtonText, weightUnit === 'kg' && styles.selectedUnitButtonText]}>kg</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.unitButton, weightUnit === 'lbs' && styles.selectedUnitButton]}
                  onPress={() => handleUnitChange('lbs')}
                >
                  <Text style={[styles.unitButtonText, weightUnit === 'lbs' && styles.selectedUnitButtonText]}>lbs</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.displayContainer}>
                <Text style={styles.valueText}>{weight}</Text>
                <Text style={styles.unitText}>{weightUnit}</Text>
              </View>
              <Ruler value={weight} onValueChange={setWeight} unit={weightUnit} />
              <Text style={styles.bmiText}>
                Your current BMI is {bmi} which is {category}.
              </Text>
              <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topCircle: { position: 'absolute', top: 0, right: 0, width: 150, height: 150, backgroundColor: '#00B3B3', borderBottomLeftRadius: 150 },
  bottomCircle: { position: 'absolute', bottom: 0, left: 0, width: 150, height: 150, backgroundColor: '#00B3B3', borderTopRightRadius: 150 },
  logoContainer: { position: 'absolute', top: 60, left: 20, zIndex: 1 },
  logo: { width: 80, height: 30 },
  contentWrapper: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  glassContainer: { height: '85%', borderRadius: 25, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)' },
  blurView: { flex: 1, borderRadius: 25 },
  glassContent: { flex: 1, padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center', justifyContent: 'space-around' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  unitSelector: { flexDirection: 'row', marginVertical: 20 },
  unitButton: { paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8, borderWidth: 1, borderColor: '#00B3B3', marginHorizontal: 10 },
  selectedUnitButton: { backgroundColor: '#00B3B3' },
  unitButtonText: { fontSize: 16, color: '#00B3B3' },
  selectedUnitButtonText: { color: '#fff' },
  displayContainer: { flexDirection: 'row', alignItems: 'flex-end' },
  valueText: { fontSize: 48, fontWeight: 'bold', color: '#00B3B3' },
  unitText: { fontSize: 24, color: '#00B3B3', marginLeft: 5, marginBottom: 5 },
  rulerContainer: { height: 100, width: '100%', justifyContent: 'center' },
  centerLine: { position: 'absolute', left: '50%', marginLeft: -1, height: 50, width: 2, backgroundColor: '#00B3B3' },
  tick: { backgroundColor: '#ccc' },
  smallTick: { height: 20, width: 1 },
  mediumTick: { height: 30, width: 2 },
  largeTick: { height: 40, width: 2 },
  tickLabel: { position: 'absolute', bottom: -20, fontSize: 12, color: '#666' },
  bmiText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10 },
  continueButton: { backgroundColor: '#00B3B3', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 100, alignItems: 'center', marginTop: 20 },
  continueButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});
