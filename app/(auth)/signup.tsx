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

export default function SignupScreen() {
  const [fullName, setFullName] = useState('Tim John');
  const [email, setEmail] = useState('youremail@gmail.com');
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

  const handleSignUp = () => {
    // Handle signup logic here
    router.replace('/(tabs)');
  };

  const handleLogin = () => {
    // Navigate back to login screen
    router.back();
  };

  const handleGoogleSignup = () => {
    // Handle Google signup
  };

  const handleAppleSignup = () => {
    // Handle Apple signup
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
                    <Text style={styles.title}>Welcome On Board!</Text>
                    <Text style={styles.subtitle}>Let's customize Lifeline for your goals.</Text>

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
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            onChangeText={setFullName}
                            autoCapitalize="words"
                            placeholder="Enter your full name"
                            placeholderTextColor="#aaa"
                        />

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

                        {/* Signup button */}
                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={handleSignUp}
                        >
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                        {/* Login link */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account? </Text>
                            <TouchableOpacity onPress={handleLogin}>
                                <Text style={styles.loginLink}>Log In</Text>
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
                                onPress={handleGoogleSignup}
                            >
                                <View style={styles.googleIconContainer}>
                                    <Text style={styles.googleText}>G</Text>
                                </View>
                                <Text style={styles.socialButtonText}>Continue with Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.socialButton}
                                onPress={handleAppleSignup}
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
        // Size is now dynamically changed with inline styles
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
    signupButton: {
        width: '100%',
        backgroundColor: '#00B3B3',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    loginText: {
        fontSize: 14,
        color: '#666',
    },
    loginLink: {
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