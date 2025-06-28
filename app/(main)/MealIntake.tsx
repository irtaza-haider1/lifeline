import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const MealIntakeScreen = () => {
    const router = useRouter();

    const radius = 65;
    const circumference = 2 * Math.PI * radius;
    const progress = 0.81; // 81%
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground source={require('../../assets/images/meal-intake.png')} style={styles.imageBackground}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Breakfast</Text>
                        </View>
                        <Text style={styles.title}>Banana Pancakes</Text>
                        <Text style={styles.title}>With Honey</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.nutritionSection}>
                    <View style={styles.calorieCircleContainer}>
                        <Svg height={(radius + 15) * 2} width={(radius + 15) * 2} >
                            <Defs>
                                <LinearGradient id="grad" x1="0.5" y1="0" x2="0.5" y2="1">
                                    <Stop offset="0%" stopColor="#f7b733" />
                                    <Stop offset="50%" stopColor="#fc4a1a" />
                                    <Stop offset="100%" stopColor="#d7385e" />
                                </LinearGradient>
                            </Defs>
                            <Circle
                                stroke="#f0f4f8"
                                fill="none"
                                cx={radius + 15}
                                cy={radius + 15}
                                r={radius}
                                strokeWidth={14}
                            />
                            <Circle
                                stroke="url(#grad)"
                                fill="none"
                                cx={radius + 15}
                                cy={radius + 15}
                                r={radius}
                                strokeWidth={14}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                transform={`rotate(-90 ${radius + 15} ${radius + 15})`}
                            />
                        </Svg>
                        <View style={styles.calorieTextContainer}>
                            <Text style={styles.calorieValue}>256</Text>
                            <Text style={styles.calorieLabel}>Total Calories</Text>
                        </View>
                    </View>
                    <View style={styles.macrosContainer}>
                        <View style={styles.macroItem}>
                            <Text style={styles.macroPercentage}>81%</Text>
                            <Text style={styles.macroValue}>45g</Text>
                            <Text style={styles.macroLabel}>Proteins</Text>
                        </View>
                        <View style={styles.macroItem}>
                            <Text style={styles.macroPercentage}>81%</Text>
                            <Text style={styles.macroValue}>45g</Text>
                            <Text style={styles.macroLabel}>Carbs</Text>
                        </View>
                        <View style={styles.macroItem}>
                            <Text style={styles.macroPercentage}>81%</Text>
                            <Text style={styles.macroValue}>45g</Text>
                            <Text style={styles.macroLabel}>Fats</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add to Meal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    imageContainer: {
        height: '55%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 20,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    backButton: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: 25, zIndex: 10 },
    titleContainer: { alignItems: 'center' },
    tag: { backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#48d1cc', marginBottom: 15 },
    tagText: { color: '#48d1cc', fontWeight: '600', fontSize: 14 },
    title: { fontSize: 36, color: '#fff', fontWeight: 'bold', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 8 },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'space-between',
    },
    nutritionSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    calorieCircleContainer: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calorieTextContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    calorieValue: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#333',
    },
    calorieLabel: {
        fontSize: 14,
        color: '#888',
    },
    macrosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        marginLeft: 10,
    },
    macroItem: {
        alignItems: 'center',
    },
    macroPercentage: {
        fontSize: 16,
        color: '#48d1cc',
        fontWeight: 'bold',
    },
    macroValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
    macroLabel: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    addButton: {
        backgroundColor: '#48d1cc',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MealIntakeScreen;
