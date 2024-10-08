import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '@ourtypes/AppState';
import { homeScreenStyles } from './homeScreenStyles';
import { DisplaySessions } from './DisplaySessions';
import { DateTime } from 'luxon';
import { requestNotificationsPermission } from '@services/notifications/notificationPermissionService';
import { getAvailableAndSortedSessions } from '@components/helpers/sessionUtils';

export const Home: React.FC = () => {

  useEffect(() => {
    requestNotificationsPermission();
  }, []);

  const sessions = useSelector((state: AppState) => state.sessions);
  const loggedInUser = useSelector((state: AppState) => state.loggedInUser);

  const sortedSessions = getAvailableAndSortedSessions(sessions)

  return (
      <DisplaySessions sessions={sortedSessions} loggedInUser={loggedInUser} />
  );
};