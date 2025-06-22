import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
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
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        // Set up event listener for screen dimension changes (orientation changes, foldable devices, etc)
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setScreenDimensions(window);
        });
        
        // Clean up the subscription on unmount
        return () => subscription.remove();
    }, []);

    // Calculate responsive sizes based on screen width
    const containerWidth = Math.min(screenDimensions.width * 0.9, 400); // 90% of screen width, max 400
    const paddingHorizontal = screenDimensions.width < 380 ? 16 : 24;
    const illustrationSize = screenDimensions.width < 350 ? 120 : 140;

    const handleLogin = () => {
        router.push('/(auth)/Gender');
    };

    const handleSignUp = () => {
        router.push('/(auth)/signup');
    };

    const handleGoogleLogin = () => { };
    const handleAppleLogin = () => { };

    const handleForgotPassword = () => {
        router.push('/(auth)/forgot-password');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* Top right corner circle */}
            <Image source={require('../../assets/images/Ellipse1.png')} style={styles.topCircle} />
            {/* Bottom left corner circle */}
            <Image source={require('../../assets/images/Ellipse2.png')} style={styles.bottomCircle} />

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
                            <Text style={styles.title}>Welcome Back!</Text>
                            <Text style={styles.subtitle}>Login with</Text>

                            {/* Login illustration */}
                            <View style={styles.illustrationContainer}>
                                <Image
                                    source={require('../../assets/images/Frame.png')}
                                    style={[styles.illustration, { width: illustrationSize, height: illustrationSize }]}
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Form fields */}
                            <View style={styles.formContainer}>
                                <Text style={styles.label}>Email Address</Text>
                                <TextInput
                                    style={styles.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholder="Enter your email"
                                    placeholderTextColor="#aaa"
                                />

                                <Text style={styles.label}>Password</Text>
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!passwordVisible}
                                        placeholder="**********"
                                        placeholderTextColor="#aaa"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setPasswordVisible(!passwordVisible)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                                            size={22}
                                            color="#888"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={handleForgotPassword}
                                    style={styles.forgotPasswordContainer}
                                >
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>

                                {/* Login button */}
                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={handleLogin}
                                >
                                    <Text style={styles.loginButtonText}>Log In</Text>
                                </TouchableOpacity>

                                {/* Sign up link */}
                                <View style={styles.signUpContainer}>
                                    <Text style={styles.signUpText}>Don't have an account? </Text>
                                    <TouchableOpacity onPress={handleSignUp}>
                                        <Text style={styles.signUpLink}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Or divider */}
                                <View style={styles.orContainer}>
                                    <Text style={styles.orText}>Or</Text>
                                </View>

                                {/* Social login buttons */}
                                <View style={styles.socialButtonsContainer}>
                                    <TouchableOpacity
                                        style={styles.socialButton}
                                        onPress={handleGoogleLogin}
                                    >
                                        <View style={styles.googleIconContainer}>
                                            <Text style={styles.googleText}>G</Text>
                                        </View>
                                        <Text style={styles.socialButtonText}>Continue with Google</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.socialButton}
                                        onPress={handleAppleLogin}
                                    >
                                        <Ionicons name="logo-apple" size={22} color="#000" style={styles.appleIcon} />
                                        <Text style={styles.socialButtonText}>Continue with Apple</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
        backgroundColor: '#F4FEFD',
        // position: 'relative',
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
        // width: 160,
        // height: 120,
        // backgroundColor: '#3EC6C9',
        // borderRadius: 100,
        opacity: 0.73,
        zIndex: 2,
    },
    glassContainer: {
        // Width is now set dynamically
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.35)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        shadowColor: '#54c5d1',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.18,
        shadowRadius: 38,
        elevation: 0, // <-- key!
        alignSelf: 'center',
        zIndex: 3,
    },
    glassContent: {
        // Padding is now set dynamically
        paddingTop: 14,
        paddingBottom: 14,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    illustration: {
        width: 140,
        height: 140,
    },
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0f3f2',   // subtle light teal/gray
        paddingVertical: 6,
        paddingHorizontal: 0,
        marginBottom: 16,
        fontSize: 15,
        backgroundColor: 'transparent',
        color: '#222',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0f3f2',
        marginBottom: 16,
        backgroundColor: 'transparent',
        borderRadius: 0,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 0,
        fontSize: 15,
        backgroundColor: 'transparent',
        color: '#222',
    },
    eyeIcon: {
        padding: 6,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#00B3B3',
    },
    loginButton: {
        backgroundColor: '#00B3B3',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    signUpText: {
        fontSize: 14,
        color: '#666',
    },
    signUpLink: {
        fontSize: 14,
        color: '#00B3B3',
        fontWeight: '600',
    },
    orContainer: {
        alignItems: 'center',
        marginVertical: 6,
    },
    orText: {
        fontSize: 14,
        color: '#666',
    },
    socialButtonsContainer: {
        marginTop: 6,
        gap: 10,
        width: '100%',
        marginBottom: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        marginBottom: 4,
    },
    googleIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    googleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4285F4',
    },
    appleIcon: {
        marginRight: 8,
    },
    socialButtonText: {
        fontSize: 14,
        color: '#333',
    },
});
