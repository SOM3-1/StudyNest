import React from 'react';
import { Modal, View, Text, TouchableOpacity, Alert, Linking, Platform, ToastAndroid } from 'react-native';
import { modalStyles } from './modalStyles';
import { Session } from '@constants/sessions';
import { AppState, User } from '@ourtypes/AppState';
import { useSelector, useDispatch } from 'react-redux';
import { UTA_LOCATIONS_MAP_COORDINATES } from '@constants/locations';
import { enrollInStudySession, leaveStudySession, removeStudySession } from '@store/appSlice';

interface ViewSessionDetailsProps {
  isVisible: boolean;
  onClose: () => void;
  sessionData: Session | null;
  isOwner: boolean;
}

const formatTitle = (title: string) => {
  return title
    .trim() 
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
};

export const ViewSessionDetails: React.FC<ViewSessionDetailsProps> = ({
  isVisible,
  onClose,
  sessionData,
  isOwner,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.users);
  const loggedInUser = useSelector((state: AppState) => state.loggedInUser);
  const creator = users.find((user: User) => user.iD === sessionData?.createdBy);
  const creatorName = creator ? creator.fullName : 'Unknown';
  const isEnrolled = sessionData?.sessionMembers.includes(loggedInUser?.iD || '');

  const handleLocationPress = () => {
    const location = sessionData?.location;
    if (location && location in UTA_LOCATIONS_MAP_COORDINATES) {
      const coordinates = (UTA_LOCATIONS_MAP_COORDINATES as Record<string, string>)[location];
      const url = Platform.OS === 'ios' ? `maps:0,0?q=${coordinates}` : `geo:0,0?q=${coordinates}`;
      Linking.openURL(url).catch((err) => {
        console.error("Error opening map:", err);
        Alert.alert("Unable to open the map");
      });
    }
  };

  const handleEnroll = () => {
    if (sessionData) {
      dispatch(enrollInStudySession({ sessionId: sessionData.sessionId }));
      showToast(`You have enrolled in ${formatTitle(sessionData?.sessionTitle || 'Session')}.`);
      onClose();
    }
  };

  const handleLeave = () => {
    if (sessionData) {
      dispatch(leaveStudySession({ sessionId: sessionData.sessionId }));
      showToast(`You have left ${formatTitle(sessionData?.sessionTitle || 'Session')}.`);
      onClose();
    }
  };

  const handleRemove = () => {
    if (sessionData) {
      dispatch(removeStudySession({ sessionId: sessionData.sessionId }));
      showToast(`${formatTitle(sessionData?.sessionTitle || 'Session')} removed successfully.`);
      onClose();
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
    if (isOwner) {
      return (
        <TouchableOpacity style={modalStyles.cancelButton} onPress={handleRemove}>
          <Text style={modalStyles.buttonText}>Remove Session</Text>
        </TouchableOpacity>
      );
    }
    if (isEnrolled) {
      return (
        <TouchableOpacity style={[modalStyles.button, modalStyles.activeButton]} onPress={handleLeave}>
          <Text style={modalStyles.buttonText}>Leave Session</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={[modalStyles.button, modalStyles.activeButton]} onPress={handleEnroll}>
        <Text style={modalStyles.buttonText}>Enroll</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={modalStyles.modalBackground}>
        <View style={modalStyles.modalContainer}>
          <Text style={[modalStyles.modalTitle, modalStyles.capitalize]}>
            {formatTitle(sessionData?.sessionTitle || 'Session')}
          </Text>
          {sessionData?.description && <Text style={modalStyles.text}>{sessionData.description}</Text>}
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftLabel}>Date:</Text>
            <Text style={modalStyles.rightLabel}>Time:</Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftText}>{sessionData?.date}</Text>
            <Text style={modalStyles.rightText}>
              {sessionData?.from} - {sessionData?.to}
            </Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftLabel}>Location:</Text>
            <Text style={modalStyles.rightLabel}>Major:</Text>
          </View>
          <View style={modalStyles.row}>
            <TouchableOpacity onPress={handleLocationPress}>
              <Text style={[modalStyles.leftText, { color: 'blue', textDecorationLine: 'underline' }]}>{sessionData?.location}</Text>
            </TouchableOpacity>
            <Text style={modalStyles.rightText}>{sessionData?.major}</Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftLabel}>Participants:</Text>
            <Text style={modalStyles.rightLabel}>Hosted By:</Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftText}>
              {sessionData?.sessionMembers.length} / {sessionData?.participantLimit} Enrolled
            </Text>
            <Text style={modalStyles.rightText}>{creatorName}</Text>
          </View>
          {isOwner && (
            <Text style={modalStyles.ownerText}>
              You are the owner of this session.
            </Text>
          )}
          <View style={modalStyles.buttonContainer}>
            {renderActionButton()}
            <TouchableOpacity style={modalStyles.cancelButton} onPress={onClose}>
              <Text style={modalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
