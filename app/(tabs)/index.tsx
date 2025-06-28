import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Svg, { Defs, LinearGradient, Polygon, Stop, Text as SvgText, ClipPath, Rect } from 'react-native-svg';

const WaterIntakeProgressBar = ({ progress = 45, width = 280, height = 35 }) => {
  const progressWidth = (width * progress) / 100;
  const points = `0,${height / 2} 15,0 ${width - 15},0 ${width},${height/2} ${width - 15},${height} 15,${height}`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0" stopColor="#66D7D1" />
          <Stop offset="1" stopColor="#92E4DF" />
        </LinearGradient>
        <ClipPath id="clipPath"><Polygon points={points} /></ClipPath>
      </Defs>
      <Polygon points={points} fill="#F0F0F0" />
      <Rect x="0" y="0" width={progressWidth} height={height} fill="url(#grad)" clipPath="url(#clipPath)" />
      <SvgText x={progressWidth - 30} y={height / 2 + 5} textAnchor="middle" fontSize={14} fontWeight="bold" fill="white">{`${progress}%`}</SvgText>
    </Svg>
  );
};

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/emerson.png')} style={styles.profileImage} />
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.profileName}>Emerson Dias</Text>
              <Text style={styles.greeting}>Good Morning ☀️</Text>
            </View>
            <Ionicons name="notifications" size={28} color="#333" />
          </View>
        </View>

        {/* Quote */}
        <View style={styles.quoteContainer}>
          <Text style={styles.openingQuote}>“</Text>
          <Text style={styles.quote}>Every step brings you closer to greatness!</Text>
          <Text style={styles.closingQuote}>”</Text>
        </View>

        {/* Water Intake Card */}
        <View style={[styles.card, styles.waterIntakeCard]}>
          <View style={styles.waterIntakeHeader}>
            <Text style={styles.waterIntakeTitle}>Water Intake</Text>
            <Text style={styles.dehydratedText}>Dehydrated</Text>
          </View>
          <View style={styles.waterIntakeBody}>
            <WaterIntakeProgressBar progress={45} />
            <Image source={require('../../assets/images/Water_drop.png')} style={styles.waterDrop} resizeMode="contain" />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.card, styles.caloriesCard]}>
            <PieChart
              data={[
                { value: 60, color: '#52C4C3', strokeWidth: 4, strokeColor: '#F7F8F8' },
                { value: 25, color: '#F9D45B', strokeWidth: 4, strokeColor: '#F7F8F8' },
                { value: 15, color: '#F4725D', strokeWidth: 4, strokeColor: '#F7F8F8' },
              ]}

              donut
              radius={55}
              innerRadius={47}
              centerLabelComponent={() => {
                return (
                  <View style={styles.donutChartTextContainer}>
                    <Text style={styles.caloriesValue}>256</Text>
                    <Text style={styles.cardSubtitle}>Total Calories</Text>
                  </View>
                );
              }}
            />
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: '#F9D45B' }]} /><Text style={styles.legendText}>Carbs</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: '#F4725D' }]} /><Text style={styles.legendText}>Fats</Text></View>
              <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: '#52C4C3' }]} /><Text style={styles.legendText}>Protien</Text></View>
            </View>
          </View>

          <View style={[styles.card, styles.weightCard]}>
            <Text style={styles.cardTitle}>Current Weight</Text>
            <Text style={styles.goalText}>You're near to your goal weight!</Text>
            <View style={styles.graphContainer}>
              <Image source={require('../../assets/images/Chart.png')} style={styles.graphImage} resizeMode='contain' />
              <View style={styles.graphTooltip}>
                <Text style={styles.graphTooltipText}>Normal</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Challenge */}
        <View style={[styles.card, styles.challengeCard]}>
          <View style={{ flex: 1, marginRight: 15 }}>
            <Text style={styles.newBadge}>New</Text>
            <Text style={styles.challengeTitle}>Squat Jump Challenge</Text>
            <Text style={styles.challengeDescription}>Lorem ipsum is a dummy data simply used for type writting for years.dolor nueit ameit ipsum.</Text>
          </View>
          <View style={styles.challengeFooter}>
            <View style={styles.joinedAvatars}>
              <Image source={require('../../assets/images/male1.png')} style={styles.avatar} />
              <Image source={require('../../assets/images/female1.png')} style={[styles.avatar, styles.avatarOverlap]} />
              <Image source={require('../../assets/images/emerson.png')} style={[styles.avatar, styles.avatarOverlap]} />
            </View>
            <Text style={styles.joinedText}>150 Joined</Text>
            <TouchableOpacity style={styles.joinButton}><Text style={styles.joinButtonText}>Join</Text></TouchableOpacity>
          </View>
        </View>

        {/* Today's Plan */}
        <Text style={styles.sectionTitle}>Today's Plan</Text>
        <View style={styles.planCard}>
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Breakfast</Text>
            <Text style={styles.planDescription}>Spinach omelette with mustard sauce</Text>
            <Text style={styles.planCalories}><Ionicons name="flame-outline" size={14} color="#F4725D" /> 300 Cal</Text>
          </View>
          <Image source={require('../../assets/images/breakfast.png')} style={styles.planImage} resizeMode='cover' />
        </View>
        <View style={styles.planCard}>
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Exercise</Text>
            <Text style={styles.planDescription}>Dolor ameit nulet ipsum is a our mostly used</Text>
            <Text style={styles.planCalories}><Ionicons name="flame-outline" size={14} color="#F4725D" /> 300 Cal</Text>
          </View>
          <Image source={require('../../assets/images/exercise.png')} style={styles.planImage} resizeMode='cover' />
        </View>
        <View style={styles.planCard}>
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Better Sleep</Text>
            <Text style={styles.planDescription}>Dolor ameit nulet ipsum is a our mostly used</Text>
            <Text style={styles.planCalories}><Ionicons name="flame-outline" size={14} color="#F4725D" /> 300 Cal</Text>
          </View>
          <Image source={require('../../assets/images/sleep.png')} style={styles.planImage} resizeMode='cover' />
        </View>
        <View style={styles.planCard}>
          <View style={styles.planDetails}>
            <Text style={styles.planTitle}>Meditation</Text>
            <Text style={styles.planDescription}>Dolor ameit nulet ipsum is a our mostly used</Text>
            <Text style={styles.planCalories}><Ionicons name="flame-outline" size={14} color="#F4725D" /> 300 Cal</Text>
          </View>
          <Image source={require('../../assets/images/meditation.png')} style={styles.planImage} resizeMode='cover' />
        </View>

        {/* Todo's */}
        <Text style={styles.sectionTitle}>Todo's</Text>
        <View style={styles.todoContainer}>
          <View style={styles.todoItem}>
            <Image source={require('../../assets/images/weight.png')} style={styles.todoImage} />
            <Text style={styles.todoText}>Weight</Text>
            <View style={styles.todoCheckCompleted}><Ionicons name="checkmark-sharp" size={18} color="white" /></View>
          </View>
          <View style={styles.todoItem}>
            <Image source={require('../../assets/images/water.png')} style={styles.todoImage} />
            <Text style={styles.todoText}>Water Intake</Text>
            <View style={styles.todoCheck} />
          </View>
          <View style={styles.todoItem}>
            <Image source={require('../../assets/images/yoga.png')} style={styles.todoImage} />
            <Text style={styles.todoText}>Yoga</Text>
            <View style={styles.todoCheck} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container: { flex: 1 },
  contentContainer: { paddingHorizontal: 20, paddingBottom: 100 }, // Added paddingBottom for tab bar space
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -20, // Make the header stretch to screen edges
    backgroundColor: '#66D7D124',
    paddingLeft: 20, // Re-apply padding for the image
    height: 60,
    marginTop: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'white',
    zIndex: 1, // Ensure image is on top
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20, // Padding for notification icon
    marginLeft: -75, // Slide left to go under the image
    paddingLeft: 85, // Create space for the text next to the image
  },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#52C4C3' },
  greeting: { color: '#7F7F7F', marginTop: 4 },
  quoteContainer: { marginVertical: 20, paddingHorizontal: 30, position: 'relative' },
  quote: { fontSize: 19, fontWeight: '400', textAlign: 'left', color: '#333' },
  openingQuote: {
    position: 'absolute',
    top: -10,
    left: 0,
    fontSize: 50,
    color: '#52C4C3',
    fontWeight: 'bold',
  },
  closingQuote: {
    position: 'absolute',
    bottom: -35,
    left: 130,
    fontSize: 50,
    color: '#52C4C3',
    fontWeight: 'bold',
  },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 15, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { color: '#7F7F7F', fontSize: 10 },
  waterIntakeCard: { paddingBottom: 20 },
  waterIntakeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  waterIntakeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dehydratedText: {
    color: '#F4725D',
    fontSize: 14,
    fontWeight: '500',
  },
  waterIntakeBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waterDrop: {
    width: 40,
    height: 50,
    marginLeft: -15, // Overlap slightly with the bar
  },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  caloriesCard: { flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15 },
  donutChartTextContainer: { alignItems: 'center', justifyContent: 'center' },
  caloriesValue: { fontSize: 20,  },
  legendContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 15 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendColor: { width: 10, height: 10, borderRadius: 2, marginRight: 5 },
  legendText: { color: '#7F7F7F', fontSize: 10 },
  weightCard: { flex: 1, justifyContent: 'space-between', paddingVertical: 15 },
  goalText: { color: '#52C4C3', fontSize: 8.24,marginTop:8 },
  graphContainer: { alignItems: 'center', marginTop: 10, height: 100 },
  graphImage: {
    width: '100%',
    height: '100%',
  },
  graphTooltip: {
    position: 'absolute',
    top: '25%',
    left: '45%',
    // backgroundColor: '#FEEAEA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  graphTooltipText: { color: '#F4725D', fontSize: 9, fontWeight: 'bold' },
  challengeCard: { paddingVertical: 15, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' },
  newBadge: { backgroundColor: '#D4F3F3', color: '#52C4C3', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', overflow: 'hidden', fontWeight: 'bold', fontSize: 12 },
  challengeTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 8 },
  challengeDescription: { color: '#7F7F7F', fontSize: 12, lineHeight: 18 },
  challengeFooter: { alignItems: 'center' },
  joinedAvatars: { flexDirection: 'row' },
  avatar: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: 'white' },
  avatarOverlap: { marginLeft: -12 },
  joinedText: { color: '#7F7F7F', fontWeight: 'bold', marginVertical: 8 },
  joinButton: { backgroundColor: '#52C4C3', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 25 },
  joinButtonText: { color: 'white', fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  planCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7F8F8', borderRadius: 20, padding: 10, marginBottom: 15 },
  planDetails: { flex: 1, marginRight: 10 },
  planTitle: { fontSize: 16, fontWeight: 'bold' },
  planDescription: { color: '#7F7F7F', marginVertical: 4, fontSize: 12 },
  planCalories: { color: '#F4725D', fontWeight: 'bold' },
  planImage: { width: 170, height: 100, borderRadius: 15 },
  todoContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  todoItem: { alignItems: 'center', flex: 1 },
  todoImage: { width: 60, height: 60, marginBottom: 10, justifyContent: 'center', alignItems: 'center' },
  todoText: { color: '#7F7F7F', fontWeight: 'bold' },
  todoCheck: { position: 'absolute', top: -5, right: 15, width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#52C4C3', backgroundColor: 'white' },
  todoCheckCompleted: { position: 'absolute', top: -5, right: 15, width: 24, height: 24, borderRadius: 12, backgroundColor: '#52C4C3', justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;


 