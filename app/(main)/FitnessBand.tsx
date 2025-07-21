import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BandSetupModal from './BandSetupModal';

const FitnessBandScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Fitness Band</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/band.png')} style={styles.image} />
                </View>

                <Text style={styles.title}>Welcome To LifeLine</Text>
                <Text style={styles.subtitle}>
                    Keep track of your fitness level, monitor walking distance, calories burned and sleep quality.
                </Text>

                <TouchableOpacity style={styles.primaryButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.primaryButtonText}>Set Up Your Own Band</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Don't Have A Band</Text>
                </TouchableOpacity>
            </View>
            <BandSetupModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
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
        paddingHorizontal: 30,
        paddingTop: 40,
    },
    imageContainer: {
        backgroundColor: '#66D7D112',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#3EC6C9',
        padding: 20,
        marginBottom: 50,
    },
    image: {
        width: 250,
        height: 200,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
        marginBottom: 50,
        lineHeight: 24,
    },
    primaryButton: {
        backgroundColor: '#48D1CC',
        borderRadius: 15,
        paddingVertical: 18,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#B2EBF2',
        borderRadius: 15,
        paddingVertical: 18,
        width: '100%',
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FitnessBandScreen;
