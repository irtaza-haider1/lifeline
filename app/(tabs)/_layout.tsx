import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 80;
const SVG_HEIGHT = 100;

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tabBarContainer}>
      <Svg width={width} height={SVG_HEIGHT} viewBox={`0 0 ${width} ${SVG_HEIGHT}`} style={styles.svg}>
        <Path
          d={`M 0 30 Q 0 0 30 0 H ${width/2 - 40} C ${width/2 - 20} 0 ${width/2 - 25} 35 ${width/2} 35 C ${width/2 + 25} 35 ${width/2 + 20} 0 ${width/2 + 40} 0 H ${width - 30} Q ${width} 0 ${width} 30 V ${SVG_HEIGHT} H 0 Z`}
          fill="#52C4C3"
        />
      </Svg>

      <View style={styles.tabItemsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const knownRoutes = ['index', 'diet', 'challenges', 'exercise', 'more'];
          if (options.href === null || !knownRoutes.includes(route.name)) {
            return null;
          }
          
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: keyof typeof Ionicons.glyphMap;
          let label = options.title;

          if (route.name === 'index') iconName = 'home-outline';
          else if (route.name === 'diet') iconName = 'restaurant-outline';
          else if (route.name === 'challenges') iconName = 'walk';
          else if (route.name === 'exercise') iconName = 'barbell-outline';
          else if (route.name === 'more') iconName = 'ellipsis-horizontal';
          else iconName = 'help'; // Fallback icon

          if (route.name === 'challenges') {
            return (
              <View key={route.key} style={{ flex: 1, alignItems: 'center', }}>
                <TouchableOpacity onPress={onPress} style={styles.centerTab}>
                  <View style={styles.centerTabCircle}>
                    <Ionicons name={iconName} size={28} color="white" />
                    <Text style={styles.centerLabel}>{label}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem}>
              <Ionicons name={iconName} size={24} color={isFocused ? 'white' : '#AEE2E0'} />
              <Text style={[styles.label, { color: isFocused ? 'white' : '#AEE2E0' }]}>{label}</Text>
              {isFocused && route.name === 'index' && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="diet" options={{ title: 'Diet' }} />
      <Tabs.Screen name="challenges" options={{ title: 'Challenges' }} />
      <Tabs.Screen name="exercise" options={{ title: 'Exercise' }} />
      <Tabs.Screen name="more" options={{ title: 'More' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
    top: 0,
  },
  tabItemsContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: TAB_BAR_HEIGHT,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTab: {
    top: -35, // Adjust this value to position the button vertically
    alignItems: 'center',
  },
  centerTabCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#52C4C3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#C974E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  centerLabel: {
    fontSize: 9,
    color: 'white',
    marginTop: 2,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'white',
    marginTop: 4,
  },
});

