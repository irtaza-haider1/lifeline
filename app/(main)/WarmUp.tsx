import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import RecoveryRunModal from './RecoveryRunModal';

const WarmUpScreen = () => {
    const [countdown, setCountdown] = useState(10);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPlayerVisible, setPlayerVisible] = useState(false);

        useEffect(() => {
        if (countdown > 0 && !isPlayerVisible) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setModalVisible(true);
        }
    }, [countdown, isPlayerVisible]);

    const handleModalClose = () => {
        setModalVisible(false);
        setPlayerVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Running</Text>
                <View style={{ width: 40 }} />
            </View>

                        <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/workout-1.png')} style={styles.image} />
                    <TouchableOpacity style={styles.volumeButton}>
                        <Ionicons name="volume-medium-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {isPlayerVisible ? (
                    <View style={styles.playerDetailsContainer}>
                        <Text style={styles.playerTitle}>Recovery Run</Text>
                        <Text style={styles.playerDescription}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </Text>
                    </View>
                ) : (
                    <View style={styles.detailsContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Ready to go!</Text>
                            <TouchableOpacity style={styles.helpButton}>
                                <Text style={styles.helpText}>?</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.subtitle}>Having a structured plan is crucial to fitness</Text>

                        <View style={styles.timerContainer}>
                            <AnimatedCircularProgress
                                size={150}
                                width={10}
                                fill={(countdown / 10) * 100}
                                tintColor="#48D1CC"
                                backgroundColor="#E0F7FA"
                                rotation={0}
                                lineCap="round"
                            >
                                {() => <Text style={styles.timerText}>{countdown}</Text>}
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                )}
            </View>

            {isPlayerVisible ? (
                <View style={styles.playerContainer}>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.timeText}>01:00</Text>
                        <Slider
                            style={{ flex: 1, marginHorizontal: 10 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#48D1CC"
                            maximumTrackTintColor="#E0F7FA"
                            thumbTintColor="#48D1CC"
                        />
                        <Text style={styles.timeText}>00:47</Text>
                    </View>
                    <View style={styles.controlsContainer}>
                        <TouchableOpacity>
                            <Ionicons name="refresh-outline" size={30} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="play-skip-back" size={30} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playButton}>
                            <Ionicons name="pause" size={40} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="play-skip-forward" size={30} color="#333" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="refresh-outline" size={30} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.skipButton}>
                        <Text style={styles.skipButtonText}>Skip</Text>
                    </TouchableOpacity>
                </View>
            )}

            <RecoveryRunModal
                isVisible={isModalVisible}
                onClose={handleModalClose}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    playerDetailsContainer: {
        flex: 1,
        width: '90%',
        alignItems: 'center',
    },
    playerContainer: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: '#66D7D124',
        borderTopWidth: 1,
        borderColor: '#3EC6C9',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    },
    playerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    playerDescription: {
        fontSize: 14,
        color: 'grey',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    timeText: {
        color: 'grey',
        fontSize: 12,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    playButton: {
        backgroundColor: '#48D1CC',
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    backButton: {
        backgroundColor: '#E0F7FA',
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        borderRadius: 1,
        marginBottom: 30,
    },
    image: {
        width: '100%',
        height: '100%',
        // borderRadius: 15,
    },
    volumeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 8,
        borderRadius: 20,
    },
    detailsContainer: {
        alignItems: 'center',
        width: '100%',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    helpButton: {
        marginLeft: 15,
        backgroundColor: '#F0F0F0',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey',
    },
    subtitle: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
        marginBottom: 40,
    },
    timerContainer: {
        marginBottom: 40,
    },
    timerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    cancelButton: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 15,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    skipButton: {
        backgroundColor: '#48D1CC',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 15,
    },
    skipButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default WarmUpScreen;
