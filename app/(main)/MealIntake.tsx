import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const MealIntakeScreen = () => {
    const router = useRouter();

    return (
        <ImageBackground source={require('../../assets/images/meal-intake.png')} style={styles.imageBackground}>
            <LinearGradient
                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.7)', 'white']}
                locations={[0, 0.45, 0.6]}
                style={styles.gradient}
            >
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color="#4A4F4E" />
                        </TouchableOpacity>

                        <View style={styles.titleContainer}>
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>Breakfast</Text>
                            </View>
                            <Text style={styles.title}>Banana Pancakes</Text>
                            <Text style={styles.title}>With Honey</Text>
                        </View>

                        <View style={styles.nutritionSection}>
                            <View style={styles.calorieCircleContainer}>
                                <PieChart
                                    data={[
                                        { value: 33.3, color: '#52C4C3', strokeWidth: 4, strokeColor: '#F7F8F8' },
                                        { value: 33.3, color: '#F9D45B', strokeWidth: 4, strokeColor: '#F7F8F8' },
                                        { value: 33.3, color: '#F4725D', strokeWidth: 4, strokeColor: '#F7F8F8' },
                                    ]}
                                    donut
                                    radius={65}
                                    innerRadius={56}
                                    centerLabelComponent={() => (
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={styles.calorieValue}>256</Text>
                                            <Text style={styles.calorieLabel}>Total Calories</Text>
                                        </View>
                                    )}
                                />
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
                    </ScrollView>
                                        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/')}>
                        <Text style={styles.addButtonText}>Add to Meal</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        flexGrow: 1,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        padding: 10,
        borderRadius: 25,
        zIndex: 10,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: '95%',
        marginBottom: 30,
    },
    tag: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#48d1cc',
        marginBottom: 15,
    },
    tagText: {
        color: '#48d1cc',
        fontWeight: '600',
        fontSize: 14,
    },
    title: {
        fontSize: 30,
        color: '#4A4F4E',
        fontWeight: '600',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    nutritionSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    calorieCircleContainer: {
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    calorieValue: {
        fontSize: 28,
        fontWeight: '600',
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
        paddingVertical: 15,
        marginHorizontal: 45,
        borderRadius: 10,
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
