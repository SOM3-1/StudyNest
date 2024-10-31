import React, {useEffect} from 'react';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {log} from '@services/Logger';
import { RemoteMessage } from '@ourtypes/notifications';
import { useSelector } from 'react-redux';
import { AppState } from '@store/appSlice';

export const Notifications: React.FC = () => {
  const loggedInUserId = useSelector((state: AppState) => state.loggedInUser?.iD);
  useEffect(() => {
    const messageListener = messaging().onMessage((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      log.debug('Remote Message:', JSON.stringify(remoteMessage));
      const { notification, data } = remoteMessage;
      const title = notification?.title;
      const body = notification?.body;
      const userIdInMessage = data?.userId;

          try {
            if (title && body && (!userIdInMessage || userIdInMessage === loggedInUserId)) {
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
