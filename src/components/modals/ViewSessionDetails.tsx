import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Alert, Linking, Platform, ToastAndroid, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { modalStyles } from './modalStyles';
import { Session } from '@constants/sessions';
import { AppState, User } from '@ourtypes/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { UTA_LOCATIONS_MAP_COORDINATES } from '@constants/locations';
import { enrollInStudySession, leaveStudySession, removeStudySession } from '@store/appSlice';
import { theme } from 'src/utils/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { homeScreenStyles } from '@components/home/homeScreenStyles';
import { DateTime } from 'luxon';

interface ViewSessionDetailsProps {
  isVisible: boolean;
  onClose: () => void;
  sessionData: Session | null;
  isOwner: boolean;
}



export const ViewSessionDetails: React.FC<ViewSessionDetailsProps> = ({
  isVisible,
  onClose,
  sessionData,
  isOwner,
}) => {
  const formatTitle = (title: string) => title.trim().toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.users);
  const loggedInUser = useSelector((state: AppState) => state.loggedInUser);
  const creator = users.find((user: User) => user.iD === sessionData?.createdBy);
  const creatorName = creator ? creator.fullName : 'Unknown';
  const isEnrolled = sessionData?.sessionMembers.includes(loggedInUser?.iD || '');
  const [isLoading, setIsLoading] = useState(false);

  const isConnnected = useSelector((state: AppState) => state.network.isConnected);

  const fromDateTime = DateTime.fromISO(sessionData?.from || '');
  const toDateTime = DateTime.fromISO(sessionData?.to || '');
  const sameDate = fromDateTime.hasSame(toDateTime, 'day');

  const isSessionLimitReached: boolean = sessionData?.sessionMembers?.length === sessionData?.participantLimit;
  const currentDateTime = DateTime.now();
  const isSessionExpired = fromDateTime < currentDateTime;
  const dateDisplay = sameDate
    ? `${fromDateTime.toFormat('yyyy-MM-dd')} | ${fromDateTime.toFormat('HH:mm')} - ${toDateTime.toFormat('HH:mm')}`
    : `${fromDateTime.toFormat('yyyy-MM-dd HH:mm')} - ${toDateTime.toFormat('yyyy-MM-dd HH:mm')}`;


  const handleLocationPress = () => {
    const location = sessionData?.location;
    if (location && location in UTA_LOCATIONS_MAP_COORDINATES) {
      const coordinates = (UTA_LOCATIONS_MAP_COORDINATES as Record<string, string>)[location];
      if (coordinates) {
        const url = Platform.OS === 'ios' ? `maps:0,0?q=${coordinates}` : `geo:0,0?q=${coordinates}`;
        Linking.openURL(url).catch(() => Alert.alert("Unable to open the map"));
      }
    }
  };

  const confirmAndHandleRemove = () => {
    Alert.alert("Confirm Removal", "Are you sure you want to remove this session?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: handleRemove },
    ]);
  };

  const confirmAndHandleLeave = () => {
    Alert.alert("Confirm Removal", "Are you sure you want to leave this session?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: handleLeave },
    ]);
  };

  const handleEnroll = () => {
    if (isConnnected) {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(enrollInStudySession({ sessionId: sessionData?.sessionId || '' }));
        showToast(`You have enrolled in ${formatTitle(sessionData?.sessionTitle || 'Session')}.`);
        onClose();
        setIsLoading(false);
      }, 2000);
    } else {
      ToastAndroid.show('Unable to connect to the network!', ToastAndroid.LONG);
    }
  };

  const handleLeave = () => {
    if (isConnnected) {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(leaveStudySession({ sessionId: sessionData?.sessionId || '' }));
        showToast(`You have left ${formatTitle(sessionData?.sessionTitle || 'Session')}.`);
        onClose();
        setIsLoading(false);
      }, 2000);
    } else {
      ToastAndroid.show('Unable to connect to the network!', ToastAndroid.LONG);
    }
  };

  const handleRemove = () => {
    if (isConnnected) {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(removeStudySession({ sessionId: sessionData?.sessionId || '' }));
        showToast(`${formatTitle(sessionData?.sessionTitle || 'Session')} removed successfully.`);
        onClose();
        setIsLoading(false);
      }, 2000);
    } else {
      ToastAndroid.show('Unable to connect to the network!', ToastAndroid.LONG);
    }
  };

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };

  const renderActionButton = () => {

    if (isSessionExpired) {

      if (isOwner) {
        return (
          <TouchableWithoutFeedback>
            <View style={[modalStyles.button, modalStyles.disabledButton]}>
              <Text style={modalStyles.buttonText}>Remove Session</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      }

      if (isEnrolled) {
        return (

          <TouchableWithoutFeedback>
            <View style={[modalStyles.button, modalStyles.disabledButton]}>
              <Text style={modalStyles.buttonText}>Leave Session</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      }
      return (
        <TouchableWithoutFeedback>
          <View style={[modalStyles.button, modalStyles.disabledButton]}>
            <Text style={modalStyles.buttonText}>Enroll</Text>
          </View>
        </TouchableWithoutFeedback>
      );

    }

    if (isOwner) {
      return (
        <TouchableOpacity style={modalStyles.removeButton} onPress={confirmAndHandleRemove}>
          <Text style={modalStyles.buttonText}>Remove Session</Text>
        </TouchableOpacity>
      );
    }

    if (isEnrolled) {
      return (
        <TouchableOpacity style={[modalStyles.button, modalStyles.activeButton]} onPress={confirmAndHandleLeave}>
          <Text style={modalStyles.buttonText}>Leave Session</Text>
        </TouchableOpacity>
      );
    }

    if (!isSessionLimitReached) {
      return (
        <TouchableOpacity style={[modalStyles.button, modalStyles.activeButton]} onPress={handleEnroll}>
          <Text style={modalStyles.buttonText}>Enroll</Text>
        </TouchableOpacity>
      );

    }
    return (
      <TouchableWithoutFeedback>
        <View style={[modalStyles.button, modalStyles.disabledButton]}>
          <Text style={modalStyles.buttonText}>Enroll</Text>
        </View>
      </TouchableWithoutFeedback>
    );

  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={modalStyles.modalBackground}>
        <View style={modalStyles.modalContainer}>
          <Text style={[modalStyles.modalTitle, modalStyles.capitalize]}>
            {formatTitle(sessionData?.sessionTitle || 'Session')}
          </Text>
          {sessionData?.description && <Text style={modalStyles.text}>{sessionData.description}</Text>}

          <View style={modalStyles.detailRow}>
            <MaterialIcons name="event" size={20} color={theme.colors.blue} />
            <Text style={modalStyles.detailText}>{dateDisplay}</Text>
          </View>

          <View style={modalStyles.detailRow}>
            <MaterialIcons name="place" size={20} color={theme.colors.blue} />
            <TouchableOpacity onPress={handleLocationPress}>
              <Text style={[modalStyles.detailText, { color: 'blue', textDecorationLine: 'underline' }]}>{sessionData?.location}</Text>
            </TouchableOpacity>
          </View>

          <View style={modalStyles.detailRow}>
            <MaterialIcons name="school" size={20} color={theme.colors.blue} />
            <Text style={modalStyles.detailText}>{sessionData?.major}</Text>
          </View>

          <View style={modalStyles.detailRow}>
            <MaterialIcons name="group" size={20} color={theme.colors.blue} />
            <Text style={modalStyles.detailText}>{sessionData?.sessionMembers.length} / {sessionData?.participantLimit} Enrolled</Text>
          </View>

          <View style={modalStyles.detailRow}>
            <MaterialIcons name="person" size={20} color={theme.colors.blue} />
            <Text style={modalStyles.detailText}>Hosted By: {creatorName}</Text>
          </View>
          {isSessionExpired ? (
            <Text style={{ ...modalStyles.ownerText, color: theme.colors.red }}>
              {isOwner
                ? "This session is expired. You won't be able to take any actions, even as the owner."
                : "This session is expired. You won't be able to take any actions."}
            </Text>
          ) : (
            isOwner && (
              <Text style={modalStyles.ownerText}>You are the owner of this session.</Text>
            )
          )}

          {isSessionLimitReached && !isOwner && !isSessionExpired && (
            <Text style={{ ...modalStyles.ownerText, color: theme.colors.red }}>This session has reached its participant limit. Enrollment is no longer available.</Text>
          )}

          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity style={modalStyles.cancelButton} onPress={onClose}>
              <Text style={modalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
            {renderActionButton()}
          </View>
        </View>

        {isLoading && (
          <View style={homeScreenStyles.overlay}>
            <ActivityIndicator size={80} color={theme.colors.lightBlue} />
          </View>
        )}
      </View>
    </Modal>
  );
};