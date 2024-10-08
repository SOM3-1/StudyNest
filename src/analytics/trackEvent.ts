import { Session } from '@constants/sessions';
import analytics from '@react-native-firebase/analytics';
import { log } from '@services/Logger';
import { addSessionMemberToFirestore, deleteSessionFromFirestore, removeSessionMemberFromFirestore, saveSessionToFirestore } from './sessionStrore';

export const trackSessionCreation = (session: Session, fullName: string): void => {
    analytics()
      .logEvent('session_created', {
        sessionId: session.sessionId,
        sessionTitle: session.sessionTitle,
        description: session.description,
        date: session.date,
        from: session.from,
        to: session.to,
        location: session.location,
        major: session.major,
        createdById: session.createdBy,
        participantLimit: session.participantLimit,
        sessionMembers: session.sessionMembers,
        fullName
      })
      .catch(error => {
        log.error(error);
      });
      saveSessionToFirestore(session)
  };

export const trackSessionJoin = (sessionId: string, userId: string): void => {
  analytics()
    .logEvent('session_joined', {
      sessionId,
      userId,
    })
    .catch(error => {
      log.error(error);
    });
    addSessionMemberToFirestore(sessionId, userId);
};

export const trackSessionLeave = (sessionId: string, userId: string): void => {
  analytics()
    .logEvent('session_left', {
      sessionId,
      userId,
    })
    .catch(error => {
      log.error(error);
    });
    removeSessionMemberFromFirestore(sessionId, userId);
};

export const trackSessionRemoval = (sessionId: string, removedBy: string): void => {
  analytics()
    .logEvent('session_removed', {
      sessionId,
      removedBy,
    })
    .catch(error => {
      log.error(error);
    });
    deleteSessionFromFirestore(sessionId)
};
