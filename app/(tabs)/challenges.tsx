import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChallengesScreen = () => {

    const happeningNow = [
        {
            id: '001',
            image: require('../../assets/images/challenge-1.png'),
            title: 'Challenge 001',
            description: 'Lorem ipsum is simply dummy text of the printing and type setting industry.',
            host: 'Mariya Reports',
            hostImage: require('../../assets/images/host.jpg'),
            created: '30 April 2025',
            joined: 150,
        },
        {
            id: '002',
            image: require('../../assets/images/challenge-2.png'),
            title: 'Challenge 002',
            description: 'Lorem ipsum is simply dummy text of the printing and type setting industry.',
            host: 'Mariya Reports',
            hostImage: require('../../assets/images/host.jpg'),
            created: '30 April 2025',
            joined: 150,
        },
    ];

    const comingUp = [
        {
            id: '001',
            image: require('../../assets/images/challenge-3.png'),
            title: 'Challenge 001',
            description: 'Lorem ipsum is simply dummy text of the printing and type setting industry.',
            host: 'Mariya Reports',
            hostImage: require('../../assets/images/host.jpg'),
            created: '30 April 2025',
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Challenges</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Happening Now</Text>
                        <Text style={styles.sectionSubtitle}>Space going on right now</Text>
                    </View>
                    <TouchableOpacity style={styles.createButton}>
                        <Text style={styles.createButtonText}>Create Challenge</Text>
                    </TouchableOpacity>
                </View>

                {happeningNow.map(challenge => (
                    <ImageBackground 
                        key={challenge.id}
                        source={require('../../assets/images/bottom-right.png')}
                        style={styles.challengeCard}
                        imageStyle={styles.cardBackgroundBottom}
                    >
                        <ImageBackground
                            source={require('../../assets/images/top-left.png')}
                            style={styles.cardContent}
                            imageStyle={styles.cardBackgroundTop}
                        >
                            <Image source={challenge.image} style={styles.challengeImage} />
                            <View style={styles.challengeDetails}>
                                <View style={styles.challengeInfoTop}>
                                    <View style={styles.joinedContainer}>
                                        <View style={styles.joinedImages}>
                                            {/* Placeholder for joined user images */}
                                        </View>
                                        <Text style={styles.joinedText}>{challenge.joined} Joined</Text>
                                    </View>
                                    <View style={styles.liveBadge}>
                                        <Ionicons name="radio-outline" size={14} color="#fff" />
                                        <Text style={styles.liveText}>Live</Text>
                                    </View>
                                </View>
                                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                                <Text style={styles.challengeDescription}>{challenge.description}</Text>
                                <View style={styles.challengeFooter}>
                                    <View style={styles.hostContainer}>
                                        <Image source={challenge.hostImage} style={styles.hostImage} />
                                        <Text style={styles.hostName}>{challenge.host}</Text>
                                        <View style={styles.hostBadge}>
                                            <Text style={styles.hostBadgeText}>Host</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.createdText}>Created on: {challenge.created}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </ImageBackground>
                ))}

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Coming up...</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {comingUp.map(challenge => (
                        <ImageBackground 
                            key={challenge.id}
                            source={require('../../assets/images/bottom-right.png')}
                            style={styles.comingUpCard}
                            imageStyle={styles.comingUpCardBackgroundBottom}
                        >
                            <ImageBackground
                                source={require('../../assets/images/top-left.png')}
                                style={styles.comingUpCardContent}
                                imageStyle={styles.comingUpCardBackgroundTop}
                            >
                                <Image source={challenge.image} style={styles.comingUpImage} />
                                <View style={styles.comingUpDetails}>
                                    <Text style={styles.challengeTitle}>{challenge.title}</Text>
                                    <Text style={styles.challengeDescription}>{challenge.description}</Text>
                                    <Text style={styles.createdText}>Created on: {challenge.created}</Text>
                                    <View style={styles.hostContainer}>
                                        <Image source={challenge.hostImage} style={styles.hostImage} />
                                        <Text style={styles.hostName}>{challenge.host}</Text>
                                        <View style={styles.hostBadge}>
                                            <Text style={styles.hostBadgeText}>Host</Text>
                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </ImageBackground>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    headerButton: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#48D1CC',
    },
    sectionSubtitle: {
        color: 'grey',
    },
    createButton: {
        backgroundColor: '#48D1CC',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    challengeCard: {
        marginHorizontal: 20,
        marginBottom: 15,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#F8F9FA',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardContent: {
        flexDirection: 'row',
        padding: 15,
    },
    cardBackgroundTop: {
        position: 'absolute',
        top: -20,
        left: -20,
        width: 150,
        height: 100,
        opacity: 0.5,
    },
    cardBackgroundBottom: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 150,
        height: 100,
        opacity: 0.5,
    },
    challengeImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    challengeDetails: {
        flex: 1,
        marginLeft: 15,
    },
    challengeInfoTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    joinedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    joinedImages: {
        flexDirection: 'row',
    },
    joinedText: {
        fontSize: 12,
        color: 'grey',
        marginLeft: 5,
    },
    liveBadge: {
        flexDirection: 'row',
        backgroundColor: '#48D1CC',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 15,
        alignItems: 'center',
    },
    liveText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 4,
        fontWeight: 'bold',
    },
    challengeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    challengeDescription: {
        fontSize: 12,
        color: 'grey',
        marginTop: 4,
    },
    challengeFooter: {
        marginTop: 10,
    },
    hostContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hostImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    hostName: {
        marginLeft: 8,
        fontSize: 12,
    },
    hostBadge: {
        backgroundColor: '#E0F7FA',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginLeft: 8,
    },
    hostBadgeText: {
        color: '#48D1CC',
        fontSize: 10,
        fontWeight: 'bold',
    },
    createdText: {
        fontSize: 10,
        color: 'grey',
        marginTop: 4,
    },
    comingUpCard: {
        backgroundColor: '#F8F9FA',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        marginLeft: 20,
        width: 310,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
        overflow: 'hidden',
    },
    comingUpCardContent: {
        flexDirection: 'row',
        padding: 15,
    },
    comingUpCardBackgroundTop: {
        position: 'absolute',
        top: -20,
        left: -20,
        width: 150,
        height: 100,
        opacity: 0.5,
    },
    comingUpCardBackgroundBottom: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 150,
        height: 100,
        opacity: 0.5,
    },
    comingUpImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    comingUpDetails: {
        flex: 1,
        marginLeft: 15,
    },
});

export default ChallengesScreen;
