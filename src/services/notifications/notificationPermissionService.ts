import {Platform} from 'react-native';
import {requestIOSNotificationsPermission} from './iosNotificationsPermission';
import {requestAndroidNotificationsPermission} from './androidNotificationsPermission';

export const requestNotificationsPermission = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      if (Platform.OS === 'ios') {
        requestIOSNotificationsPermission().then(resolve).catch(reject);
      } else {
        requestAndroidNotificationsPermission().then(resolve).catch(reject);
      }
    } catch (error) {
      reject(error);
    }
  });
};
