import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {log} from '@services/Logger';
import { RemoteMessage } from '@ourtypes/notifications';

export const Notifications: React.FC = () => {

  useEffect(() => {
    const messageListener = messaging().onMessage((remoteMessage: RemoteMessage) => {
      log.debug('Remote Message:', JSON.stringify(remoteMessage));
      const { notification } = remoteMessage;
      const title = notification?.title;
      const body = notification?.body;

          try {
            if (title || body) {
               Alert.alert(`${title}`, `${body}`, [
                  {text: 'Ok', style: 'cancel'},
                ]);
            }
          } catch (error) {
            log.error(error);
        }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      log.debug('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      const data =
        remoteMessage.data ;
    });

    const handleInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();
    };

    handleInitialNotification();

    return () => messageListener();
  }, []);
  return null;
};
