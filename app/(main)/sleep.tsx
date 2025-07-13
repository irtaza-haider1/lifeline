import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface Star {
    id: number;
    top: number;
    left: number;
    size: number;
    opacity: number;
}

const Starfield = ({ starCount = 100 }) => {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: starCount }, (_, i) => ({
            id: i,
            top: Math.random() * height * 0.5, // Only in the top half
            left: Math.random() * width,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
        }));
        setStars(newStars);
    }, [starCount]);

    return (
        <View style={styles.starfieldContainer} pointerEvents="none">
            {stars.map(star => (
                <View
                    key={star.id}
                    style={[
                        styles.star,
                        {
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            opacity: star.opacity,
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const BetterSleepScreen = () => {
    const router = useRouter();

    return (
        <ImageBackground
            source={require('../../assets/images/sleep-tab.png')}
            style={styles.background}
        >
            <Starfield />
            <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,1)']}
                locations={[0, 0.5, 0.8]}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Better Sleep</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Sleep Purely</Text>
                        <Text style={styles.subtitle}>
                            "Promise yourself to take care of your mental health as diligently as you do your physical well-being"
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/(main)/Analysis')}>
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    starfieldContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    star: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 50,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 1,
    },
    background: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'transparent',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 80,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250, 
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    footer: {
        paddingBottom: 40,
    },
    continueButton: {
        backgroundColor: '#48D1CC',
        paddingVertical: 18,
        width:"85%",
        left:30,
        borderRadius: 10.28,
        alignItems: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default BetterSleepScreen;
