import messaging from '@react-native-firebase/messaging';
import { log } from '../Logger';

export const requestIOSNotificationsPermission = async ()  => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    log.debug('Authorization status ios:', authStatus);
  }
  else {
    log.debug('Authorization status ios:', authStatus);
  }
}
