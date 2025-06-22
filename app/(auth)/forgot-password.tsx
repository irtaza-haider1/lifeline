import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
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

export default function ForgotPasswordScreen() {
  const [code, setCode] = useState(['', '', '', '']);
  const [email, setEmail] = useState('xyz@gmail.com');
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
  const containerWidth = screenDimensions.width < 350 
      ? Math.min(screenDimensions.width * 0.95, 340) // Smaller devices: 95% width up to 340px 
      : Math.min(screenDimensions.width * 0.88, 400); // Larger devices: 88% width up to 400px
  const paddingHorizontal = screenDimensions.width < 350 ? 12 : (screenDimensions.width < 380 ? 16 : 24);
  const illustrationSize = screenDimensions.width < 350 ? 100 : (screenDimensions.width < 400 ? 120 : 140);
  const codeInputSize = screenDimensions.width < 350 ? 42 : (screenDimensions.width < 400 ? 48 : 52); // Adjust verification code input size
  
  // Dynamic text sizes
  const titleSize = screenDimensions.width < 350 ? 22 : 24;
  const subtitleSize = screenDimensions.width < 350 ? 14 : 16;
  const labelSize = screenDimensions.width < 350 ? 13 : 14;
  const inputSize = screenDimensions.width < 350 ? 14 : 15;
  const codeFont = screenDimensions.width < 350 ? 16 : 18; // Font size for verification code
  
  // Create refs for each input field
  const firstInput = useRef<TextInput>(null);
  const secondInput = useRef<TextInput>(null);
  const thirdInput = useRef<TextInput>(null);
  const fourthInput = useRef<TextInput>(null);
  
  // Array of refs for easier access
  const inputs = [firstInput, secondInput, thirdInput, fourthInput];

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    // Auto-advance to next field if current field is filled
    if (text.length === 1 && index < 3) {
      inputs[index + 1].current?.focus();
    }
  };

  const handleVerify = () => {
    // Navigate to the main tabs screen
    router.replace('/(tabs)');
  };

  const handleResendCode = () => {
    // Handle resend code logic
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
              <Text style={[styles.title, { fontSize: titleSize }]}>Forgot Password?</Text>
              <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>Let's fix it!</Text>

              {/* Forgot password illustration */}
              <View style={styles.illustrationContainer}>
                <Image
                  source={require('../../assets/images/forgot-password.png')}
                  style={[styles.illustration, { width: illustrationSize, height: illustrationSize }]}
                  resizeMode="contain"
                />
              </View>

              {/* Form fields */}
              <View style={styles.formContainer}>
                <Text style={[styles.label, { fontSize: labelSize }]}>Enter Code</Text>
                
                {/* Verification code input */}
                <View style={styles.codeInputContainer}>
                  <TextInput
                    ref={firstInput}
                    style={[styles.codeInput, { width: codeInputSize, height: codeInputSize, fontSize: codeFont }]}
                    value={code[0]}
                    onChangeText={(text) => handleCodeChange(text, 0)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                  />
                  <TextInput
                    ref={secondInput}
                    style={[styles.codeInput, { width: codeInputSize, height: codeInputSize, fontSize: codeFont }]}
                    value={code[1]}
                    onChangeText={(text) => handleCodeChange(text, 1)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                  />
                  <TextInput
                    ref={thirdInput}
                    style={[styles.codeInput, { width: codeInputSize, height: codeInputSize, fontSize: codeFont }]}
                    value={code[2]}
                    onChangeText={(text) => handleCodeChange(text, 2)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                  />
                  <TextInput
                    ref={fourthInput}
                    style={[styles.codeInput, { width: codeInputSize, height: codeInputSize, fontSize: codeFont }]}
                    value={code[3]}
                    onChangeText={(text) => handleCodeChange(text, 3)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                  />
                </View>

                <Text style={styles.instructionText}>
                  Enter the 4-digit code sent to email {email} to reset your password.
                </Text>

                {/* Verify button */}
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={handleVerify}
                >
                  <Text style={styles.verifyButtonText}>Verify</Text>
                </TouchableOpacity>

                {/* Resend code link */}
                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>Didn't receive your code? </Text>
                  <TouchableOpacity onPress={handleResendCode}>
                    <Text style={styles.resendLink}>Resend it</Text>
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
        paddingTop: 20,
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16, // Add some horizontal padding for smaller screens
        width: '100%',
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
        // Width is now set dynamically with containerWidth
        borderRadius: 28,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.35)',
        backgroundColor: 'rgba(252, 255, 254, 0.75)',
        shadowColor: '#54c5d1',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.18,
        shadowRadius: 38,
        elevation: 0,
        alignSelf: 'center',
        zIndex: 3,
    },
    glassContent: {
        // Padding is now set dynamically with paddingHorizontal
        paddingTop: 14,
        paddingBottom: 14,
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 16,
    },
    subtitle: {
        color: '#666',
        textAlign: 'center',
        marginTop: 5,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    illustration: {
        // Width and height are now set dynamically with illustrationSize
    },
    formContainer: {
        width: '100%',
    },
    label: {
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: '500',
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
        marginTop: 8,
        width: '100%',
        paddingHorizontal: 20,
    },
    codeInput: {
        // Width and height now set dynamically with codeInputSize
        backgroundColor: 'transparent',
        borderRadius: 0,
        fontWeight: '600',
        borderBottomWidth: 2,
        borderBottomColor: '#00B3B3',
        textAlign: 'center',
        marginHorizontal: 6,
    },
    instructionText: {
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 10,
        lineHeight: 20,
        fontSize: 14,
    },
    verifyButton: {
        backgroundColor: '#00B3B3',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    verifyButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    resendText: {
        color: '#666',
    },
    resendLink: {
        color: '#00B3B3',
        fontWeight: '600',
        textDecorationLine: 'none',
    },
});