import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

export default function MaleScreen() {
    const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        // Set up event listener for screen dimension changes
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenDimensions(window);
        });

        // Clean up the subscription on unmount
        return () => subscription.remove();
    }, []);

    // Calculate responsive sizes based on screen width
    const containerWidth = Math.min(screenDimensions.width * 0.9, 400); // 90% of screen width, max 400
    const paddingHorizontal = screenDimensions.width < 380 ? 16 : 24;

    const handleContinue = () => {
        // Navigate to the PrimaryGoal screen
        router.push('/(auth)/PrimaryGoal');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Top right corner circle */}
            <Image source={require('../../assets/images/Ellipse1.png')} style={styles.topCircle} />

            {/* Bottom left corner circle */}
            <Image source={require('../../assets/images/Ellipse2.png')} style={styles.bottomCircle} />

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/running.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <Shadow
                    distance={1}
                    offset={[0, 0]}
                >
                    <View style={[styles.glassContainer, { width: containerWidth }]}>
                        <BlurView intensity={-100} tint="light" style={StyleSheet.absoluteFill} />
                        <View style={[styles.glassContent, { padding: paddingHorizontal }]}>
                            <Text style={styles.title}>Over 10 Million People have use this</Text>

                            {/* Men image with shadow */}
                            <View style={styles.imageContainer}>
                                <Image
                                    source={require('../../assets/images/male1.png')}
                                    style={styles.menImage}
                                    resizeMode="contain"
                                />
                                {/* Enhanced gradient overlay at the bottom of the image */}
                                <LinearGradient
                                    colors={[
                                        'rgba(244, 254, 253, 0)', 
                                        'rgba(244, 254, 253, 0.3)', 
                                        'rgba(244, 254, 253, 0.8)', 
                                        'rgba(244, 254, 253, 0.95)'
                                    ]}
                                    locations={[0, 0.4, 0.7, 1]}
                                    style={styles.imageGradient}
                                />
                            </View>

                            {/* Description text */}
                            <Text style={styles.description}>
                                LifeLine will help you in this fitness journey with science based approach this
                            </Text>

                            {/* Continue button */}
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={handleContinue}
                            >
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Shadow>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4FEFD', // Light teal background like login screen
        paddingTop: 20,
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    topCircle: {
        position: 'absolute',
        top: -105,
        right: -50,
        opacity: 0.77,
        zIndex: 1,
    },
    bottomCircle: {
        position: 'absolute',
        bottom: -150,
        left: -140,
        opacity: 0.73,
        zIndex: 2,
    },
    logoContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10, // Higher z-index to ensure it's above everything
        // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add background for visibility
        padding: 8,
        borderRadius: 8,
    },
    logo: {
        width: 100,
        height: 40,
    },
    glassContainer: {
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.35)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        shadowColor: '#54c5d1',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.18,
        shadowRadius: 38,
        elevation: 0,
        alignSelf: 'center',
        zIndex: 3,
    },
    glassContent: {
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    menImage: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120, // Increased height for better gradient effect
        zIndex: 1,
        borderRadius: 12, // Match container border radius
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    continueButton: {
        width: '100%',
        backgroundColor: '#00B3B3',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 