import React, { useState } from 'react';
import { View, TextInput, Modal, Text, TouchableOpacity, Alert, ToastAndroid, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { addStudySession } from '@store/appSlice';
import { DateTime } from 'luxon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { theme } from 'src/utils/theme';
import { UTA_LOCATIONS } from '@components/helpers/createSessions';
import { MAJORS } from '@constants/majors';
import { modalStyles } from './modalStyles';


export const AddSessionsModal: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
    const dispatch = useDispatch();

    const [sessionTitle, setSessionTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sessionStart, setSessionStart] = useState<string>(DateTime.now().toISODate());
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [location, setLocation] = useState('');
    const [major, setMajor] = useState('');
    const [participantLimit, setParticipantLimit] = useState<number>(2);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showFromTimePicker, setShowFromTimePicker] = useState(false);
    const [showToTimePicker, setShowToTimePicker] = useState(false);

    const isFormValid = sessionTitle && description && from && to && location && major && participantLimit >= 2;

    const clearFields = () => {
        setSessionTitle('');
        setDescription('');
        setSessionStart(DateTime.now().toISODate());
        setFrom('');
        setTo('');
        setLocation('');
        setMajor('');
        setParticipantLimit(2);
    };

    const handleDateChange = (event: any, selectedDate?: Date | null) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const newDate = DateTime.fromJSDate(selectedDate).toISODate() || DateTime.now().toISODate();
            setSessionStart(newDate);
        }
    };

    const handleCreateSession = () => {
        dispatch(addStudySession({
            sessionTitle,
            description,
            date: sessionStart,
            from,
            to,
            location,
            major,
            participantLimit
        }));
        ToastAndroid.show('Session created successfully!', ToastAndroid.LONG);
        clearFields();
        onClose();
    };

    const handleCancel = () => {
        if (sessionTitle || description || from || to || location || major || participantLimit) {
            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure you want to discard them?',
                [
                    { text: 'Stay', style: 'cancel' },
                    {
                        text: 'Leave', onPress: () => {
                            clearFields();
                            onClose();
                        }
                    },
                ]
            );
        } else {
            onClose();
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
            <View style={modalStyles.modalBackground}>
                <View style={modalStyles.modalContainer}>
                    <Text style={modalStyles.modalTitle}>Create a New Study Session</Text>

                    <TextInput
                        placeholder="Session Title"
                        value={sessionTitle}
                        onChangeText={setSessionTitle}
                        style={modalStyles.input}
                    />
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={modalStyles.input}
                    />

                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={modalStyles.input}>
                        <Text>{sessionStart}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={DateTime.fromISO(sessionStart).toJSDate()}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            minimumDate={new Date()}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowFromTimePicker(true)} style={modalStyles.input}>
                        <Text>{from || "Select From Time"}</Text>
                    </TouchableOpacity>
                    {showFromTimePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            display="default"
                            onChange={(event, selectedTime) => {
                                setShowFromTimePicker(false);
                                if (selectedTime) {
                                    const formattedTime = DateTime.fromJSDate(selectedTime).toFormat('HH:mm');
                                    const now = DateTime.now().toFormat('HH:mm');
                                    if (formattedTime >= now) {
                                        setFrom(formattedTime);
                                    } else {
                                        ToastAndroid.show('From time cannot be in the past.', ToastAndroid.LONG);
                                    }
                                }
                            }}
                        />
                    )}

                    <TouchableOpacity onPress={() => setShowToTimePicker(true)} style={modalStyles.input}>
                        <Text>{to || "Select To Time"}</Text>
                    </TouchableOpacity>
                    {showToTimePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            display="default"
                            onChange={(event, selectedTime) => {
                                setShowToTimePicker(false);
                                if (selectedTime) {
                                    const formattedTime = DateTime.fromJSDate(selectedTime).toFormat('HH:mm');
                                    const fromTime = DateTime.fromFormat(from, 'HH:mm');
                                    const toTime = DateTime.fromJSDate(selectedTime);
                                    if (toTime.diff(fromTime, 'minutes').minutes >= 30) {
                                        setTo(formattedTime);
                                    } else {
                                        ToastAndroid.show('To time must be at least 30 minutes after From time.', ToastAndroid.LONG);
                                    }
                                }
                            }}
                        />
                    )}

                    <Text style={modalStyles.pickerLabel}>Location</Text>
                    <View style={modalStyles.pickerContainer}>
                        <Picker
                            selectedValue={location}
                            onValueChange={(itemValue) => setLocation(itemValue)}
                        >
                            {UTA_LOCATIONS.map((loc) => (
                                <Picker.Item key={loc.value} label={loc.label} value={loc.value} />
                            ))}
                        </Picker>
                    </View>
                    <Text style={modalStyles.pickerLabel}>Major</Text>
                    <View style={modalStyles.pickerContainer}>
                        <Picker
                            selectedValue={major}
                            onValueChange={(itemValue) => setMajor(itemValue)}
                            style={modalStyles.picker}
                        >
                            {MAJORS.map((majorItem) => (
                                <Picker.Item key={majorItem.value} label={majorItem.label} value={majorItem.value} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput
                        placeholder="Participant Limit"
                        value={participantLimit.toString()}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const limit = Math.max(Number(text), 2);
                            setParticipantLimit(limit);
                        }}
                        style={modalStyles.input}
                    />

                    <View style={modalStyles.buttonContainer}>
                        <TouchableOpacity style={modalStyles.cancelButton} onPress={handleCancel}>
                            <Text style={modalStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[modalStyles.button, isFormValid ? modalStyles.activeButton : modalStyles.disabledButton]}
                            onPress={handleCreateSession}
                            disabled={!isFormValid}
                        >
                            <Text style={modalStyles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

