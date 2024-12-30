import { DateTime } from 'luxon';
import { Session } from '@constants/sessions';

export const getAvailableAndSortedSessions = (sessions: Session[]): Session[] => {
  const nowMinus30 = DateTime.now().minus({ minutes: 30 });

  const availableSessions = sessions.filter(session => {
    const sessionEndTime = DateTime.fromISO(session.to);

    // Check if the session ends in the future
    const isSessionInFuture = sessionEndTime > nowMinus30;
    return isSessionInFuture;
  });

  const sortedSessions = [...availableSessions].sort((a, b) => {
    const dateTimeA = DateTime.fromISO(a.from);
    const dateTimeB = DateTime.fromISO(b.from);
    return dateTimeA.toMillis() - dateTimeB.toMillis();
  });

  return sortedSessions;
};

export const getAvailableSessionsForDashboard = (sessions: Session[]): Session[] => {
  const now = DateTime.now();
  const sevenDaysAgo = now.minus({ days: 7 });

  const availableSessions = sessions.filter(session => {
    const sessionStartTime = DateTime.fromISO(session.from);
    const sessionEndTime = DateTime.fromISO(session.to);

    const isSessionInFutureOrPastSevenDays = sessionStartTime >= sevenDaysAgo || sessionEndTime > now;
    return isSessionInFutureOrPastSevenDays;
  });

  const sortedSessions = [...availableSessions].sort((a, b) => {
    const dateTimeA = DateTime.fromISO(a.from);
    const dateTimeB = DateTime.fromISO(b.from);
    return dateTimeA.toMillis() - dateTimeB.toMillis();
  });

  return sortedSessions;
};
