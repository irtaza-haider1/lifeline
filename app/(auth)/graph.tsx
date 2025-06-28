import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function GraphScreen() {
  const params = useLocalSearchParams();
  const { gender, name } = params;

  const handleContinue = () => {
    router.push('/subscription');
  };

  const chartData = {
    labels: ['July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [95, 90, 88, 75, 68, 65],
        color: (opacity = 1) => `rgba(255, 102, 102, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(255, 102, 102, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    strokeWidth: 3,
    propsForDots: {
      r: '5',
      strokeWidth: '2',
    },
    withInnerLines: false,
    withVerticalLines: true,
    withHorizontalLabels: false,
  };

  const backgroundImage =
    gender === 'male'
      ? require('../../assets/images/focus-male.png')
      : require('../../assets/images/focus-female.png');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={backgroundImage} style={styles.backgroundImage} />
          <LinearGradient
            colors={['transparent', 'white']}
            style={styles.gradient}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{`${name || 'User'}, your wish is our command`}</Text>
          <Text style={styles.subtitle}>Empowering Dreams, Visualize Success!</Text>
          <Text style={styles.graphTitle}>Active goal graph</Text>
          <LineChart
            data={chartData}
            width={screenWidth + 40}
            height={250}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withShadow={true}
            getDotColor={(dataPoint, dataPointIndex) => {
              if (dataPointIndex === 4) { // Index for 'Nov'
                return '#FF6666';
              }
              return 'transparent';
            }}
            fromZero
            formatYLabel={() => ''}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 100, // Space for the continue button
  },
  imageContainer: {
    width: '100%',
    height: 400,
    alignItems: 'center',
  },
  backgroundImage: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: -40, // Overlap the image slightly
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6666',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00B3B3',
    marginBottom: 10,
  },
  chart: {
    marginLeft: -40, // Adjust position to align grid
  },
  continueButton: {
    position: 'absolute',
    bottom: 30,
    left: '5%',
    width: '90%',
    backgroundColor: '#00B3B3',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
