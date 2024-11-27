import React, { useEffect, useState } from 'react';
import { View, Modal, Text, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addStudySession, AppState } from '@store/appSlice';
import { DateTime } from 'luxon';
import DatePicker from 'react-native-date-picker';
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
    const [from, setFrom] = useState<Date>(new Date());
    const [to, setTo] = useState<Date>(DateTime.now().plus({ minutes: 30 }).toJSDate());
    const [location, setLocation] = useState('');
    const [major, setMajor] = useState('');
    const [participantLimit, setParticipantLimit] = useState<number>(2);
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const isFormValid = sessionTitle && from && to && location && major && participantLimit >= 2;
    const isConnnected = useSelector((state: AppState) => state.network.isConnected);

    const close = () => {
        clearFields();
        clearStates()
        onClose();
    }

    const clearStates = () => {
        setShowFromPicker(false);
        setShowToPicker(false);
    }

    const clearFields = () => {
        setSessionTitle('');
        setDescription('');
        setFrom(new Date());
        setTo(DateTime.now().plus({ minutes: 30 }).toJSDate());
        setLocation('');
        setMajor('');
        setParticipantLimit(2);
    };

    const handleFromChange = (selectedDate: Date) => {
        const now = new Date();
        if (selectedDate < now) {
            ToastAndroid.show('Start time cannot be in the past.', ToastAndroid.LONG);

            setShowFromPicker(false);
        }
        else {
            setFrom(selectedDate);

            const newTo = DateTime.fromJSDate(selectedDate).plus({ minutes: 30 }).toJSDate();
            if (newTo > to) {
                setTo(newTo);

                setShowFromPicker(false);
            }

        }

    };

    const handleToChange = (selectedDate: Date) => {
        const fromDateTime = DateTime.fromJSDate(from);
        if (DateTime.fromJSDate(selectedDate).diff(fromDateTime, 'minutes').minutes < 30) {
            ToastAndroid.show('End time must be at least 30 minutes after start time.', ToastAndroid.LONG);
            setShowToPicker(false);
        }
        else {

            setTo(selectedDate);
            setShowToPicker(false);

        }
    };

    const handleCreateSession = () => {
        if (isConnnected) {
            dispatch(addStudySession({
                sessionTitle,
                description,
                from: from.toISOString(),
                to: to.toISOString(),
                location,
                major,
                participantLimit
            }));

            ToastAndroid.show('Session created successfully!', ToastAndroid.LONG);
            clearFields();
            onClose();
        }
        else {
            ToastAndroid.show('Unable to connect to the network!', ToastAndroid.LONG);
        }
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
                    <Text style={modalStyles.label}>From <Text style={modalStyles.imp}>*</Text></Text>
                    <TouchableOpacity onPress={() => setShowFromPicker(true)} style={modalStyles.input}>
                        <Text style={modalStyles.pickerTextStyle}>{DateTime.fromJSDate(from).toFormat('yyyy-MM-dd HH:mm')}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={showFromPicker}
                        date={from}
                        onConfirm={handleFromChange}
                        onCancel={() => setShowFromPicker(false)}
                        minimumDate={new Date()}
                        mode="datetime"
                    />
                    <Text style={modalStyles.label}>To <Text style={modalStyles.imp}>*</Text></Text>
                    <TouchableOpacity onPress={() => setShowToPicker(true)} style={modalStyles.input}>
                        <Text style={modalStyles.pickerTextStyle}>{DateTime.fromJSDate(to).toFormat('yyyy-MM-dd HH:mm')}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={showToPicker}
                        date={to}
                        onConfirm={handleToChange}
                        onCancel={() => setShowToPicker(false)}
                        minimumDate={from}
                        mode="datetime"
                    />
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
                    <Text style={modalStyles.label}>No. of participants ({participantLimit})<Text style={modalStyles.imp}>*</Text></Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...modalStyles.label, marginRight: 10 }}>{2}</Text>
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
                        <Text style={{ ...modalStyles.label, marginLeft: 10, }}>{8}</Text>
                    </View>
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
