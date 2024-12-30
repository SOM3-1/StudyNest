import {Image, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from 'src/utils/theme';

export const BackButton: React.FC = () => {
  return (
    <View style={{paddingLeft: 20}}>
        <Icon
        name={"arrow_back"}
        color={theme.colors.white}
      />
    </View>
  );
};
