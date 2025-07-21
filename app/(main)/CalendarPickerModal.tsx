import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface CalendarPickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (date: Date) => void;
}

const CalendarPickerModal: React.FC<CalendarPickerModalProps> = ({
    isVisible,
    onClose,
    onSave,
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date('2021-11-17'));

    const handleSave = () => {
        onSave(selectedDate);
        onClose();
    };

    const renderCalendar = () => {
        const month = 'November';
        const year = 2021;
        const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        const dates = [
            ...Array(1).fill(''),
            ...Array.from({ length: 30 }, (_, i) => i + 1),
            ...Array.from({ length: 4 }, (_, i) => i + 1),
        ];

        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{`${month} ${year}`}</Text>
                    <View style={styles.headerIcons}>
                        <Ionicons name="chevron-back" size={24} color="#333" />
                        <Ionicons name="chevron-forward" size={24} color="#333" />
                    </View>
                </View>
                <View style={styles.daysRow}>
                    {days.map((day, index) => (
                        <Text key={index} style={styles.dayText}>{day}</Text>
                    ))}
                </View>
                <View style={styles.datesGrid}>
                    {dates.map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateCell,
                                date === 12 && styles.todayCell,
                                date === 17 && styles.selectedCell,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dateText,
                                    date === 17 && styles.selectedDateText,
                                    !date && styles.emptyDate
                                ]}
                            >
                                {date}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Add Date</Text>
                    {renderCalendar()}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelButton}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSave}>
                            <Text style={styles.saveButton}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    dayText: {
        color: 'grey',
        width: 40,
        textAlign: 'center',
    },
    datesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    dateCell: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10,
    },
    todayCell: {
        borderWidth: 1,
        borderColor: '#48D1CC',
    },
    selectedCell: {
        backgroundColor: '#48D1CC',
    },
    dateText: {
        fontSize: 16,
    },
    selectedDateText: {
        color: 'white',
    },
    emptyDate: {
        color: 'transparent'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    cancelButton: {
        fontSize: 16,
        color: 'grey',
        marginRight: 30,
    },
    saveButton: {
        fontSize: 16,
        color: '#48D1CC',
        fontWeight: 'bold',
    },
});

export default CalendarPickerModal;
