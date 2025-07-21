import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarPickerModal from './CalendarPickerModal';
import ChallengeCreatedModal from './ChallengeCreated';
import TimePickerModal from './TimePickerModal';

const ChallengeSpaceScreen = () => {
    const [time, setTime] = useState('11:00 AM');
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [date, setDate] = useState('30 April 2025');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isChallengeCreatedVisible, setChallengeCreatedVisible] = useState(false);

    const handleTimeChange = (selectedTime: string) => {
        setTime(selectedTime);
        setTimePickerVisible(false);
    };

    const handleDateChange = (newDate: Date) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        setDate(newDate.toLocaleDateString('en-GB', options).replace(/ /g, ' '));
        setDatePickerVisible(false);
    };

    const handlePayNow = () => {
        setChallengeCreatedVisible(false);
        router.push('/(main)/WarmUp');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Challenges</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Challenge name</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue="Running"
                            placeholderTextColor="#333"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Challenge Info</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue="Write something here......"
                            placeholderTextColor="#aaa"
                            multiline
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Challenge Date</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                style={styles.inputField}
                                value={date}
                                editable={false}
                            />
                            <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                                <Ionicons name="calendar-outline" size={24} color="#48D1CC" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Challenge Time</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                style={styles.inputField}
                                value={time}
                                editable={false}
                            />
                            <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
                                <Ionicons name="time-outline" size={24} color="#48D1CC" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={() => setChallengeCreatedVisible(true)}>
                <Text style={styles.createButtonText}>Create Challenge</Text>
            </TouchableOpacity>

            <TimePickerModal
                isVisible={isTimePickerVisible}
                onClose={() => setTimePickerVisible(false)}
                onDone={handleTimeChange}
            />

            <CalendarPickerModal
                isVisible={isDatePickerVisible}
                onClose={() => setDatePickerVisible(false)}
                onSave={handleDateChange}
            />

            <ChallengeCreatedModal
                isVisible={isChallengeCreatedVisible}
                onClose={() => setChallengeCreatedVisible(false)}
                onPayNow={handlePayNow}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    backButton: {
        backgroundColor: '#E0F7FA',
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputContainer: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#48D1CC',
        paddingBottom: 10,
        fontSize: 16,
        color: '#333',
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#48D1CC',
        paddingBottom: 10,
    },
    inputField: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    createButton: {
        backgroundColor: '#48D1CC',
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
        margin: 20,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChallengeSpaceScreen;
