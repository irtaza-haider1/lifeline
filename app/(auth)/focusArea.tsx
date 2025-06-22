import { BlurView } from 'expo-blur';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

// Focus area options
const focusAreas = [
  { id: 1, title: 'Full Body' },
  { id: 2, title: 'Shoulders' },
  { id: 3, title: 'Chest' },
  { id: 4, title: 'Arms' },
  { id: 5, title: 'Back' },
  { id: 6, title: 'Belly' },
  { id: 7, title: 'Legs' },
];

// Define target points for the male avatar
const maleTargetPoints = {
  // areaId: { x: percentWidth, y: percentHeight }
  2: { x: 0.3, y: 0.25 },   // Shoulders
  3: { x: 0.4, y: 0.3 },   // Chest
  4: { x: 0.4, y: 0.4 },   // Arms
  5: { x: 0.25, y: 0.55 },  // Back
  6: { x: 0.6, y: 0.5},  // Belly
  7: { x: 0.3, y: 0.8 },   // Legs
};

// Define target points for the female avatar
const femaleTargetPoints = {
  2: { x: 0.2, y: 0.25 },   // Shoulders
  3: { x: 0.23, y: 0.29 },   // Chest
  4: { x: 0.2, y: 0.4 },   // Arms
  5: { x: 0.55, y: 0.38 },    // Back
  6: { x: 0.44, y: 0.42 },   // Belly
  7: { x: 0.3, y: 0.8 },    // Legs
};

interface Layout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function FocusAreaScreen() {
  const params = useLocalSearchParams();
  const [gender, setGender] = useState<string>('female');
  const [selectedArea, setSelectedArea] = useState<number | null>(1);
  
  // State to store layouts of buttons and the image
  const [buttonLayouts, setButtonLayouts] = useState<{ [key: number]: Layout }>({});
  const [imageContainerLayout, setImageContainerLayout] = useState<Layout | null>(null);
  const [bodyContainerLayout, setBodyContainerLayout] = useState<Layout | null>(null);


  useEffect(() => {
    if (params.gender) {
      setGender(params.gender as string);
    }
  }, [params]);

  const handleAreaSelect = (areaId: number) => {
    setSelectedArea(areaId);
  };

  const handleContinue = () => {
    router.push({ pathname: '/(auth)/userEngagment', params: { gender } });
  };

  // Store layout of each button
  const onButtonLayout = (event: LayoutChangeEvent, areaId: number) => {
    const { layout } = event.nativeEvent;
    setButtonLayouts((prev) => ({ ...prev, [areaId]: layout }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/running.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.contentWrapper}>
        <View style={styles.titleContainer}>
          <View style={styles.titleLine} />
          <Text style={styles.title}>Choose Your Focus Area</Text>
          <Text style={styles.subtitle}>Tell us which part of your body you'd like to{`'\n'`}focus on during your workouts</Text>
        </View>
        
        <View style={styles.glassContainer}>
          <BlurView intensity={70} tint="light" style={styles.blurView}>
            <View style={styles.glassContent}>
              <View 
                style={styles.bodyContainer} 
                onLayout={(event) => setBodyContainerLayout(event.nativeEvent.layout)}
              >
                <View style={styles.areasContainer}>
                  {focusAreas.map((area) => (
                    <TouchableOpacity
                      key={area.id}
                      style={[
                        styles.areaButton,
                        selectedArea === area.id && styles.selectedAreaButton
                      ]}
                      onPress={() => handleAreaSelect(area.id)}
                      onLayout={(event) => onButtonLayout(event, area.id)}
                    >
                      <Text style={styles.areaButtonText}>{area.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <View 
                  style={styles.bodyImageContainer}
                  onLayout={(event) => setImageContainerLayout(event.nativeEvent.layout)}
                >
                  <Image
                    source={
                      gender === 'female' 
                        ? require('../../assets/images/focus-female.png')
                        : require('../../assets/images/focus-male.png')
                    }
                    style={styles.bodyImage}
                    resizeMode="contain"
                  />
                </View>

                {/* SVG for drawing lines */}
                {bodyContainerLayout && (
                  <Svg
                    height="100%"
                    width="100%"
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                  >
                    {Object.keys(buttonLayouts).map((areaIdStr) => {
                      const areaId = parseInt(areaIdStr, 10);
                      if (areaId === 1 || !imageContainerLayout) return null;

                      const currentTargetPoints = gender === 'male' ? maleTargetPoints : femaleTargetPoints;
                      const buttonLayout = buttonLayouts[areaId];
                      const target = currentTargetPoints[areaId];

                      if (!buttonLayout || !target) return null;

                      const startX = buttonLayout.x + buttonLayout.width;
                      const startY = buttonLayout.y + buttonLayout.height / 2;
                      
                      const endX = imageContainerLayout.x + target.x * imageContainerLayout.width;
                      const endY = imageContainerLayout.y + target.y * imageContainerLayout.height;

                      return (
                        <React.Fragment key={`group-${areaId}`}>
                          <Line
                            key={`line-${areaId}`}
                            x1={startX}
                            y1={startY}
                            x2={endX}
                            y2={endY}
                            stroke="#00B3B3"
                            strokeWidth={selectedArea === areaId ? "2.5" : "1.5"}
                          />
                          <Circle
                            key={`circle-${areaId}`}
                            cx={endX}
                            cy={endY}
                            r="4"
                            fill="#00B3B3"
                          />
                        </React.Fragment>
                      );
                    })}
                  </Svg>
                )}
              </View>
              
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topCircle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderBottomLeftRadius: 100,
    zIndex: -1,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderTopRightRadius: 100,
    zIndex: -1,
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 30,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleLine: {
    width: 40,
    height: 4,
    backgroundColor: '#00B3B3',
    marginBottom: 15,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  glassContainer: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  blurView: {
    flex: 1,
    borderRadius: 25,
  },
  glassContent: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of Svg
  },
  areasContainer: {
    width: '45%',
    zIndex: 2, // Ensure buttons are on top of lines
  },
  areaButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  selectedAreaButton: {
    borderColor: '#00B3B3',
    borderWidth: 2,
  },
  areaButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  bodyImageContainer: {
    width: '55%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyImage: {
    width: '100%',
    height: '90%',
  },
  continueButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 