import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FavouritesScreen = () => {

    const favourites = [
        {
            image: require('../../assets/images/recent.png'),
            title: 'Soothing Sounds',
            duration: '20 min'
        },
        {
            image: require('../../assets/images/recent-2.png'),
            title: 'Soothing Sounds',
            duration: '20 min'
        },
        {
            image: require('../../assets/images/recent.png'),
            title: 'Soothing Sounds',
            duration: '20 min'
        },
    ];

    return (
        <LinearGradient colors={['#3A6A7E', '#4A7C89']} style={styles.container}>
            <SafeAreaView style={styles.flex}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Meditation</Text>
                    <View style={{ width: 40 }} /> 
                </View>

                <View style={styles.favouritesContainer}>
                    <Text style={styles.favouritesTitle}>Your Favorites</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {favourites.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.favouriteItem} onPress={() => router.push('/(main)/play')}>
                                <Image source={item.image} style={styles.favouriteImage} />
                                <View style={styles.favouriteTextContainer}>
                                    <TouchableOpacity style={styles.favButton}>
                                        <Text style={styles.favButtonText}>Add to fav</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.favouriteItemTitle}>{item.title}</Text>
                                    <View style={styles.favouriteDurationContainer}>
                                        <Ionicons name="time-outline" size={14} color="#E0F2F1" />
                                        <Text style={styles.favouriteDurationText}>{item.duration}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    headerButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    favouritesContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    favouritesTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    favouriteItem: {
        flexDirection: 'row',
        backgroundColor: 'rgba(77, 182, 172, 0.5)',
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        borderColor: 'rgba(102, 215, 209, 0.7)',
        borderWidth: 1,
    },
    favouriteImage: {
        width: 78,
        height: 78,
        borderRadius: 15,
    },
    favouriteTextContainer: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-around',
    },
    favButton: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    favButtonText: {
        color: '#2E5C6B',
        fontSize: 12,
        fontWeight: 'bold',
    },
    favouriteItemTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    favouriteDurationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    favouriteDurationText: {
        color: '#E0F2F1',
        marginLeft: 5,
        fontSize: 12,
    },
});

export default FavouritesScreen;
