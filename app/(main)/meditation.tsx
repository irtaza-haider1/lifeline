import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Meditation = () => {

    const recents = [
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
                    <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/(main)/favourites')}>
                        <Ionicons name="heart-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.playerContainer}>
                    <ImageBackground 
                        source={require('../../assets/images/meditation-1.png')}
                        style={[styles.playerCard, styles.playerCardLeft]}
                        imageStyle={styles.playerImageBlurred}
                    />
                    <ImageBackground 
                        source={require('../../assets/images/meditation-1.png')}
                        style={[styles.playerCard, styles.playerCardRight]}
                        imageStyle={styles.playerImageBlurred}
                    />
                    <ImageBackground 
                        source={require('../../assets/images/meditation-1.png')} 
                        style={[styles.playerCard, styles.playerCardCenter]} 
                        imageStyle={styles.playerImage}
                    >
                        <LinearGradient 
                            colors={['transparent', 'rgba(0,0,0,0.6)']}
                            style={styles.playerContent}
                        >
                            <Text style={styles.playerTitle}>Spiritual</Text>
                            <View style={styles.playerDurationContainer}>
                                <Ionicons name="time-outline" size={16} color="white" />
                                <Text style={styles.playerDurationText}>10 min</Text>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </View>

                <View style={styles.recentsContainer}>
                    <Text style={styles.recentsTitle}>Recents</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {recents.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.recentItem} onPress={() => router.push('/(main)/play')}>
                                <Image source={item.image} style={styles.recentImage} />
                                <View style={styles.recentTextContainer}>
                                    <TouchableOpacity style={styles.favButton}>
                                        <Text style={styles.favButtonText}>Add to fav</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.recentTitle}>{item.title}</Text>
                                    <View style={styles.recentDurationContainer}>
                                        <Ionicons name="time-outline" size={14} color="#E0F2F1" />
                                        <Text style={styles.recentDurationText}>{item.duration}</Text>
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
    playerContainer: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    playerCard: {
        width: 220,
        height: 320,
        borderRadius: 110, 
        overflow: 'hidden',
        justifyContent: 'flex-end',
        position: 'absolute',
    },
    playerCardCenter: {
        zIndex: 10,
    },
    playerCardLeft: {
        transform: [{ translateX: -80 }, { rotate: '-15deg' }],
        opacity: 0.8,
    },
    playerCardRight: {
        transform: [{ translateX: 80 }, { rotate: '15deg' }],
        opacity: 0.8,
    },
    playerImage: {
        resizeMode: 'cover',
        borderWidth: 4,
        borderColor: '#6EE7D8',
        borderRadius: 110,
    },
    playerImageBlurred: {
        resizeMode: 'cover',
        borderRadius: 110,
        opacity: 0.5,
    },
    playerContent: {
        padding: 30,
        alignItems: 'center',
    },
    playerTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    playerDurationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    playerDurationText: {
        color: 'white',
        marginLeft: 5,
        fontSize: 14,
    },
    recentsContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    recentsTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    recentItem: {
        flexDirection: 'row',
        backgroundColor: 'rgba(77, 182, 172, 0.5)', // A semi-transparent teal
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        borderColor: 'rgba(102, 215, 209, 0.7)',
        borderWidth: 1,
    },
    recentImage: {
        width: 78,
        height: 78,
        borderRadius: 15,
    },
    recentTextContainer: {
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
    recentTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    recentDurationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recentDurationText: {
        color: '#E0F2F1',
        marginLeft: 5,
        fontSize: 12,
    },
});

export default Meditation;
