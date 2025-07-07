import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const initialWorkoutData = [
    { image: require('../../assets/images/workout-1.png'), category: 'Release Stress', title: 'Full Body workout', count: '25 Exercises', liked: false, activated: false },
    { image: require('../../assets/images/workout-2.png'), category: 'Release Stress', title: 'Full Body workout', count: '25 Exercises', liked: true, activated: false },
    { image: require('../../assets/images/workout-3.png'), category: 'Release Stress', title: 'Full Body workout', count: '25 Exercises', liked: false, activated: false },
    { image: require('../../assets/images/workout-4.png'), category: 'Release Stress', title: 'Full Body workout', count: '25 Exercises', liked: true, activated: false },
];

const ExerciseScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [workouts, setWorkouts] = useState(initialWorkoutData);

    useEffect(() => {
        if (params.activatedIndex) {
            const index = parseInt(params.activatedIndex as string, 10);
            if (!isNaN(index)) {
                const updatedWorkouts = workouts.map((workout, i) => (
                    i === index ? { ...workout, activated: true } : workout
                ));
                setWorkouts(updatedWorkouts);
            }
        }
    }, [params.activatedIndex]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Exercise</Text>
                </View>

                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci
                </Text>

                <View style={styles.workoutList}>
                    {workouts.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.workoutCard} onPress={() => router.push({ pathname: '/(main)/ViewPlan', params: { workoutIndex: index, isChallenge: index === 2 ? 'true' : 'false' } })}>
                            <ImageBackground source={item.image} style={styles.imageBackground} imageStyle={{ borderRadius: 20 }}>
                                {item.activated && (
                                    <View style={styles.activatedBadge}>
                                        <Text style={styles.activatedText}>Activated</Text>
                                    </View>
                                )}
                                <TouchableOpacity style={styles.heartIconContainer}>
                                    <Feather name="heart" size={20} color={item.liked ? '#48d1cc' : '#fff'} />
                                </TouchableOpacity>
                                <View style={styles.cardContent}>
                                    <View>
                                        <Text style={styles.categoryText}>{item.category}</Text>
                                        <Text style={styles.titleText}>{item.title}</Text>
                                    </View>
                                    <Text style={styles.countText}>{item.count}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8F8' },
    scrollContainer: { marginBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 20, position: 'relative' },
    backButton: { position: 'absolute', left: 20, top: 20, backgroundColor: '#fff', padding: 12, borderRadius: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    description: { fontSize: 14, color: '#666', paddingHorizontal: 20, marginTop: 20, lineHeight: 20 },
    workoutList: { paddingHorizontal: 20, marginTop: 20 },
    workoutCard: { marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    imageBackground: { height: 200, borderRadius: 20, overflow: 'hidden', justifyContent: 'flex-end' },
    activatedBadge: { position: 'absolute', top: 15,backgroundColor: '#48d1cc', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15 },
    activatedText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    heartIconContainer: { position: 'absolute', top: 15, right: 15, backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: 8, borderRadius: 20 },
    cardContent: { backgroundColor: '#48d1cc', padding: 15, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
    categoryText: { color: 'white', fontSize: 12, fontWeight: '500' },
    titleText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 5 },
    countText: { color: 'white', fontSize: 12, fontWeight: '500' },
});

export default ExerciseScreen;
