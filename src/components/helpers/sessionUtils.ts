import { DateTime } from 'luxon';
import { Session } from '@constants/sessions';

export const getAvailableAndSortedSessions = (sessions: Session[]): Session[] => {
  const nowMinus30 = DateTime.now().minus({ minutes: 30 });

  const availableSessions = sessions.filter(session => {
    const sessionEndTime = DateTime.fromISO(`${session.date}T${session.to}`);

    //Todo: Update if needed
    //const isParticipationAvailable = session.sessionMembers.length < session.participantLimit;
    const isSessionInFuture = sessionEndTime > nowMinus30;

    return isSessionInFuture;
    //return isParticipationAvailable && isSessionInFuture;
  });

  const sortedSessions = [...availableSessions].sort((a, b) => {
    const dateTimeA = DateTime.fromISO(`${a.date}T${a.from}`);
    const dateTimeB = DateTime.fromISO(`${b.date}T${b.from}`);
    return dateTimeA.toMillis() - dateTimeB.toMillis();
  });

  return sortedSessions;
};


export const getAvailableSessionsForDashboard = (sessions: Session[]): Session[] => {
  const now = DateTime.now();
  const sevenDaysAgo = now.minus({ days: 7 });

  const availableSessions = sessions.filter(session => {
    const sessionStartTime = DateTime.fromISO(`${session.date}T${session.from}`);
    const sessionEndTime = DateTime.fromISO(`${session.date}T${session.to}`);

    const isSessionInFutureOrPastSevenDays = sessionStartTime >= sevenDaysAgo || sessionEndTime > now;

    return isSessionInFutureOrPastSevenDays;
  });

  const sortedSessions = [...availableSessions].sort((a, b) => {
    const dateTimeA = DateTime.fromISO(`${a.date}T${a.from}`);
    const dateTimeB = DateTime.fromISO(`${b.date}T${b.from}`);
    return dateTimeA.toMillis() - dateTimeB.toMillis();
  });

  return sortedSessions;
};
