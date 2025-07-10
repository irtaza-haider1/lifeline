import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Original View Plan Component
const DefaultView = () => {
    const router = useRouter();
    const { workoutIndex } = useLocalSearchParams();

    const scheduleData = [
        { image: require('../../assets/images/workout-1.png'), title: 'Dumbbell Flyes', details: '(Chest)', cal: '15 cal', time: '15 mins' },
        { image: require('../../assets/images/workout-2.png'), title: 'Bench Press', details: '(Chest)', cal: '25 cal', time: '20 mins' },
        { image: require('../../assets/images/workout-3.png'), title: 'Push-ups', details: '(Chest)', cal: '10 cal', time: '10 mins' },
    ];

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.weekButton}>
                        <Text style={styles.weekButtonText}>Week 1</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Full Body Workout</Text>
                    <View style={styles.exerciseCountContainer}>
                        <Text style={styles.exerciseCountText}>15 Exercises</Text>
                    </View>
                </View>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}><Feather name="clock" size={20} color="#48d1cc" /><Text style={styles.statText}>45 mins</Text></View>
                    <View style={styles.statBox}><Feather name="zap" size={20} color="#48d1cc" /><Text style={styles.statText}>250 cal</Text></View>
                    <View style={styles.statBox}><Feather name="bar-chart" size={20} color="#48d1cc" /><Text style={styles.statText}>Easy</Text></View>
                </View>
                <View style={styles.daysContainer}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <TouchableOpacity key={index} style={[styles.dayButton, day === 'Tue' ? styles.activeDay : (day === 'Thu' || day === 'Sat' ? styles.lockedDayButton : null)]}>
                            <Text style={[styles.dayText, day === 'Tue' ? styles.activeDayText : {}]}>{day}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.scheduleTitle}>Today Schedules</Text>
                <View style={styles.scheduleList}>
                    {scheduleData.map((item, index) => (
                        <View key={index} style={styles.scheduleCard}>
                            <Image source={item.image} style={styles.scheduleImage} />
                            <View style={styles.scheduleInfo}>
                                <Text style={styles.scheduleCardTitle}>{item.title} <Text style={styles.scheduleCardDetails}>{item.details}</Text></Text>
                                <View style={styles.scheduleMeta}>
                                    <Feather name="zap" size={14} color="#666" /><Text style={styles.scheduleMetaText}>{item.cal}</Text>
                                    <Feather name="clock" size={14} color="#666" style={{ marginLeft: 15 }} /><Text style={styles.scheduleMetaText}>{item.time}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.activateButton} onPress={() => router.push('/(main)/ExerciseStart')}>
                <Text style={styles.activateButtonText}>Activate</Text>
            </TouchableOpacity>
        </>
    );
};

// Challenge View Component
const ChallengeView = () => {
    const router = useRouter();
    const challengeScheduleData = [
        { week: '01 Week', title: 'Push-Up', exercises: '30 Exercises', time: '2 mins', progress: 10, locked: false },
        { week: '02 Week', title: 'Squat', exercises: '30 Exercises', time: '2 mins', progress: 0, locked: true },
        { week: '03 Week', title: 'Deadlift', exercises: '30 Exercises', time: '2 mins', progress: 0, locked: true },
        { week: '04 Week', title: 'Core Strength', exercises: '30 Exercises', time: '2 mins', progress: 0, locked: true },
    ];

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={challengeStyles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={challengeStyles.backButton}>
                        <Feather name="arrow-left" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={challengeStyles.heartButton}>
                        <Feather name="heart" size={24} color="#48d1cc" />
                    </TouchableOpacity>
                </View>
                <View style={challengeStyles.titleSection}>
                    <Text style={challengeStyles.title}>Full Body Workout</Text>
                    <View style={challengeStyles.weekBadge}><Text style={challengeStyles.weekBadgeText}>07 Weeks</Text></View>
                </View>
                <Text style={challengeStyles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci</Text>
                <Text style={challengeStyles.scheduleTitle}>Challenge Schedules</Text>
                <View style={challengeStyles.timelineContainer}>
                    {challengeScheduleData.map((item, index) => (
                        <View key={index} style={challengeStyles.timelineItem}>
                            <View style={challengeStyles.timelineIconContainer}>
                                <View style={[challengeStyles.timelineIcon, item.locked ? challengeStyles.lockedIcon : challengeStyles.unlockedIcon]}>
                                    {item.locked && <Feather name="lock" size={20} color="#999" />}
                                </View>
                                {index < challengeScheduleData.length - 1 && <View style={challengeStyles.dottedLine} />}
                            </View>
                            <View style={challengeStyles.card}>
                                <View style={challengeStyles.cardTextContainer}>
                                    <Text style={challengeStyles.weekText}>{item.week}</Text>
                                    <Text style={challengeStyles.cardTitle}>{item.title}</Text>
                                    <View style={challengeStyles.cardMeta}>
                                        <Feather name="zap" size={16} color="#555" />
                                        <Text style={challengeStyles.metaText}>{item.exercises}</Text>
                                        <Feather name="clock" size={16} color="#555" style={{ marginLeft: 10 }} />
                                        <Text style={challengeStyles.metaText}>{item.time}</Text>
                                    </View>
                                </View>
                                <AnimatedCircularProgress
                                    size={60}
                                    width={6}
                                    fill={item.progress}
                                    tintColor="#48d1cc"
                                    backgroundColor="#E0F7F6"
                                    rotation={0}
                                    lineCap="round"
                                >
                                    {() => <Text style={challengeStyles.progressText}>{item.progress > 0 ? `${item.progress}%` : '0'}</Text>}
                                </AnimatedCircularProgress>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity style={challengeStyles.activateButton} onPress={() => router.push('/(main)/ExerciseStart')}>
                <Text style={challengeStyles.activateButtonText}>Activate</Text>
            </TouchableOpacity>
        </>
    );
};

const ViewPlanScreen = () => {
    const { isChallenge } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.container}>
            {isChallenge === 'true' ? <ChallengeView /> : <DefaultView />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8F8' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
    backButton: { backgroundColor: '#fff', padding: 12, borderRadius: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    weekButton: { borderWidth: 1, borderColor: '#48d1cc', borderRadius: 5, paddingHorizontal: 15, paddingVertical: 8 },
    weekButtonText: { color: '#48d1cc', fontWeight: 'bold' },
    titleSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    exerciseCountContainer: { borderWidth: 1, borderColor: '#48d1cc', borderRadius: 5, paddingHorizontal: 12, paddingVertical: 6 },
    exerciseCountText: { color: '#48d1cc', fontSize: 12 },
    description: { fontSize: 14, color: '#666', paddingHorizontal: 20, marginTop: 10, lineHeight: 20 },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginTop: 20 },
    statBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#48d1cc', borderRadius: 7, paddingHorizontal: 15, paddingVertical: 10 },
    statText: { marginLeft: 8, color: '#333' },
    daysContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginTop: 20 },
    dayButton: { paddingVertical: 10, paddingHorizontal: 15, marginHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#48d1cc' },
    activeDay: { backgroundColor: '#48d1cc' },
    dayText: { color: '#48d1cc' },
    activeDayText: { color: '#fff' },
    lockedDayButton: { paddingVertical: 10, paddingHorizontal: 15, marginHorizontal: 5, borderRadius: 10, borderWidth: 1, borderColor: '#3EC6C9', backgroundColor: '#F5F5F5', justifyContent: 'center' },
    scheduleTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', paddingHorizontal: 20, marginTop: 30 },
    scheduleList: { paddingHorizontal: 20, marginTop: 15 },
    scheduleCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 15, padding: 10, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, backgroundColor: '#fff' },
    scheduleImage: { width: 80, height: 78, borderRadius: 5 },
    scheduleInfo: { marginLeft: 15, flex: 1 },
    scheduleCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    scheduleCardDetails: { color: '#666', fontWeight: 'normal' },
    scheduleMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    scheduleMetaText: { marginLeft: 5, color: '#666' },
    activateButton: { backgroundColor: '#48d1cc', paddingVertical: 18, marginHorizontal: 20, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
    activateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

const challengeStyles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 },
    backButton: { backgroundColor: '#fff', padding: 12, borderRadius: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    heartButton: { backgroundColor: '#fff', padding: 12, borderRadius: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    titleSection: { paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    weekBadge: { borderWidth: 1, borderColor: '#48d1cc', borderRadius: 5, paddingHorizontal: 12, paddingVertical: 6 },
    weekBadgeText: { color: '#48d1cc', fontSize: 12 },
    description: { fontSize: 14, color: '#666', paddingHorizontal: 20, marginTop: 10, lineHeight: 20 },
    scheduleTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', paddingHorizontal: 20, marginTop: 30 },
    timelineContainer: { paddingHorizontal: 20, marginTop: 20 },
    timelineItem: { flexDirection: 'row', alignItems: 'flex-start' },
    timelineIconContainer: { alignItems: 'center', marginRight: 15 },
    timelineIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    unlockedIcon: { backgroundColor: '#48d1cc' },
    lockedIcon: { backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#E0E0E0' },
    dottedLine: { width: 1, height: 60, borderStyle: 'dashed', borderWidth: 1, borderColor: '#48d1cc', marginVertical: 5 },
    card: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0F7F6', borderRadius: 15, padding: 15, marginBottom: 20 },
    cardTextContainer: { flex: 1 },
    weekText: { color: '#48d1cc', fontWeight: 'bold', fontSize: 12, marginBottom: 5 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    cardMeta: { flexDirection: 'row', alignItems: 'center' },
    metaText: { marginLeft: 5, color: '#555' },
    progressText: { fontWeight: 'bold', color: '#48d1cc' },
    activateButton: { backgroundColor: '#48d1cc', paddingVertical: 18, marginHorizontal: 20, borderRadius: 30, alignItems: 'center', marginVertical: 20 },
    activateButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default ViewPlanScreen;
