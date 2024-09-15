import messaging from '@react-native-firebase/messaging';
import {log} from '../Logger';
import {Platform} from 'react-native';

export const getFirebaseToken = async (): Promise<string | null> => {
  try {
    const fcmToken = await messaging().getToken();
    log.debug('fcmToken received', fcmToken);
    return fcmToken;
  } catch (error) {
    log.error('Error fetching FCM token:', error);
    return null;
  }
};
