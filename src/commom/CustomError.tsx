import React from 'react';
import {View, Text, Modal} from 'react-native';

interface CustomErrorProps {
  errorMessage: string;
  crashError: Error;
}

export const CustomError: React.FC<CustomErrorProps> = ({
  errorMessage,
  crashError,
}) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={errorMessage != undefined && errorMessage.length > 0}>
      <View >
        <View>
          <Text>{'Something went wrong'}</Text>
          <Text >{`Error: ${crashError}`}</Text>
        </View>
      </View>
    </Modal>
  );
};
