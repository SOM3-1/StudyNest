import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '@ourtypes/AppState';
import { homeScreenStyles } from './homeScreenStyles';
import { DisplaySessions } from './DisplaySessions';
import { DateTime } from 'luxon';
import { requestNotificationsPermission } from '@services/notifications/notificationPermissionService';

export const Home: React.FC = () => {

  useEffect(() => {
    requestNotificationsPermission();
  }, []);

  const sessions = useSelector((state: AppState) => state.sessions);
  const loggedInUser = useSelector((state: AppState) => state.loggedInUser);

  const nowMinus30 = DateTime.now().minus({ minutes: 30 });

  const availableSessions = sessions.filter(session => {
    const sessionEndTime = DateTime.fromISO(`${session.date}T${session.to}`);

    const isParticipationAvailable = session.sessionMembers.length < session.participantLimit;
    const isSessionInFuture = sessionEndTime > nowMinus30;

    return isParticipationAvailable && isSessionInFuture;
  });

  const sortedSessions = [...availableSessions].sort((a, b) => {
    const dateTimeA = DateTime.fromISO(`${a.date}T${a.from}`);
    const dateTimeB = DateTime.fromISO(`${b.date}T${b.from}`);
    return dateTimeA.toMillis() - dateTimeB.toMillis();
  });

  return (
    <View style={homeScreenStyles.container}>
      <DisplaySessions sessions={sortedSessions} loggedInUser={loggedInUser} />
    </View>
  );
};