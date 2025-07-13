import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PlayScreen = () => {
    const router = useRouter();

    return (
        <ImageBackground
            source={require('../../assets/images/play.jpg')}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="heart-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.playerContainer}>
                    <View style={styles.glassContainer}>
                        <Text style={styles.title}>Nature stroll sound</Text>
                        <Text style={styles.subtitle}>Lorem Ipsum is simply dummy</Text>
                        
                        <View style={styles.controlsContainer}>
                            <TouchableOpacity>
                                <Ionicons name="shuffle" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="play-skip-back" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.playPauseButton}>
                                <Ionicons name="pause" size={32} color="#2C5D63" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="play-skip-forward" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="repeat" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sliderView}>
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                                thumbTintColor="#FFFFFF"
                            />
                        </View>
                        
                        <View style={styles.timeContainer}>
                            <Text style={styles.timeText}>0:45</Text>
                            <Text style={styles.timeText}>03:55</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    iconButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerContainer: {
        padding: 20,
    },
    glassContainer: {
        backgroundColor: 'rgba(78, 116, 122, 0.5)',
        borderRadius: 20,
        padding: 20,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 20,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
    },
    playPauseButton: {
        backgroundColor: 'white',
        borderRadius: 35,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderView: {
        width: '100%',
        alignItems: 'center',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        color: 'white',
        fontSize: 12,
    },
});

export default PlayScreen;
