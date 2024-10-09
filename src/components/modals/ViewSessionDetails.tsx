import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import {modalStyles} from './modalStyles';
import {Session} from '@constants/sessions';
import {AppState, User} from '@ourtypes/AppState';
import {useSelector} from 'react-redux';

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
  if (!sessionData) {
    return null;
  }

  const users = useSelector((state: AppState) => state.users);

  const creator = users.find((user: User) => user.iD === sessionData.createdBy);
  const creatorName = creator ? creator.fullName : 'Unknown';

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={modalStyles.modalBackground}>
        <View style={modalStyles.modalContainer}>
          <Text style={[modalStyles.modalTitle, modalStyles.capitalize]}>
            {sessionData.sessionTitle}
          </Text>
         {sessionData.description &&  <Text style={modalStyles.text}>{sessionData.description}</Text>}
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftLabel}>Date:</Text>
            <Text style={modalStyles.rightLabel}>Time:</Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftText}>{sessionData.date}</Text>
            <Text style={modalStyles.rightText}>
              {sessionData.from} - {sessionData.to}
            </Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftLabel}>Location:</Text>
            <Text style={modalStyles.rightLabel}>Major:</Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftText}>{sessionData.location}</Text>
            <Text style={modalStyles.rightText}>{sessionData.major}</Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftLabel}>Participants:</Text>
            <Text style={modalStyles.rightLabel}>Hosted By:</Text>
          </View>
          <View style={modalStyles.row}>
            <Text style={modalStyles.leftText}>
              {sessionData.sessionMembers.length} /{' '}
              {sessionData.participantLimit} Enrolled
            </Text>
            <Text style={modalStyles.rightText}>{creatorName}</Text>
          </View>
          {isOwner && (
            <Text style={modalStyles.ownerText}>
              You are the owner of this session.
            </Text>
          )}
          <View style={modalStyles.closeButtonContainer}>
            <TouchableOpacity
              style={modalStyles.cancelButton}
              onPress={onClose}>
              <Text style={modalStyles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
