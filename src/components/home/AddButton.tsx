import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { theme } from 'src/utils/theme';
import { homeScreenStyles } from './homeScreenStyles';
import { AddSessionsModal } from '@components/modals/AddSession';

interface FloatingButtonProps {
  onPress: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={homeScreenStyles.floatingButton} onPress={onPress}>
      <View style={homeScreenStyles.circle}>
        <View style={homeScreenStyles.innerCircle}>
          <MaterialIcons name="add" size={40} color={theme.colors.blue} />
        </View>
      </View>
    </TouchableOpacity>
  );
};


export const AddButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <AddSessionsModal isVisible={isModalVisible} onClose={closeModal} />
      <FloatingButton onPress={openModal} />
    </View>
  );
};
