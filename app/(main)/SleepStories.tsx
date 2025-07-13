import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, DimensionValue, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Star {
    id: number;
    top: number;
    left: number;
    size: number;
    opacity: number;
}

interface Story {
    id: number;
    title: string;
    subtitle?: string;
    image: any; // Can be more specific with ImageSourcePropType
    height: number;
    imageWidth: DimensionValue;
    imageHeight: number;
    imageStyle?: ViewStyle;
    cardStyle?: ViewStyle;
}

const Starfield = ({ starCount = 100 }) => {
    const [stars, setStars] = useState<Star[]>([]);
    useEffect(() => {
        const newStars = Array.from({ length: starCount }, (_, i) => ({
            id: i,
            top: Math.random() * height * 0.5,
            left: Math.random() * width,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
        }));
        setStars(newStars);
    }, [starCount]);

    return (
        <View style={styles.starfieldContainer} pointerEvents="none">
            {stars.map(star => (
                <View key={star.id} style={[styles.star, { top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity }]} />
            ))}
        </View>
    );
};

const stories: Story[] = [
    { id: 1, title: 'Lorem Ipsum', subtitle: 'Calm & Mindful Music for Better Sleep', image: require('../../assets/images/sleep-sound1.jpg'), height: 208, imageWidth: '100%', imageHeight: 120, imageStyle: {  } },
    { id: 2, title: 'Lorem Ipsum', image: require('../../assets/images/sleep-sound2.jpg'), height: 107, imageWidth: 110, imageHeight: 63, imageStyle: { right: 25 }, cardStyle: { transform: [{ translateY: 5 }] } },
    { id: 3, title: 'Lorem Ipsum', image: require('../../assets/images/sleep-sound3.jpg'), height: 107, imageWidth: 110, imageHeight: 63, imageStyle: { right: 25 }, cardStyle: { transform: [{ translateY: -10 }] } },
    { id: 4, title: 'Lorem Ipsum', image: require('../../assets/images/sleep-sound2.jpg'), height: 107, imageWidth: 110, imageHeight: 63, imageStyle: { right: 25 }, cardStyle: { transform: [{ translateY: -100 }] } },
    { id: 5, title: 'Lorem Ipsum', image: require('../../assets/images/sleep-sound4.jpg'), height: 107, imageWidth: 110, imageHeight: 63, imageStyle: { right: 25 }, cardStyle: { transform: [{ translateY: -15 }] } },
    { id: 6, title: 'Lorem Ipsum',subtitle: 'Calm & Mindful Music for Better Sleep', image: require('../../assets/images/sleep-sound1.jpg'), height: 167, imageWidth: 85, imageHeight: 77,cardStyle: { transform: [{ translateY: -100 }] } },
    { id: 7, title: 'Lorem Ipsum', subtitle: 'Calm & Mindful Music for Better Sleep', image: require('../../assets/images/sleep-sound4.jpg'), height: 167, imageWidth: 85, imageHeight: 77,imageStyle: { right: 5 },cardStyle: { transform: [{ translateY: -80 }] }},
    { id: 8, title: 'Lorem Ipsum', image: require('../../assets/images/sleep-sound3.jpg'), height: 104, imageWidth: 110, imageHeight: 63,imageStyle: { right: 25,bottom:5 },cardStyle: { transform: [{ translateY: -100 }] } },
    { id: 10, title: 'Lorem Ipsum', image: require('../../assets/images/sleep-sound3.jpg'), height: 104, imageWidth: 110, imageHeight: 63,imageStyle: { right: 25,bottom:5 },cardStyle: { transform: [{ translateY: -170 }, { translateX: 90 }] } },    
];

const SleepStoriesScreen = () => {
    const router = useRouter();

    return (
        <LinearGradient colors={['#2C5D63', '#438A94']} style={styles.safeArea}>
            <SafeAreaView style={{ flex: 1 }}>
                <Starfield />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sleep Stories</Text>
                </View>
                <ScrollView contentContainerStyle={styles.gridContainer}>
                    {stories.map(story => (
                        <TouchableOpacity key={story.id} style={[styles.card, { height: story.height }, story.cardStyle]} onPress={() => router.push('/(main)/play')}>
                            <Text style={styles.cardTitle}>{story.title}</Text>
                            <ImageBackground source={story.image} style={[styles.cardImage, { width: story.imageWidth, height: story.imageHeight }, story.imageStyle]} imageStyle={{ borderRadius: 15 }}>
                                <View style={styles.imageOverlay}>
                                    <TouchableOpacity style={styles.playButton}>
                                        <Ionicons name="play" size={20} color="white" style={{ marginLeft: 3 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.heartButton}>
                                        <Ionicons name="heart-outline" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                            {story.subtitle && <Text style={styles.cardSubtitle}>{story.subtitle}</Text>}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    starfieldContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    star: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginRight: 40, // Adjust for back button width
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
    },
    card: {
        width: (width - 50) / 2,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    cardTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageOverlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    playButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    cardSubtitle: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default SleepStoriesScreen;
