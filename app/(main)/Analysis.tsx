import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface Star {
    id: number;
    top: number;
    left: number;
    size: number;
    opacity: number;
}

type Point = [number, number];

const Starfield = ({ starCount = 50 }) => {
    const [stars, setStars] = React.useState<Star[]>([]);

    React.useEffect(() => {
        const newStars = Array.from({ length: starCount }, (_, i) => ({
            id: i,
            top: Math.random() * 300,
            left: Math.random() * width,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
        }));
        setStars(newStars);
    }, [starCount]);

    return (
        <View style={styles.starfieldContainer} pointerEvents="none">
            {stars.map(star => (
                <View
                    key={star.id}
                    style={[
                        styles.star,
                        {
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            opacity: star.opacity,
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const AnalysisScreen = () => {
    const router = useRouter();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentDay = today.getDate();
    const currentDayOfWeek = today.getDay();

        const data = [7, 8, 9, 8.5, 7, 8, 7.5];
    const chartHeight = 200;
    const chartWidth = width - 80;
    const xStep = chartWidth / (data.length - 1);
    const yMax = 10;

                    const line = (points: Point[]): string => {
            const d = points.reduce((acc: string, point: Point, i: number, a: Point[]) => {
        if (i === 0) {
          return `M ${point[0]},${point[1]}`;
        }
        const [cpsX, cpsY] = controlPoint(a[i - 2], a[i - 1], point);
        const [cpeX, cpeY] = controlPoint(a[i - 1], point, a[i + 1], true);
        return `${acc} C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
      }, '');
      return d;
    };

        const controlPoint = (p1: Point | undefined, p2: Point, p3: Point | undefined, reverse = false): Point => {
      const smoothing = 0.2;
      const prev = p1 || p2;
      const next = p3 || p2;
      const angle = Math.atan2(next[1] - prev[1], next[0] - prev[0]) + (reverse ? Math.PI : 0);
      const length = Math.sqrt(Math.pow(next[0] - prev[0], 2) + Math.pow(next[1] - prev[1], 2)) * smoothing;
      const x = p2[0] + Math.cos(angle) * length;
      const y = p2[1] + Math.sin(angle) * length;
      return [x, y];
    };

        const chartPoints = data.map((p, i): Point => {
        const x = i * xStep;
        const y = chartHeight - (p / yMax) * chartHeight;
        return [x, y];
    });

    const path = line(chartPoints);

    return (
        <LinearGradient colors={['#2C5D63', '#438A94']} style={styles.safeArea}>
            <SafeAreaView style={{ flex: 1 }}>
                <Starfield />
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Better Sleep</Text>
                    </View>

                    <View style={styles.calendarContainer}>
                        {weekDays.map((day, index) => {
                            const date = new Date();
                            date.setDate(currentDay - (currentDayOfWeek - index));
                            const dayOfMonth = date.getDate();
                            const isActive = dayOfMonth === currentDay;

                            return (
                                <View key={day} style={styles.dayContainer}>
                                    <Text style={styles.dayText}>{day}</Text>
                                    <TouchableOpacity style={[styles.dateButton, isActive && styles.activeDate]}>
                                        <Text style={[styles.dateText, isActive && styles.activeDateText]}>{dayOfMonth}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>

                    <View style={styles.cardsContainer}>
                        <View style={styles.largeCard}>
                            <Text style={styles.cardTitle}>Average Sleep</Text>
                            <View style={styles.progressContainer}>
                                <Svg height="120" width="120" viewBox="0 0 120 120">
                                    <Circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.2)" strokeWidth="12" fill="none" />
                                    <Path
                                        d="M 60 10 A 50 50 0 1 1 20.3 93.5"
                                        stroke="white"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </Svg>
                                <View style={styles.progressTextContainer}>
                                    <Text style={styles.progressText}>7h 16m</Text>
                                </View>
                            </View>
                            <Text style={styles.cardSubtitle}>Your average Sleep score is good</Text>
                        </View>
                        <View style={styles.smallCardsColumn}>
                            <View style={styles.smallCard}>
                                <Text style={styles.cardTitle}>Bed Time</Text>
                                <Text style={styles.cardTime}>06:30 PM</Text>
                                <Image source={require('../../assets/images/cusion.png')} style={styles.cardIcon} />
                            </View>
                            <View style={styles.smallCard}>
                                <Text style={styles.cardTitle}>Wake Up Time</Text>
                                <Text style={styles.cardTime}>06:30 PM</Text>
                                <Image source={require('../../assets/images/alarm-clock.png')} style={styles.cardIcon} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.cardsContainer, { marginTop: 10 }]}>
                        <TouchableOpacity onPress={() => router.push('/(main)/SleepSound')} style={styles.mediumCard}>
                            <Text style={styles.cardTitle}>Sleep Sounds</Text>
                            <Text style={styles.cardDescription}>Lorem ipsum is a dummy data.</Text>
                            <Image source={require('../../assets/images/sleep-sound.png')} style={styles.bottomIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/(main)/SleepStories')} style={styles.mediumCard}>
                            <Text style={styles.cardTitle}>Sleep Stories</Text>
                            <Text style={styles.cardDescription}>you will get new story daily</Text>
                            <Image source={require('../../assets/images/books.png')} style={styles.bottomIcon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.chartContainer}>
                        <Text style={styles.chartTitle}>Sleep Insight</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.yAxis, { height: chartHeight }]}>
                                {['10 h', '8 h', '6 h', '2 h', '0 h'].map(label => <Text key={label} style={styles.axisLabel}>{label}</Text>)}
                            </View>
                            <Svg height={chartHeight} width={chartWidth}>
                                <Path d={path} fill="none" stroke="white" strokeWidth="2" />
                                <Circle cx={chartPoints[3][0]} cy={chartPoints[3][1]} r="5" fill="white" />
                            </Svg>
                        </View>
                        <View style={styles.xAxis}>
                            {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(label => <Text key={label} style={styles.axisLabel}>{label}</Text>)}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
        container: {
        flex: 1,
        backgroundColor: 'transparent',
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
        marginLeft: 70,
    },
    calendarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    dayContainer: {
        alignItems: 'center',
    },
    dayText: {
        color: 'white',
        marginBottom: 10,
    },
    dateButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    activeDate: {
        backgroundColor: 'white',
        borderColor: 'white',
    },
    dateText: {
        color: 'white',
        fontWeight: 'bold',
    },
    activeDateText: {
        color: '#2C5D63',
    },
    cardsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
    },
    largeCard: {
        width: '58%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 15,
        height: 250,
    },
    smallCardsColumn: {
        width: '38%',
        justifyContent: 'space-between',
    },
    smallCard: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 15,
        height: 120,
        position: 'relative',
    },
    mediumCard: {
        width: '48%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 15,
        height: 150,
    },
    cardTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10,
    },
    cardTime: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
    },
    cardDescription: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
    cardIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    bottomIcon: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    progressTextContainer: {
        position: 'absolute',
    },
    progressText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    chartContainer: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        margin: 20,
        padding: 20,
    },
    chartTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    yAxis: {
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    xAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 40, // To align with chart
        paddingTop: 10,
    },
    axisLabel: {
        color: 'white',
        fontSize: 12,
    },
});

export default AnalysisScreen;
