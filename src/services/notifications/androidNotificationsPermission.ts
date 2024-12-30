import {PermissionsAndroid} from 'react-native';
import {log} from '../Logger';
import {Platform} from 'react-native';

export const requestAndroidNotificationsPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 32) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        log.debug('Android notifications permission granted');
      } else {
        log.debug('Android notifications permission denied');
      }
    } catch (error) {
      log.error('Error requesting Android notifications permission:', error);
    }
  }
};
