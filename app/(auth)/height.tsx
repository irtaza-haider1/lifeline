import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

type Unit = 'cm' | 'ft';

interface RulerProps {
  value: number;
  onValueChange: (value: number) => void;
}

const Ruler = ({ value, onValueChange }: RulerProps) => {
  const min = 120;
  const max = 220;
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

export default function HeightScreen() {
  const params = useLocalSearchParams();
  const gender = params.gender;
  const age = params.age;
  const [unit, setUnit] = useState<Unit>('cm');
  const [height, setHeight] = useState(165); // Default in cm

  const handleUnitChange = (newUnit: Unit) => {
    if (unit === newUnit) return;
    setUnit(newUnit);
    if (newUnit === 'ft') {
      // cm to inches
      setHeight(Math.round(height / 2.54));
    } else {
      // inches to cm
      setHeight(Math.round(height * 2.54));
    }
  };

  const handleContinue = () => {
    // router.push({ pathname: '/(auth)/weight', params: { gender, age, height, unit } });
    router.push({ pathname: '/(auth)/currentWeight', params: { gender, age, height, unit } });
  };

  const feet = Math.floor(height / 12);
  const inches = height % 12;

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
              <View style={styles.titleContainer}>
                <Text style={styles.title}>What is your height?</Text>
                <Text style={styles.subtitle}>We need this to calculate your BMI</Text>
              </View>
              <View style={styles.unitSelector}>
                <TouchableOpacity
                  style={[styles.unitButton, unit === 'cm' && styles.selectedUnitButton]}
                  onPress={() => handleUnitChange('cm')}
                >
                  <Text style={[styles.unitButtonText, unit === 'cm' && styles.selectedUnitButtonText]}>cm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.unitButton, unit === 'ft' && styles.selectedUnitButton]}
                  onPress={() => handleUnitChange('ft')}
                >
                  <Text style={[styles.unitButtonText, unit === 'ft' && styles.selectedUnitButtonText]}>ft</Text>
                </TouchableOpacity>
              </View>

              {unit === 'cm' ? (
                <>
                  <View style={styles.heightDisplayContainer}>
                    <Text style={styles.heightValue}>{height}</Text>
                    <Text style={styles.heightUnit}>cm</Text>
                  </View>
                  <Ruler value={height} onValueChange={setHeight} />
                </>
              ) : (
                <>
                  <View style={styles.ftHeightDisplayContainer}>
                    <View style={styles.ftBox}>
                      <Text style={styles.ftValue}>{feet}<Text style={styles.ftUnit}>ft</Text></Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.ftBox}>
                      <Text style={styles.ftValue}>{inches}<Text style={styles.ftUnit}>in</Text></Text>
                    </View>
                  </View>
                  <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={48} // 4ft in inches
                    maximumValue={84} // 7ft in inches
                    step={1}
                    value={height}
                    onValueChange={setHeight}
                    minimumTrackTintColor="#00B3B3"
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor="#00B3B3"
                  />
                </>
              )}

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
  titleContainer: { alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 8 },
  unitSelector: { flexDirection: 'row', marginVertical: 20 },
  unitButton: { paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8, borderWidth: 1, borderColor: '#00B3B3', marginHorizontal: 10 },
  selectedUnitButton: { backgroundColor: '#00B3B3' },
  unitButtonText: { fontSize: 16, color: '#00B3B3' },
  selectedUnitButtonText: { color: '#fff' },
  heightDisplayContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 100, justifyContent: 'center' },
  heightValue: { fontSize: 48, fontWeight: 'bold', color: '#00B3B3' },
  heightUnit: { fontSize: 24, color: '#00B3B3', marginLeft: 5, marginBottom: 5 },
  ftHeightDisplayContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 15, padding: 10, marginVertical: 20, width: '70%', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5 },
  ftBox: { alignItems: 'center', paddingHorizontal: 20 },
  ftValue: { fontSize: 28, fontWeight: 'bold', color: '#00B3B3' },
  ftUnit: { fontSize: 24, fontWeight: 'normal' },
  separator: { width: 1, height: 30, backgroundColor: '#e0e0e0' },
  continueButton: { backgroundColor: '#00B3B3', borderRadius: 10, paddingVertical: 15, paddingHorizontal: 100, alignItems: 'center' },
  continueButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  rulerContainer: { height: 100, width: '100%', justifyContent: 'center' },
  centerLine: { position: 'absolute', left: '50%', marginLeft: -1, height: 50, width: 2, backgroundColor: '#00B3B3' },
  tick: { backgroundColor: '#ccc' },
  smallTick: { height: 20, width: 1 },
  mediumTick: { height: 30, width: 2 },
  largeTick: { height: 40, width: 2 },
  tickLabel: { position: 'absolute', bottom: -20, fontSize: 12, color: '#666' },
});
