import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const ApplauseScreen = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    {/* <LinearGradient
                        colors={['rgba(62, 198, 201, 0.3)', 'rgba(62, 198, 201, 0)']}
                        style={styles.gradient}
                    /> */}
                    <Image
                        source={require('../../assets/images/Healthy_exercise.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.title}>You Did It! 💪</Text>
                <Text style={styles.subtitle}>Stronger Than Ever</Text>
                <Text style={styles.description}>
                    Your Dedication Has Made You Stronger.
                </Text>
                <Text style={styles.description}>
                    Keep Lifting, Keep Growing!
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        width: 250,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 125,
    },
    image: {
        width: '80%',
        height: '80%',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#4A4F4E',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3EC6C9',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default ApplauseScreen;
