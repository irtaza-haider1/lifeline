import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const JoinChallengeScreen = () => {

    const workouts = [
        {
            id: '1',
            title: 'Dumbbell Flyes (Chest)',
            image: require('../../assets/images/workout-1.png'),
            cal: '15 cal',
            time: '15 mints',
            locked: true,
        },
        {
            id: '2',
            title: 'Dumbbell Flyes (Chest)',
            image: require('../../assets/images/workout-2.png'),
            cal: '15 cal',
            time: '15 mints',
            locked: true,
        },
        {
            id: '3',
            title: 'Dumbbell Flyes (Chest)',
            image: require('../../assets/images/workout-3.png'),
            cal: '15 cal',
            time: '15 mints',
            locked: true,
        },
    ];



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>View Plan</Text>
                <View style={{ width: 40 }} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={require('../../assets/images/workout-2.png')} style={styles.banner}>
                    <View style={styles.bannerOverlay}>
                        <View>
                            <Text style={styles.bannerTitle}>Challenge 001</Text>
                            <View style={styles.bannerDetails}>
                                <Ionicons name="time-outline" size={16} color="#fff" />
                                <Text style={styles.bannerText}>25 mint</Text>
                                <Ionicons name="flame-outline" size={16} color="#fff" style={{ marginLeft: 10 }} />
                                <Text style={styles.bannerText}>323 kcl</Text>
                            </View>
                        </View>
                        <View style={styles.joinedContainer}>
                            {/* Placeholder for joined user images */}
                            <Text style={styles.joinedText}>150 Joined</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.joinButton} onPress={() => router.push('/(main)/ChallengeSpace')}>
                        <Text style={styles.joinButtonText}>Join Now Only in 1.00$/day</Text>
                    </TouchableOpacity>

                    <View style={styles.infoContainer}>
                        <Ionicons name="help-circle-outline" size={24} color="grey" />
                        <Text style={styles.infoText}>Fasting helps you take control of your hunger and build healthier habits.</Text>
                    </View>

                    <Text style={styles.includesTitle}>It Will Includes</Text>

                    <View style={styles.workoutList}>
                        {workouts.map((item, index) => (
                            <View key={item.id} style={styles.workoutItemContainer}>
                                <View style={styles.lockContainer}>
                                    <View style={styles.lockIcon}>
                                        <Ionicons name="lock-closed-outline" size={24} color="#48D1CC" />
                                    </View>
                                    {index < workouts.length - 1 && <View style={styles.dottedLine} />}
                                </View>
                                <View style={styles.workoutCard}>
                                    <Image source={item.image} style={styles.workoutImage} />
                                    <View style={styles.workoutDetails}>
                                        <Text style={styles.workoutTitle}>{item.title}</Text>
                                        <View style={styles.workoutStats}>
                                            <Ionicons name="flame-outline" size={14} color="grey" />
                                            <Text style={styles.workoutStatText}>{item.cal}</Text>
                                            <Ionicons name="time-outline" size={14} color="grey" style={{ marginLeft: 10 }} />
                                            <Text style={styles.workoutStatText}>{item.time}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    headerButton: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    banner: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-end',
    },
    bannerOverlay: {
        backgroundColor: 'rgba(72, 209, 204, 0.8)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    bannerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    bannerText: {
        color: '#fff',
        marginLeft: 5,
    },
    joinedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    joinedText: {
        color: '#fff',
        marginLeft: 5,
    },
    contentContainer: {
        padding: 20,
        marginTop: 20, // Add margin to separate from banner
    },
    joinButton: {
        backgroundColor: '#48D1CC',
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    joinButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    infoText: {
        marginLeft: 10,
        color: 'grey',
        flex: 1,
    },
    includesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 10,
    },
    workoutList: {},
    workoutItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    lockContainer: {
        alignItems: 'center',
        marginRight: 15,
    },
    lockIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0F7FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dottedLine: {
        width: 1,
        height: 70, // Adjust height to connect the items
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#48D1CC',
    },
    workoutCard: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#66D7D124',
        borderRadius: 15,
        borderColor: '#3EC6C9',
        borderWidth: 1,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    workoutImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    workoutDetails: {
        marginLeft: 15,
        flex: 1,
    },
    workoutTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    workoutStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    workoutStatText: {
        marginLeft: 5,
        color: 'grey',
    },
});

export default JoinChallengeScreen;
