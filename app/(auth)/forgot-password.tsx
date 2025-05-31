import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const [code, setCode] = useState(['', '', '', '']);
  const [email, setEmail] = useState('xyz@gmail.com');
  
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
      <View style={styles.topCircle} />
      
      {/* Bottom left corner circle */}
      <View style={styles.bottomCircle} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Glass container */}
        <View style={styles.glassContainer}>
          <BlurView intensity={70} tint="light" style={styles.blurView}>
            <View style={styles.glassContent}>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>Let's fix it!</Text>

              {/* Forgot password illustration */}
              <View style={styles.illustrationContainer}>
                <Image
                  source={require('../../assets/images/forgot-password.png')}
                  style={styles.illustration}
                  resizeMode="contain"
                />
              </View>

              {/* Form fields */}
              <View style={styles.formContainer}>
                <Text style={styles.label}>Enter Code</Text>
                
                {/* Verification code input */}
                <View style={styles.codeInputContainer}>
                  <TextInput
                    ref={firstInput}
                    style={styles.codeInput}
                    value={code[0]}
                    onChangeText={(text) => handleCodeChange(text, 0)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                  />
                  <TextInput
                    ref={secondInput}
                    style={styles.codeInput}
                    value={code[1]}
                    onChangeText={(text) => handleCodeChange(text, 1)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                  />
                  <TextInput
                    ref={thirdInput}
                    style={styles.codeInput}
                    value={code[2]}
                    onChangeText={(text) => handleCodeChange(text, 2)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                  />
                  <TextInput
                    ref={fourthInput}
                    style={styles.codeInput}
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
                <View style={styles.verifyButtonContainer}>
                  <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={handleVerify}
                  >
                    <Text style={styles.verifyButtonText}>Verify</Text>
                  </TouchableOpacity>
                </View>

                {/* Resend code link */}
                <View style={styles.resendContainer}>
                  <Text style={styles.resendText}>Didn't receive your code? </Text>
                  <TouchableOpacity onPress={handleResendCode}>
                    <Text style={styles.resendLink}>Resend it</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  topCircle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderBottomLeftRadius: 100,
    zIndex: -1,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderTopRightRadius: 100,
    zIndex: -1,
  },
  glassContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  blurView: {
    borderRadius: 25,
  },
  glassContent: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    marginVertical: 20,
  },
  illustration: {
    width: 180,
    height: 180,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 12,
  },
  codeInput: {
    width: 45,
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '600',
    borderBottomWidth: 2,
    borderBottomColor: '#00B3B3',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  verifyButtonContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 8,
    width: 221.9,
    height: 46.27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
  },
  resendLink: {
    fontSize: 14,
    color: '#00B3B3',
    fontWeight: '600',
  },
}); 