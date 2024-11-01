import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { addStudySession } from '@store/appSlice';
import { DateTime } from 'luxon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { UTA_LOCATIONS } from '@components/helpers/createSessions';
import { MAJORS } from '@constants/majors';
import { modalStyles } from './modalStyles';
import CustomTextInput from 'src/commom/CustomTextInput';
import { theme } from 'src/utils/theme';
import Slider from '@react-native-community/slider';

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

    const isFormValid = sessionTitle && from && to && location && major && participantLimit >= 2;

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
       //const adjustedParticipantLimit = Math.max(2, Math.min(participantLimit, 8));

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
                    <Text style={modalStyles.label}>Session Title <Text style={modalStyles.imp}>*</Text></Text>
                    <CustomTextInput
                        placeholder="Session Title"
                        value={sessionTitle}
                        onChangeText={setSessionTitle}
                        style={modalStyles.input}
                    />
                    <Text style={modalStyles.label}>Description</Text>
                    <CustomTextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        style={modalStyles.input}
                    />
                    <Text style={modalStyles.label}>Date <Text style={modalStyles.imp}>*</Text></Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={modalStyles.input}>
                        <Text style={modalStyles.pickerTextStyle}>{sessionStart}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={DateTime.fromISO(sessionStart).toJSDate()}
                            mode="date"
                            display="default"
                            accentColor={theme.colors.blue}
                            textColor="white"
                            onChange={handleDateChange}
                            minimumDate={new Date()}
                        />
                    )}
                    <Text style={modalStyles.label}>From <Text style={modalStyles.imp}>*</Text></Text>
                    <TouchableOpacity onPress={() => setShowFromTimePicker(true)} style={modalStyles.input}>
                        <Text style={modalStyles.pickerTextStyle}>{from || "Select From Time"}</Text>
                    </TouchableOpacity>
                    {showFromTimePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            display="default"
                            textColor="white"
                            onChange={(event, selectedTime) => {
                                setShowFromTimePicker(false);
                                if (selectedTime) {
                                    const formattedTime = DateTime.fromJSDate(selectedTime).toFormat('HH:mm');
                                    const now = DateTime.now();
                                    const selectedDate = DateTime.fromISO(sessionStart);

                                    if (selectedDate.hasSame(now, 'day')) {
                                        // If the selected date is today, restrict time selection based on current time
                                        const currentTime = now.toFormat('HH:mm');
                                        if (formattedTime >= currentTime) {
                                            setFrom(formattedTime);
                                        } else {
                                            ToastAndroid.show('From time cannot be in the past.', ToastAndroid.LONG);
                                        }
                                    } else {
                                        // If the selected date is in the future, no time restriction
                                        setFrom(formattedTime);
                                    }
                                }
                            }}
                        />
                    )}
                    <Text style={modalStyles.label}>To <Text style={modalStyles.imp}>*</Text></Text>
                    <TouchableOpacity onPress={() => setShowToTimePicker(true)} style={modalStyles.input}>
                        <Text style={modalStyles.pickerTextStyle}>{to || "Select To Time"}</Text>
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

                    <Text style={modalStyles.label}>Location <Text style={modalStyles.imp}>*</Text></Text>
                    <View style={modalStyles.pickerContainer}>
                        <Picker
                            selectedValue={location}
                            onValueChange={(itemValue) => setLocation(itemValue)}
                            style={{ color: theme.colors.darkGrey, ...modalStyles.picker }}
                            dropdownIconColor={theme.colors.darkGrey}
                        >
                            {UTA_LOCATIONS.map((loc) => (
                                <Picker.Item key={loc.value} label={loc.label} value={loc.value} />
                            ))}
                        </Picker>
                    </View>
                    <Text style={modalStyles.label}>Major <Text style={modalStyles.imp}>*</Text></Text>
                    <View style={modalStyles.pickerContainer}>
                        <Picker
                            selectedValue={major}
                            onValueChange={(itemValue) => setMajor(itemValue)}
                            style={{ color: theme.colors.darkGrey, ...modalStyles.picker }}
                            dropdownIconColor={theme.colors.darkGrey}
                        >
                            {MAJORS.map((majorItem) => (
                                <Picker.Item key={majorItem.value} label={majorItem.label} value={majorItem.value} />
                            ))}
                        </Picker>
                    </View>
                    <Text style={modalStyles.label}>No. of participants <Text style={modalStyles.imp}>*</Text></Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...modalStyles.label,marginRight: 10 }}>{2}</Text>
                        <Slider
                            style={{ flex: 1 }}
                            minimumValue={2}
                            maximumValue={8}
                            step={1}
                            value={participantLimit}
                            onValueChange={(value) => setParticipantLimit(value)}
                            minimumTrackTintColor={theme.colors.blue}
                            maximumTrackTintColor={theme.colors.lightGrey}
                        />
                        <Text style={{...modalStyles.label, marginLeft: 10,}}>{8}</Text>
                    </View>
                    <Text style={{...modalStyles.label, textAlign: 'center' }}>{participantLimit}</Text>
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

